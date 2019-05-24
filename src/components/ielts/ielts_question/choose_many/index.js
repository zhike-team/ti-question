import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { View, Image } from '@zhike/ti-ui';
import { includes, get } from 'lodash';
import styles from './styles';

// 多项选择题
export default class ChooseMany extends Component {
  // 参数
  static propTypes = {
    material: PropTypes.object.isRequired,
    answer: PropTypes.array,
    handleAnswer: PropTypes.func,
    handleQuestionSelect: PropTypes.func,
    selectedMaterialId: PropTypes.number,
    subjectId: PropTypes.number,
    isReport: PropTypes.bool,
  };
  static defaultProps = {
    answer: [],
    handleAnswer: () => {},
    handleQuestionSelect: () => {},
    selectedMaterialId: 0,
    subjectId: 5,
    isReport: false,
  };
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      // 是否完成作答
      isCompeleted: props.material.answer.length === props.answer.length,
    };
  }

  // 处理答案
  handleAnswer(option) {
    const { answer, material } = this.props;
    const correctAnswer = get(material, 'answer');
    const cntAnswer = option.charCodeAt() - 65;
    const index = answer.indexOf(cntAnswer);
    if (index === -1 && answer.length < correctAnswer.length) {
      answer.push(cntAnswer);
    } else if (index !== -1) {
      answer.splice(index, 1);
    }
    this.props.handleAnswer(answer, material.id);
    // 底部按钮同步
    this.props.handleQuestionSelect(material.id);
    this.setState({ isCompeleted: answer.length >= correctAnswer.length });
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
    const { isCompeleted } = this.state;
    const correctAnswer = get(material, 'answer');
    const userAnswer = get(material, 'userAnswer.answer');
    const correct = get(material, 'muserAnswer.correct');
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
          <View className={styles.labels}>
            {
              (subjectId === 6 ? selectedMaterialId === id : true) &&
              Array.isArray(choices) &&
              choices.map((choice, index) => (
                <View
                  key={choice.option}
                  className={[
                    styles.reportItem,
                    includes(correctAnswer, index) && styles.reportItemCorrect,
                    !correct && !includes(correctAnswer, index) && includes(userAnswer, index)
                    && styles.reportItemError,
                  ]}
                >
                  <View className={styles.reportItemOption}>{choice.option}.</View>
                  <View className={styles.reportItemText}>{choice.text}</View>
                  {
                    includes(correctAnswer, index) &&
                    includes(userAnswer, index) &&
                    <Image
                      className={styles.reportItemIcon}
                      src={require('../assets/judge_true.png')}
                    />
                  }
                  {
                    !correct &&
                    !includes(correctAnswer, index) &&
                    includes(userAnswer, index) &&
                    <Image
                      className={styles.reportItemIcon}
                      src={require('../assets/judge_false.png')}
                    />
                  }
                </View>
              ))}
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
        <View className={styles.labels}>
          {
            (subjectId === 6 ? selectedMaterialId === id : true) &&
            Array.isArray(choices) &&
            choices.map((choice, index) => (
              <View
                key={`${id}_${choice.option}`}
                className={[styles.p, subjectId === 5 ? styles.pForListening : styles.pForReading]}
              >
                <label
                  htmlFor={`${id}_${choice.option}`}
                  className={css(
                    styles.label,
                    styles.checkbox,
                    !isCompeleted && styles.checkboxHover,
                    includes(answer, index) && styles.checkboxChecked,
                    isCompeleted && !includes(answer, index) && styles.isCompeleted,
                  )}
                >
                  <input
                    id={`${id}_${choice.option}`}
                    className={css(styles.input)}
                    value={index}
                    onChange={() => this.handleAnswer(choice.option)}
                    type="checkbox"
                    checked={includes(answer, index)}
                  />
                  <View /> {choice.option}.{choice.text}
                </label>
              </View>
          ))}
        </View>
      </View>
    );
  }
}
