import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Article, Header } from '@zhike/ti-component';
import styles from './styles';

export default class Blank extends Component {
  // 参数
  static defaultProps = {
    setStepRecord: () => {},
    step: {},
    stepRecord: {},
    isReport: false,
    correctAnswer: [],
  };
  static propTypes = {
    setStepRecord: PropTypes.func,
    stepRecord: PropTypes.object,
    step: PropTypes.object,
    isReport: PropTypes.bool,
    question: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    correctAnswer: PropTypes.array,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.stepRecord.answer || [],
    };
    this.intervalTimer = null;
  }

  // 模块加载
  componentDidMount() {
    console.log('Blank:', this.props.stepRecord);
    this.initAnswer(this.props.step.index, this.props.stepRecord.answer || []);
    // 获取焦点
    const { mode } = this.props.params;
    if (mode === 'test') {
      const input = global.document.getElementsByTagName('input')[0];
      input.focus();
    }
  }

  // 更新
  componentWillReceiveProps(nextProps) {
    if (this.props.step.index !== nextProps.step.index) {
      this.initAnswer(nextProps.step.index, nextProps.stepRecord.answer || []);
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.step.index !== nextProps.step.index) {
      // 获取焦点
      const { mode } = nextProps.params;
      if (mode === 'test') {
        const input = global.document.getElementsByTagName('input')[0];
        input.focus();
      }
    }
  }

  // 模块卸载
  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  // 初始化答案
  initAnswer(stepId, answer) {
    const { mode } = this.props.params;
    const unavailableButtons = [];
    if (stepId === 1) unavailableButtons.push('back');
    if (mode === 'test' && (!answer || answer.length === 0)) unavailableButtons.push('testNext');
    if (mode === 'package' && (!answer || answer.length === 0)) unavailableButtons.push('next');
    Header.config({
      showButtons: mode === 'test' ? ['testNext', 'testStop'] : ['correct', 'back', 'next'],
      unavailableButtons,
      isShowTime: true,
      onClickNext: () => {
        // this.saveAnswer(true);
        Header.next();
      },
      onClickBack: () => {
        // this.saveAnswer(true);
        Header.back();
      },
    });
    this.setState({ answer });
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }
    this.intervalTimer = setInterval(() => this.saveAnswer(), 5000);
  }

  // 保存答案
  saveAnswer(isLast = false) {
    const { answer } = this.state;
    if (Array.isArray(answer) && answer.length > 0) {
      // 把填空2边的空格去掉
      if (isLast) {
        for (let i = 0; i < answer.length; i += 1) {
          if (answer[i]) {
            answer[i] = answer[i].replace(/(^\s*)|(\s*$)/g, '');
          }
        }
      }
      this.props.setStepRecord('answer', answer);
    }
  }

  // 处理答案
  handleAnswer = (e, answerIndex) => {
    const { answer } = this.state;
    const { mode } = this.props.params;
    answer[answerIndex] = e.target.value;
    if (mode === 'test' && answer && answer.length > 0) {
      Header.config({
        inherit: true,
        unavailableButtons: [],
      });
    }
    this.setState({ answer });
  }
  // 渲染
  render() {
    const { answer } = this.state;
    const { question, isReport, correctAnswer } = this.props;
    const direction = get(question, 'materials.0.direction');
    const stem = get(question, 'stem');
    const origin = get(question, 'materials.0.origin');
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
                answer={correctAnswer}
              />
          }
        </View>
      );
    }

    return (
      <View className={styles.container}>
        {
          direction && <Article material={direction} />
        }
        {
          origin && <Article material={origin} progressWidth={538} />
        }
        {
          stem && <Article material={stem} handleAnswer={this.handleAnswer} answer={answer} />
        }
      </View>
    );
  }
}
