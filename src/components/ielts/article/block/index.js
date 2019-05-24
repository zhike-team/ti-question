import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { View, Input, Image } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { sortBy, capitalize, get } from 'lodash';
import { Audio, Utils } from '@zhike/ti-component';
import Zone from '../../ielts_question/drag/zone';
import styles from './styles';

const { firstUpperCase, isUndefinedOrNull } = Utils;

class Block extends PureComponent {
  // 参数
  static propTypes = {
    p: PropTypes.object.isRequired, // 段落
    initAnswer: PropTypes.number,
    progressWidth: PropTypes.number,
    handleAnswer: PropTypes.func,
    handleQuestionSelect: PropTypes.func,
    answer: PropTypes.any,
    isReport: PropTypes.bool,
    qNum: PropTypes.array,
    subjectId: PropTypes.number,
    materialIds: PropTypes.array,
    dropSuccess: PropTypes.func,
    choices: PropTypes.array,
    answerRsult: PropTypes.array,
    paragraphClassName: PropTypes.object,
  };

  static defaultProps = {
    initAnswer: 0,
    handleAnswer: () => {},
    handleQuestionSelect: () => {},
    answer: [],
    isReport: false,
    progressWidth: undefined,
    qNum: ['10'],
    subjectId: 5,
    materialIds: [],
    dropSuccess: () => {},
    choices: [],
    answerRsult: [],
    paragraphClassName: undefined,
  };

  // 渲染行内元素
  renderInline = () => {
    const { p, initAnswer, isReport, answer, qNum, materialIds,
      choices, subjectId, answerRsult } = this.props;
    // 处理内部标记
    if (Array.isArray(p.inlineMarkups) && p.inlineMarkups.length) {
      const spans = [];
      let insertLineIndex = 0;
      const inlineMarkups = sortBy(p.inlineMarkups, 'index').map(
        (markup, index) => {
          const answerIndex = (markup.type === 'InsertLine' || markup.type === 'InsertBlank' || markup.type === 'DragBlank' || markup.type === 'BlankTable') ? insertLineIndex + initAnswer : index;
          if (markup.type === 'InsertLine' || markup.type === 'InsertBlank' || markup.type === 'DragBlank' || markup.type === 'BlankTable') insertLineIndex += 1;
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
          let defaultAnswer = '';
          let className;
          if (answer) {
            defaultAnswer = answer[markup.answerIndex] || '';
          }
          if (isReport) {
            defaultAnswer = answerRsult[markup.answerIndex].userAnswer || '';
            className = answerRsult[markup.answerIndex].isCorrect ? styles.correct : styles.error;
          } else {
            className = styles.insertBlank;
          }

          spans.push(
            <span
              key={start}
              className={css(styles.ieltsBlank)}
            >
              {markupText}
              <input
                readOnly={isReport}
                ref={get(materialIds, `${markup.answerIndex}`) && get(materialIds, `${markup.answerIndex}`).toString()}
                className={css(className)}
                onChange={e => {
                  if (isReport) return false;
                  this.props.handleAnswer(e.target.value, markup.answerIndex,
                    materialIds[markup.answerIndex], false);
                }}
                onBlur={e => {
                  if (isReport) return false;
                  const regex = /^(\s)*$/g;
                  if (regex.test(defaultAnswer) || defaultAnswer === null) {
                    e.target.placeholder =
                    qNum[markup.answerIndex].toString();
                  }
                    this.props.handleAnswer(e.target.value, markup.answerIndex,
                      materialIds[markup.answerIndex]);
                  }
                }
                value={defaultAnswer}
                placeholder={qNum[markup.answerIndex].toString()}
                id={materialIds[markup.answerIndex].toString()}
                onFocus={e => {
                  if (isReport) return false;
                  e.target.placeholder = '';
                  this.props.handleQuestionSelect(materialIds[markup.answerIndex]);
                }}
              />
            </span>,
          );
        } else if (markup.type === 'DragBlank') {
          let choice;
          let isCorrect;
          if (isReport) {
            const { userAnswer } = answerRsult[markup.answerIndex];
            isCorrect = get(answerRsult, `${[markup.answerIndex]}.isCorrect`);
            if (userAnswer !== null) {
              choice = choices[userAnswer] || {};
            } else {
              choice = {};
            }
          } else {
            choice = isUndefinedOrNull(answer[markup.answerIndex]) ? {} :
              choices[answer[markup.answerIndex]];
          }
          spans.push(
            <span
              key={start}
              className={css(styles.ieltsBlank)}
            >
              {markupText}
              <Zone
                placeholder={qNum[markup.answerIndex].toString()}
                id={materialIds[markup.answerIndex].toString()}
                choice={choice}
                subjectId={subjectId}
                isCorrect={isCorrect}
                isReport={isReport}
                zoneIndex={markup.answerIndex}
                choiceIndex={answer[markup.answerIndex]}
                choices={choices}
                isAnswer={!isUndefinedOrNull(answer[markup.answerIndex])}
                dropSuccess={this.props.dropSuccess}
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
      return <div className={css(styles.block)}>{spans}</div>;
    }
    // 行内样式中如果插入空格，回车的处理情况
    const regex = /^(\s)*$/g;
    if (regex.test(p.text)) {
      return false;
    }
    return <div className={css(styles.block)}>{p.text}</div>;
  }

  // 处理段落样式（图片Image && 音频 Audio）
  renderOrigin = () => {
    const { p } = this.props;
    if (Array.isArray(p.markups) && p.markups.length) {
      return p.markups.map((item, index) => {
        const type = firstUpperCase(item.type);
        if (type === 'Audio') {
          return (
            <div key={index} className={css(styles.block)}>
              <Audio src={item.uploadPath} />
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
    const { p, paragraphClassName } = this.props;
    const props = {
      className: css([
        p.markups.map(markup => {
          if (markup.type === 'Align') {
            return styles[`block${markup.type}${capitalize(markup.value)}`];
          }
          return styles[`block${markup.type}`];
        }),
      ]),
    };
    return (
      <View className={[styles.paragraph, paragraphClassName]} >
        <div {...props}>
          {this.renderInline()}
          { p.markups && p.markups.length > 0 &&
            this.renderOrigin()
          }
        </div>
      </View>
    );
  }
}

export default withRouter(Block);
