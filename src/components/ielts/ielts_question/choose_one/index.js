import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { get } from 'lodash';
import { View, Image } from '@zhike/ti-ui';
import styles from './styles';

// 阅读题目
export default class ChooseOneQuestion extends Component {
  // 参数
  static propTypes = {
    material: PropTypes.object.isRequired,
    answer: PropTypes.any,
    handleAnswer: PropTypes.func,
    handleQuestionSelect: PropTypes.func,
    selectedMaterialId: PropTypes.number,
    subjectId: PropTypes.number,
    isReport: PropTypes.bool,
  };

  // 初始参数
  static defaultProps = {
    answer: [],
    handleAnswer: () => {},
    handleQuestionSelect: () => {},
    selectedMaterialId: 0,
    subjectId: 5,
    isReport: false,
  };

  // 处理答案
  handleAnswer(option) {
    const { id } = this.props.material;
    // 底部按钮同步
    this.props.handleQuestionSelect(id);
    const answer = [option.charCodeAt(0) - 65];
    this.props.handleAnswer(answer, id);
  }

  // 处理小题选中状态
  handleQuestionSelect() {
    const { material, selectedMaterialId } = this.props;
    this.props.handleQuestionSelect(!(material.id === selectedMaterialId) ? material.id : 0);
  }

  // 渲染
  render() {
    const { material, selectedMaterialId, answer, subjectId, isReport } = this.props;
    const { choices, subStem, id } = material;
    const userAnswer = get(material, 'userAnswer.answer.0');
    const correctAnswer = get(material, 'answer');
    const correct = get(material, 'userAnswer.correct');
    if (isReport) {
      return (
        <View className={styles.container}>
          <View
            className={[styles.subStem,
              subjectId === 6 && styles.reading,
            ]}
            onClick={() => {
              if (subjectId === 6) {
                this.handleQuestionSelect();
              }
            }}
            id={id}
          >
            {subStem}
          </View>
          <View>
            {
              (subjectId === 6 ? selectedMaterialId === id : true) &&
              Array.isArray(choices) &&
              choices.map((choice, index) => (
                <View
                  key={choice.option}
                  className={[
                    styles.reportItem,
                    get(correctAnswer, '0') === index && styles.reportItemCorrect,
                    !correct && userAnswer === index && styles.reportItemError,
                  ]}
                >
                  <View className={styles.reportItemOption}>{choice.option}.</View>
                  <View className={styles.reportItemText}>{choice.text}</View>
                  {
                    get(correctAnswer, '0') === index &&
                    correct &&
                    <Image
                      className={styles.reportItemIcon}
                      src={require('../assets/judge_true.png')}
                    />
                  }
                  {
                    !correct &&
                    userAnswer === index &&
                    <Image
                      className={styles.reportItemIcon}
                      src={require('../assets/judge_false.png')}
                    />
                  }
                </View>
              ))
              }
          </View>
        </View>
      );
    }

    return (
      <View className={styles.container}>
        <View
          className={[styles.subStem,
            subjectId === 6 && styles.reading,
          ]}
          onClick={() => {
            if (subjectId === 6) {
              this.handleQuestionSelect();
            }
          }}
          id={id}
        >
          {subStem}
        </View>
        {
          (subjectId === 6 ? selectedMaterialId === id : true) &&
          Array.isArray(choices) &&
          <View>
            {choices.map((choice, index) => (
              <p
                key={`${id}_${choice.option}`}
                className={css(
                  [styles.p, subjectId === 5 ? styles.pForListening : styles.pForReading],
                )}
              >
                <label
                  htmlFor={`${id}_${choice.option}`}
                  className={css(
                    styles.label,
                    styles.radio,
                    get(answer, '0') === index && styles.radioChecked,
                  )}
                >
                  <input
                    id={`${id}_${choice.option}`}
                    className={css(styles.input)}
                    value={index}
                    onChange={() => this.handleAnswer(choice.option)}
                    type="radio"
                    checked={get(answer, '0') === index}
                  />
                  {choice.option}. {choice.text}
                </label>
              </p>
          ))}
          </View>
      }
      </View>
    );
  }
}
