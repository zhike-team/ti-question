import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Input, Image } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { sortBy, capitalize } from 'lodash';
import Audio from '../../audio';
import { firstUpperCase } from '../utils';
import styles from './styles';


export default class Block extends Component {
  // 参数
  static defaultProps = {
    initAnswer: 0,
    // insertSentence: '',
    // hasAction: true,
    handleAnswer: () => {},
    answer: [],
    isReport: false,
    progressWidth: undefined,
  };
  static propTypes = {
    p: PropTypes.object.isRequired,
    initAnswer: PropTypes.number,
    progressWidth: PropTypes.number,
    handleAnswer: PropTypes.func,
    // insertSentence: PropTypes.string,
    // hasAction: PropTypes.bool,
    answer: PropTypes.any,
    isReport: PropTypes.bool,
  };

  // 加载
  componentDidMount() {
  }

  // 更新
  componentDidUpdate() {
  }

  // 渲染行内元素
  renderInline = () => {
    const { p, initAnswer, isReport, answer } = this.props;
    // 处理内部标记
    if (Array.isArray(p.inlineMarkups) && p.inlineMarkups.length) {
      const spans = [];
      let insertLineIndex = 0;
      const inlineMarkups = sortBy(p.inlineMarkups, 'index').map(
        (markup, index) => {
          const answerIndex = markup.type === 'InsertLine' ? insertLineIndex + initAnswer : index;
          if (markup.type === 'InsertLine') insertLineIndex += 1;
          return Object.assign({}, markup, { answerIndex });
        });

      let start = 0;

      while (inlineMarkups.length) {
        const markup = inlineMarkups.shift();
        // 提取当前标记前的文字
        if (markup.index !== start) {
          if (p.text.substring(start, markup.index) !== '') {
            spans.push(p.text.substring(start, markup.index));
          }
          start = markup.index;
        }

        // 处理当前标记部分的文字
        const markupText = p.text.substr(start, markup.length);
        // 判断标记是否为插入标记
        if (markup.type === 'InsertLine') {
          let defaultAnswer = '';
          if (answer && !isReport) {
            defaultAnswer = answer[markup.answerIndex] || '';
          }
          spans.push(
            <span key={start} >
              {markupText}
              <Input
                readOnly={isReport}
                className={styles[`${markup.value}Line`]}
                onChange={e => this.props.handleAnswer(e, markup.answerIndex)}
                value={defaultAnswer}
                placeholder={defaultAnswer}
              />
            </span>,
          );
        } else if (markup.type === 'InsertBlank' || markup.type === 'BlankTable') {
          spans.push(
            <span
              key={start}
              className={css(styles.ieltsBlank)}
            >
              {markupText}
              <input
                readOnly={isReport}
              />
            </span>,
          );
        } else {
          spans.push(
            <span
              key={start}
              className={css(
                markup.type === 'FontSize'
                  ? styles[`inline${markup.type}${capitalize(markup.value)}`]
                  : styles[`inline${markup.type}`],
              )}
            >
              {markupText}
            </span>,
          );
        }

        start += markup.length;
      }
      // 提取最后一个标记后的文字
      if (!inlineMarkups.length) {
        if (p.text.substr(start) !== '') {
          spans.push(p.text.substr(start));
        }
      }
      return <div className={css(styles.block)}>{spans} </div>;
    }
    // 行内样式中如果插入空格，回车的处理情况
    const regex = /^(\s)*$/g;
    if (regex.test(p.text)) {
      // return <div className={css([styles.block])}>{p.text}</div>;
      return false;
    }
    return <div className={css(styles.block)}>{p.text}</div>;
  }

  // 处理段落样式（图片Image && 音频 Audio）
  renderOrigin = () => {
    const { p, progressWidth } = this.props;
    if (Array.isArray(p.markups) && p.markups.length) {
      return p.markups.map((item, index) => {
        const type = firstUpperCase(item.type);
        if (type === 'Audio') {
          return (
            <div key={index} className={css(styles.block)}>
              <Audio src={item.uploadPath} progressWidth={progressWidth} />
            </div>
          );
        } else if (type === 'Image') {
          return (
            <div key={index} className={css(styles.block)}>
              <Image src={item.uploadPath} className={styles.image} />
            </div>
          );
        }
        return false;
      });
    }
  }


  // 渲染
  render() {
    const { p } = this.props;
    return (
      <View className={styles.paragraph}>
        {this.renderInline()}
        { p.markups && p.markups.length > 0 &&
          this.renderOrigin()
        }
      </View>
    );
  }
}

