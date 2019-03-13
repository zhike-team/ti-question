/*
 * 跟读的原文句子和得分小旗子组件，考虑到在跟读题的报告页也会调用，所以单独抽离出来
 * 只是抽离组件而已，样式和图片素材依旧和跟读揉在一起，懒得新建一个文件夹了，需求改了再说
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from '@zhike/ti-ui';
import styles from './styles';

export default class RawAndFlag extends Component {
  static defaultProps = {
    answer: null,
    hideRaw: false,
  };

  static propTypes = {
    raw: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    answer: PropTypes.object,
    hideRaw: PropTypes.bool,
  };

  /**
   * 根据发音准确度处理文本，使之五彩斑斓
   * 这个方法在处理数字、‘-’等符号时并没有太好的办法，因为返回结果不一致且无规律
   * 比如数字30，批改结果会返回thirty，我没法在句子里面找到这个单词，就会忽略
   * 而万一后面真的有一个单词：thirty，场面就控制不住了[捂脸]
   */
  parseRaw = () => {
    const { raw, answer, active } = this.props
    const parsedRaw = []

    if (active && answer && answer.machinePigaiResult) {
      let cut = ''
      let originWord = ''
      let originRaw = raw
      let remain = originRaw.toLowerCase()

      if (answer.machinePigaiResult.words.length) {
        for (const item of answer.machinePigaiResult.words) {
          const { word, word_score: score } = item
          const wordIndex = remain.indexOf(word)

          if (wordIndex !== -1) {
            cut = originRaw.substring(0, wordIndex)
            originWord = originRaw.substr(wordIndex, word.length)
            originRaw = originRaw.substring(wordIndex + word.length, undefined)
            remain = remain.substring(wordIndex + word.length, undefined)

            cut && parsedRaw.push({
              text: cut,
              color: parsedRaw.length ? parsedRaw[parsedRaw.length - 1].color : '#32363A',
            })

            originWord && parsedRaw.push({
              text: originWord,
              color: score >= 90 ? '#49CF51' : score >= 60 ? '#32363A' : '#FD5454',
            })
          }
        }

        originRaw && parsedRaw.push({
          text: originRaw,
          color: parsedRaw.length ? parsedRaw[parsedRaw.length - 1].color : '#32363A',
        })
      } else { // 空录音，全标红
        parsedRaw.push({ text: raw, color: '#FD5454' })
      }
    } else {
      parsedRaw.push({ text: raw, color: '#32363A' })
    }

    return (
      <span>
        {
          parsedRaw.map((item, index) => (
            <span key={index} style={{ color: item.color }}>{item.text}</span>
          ))
        }
      </span>
    )
  }

  /**
   * 隐藏原文的时候显示方块
   * 目前来看，宽度是死的，所以可以通过宽度计算每一行的单词数，转换成行数相等的方块
   * 这样做的目的是实现UI设计的，每行间要有间距的样式
   */
  parseBlock = () => {
    const { raw } = this.props
    const lettersPerRow = 64 // 经过计算，每行大概显示64个字母，直接写死吧，不准也没关系的
    const full = Math.floor(raw.length / lettersPerRow)
    const left = raw.length % lettersPerRow / lettersPerRow * 100

    return (
      <React.Fragment>
        {
          new Array(full).fill('').map(() => (
            <View key={Math.random()} className={styles.rawBlock} style={{ width: '100%' }} />
          ))
        }
        {
          !(full > 0 && left < 5) && // 小于5%就不要显示了，很丑，除非整个句子只有这么点长
          <View className={styles.rawBlock} style={{ width: `${left}%` }} />
        }
      </React.Fragment>
    )
  }

  // 根据批改分数生成彩色小旗帜
  parseScore = () => {
    const { answer } = this.props

    if (answer && answer.machinePigaiResult) {
      const score = answer.machinePigaiResult.sentence
      const flagColor = score >= 90 ? 'green' : score >= 60 ? 'yellow' : 'red'
      const scoreStr = score >= 10 ? score.toFixed(0) : `0${score.toFixed(0)}`

      return (
        <React.Fragment>
          <Image className={styles.flag} src={require(`./assets/flag_${flagColor}.png`)} />
          <Image className={styles.number} width={12} src={require(`./assets/numbers/${scoreStr[0]}.png`)} />
          <Image className={styles.number} width={12} src={require(`./assets/numbers/${scoreStr[1]}.png`)} />
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  render() {
    const { active, hideRaw } = this.props

    return (
      <View className={styles.header}>
        <View className={[styles.raw, !(active || hideRaw) && styles.grey]}>
          {hideRaw ? this.parseBlock() : this.parseRaw()}
        </View>

        <View className={[styles.score, !active && styles.grey]}>
          {this.parseScore()}
        </View>
      </View>
    )
  }
}
