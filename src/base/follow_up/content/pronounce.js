/*
 * 跟读的错误单词及正确发音组件，考虑到在跟读题的报告页也会调用，所以单独抽离出来
 * 只是抽离组件而已，样式和图片素材依旧和跟读揉在一起，懒得新建一个文件夹了，需求改了再说
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from '@zhike/ti-ui';
import styles from './styles';

export default class Pronounce extends Component {
  static defaultProps = {
    answer: null,
    disabled: false,
    dashedHeader: false,
  };

  static propTypes = {
    answer: PropTypes.object,
    disabled: PropTypes.bool,
    dashedHeader: PropTypes.bool, // 报告页的样式有一点小区别，设为true
  };

  constructor(props) {
    super(props)
    this.PronouncePlayer = null
    this.state = {
      playing: false,
    }
  }

  // 播放正确发音，没有暂停功能
  playPronounce = src => {
    if (this.PronouncePlayer && this.PronouncePlayer.currentSrc === src) {
      this.PronouncePlayer.currentTime = 0
      this.PronouncePlayer.play()
    } else {
      this.PronouncePlayer = new global.window.Audio(src)

      this.PronouncePlayer.onloadedmetadata = () => {
        this.PronouncePlayer.play()
      }
      this.PronouncePlayer.onplay = () => {
        this.setState({ playing: true })
      }
      this.PronouncePlayer.onpause = () => {
        this.setState({ playing: false })
      }
      this.PronouncePlayer.onended = () => {
        this.setState({ playing: false })
      }
    }
  }

  render() {
    const { answer, disabled, dashedHeader } = this.props
    const { playing } = this.state
    const wrongWords = (answer && answer.machinePigaiResult)
      ? answer.machinePigaiResult.words.length > 0
        ? answer.machinePigaiResult.words.filter(item => (
          item.word_score < 60
        ))
        : 'emptyAnswer' // 没有声音的空答案
      : 'noAnswer' // 未作答

    return typeof wrongWords === 'string'
      ? (
        wrongWords === 'emptyAnswer' && !dashedHeader &&
        <View className={styles.emptyAnswer}>系统未检测到有效音频，请重新录音</View>
      )
      : (
        wrongWords.length > 0 &&
        <View className={styles.pronounce}>
          <View className={[styles.tr, dashedHeader && styles.dashed]}>
            <View className={[styles.td, styles.th, dashedHeader && styles.whiteBg]}>单词</View>
            <View className={[styles.td, styles.th, dashedHeader && styles.whiteBg]}>音标 (美)</View>
            <View className={[styles.td, styles.th, dashedHeader && styles.whiteBg]}>正确发音</View>
          </View>
          {
            wrongWords.map((item, index) => (
              <View key={index} className={[styles.tr, styles.dashed]}>
                <View className={[styles.td, styles.word]}>{item.word}</View>
                <View className={[styles.td, item.text ? styles.text : styles.noText]}>
                  {`[${item.text || ' - - '}]`}
                </View>
                <View className={[styles.td, styles.pronounceTd]}>
                  <Image
                    width={80}
                    onClick={() => item.mp3 && !disabled && this.playPronounce(item.mp3)}
                    style={{ cursor: item.mp3 && !disabled ? 'pointer' : 'not-allowed' }}
                    src={require(!item.mp3
                      ? './assets/no_pronounce.png'
                      : playing &&
                        this.PronouncePlayer &&
                        this.PronouncePlayer.currentSrc === item.mp3
                        ? './assets/pronounce.gif'
                        : './assets/pronounce.png')
                    }
                  />
                </View>
              </View>
            ))
          }
        </View>
      )
  }
}
