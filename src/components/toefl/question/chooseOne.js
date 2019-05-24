import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';
import { get } from 'lodash';
import { View, Image } from '@zhike/ti-ui';
import styles from './styles';

/**
 * 托福题库的单项选择题
 */
class ChooseOne extends Component {
  // 参数
  static propTypes = {
    handleAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    answer: PropTypes.any.isRequired,
    isReport: PropTypes.bool.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.answer || [],
    };
  }

  // 更新
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ answer: this.props.answer || [] });
    }
  }

  // 处理答案
  handleAnswer(option) {
    const answer = [option.charCodeAt() - 65];
    this.setState({ answer });
    this.props.handleAnswer(answer);
  }

  // 渲染
  render() {
    const { answer } = this.state;
    const { question, isReport } = this.props;
    const choices = get(question, 'materials.0.choices');
    const correctAnswer = get(question, 'materials.0.answer');

    if (isReport) {
      return (
        <View>
          {choices.map((choice, index) => (
            <View
              key={choice.option}
              className={[
                styles.reportItem,
                get(correctAnswer, '0') === index && styles.reportItemCorrect,
              ]}
            >
              <View className={styles.reportItemOption}>{choice.option}.</View>
              <View className={styles.reportItemText}>{choice.text}</View>
              {
                get(correctAnswer, '0') === index &&
                <Image
                  className={styles.reportItemIcon}
                  src={require('./images/correct.png')}
                />
              }
            </View>
          ))}
        </View>
      );
    }

    return (
      <View>
        {choices.map((choice, index) => (
          <p
            key={choice.option}
            className={css(styles.p)}
          >
            <label
              htmlFor={choice.option}
              className={css(
                styles.label,
                styles.radio,
                get(answer, '0') === index && styles.radioChecked,
              )}
            >
              <input
                id={choice.option}
                className={css(styles.input)}
                value={index}
                onChange={() => this.handleAnswer(choice.option)}
                type="radio"
                checked={get(answer, '0') === index}
              />

              {choice.text}
            </label>
          </p>
        ))}
      </View>
    );
  }
}

export default withRouter(ChooseOne);
