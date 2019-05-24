import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { get, cloneDeep } from 'lodash';
import { View } from '@zhike/ti-ui';

import styles from './styles';

/**
 * 托福题库的表格题
 */
class Table extends Component {
  // 参数
  static propTypes = {
    handleAnswer: PropTypes.func.isRequired,
    materials: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    choices: PropTypes.array.isRequired,
    answer: PropTypes.any.isRequired,
    isReport: PropTypes.bool.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.answer || this.props.materials.map(() => []),
    };
  }

  // 更新
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        answer: this.props.answer || this.props.materials.map(() => []),
      });
    }
  }

  // 选择答案
  choseAnswer(materialIndex, index) {
    const { answer } = this.state;
    const { handleAnswer, isReport } = this.props;
    const newAnswer = cloneDeep(answer);

    if (isReport) {
      return;
    }

    // 设置答案
    newAnswer[materialIndex] = [index];

    this.setState({ answer: newAnswer });
    handleAnswer(newAnswer);
  }

  // 渲染提示语
  renderTips() {
    return (
      <View className={styles.tip}>
        <View className={styles.tipP}>
          Click in the correct box for each phrase.
        </View>
      </View>
    );
  }

  // 渲染表格
  renderTable() {
    const { answer } = this.state;
    const { materials, choices, isReport } = this.props;

    return (
      <View className={styles.table}>
        <View className={[styles.row, styles.rowHeader]}>
          <View className={styles.cell} />

          {choices.map((choice, index) => (
            <View key={index} className={styles.cell}>
              {get(choice, 'text')}
            </View>
          ))}
        </View>

        {materials.map((material, materialIndex) => (
          <View key={materialIndex} className={styles.row}>
            <View className={styles.cell}>
              {get(material, 'subStem.paragraphs.0.text')}
            </View>

            {choices.map((choice, index) => (
              <View
                role="button"
                tabIndex={choice.id}
                key={index}
                className={[
                  styles.cell,
                  !isReport && get(answer, `${materialIndex}.0`) === index && styles.cellChosen,
                  isReport && get(material, 'answer.0') === index && styles.cellChosen,
                ]}
                onClick={() => this.choseAnswer(materialIndex, index)}
              />
            ))}
          </View>
        ))}
      </View>
    );
  }

  // 渲染
  render() {
    return (
      <View>
        {this.renderTips()}
        {this.renderTable()}
      </View>
    );
  }
}

export default withRouter(Table);
