import React, { Component } from 'react';
import { css } from 'aphrodite';
import { View } from '@zhike/ti-ui';
import { get } from 'lodash';
import axios from 'axios';
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
    };
    this.clickFlag = null;
  }

  async componentDidMount() {
    // 在body元素中,鼠标抬起的时候，那么就可以获取到文字
    const body = global.document.getElementsByTagName('body')[0];
    body.onclick = async () => {
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
      });
      if (this.clickFlag) { // 取消上次延时未执行的方法
        clearTimeout(this.clickFlag);
      }
      this.clickFlag = setTimeout(() => {
        this.searchWord();
      }, 300);
    };
    body.ondblclick = async () => {
      if (this.clickFlag) { // 取消上次延时未执行的方法
        clearTimeout(this.clickFlag);
      }
      this.searchWord();
    };
  }

  searchWord = async () => {
    const { text, range } = this.getTextMessage();
    console.log('range对象信息: ', range);
    const selectWord = text.trim();
    if (!range.collapsed && selectWord.indexOf(' ') === -1) {
      //  查单词的接口
      console.log('查询的单词: ', selectWord);
      const { data } = await axios({
        url: `https://api.smartstudy.com/word/brief/${selectWord}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 20000,
      });
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
        positionLeft = 0;
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
      const { brief } = data.data;
      const sound = get(data, 'data.phonogram.us');
      this.setState({
        word: selectWord,
        brief,
        sound,
        isShow: true,
        positionTop,
        positionLeft,
        isFrameUp,
        triangleLeft,
        positionBottom,
      });
    }
  }
  getTextMessage = () => {
    if (global.document.selection) {
      // 兼容ie
      return {
        text: global.document.selection.createRange().text,
        range: global.document.selection.getRangeAt(0),
      };
    } else {
      // Firefox、Safari、Chrome、Opera
      return {
        text: global.window.getSelection().toString(),
        range: global.window.getSelection().getRangeAt(0),
      };
    }
  }

  // 渲染
  render() {
    const { word, isShow, brief, sound, positionTop, positionLeft, isFrameUp, triangleLeft, positionBottom } = this.state;
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
        >
          <View className={styles.word}>{word}</View>
          {
            sound && JSON.stringify(sound) !== '{}' &&
            <View className={styles.sound}>
              <View className={styles.soundMark}>{ sound.text }</View>
              <View className={styles.soundButton} />
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
            JSON.stringify(sound) === '{}' && brief.length >= 1 &&
            <span className={css(styles.noContent)}>
              未查询到任何结果
            </span>
          }
        </View>
      </View>
    );
  }
}
