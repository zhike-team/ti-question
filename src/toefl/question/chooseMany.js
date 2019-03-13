import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';
import { View, Image } from '@zhike/ti-ui';
import { includes, get } from 'lodash';
import styles from './styles';

// 多项选择题
class ChooseMany extends Component {
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
    const { answer } = this.state;
    const cntAnswer = option.charCodeAt() - 65;
    const index = answer.indexOf(cntAnswer);

    if (index === -1) {
      answer.push(cntAnswer);
    } else {
      answer.splice(index, 1);
    }

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
                includes(correctAnswer, index) && styles.reportItemCorrect,
              ]}
            >
              <View className={styles.reportItemOption}>{choice.option}.</View>
              <View className={styles.reportItemText}>{choice.text}</View>
              {
                includes(correctAnswer, index) &&
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
              {choice.text}
            </label>
          </p>
        ))}
      </View>
    );
  }
}

export default withRouter(ChooseMany);
