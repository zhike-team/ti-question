import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter, get } from 'lodash';
import { View } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import Article from '../../article';

import styles from './styles';


export default class liseningBlankTable extends Component {
  // 参数
  static propTypes = {
    extra: PropTypes.object.isRequired,
    handleAnswer: PropTypes.func,
    handleQuestionSelect: PropTypes.func,
    materialIds: PropTypes.array,
    step: PropTypes.object.isRequired,
    newSetRecord: PropTypes.object,
    question: PropTypes.object,
    isReport: PropTypes.bool,
    answerRsult: PropTypes.array,
    selectedMaterialId: PropTypes.number,
  };
  static defaultProps = {
    handleAnswer: () => {},
    handleQuestionSelect: () => {},
    newSetRecord: {},
    question: {},
    materialIds: [],
    isReport: false,
    answerRsult: [],
    selectedMaterialId: 0,
  };
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // 处理答案
  initAnswer = () => {
    const { question, newSetRecord, step } = this.props;
    const { materials } = question;
    const { questionMaterialIds } = step;
    const answer = [];
    Array.isArray(materials) && materials.forEach(material => {
      const materialAnswer = newSetRecord[material.id] && newSetRecord[material.id].answer || [];
      const materialAnswerIndexs = get(filter(questionMaterialIds, { questionMaterialId: material.id }), '0.answerIndexs') || [];
      Array.isArray(materialAnswerIndexs) && materialAnswerIndexs.forEach((answerIndex, index) => {
        answer[answerIndex] = materialAnswer[index];
      });
    });
    return answer;
  }

  // 处理答案
  handleAnswer = (value, answerIndex, materialId, isPost = true) => {
    const { newSetRecord, step } = this.props;
    const materialAnswer = newSetRecord[materialId] && newSetRecord[materialId].answer || [];
    const materialAnswerIndexs = get(filter(step.questionMaterialIds, { questionMaterialId: materialId }), '0.answerIndexs') || [];
    let newValue = value;
    if (isPost && value) {
      newValue = value.replace(/(^\s*)|(\s*$)/g, '');
    }
    if (materialAnswerIndexs.indexOf(answerIndex) !== -1) {
      materialAnswer[materialAnswerIndexs.indexOf(answerIndex)] = newValue;
      this.props.handleAnswer(materialAnswer, materialId, isPost);
    }
  }
  // 渲染
  render() {
    const { extra, materialIds, handleQuestionSelect,
      isReport, answerRsult, selectedMaterialId } = this.props;
    const { tableBlank, qNum } = extra;
    let initAnswer = 0;
    return (
      <View className={styles.container}>
        <table className={css(styles.table)}>
          {
            Array.isArray(tableBlank) &&
            <tbody className={css(styles.tbody)}>
              {
                Array.isArray(tableBlank) && tableBlank.map((line, index) => (
                  <tr
                    key={index}
                    className={css(styles.tr)}
                  >
                    {
                      Array.isArray(line) && line.map((row, index1) => {
                        let count = 0;
                        if (row.content.inlineMarkup && Array.isArray(row.content.inlineMarkup)) {
                          count = row.content.inlineMarkup.filter(item =>
                            item.type === 'BlankTable').length;
                        }
                        initAnswer += count;
                        return (
                          <th className={css(styles.tableCell)} key={index1}>
                            <Article
                              material={row.content}
                              handleAnswer={this.handleAnswer}
                              saveAnswer={this.saveAnswer}
                              handleQuestionSelect={handleQuestionSelect}
                              answer={this.initAnswer()}
                              qNum={qNum}
                              externalInitAnswer={initAnswer - count}
                              materialIds={materialIds}
                              isReport={isReport}
                              answerRsult={answerRsult}
                              selectedMaterialId={selectedMaterialId}
                              paragraphClassName={styles.paragraphClass}
                            />
                          </th>
                        );
                      })
                    }
                  </tr>
                ))
              }
            </tbody>
          }
        </table>
      </View>
    );
  }
}
