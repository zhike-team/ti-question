import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';
import { View, Image } from '@zhike/ti-ui';
import { Article, Header } from '@zhike/ti-component';
import { includes, get } from 'lodash';
import styles from './styles';

// 多项选择题
class ChooseMany extends Component {
  // 参数
  static defaultProps = {
    setStepRecord: () => {},
    step: {},
    stepRecord: {},
    isReport: false,
  };
  static propTypes = {
    setStepRecord: PropTypes.func,
    step: PropTypes.object,
    stepRecord: PropTypes.object,
    isReport: PropTypes.bool,
    question: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      answer: [],
    };
  }

  // 模块加载
  componentDidMount() {
    console.log('ChooseMany:', this.props.stepRecord);
    this.initAnswer(this.props.step.index, this.props.stepRecord.answer || []);
  }

  // 更新
  componentWillReceiveProps(nextProps) {
    if (this.props.step.index !== nextProps.step.index) {
      this.initAnswer(nextProps.step.index, nextProps.stepRecord.answer || []);
    }
  }

  // 初始化答案
  initAnswer(stepId, answer) {
    if (this.props.isReport) return false;

    const { mode } = this.props.params;
    const unavailableButtons = [];
    if (stepId === 1) unavailableButtons.push('back');
    if (mode === 'package' && (!answer || answer.length === 0)) unavailableButtons.push('next');
    if (mode === 'test' && (!answer || answer.length === 0)) unavailableButtons.push('testNext');
    Header.config({
      showButtons: mode === 'test' ? ['testNext', 'testStop'] : ['correct', 'back', 'next'],
      unavailableButtons,
      isShowTime: true,
      onClickNext: () => {
        // this.props.setStepRecord('answer', this.state.answer);
        Header.next();
      },
      onClickBack: () => {
        // this.props.setStepRecord('answer', this.state.answer);
        Header.back();
      },
    });
    this.setState({ answer });
  }

  // 处理答案
  handleAnswer(option) {
    const { answer } = this.state;
    const { mode } = this.props.params;
    const cntAnswer = option.charCodeAt() - 65;
    const index = answer.indexOf(cntAnswer);
    if (index === -1) {
      answer.push(cntAnswer);
    } else {
      answer.splice(index, 1);
    }

    if (mode === 'test' && answer && answer.length > 0) {
      Header.config({
        inherit: true,
        unavailableButtons: [],
      });
    }

    this.setState({ answer });
    this.props.setStepRecord('answer', answer);
  }
  // 处理选项
  handleChoices(text) {
    if (typeof text === 'string') {
      return <View className={styles.reportItemText}>{text}</View>;
    } else if (typeof text === 'object') {
      return (
        <View className={[styles.reportItemText, styles.reportItemRichText]}>
          <Article
            material={text}
            isReport
          />
        </View>);
    }
  }

  // 渲染
  render() {
    const { answer } = this.state;
    const { question, isReport } = this.props;
    const direction = get(question, 'materials.0.direction');
    const stem = get(question, 'stem');
    const choices = get(question, 'materials.0.choices');
    const origin = get(question, 'materials.0.origin');
    const correctAnswer = get(question, 'materials.0.answer');
    const userAnswer = get(question, 'materials.0.userAnswer.answer');
    const correct = get(question, 'materials.0.userAnswer.correct');

    if (isReport) {
      return (
        <View className={styles.text}>
          {
            direction &&
              <Article
                material={direction}
                isReport
              />
          }
          {
            origin &&
              <Article
                material={origin}
                isReport
              />
          }
          {
            stem &&
              <Article
                material={stem}
                isReport
              />
            }
          {
            <View>
              {choices.map((choice, index) => (
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
                  {
                    this.handleChoices(choice.text)
                  }
                  {
                    includes(correctAnswer, index) &&
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
          }
        </View>
      );
    }

    return (
      <View className={styles.container}>
        {
          direction &&
            <Article
              material={direction}
            />
        }
        {
          origin &&
            <Article
              material={origin}
              progressWidth={538}
            />
        }
        {
          stem &&
            <Article
              material={stem}
            />
          }
        <View className={styles.labels}>
          {choices.map((choice, index) => (
            <View
              key={choice.option}
              className={styles.p}
            >
              <label
                htmlFor={choice.option}
                className={css(
                  styles.label,
                  styles.checkbox,
                  includes(answer, index) && styles.checkboxChecked,
                )}
              >
                <input
                  id={choice.option}
                  className={css(styles.input)}
                  value={index}
                  onChange={() => this.handleAnswer(choice.option)}
                  type="checkbox"
                  checked={includes(answer, index)}
                />
                <View className={styles.index} />{choice.option}.
                {
                    this.handleChoices(choice.text)
                }
              </label>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default withRouter(ChooseMany);
