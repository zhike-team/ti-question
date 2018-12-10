import React, { Component } from 'react';
import { css } from 'aphrodite';
import { View } from '@zhike/ti-ui';
import { get } from 'lodash';
import axios from 'axios';
import { AudioPlayer } from '../audio_player';
import { getBodyWidth, getBodyHeight } from './utils';
import styles from './styles';

// 录音
export default class SearchWord extends Component {
  /**  SearchWord 在页面中搜索英文单词
    为用户返回中文翻译的功能组件 */
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      /** 需要查询的词汇 */
      word: '',
      /** 是否需要加在组件 */
      isShow: false,
      /** 单词的翻译 */
      brief: [],
      /** 单词的美式发音 */
      sound: {},
      /** 弹框的定位top值 */
      positionTop: 0,
      /** 弹框的定位left值 */
      positionLeft: 0,
      /** 在单词上方显示 翻译 */
      isFrameUp: false,
      /** 三角的定位left值 */
      triangleLeft: 0,
      /** 弹框的定位Bottom值 */
      positionBottom: 0,
      /** 正在播放音标发音 */
      isPlay: false,
      /** 查询单词是否成功 */
      isSucceed: false,
    };
    this.clickFlag = null;
  }

  async componentDidMount() {
    // 在body元素中,鼠标抬起的时候，那么就可以获取到文字
    const body = global.document.getElementsByTagName('body')[0];
    body.addEventListener('click', this.singleClick, false);
    body.addEventListener('dblclick', this.doubleClick, false);
    // 阻止合成事件冒泡
  }

  componentWillUnmount() {
    const body = global.document.getElementsByTagName('body')[0];
    body.removeEventListener('click', this.singleClick, false);
    body.removeEventListener('dblclick', this.doubleClick, false);
    AudioPlayer.unload();
  }

  // 单击处理的事件
  singleClick = e => {
    const parentNode = global.document.getElementById('searchContainer');
    // 对于弹框以及弹框上的元素做处理
    if (this.searchParents(e.target, parentNode)) {
      return;
    }
    // 每次点击页面 状态清空
    this.setState({
      word: '',
      isShow: false,
      brief: [],
      sound: {},
      positionTop: 0,
      positionLeft: 0,
      isFrameUp: false,
      triangleLeft: 0,
      isPlay: false,
    });
    if (this.clickFlag) { // 取消上次延时未执行的方法
      clearTimeout(this.clickFlag);
    }
    this.clickFlag = setTimeout(() => {
      this.judgeSearch();
    }, 300);
  }
  // 判断是否执行查询功能
  judgeSearch = () => {
    const { text, range } = this.getTextMessage();
    const selectWord = text.trim();
    if (!range.collapsed
      && /^\w+$/.test(selectWord)
      && selectWord.indexOf(' ') === -1) {
      this.setState({
        word: selectWord,
      });
      this.setPosition(range);
      this.searchWord(selectWord);
    }
  }
  // 查询祖先元素中是否有 特定元素
  searchParents = (element, parentNode) => {
    let currentNode = element;
    if (currentNode === parentNode) return true;
    while (currentNode.tagName !== 'BODY') {
      if (currentNode.parentNode === parentNode) {
        return true;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return false;
  }
  // 双击处理的事件
  doubleClick = e => {
    const parentNode = global.document.getElementById('searchContainer');
    // 对于弹框以及弹框上的元素做处理
    if (this.searchParents(e.target, parentNode)) {
      return;
    }
    if (this.clickFlag) { // 取消上次延时未执行的方法
      clearTimeout(this.clickFlag);
    }
    this.judgeSearch();
  }
  // 单词查询
  searchWord = async selectWord => {
    //  查单词的接口
    const { data } = await axios({
      url: `https://api.smartstudy.com/word/brief/${selectWord}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 20000,
    });
    const { brief } = data.data;
    const sound = get(data, 'data.phonogram.us');
    this.setState({
      brief,
      sound,
      isSucceed: true,
    });
  }
  // 弹框定位
  setPosition = range => {
    // 弹框定位
    const rangeDist = range.getBoundingClientRect();
    const { top, bottom, left, width, height, right } = rangeDist;
    // 考虑边缘情况
    let positionTop = 0;
    let positionLeft = 0;
    let positionBottom = 0;
    let isFrameUp = false;
    const triangleLeft = left + width / 2 - 8;
    if ((left + right) / 2 < 140) {
      positionLeft = 2;
    } else if ((left + right) / 2 > (getBodyWidth() - 140)) {
      positionLeft = getBodyWidth() - 280;
    } else {
      positionLeft = left + width / 2 - 140;
    }
    if (getBodyHeight() - bottom < 140) {
      isFrameUp = true;
      positionBottom = getBodyHeight() - bottom + height / 2 + 18;
      positionTop = top - height / 2 - 18;
    } else {
      positionTop = top + height / 2 + 18;
    }
    this.setState({
      isShow: true,
      positionTop,
      positionLeft,
      isFrameUp,
      triangleLeft,
      positionBottom,
    });
  }
  // 获取选中区域信息
  getTextMessage = () => {
    if (global.document.selection) {
      // 兼容ie
      return {
        text: global.document.selection.createRange().text.toLowerCase(),
        range: global.document.selection.getRangeAt(0),
      };
    } else if (global.window.getSelection()) {
      // Firefox、Safari、Chrome、Opera
      return {
        text: global.window.getSelection().toString().toLowerCase(),
        range: global.window.getSelection().getRangeAt(0),
      };
    }
  }

  // 音标发音
  playSound = () => {
    const { mp3 } = this.state.sound;
    this.setState({
      isPlay: true,
    });
    AudioPlayer.play({
      src: mp3,
      onEnd: () => {
        this.setState({
          isPlay: false,
        });
      },
    });
  }

  // 渲染
  render() {
    const { word, isShow, isPlay, isSucceed,
      brief, sound, positionTop, positionLeft,
      isFrameUp, triangleLeft, positionBottom } = this.state;
    let tipStyles;
    if (isShow && isFrameUp) {
      tipStyles = { bottom: `${positionBottom}px`, left: `${positionLeft}px` };
    } else if (isShow) {
      tipStyles = { top: `${positionTop}px`, left: `${positionLeft}px` };
    }
    return (
      <View>
        <span
          className={css([styles.triangle, isShow && styles.show])}
          style={isShow ? { top: `${isFrameUp ? positionTop + 10 : positionTop - 10}px`, left: `${triangleLeft}px` } : {}}
        />
        <span
          className={css([styles.triangle, styles.triangleMask, isShow && styles.show])}
          style={isShow ? { top: `${isFrameUp ? positionTop + 10 : positionTop - 10}px`, left: `${triangleLeft}px` } : {}}
        />
        <View
          className={[styles.content, isShow && styles.show]}
          style={isShow ? tipStyles : {}}
          id="searchContainer"
        >
          <View className={styles.word}>{word}</View>
          {
            isSucceed &&
            <View className={styles.result}>
              {
                sound && JSON.stringify(sound) !== '{}' &&
                <View className={styles.sound}>
                  <View className={styles.soundMark}>[{ sound.text }]</View>
                  <View className={!isPlay ? styles.soundButton : styles.isPlaying} onClick={this.playSound} />
                </View>
              }
              {
                !sound &&
                <View className={styles.sound}>
                  <View className={styles.soundMark}>[--]</View>
                  <View className={styles.unAvalible} />
                </View>
              }
              {
                brief.length >= 1 &&
                <View className={styles.translate}>
                  {
                    brief.map((item, index) =>
                    (<View key={index} className={styles.translateList}><span>{item.class}</span><span>{item.definition}</span></View>))
                  }
                </View>
              }
              {
                brief.length === 0 &&
                <View className={styles.translate}>
                  暂无释义
                </View>
              }
              {
                JSON.stringify(sound) === '{}' && brief.length >= 1 &&
                <span className={css(styles.noContent)}>
                  未查询到任何结果
                </span>
              }
            </View>
          }
          {
            !isSucceed &&
            <View className={styles.searching}>
              正在努力查询中
              <View className={styles.dot}>
                ...
                <span className={css(styles.dotMask)} />
              </View>
            </View>
          }
          <AudioPlayer ref={audioPlayer => { AudioPlayer.instance = audioPlayer; }} />
        </View>
      </View>
    );
  }
}