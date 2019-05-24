import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Scrollbar } from '@zhike/ti-ui';
import { Header } from '@zhike/ti-component';
import Article from '../article';
import Question from '../ielts_question';
import styles from './styles';

/**
 * 雅思题库的阅读题
 */
export default class IeltsReading extends Component {
  // 参数
  static propTypes = {
    step: PropTypes.object.isRequired,
    newSetStepRecord: PropTypes.func.isRequired,
    newSetRecord: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  // 初始参数
  static defaultProps = {
  };

  // 模块加载
  componentDidMount() {
    this.setHeader(this.props);
  }

  // 模块接受参数
  componentWillReceiveProps(nextProps) {
    this.setHeader(nextProps);
  }

  // 设置头部
  setHeader() {
    const showButtons = ['correct', 'submit'];
    const unavailableButtons = [];

    Header.config({
      showButtons,
      unavailableButtons,
      isShowTime: true,
    });
  }

  // 渲染
  render() {
    const { step, newSetRecord, newSetStepRecord, params } = this.props;
    let questions = [];
    if (params.mode === 'package') {
      questions.push(step.question);
    } else {
      questions = step.practice.questions; // eslint-disable-line
    }
    const { material } = step.practice || {};
    const renderProps = {
      newSetStepRecord,
      newSetRecord,
      step,
      params,
    };
    return (
      <View className={styles.container}>
        <View className={styles.articleWrapper}>
          <View className={styles.article}>
            <Scrollbar
              className={styles.articleContent}
            >
              <View className={styles.articleTitle}>{material && material.title}</View>
              {
                material && <Article material={step.practice.material.origin} />
              }
            </Scrollbar>
          </View>
        </View>
        <View className={styles.questionWrapper}>
          <View className={styles.questions}>
            <Scrollbar>
              {
                Array.isArray(questions) &&
                questions.map((item, index) => (
                  <View key={index} className={styles.question}>
                    <Question question={item} questionIndex={index} {...renderProps} />
                  </View>))
              }
            </Scrollbar>
          </View>
        </View>
      </View>
    );
  }
}
