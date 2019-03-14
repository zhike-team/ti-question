import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { DragDropContext } from 'react-dnd';
import { withRouter } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';
import { get, cloneDeep } from 'lodash';
import { View } from '@zhike/ti-ui';
import { Block, Utils } from '@zhike/ti-component';
import Zone from './zone';
import styles from './styles';

const { normalizeArticle, isUndefinedOrNull } = Utils;
// 拖拽题
class Drag extends Component {
  // 参数
  static propTypes = {
    handleAnswer: PropTypes.func.isRequired,
    materials: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    choices: PropTypes.array.isRequired,
    answer: PropTypes.any.isRequired,
    isReport: PropTypes.bool.isRequired,
    isSort: PropTypes.bool,
  }

  // 默认参数
  static defaultProps = {
    isSort: false,
  }

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

  // 拖拽成功
  dropSuccess(zone, choice) {
    const { answer } = this.state;
    const { handleAnswer } = this.props;
    const choiceAnswer = choice.option.charCodeAt() - 65;
    const newAnswer = cloneDeep(answer);

    // 如果原来位置有答案不能覆盖
    if (zone.isAnswer) {
      const materialIndex = zone.index.split('-')[0];
      const zoneIndex = zone.index.split('-')[1];

      if (!isUndefinedOrNull(newAnswer[materialIndex][zoneIndex])) {
        return;
      }
    }

    // 将选项从原有答题区删除
    newAnswer.forEach((materialAnswer, cntMaterialIndex) => {
      Array.isArray(materialAnswer) && materialAnswer.forEach((zoneAnswer, cntZoneIndex) => {
        if (zoneAnswer === choiceAnswer) {
          newAnswer[cntMaterialIndex][cntZoneIndex] = undefined;
        }
      });
    });

    // 设置新的答案
    if (zone.isAnswer) {
      const materialIndex = zone.index.split('-')[0];
      const zoneIndex = zone.index.split('-')[1];
      newAnswer[materialIndex][zoneIndex] = choiceAnswer;
    }

    // 更新
    this.setState({ answer: newAnswer });
    handleAnswer(newAnswer);
  }

  // 查找选项在已选答案中的信息
  findChoiceInAnswer(option) {
    const { answer } = this.state;

    let materialIndex;
    let zoneIndex;
    answer.forEach((materialAnswer, cntMaterialIndex) => {
      Array.isArray(materialAnswer) && materialAnswer.forEach((zoneAnswer, cntZoneIndex) => {
        if (option.charCodeAt() - 65 === zoneAnswer) {
          materialIndex = cntMaterialIndex;
          zoneIndex = cntZoneIndex;
        }
      });
    });

    return {
      materialIndex,
      zoneIndex,
    };
  }

  // 渲染富文本
  renderRichText(data) {
    if (data) {
      const origin = normalizeArticle(data, {}, true);

      return (
        <View className={styles.richTextContainer}>
          {(origin.paragraphs || []).map(
            p => (<Block key={p.id} p={p} hasAction={false} />),
          )}
        </View>
      );
    }
  }

  // 渲染选区
  renderZones(materialIndex, subQuestion, isDragMore) {
    const { answer } = this.state;
    const { choices, isSort } = this.props;
    const stem = get(subQuestion, 'subStem.paragraphs', []).map(item => item.text).join();

    return (
      <View
        key={subQuestion.id}
        className={[
          styles.zones,
          !isDragMore && styles.zonesForOne,
          isSort && styles.zonesForSort,
        ]}
      >
        <View className={styles.zoneText}>{stem}</View>

        <View className={styles.zoneContainer}>
          {subQuestion.answer.map((v, index) => {
            const choice = choices[get(answer, `${materialIndex}.${index}`)];

            return (
              <Zone
                isAnswer
                key={`${materialIndex}-${index}`}
                index={`${materialIndex}-${index}`}
                dropSuccess={(zone, choice) => this.dropSuccess(zone, choice)}
                choice={choice}
              />
            );
          })}
        </View>
      </View>
    );
  }

  // 渲染答案
  renderAnswers() {
    const { choices, materials, isSort } = this.props;
    const isDragMore = materials.length > 1;

    return (
      <View
        className={[
          styles.answers,
          isDragMore && styles.answersDragMore,
          isSort && styles.answersSort,
        ]}
      >
        {
          !isSort &&
          <View className={styles.answersTip}>Answer choice</View>
        }

        <View className={styles.zoneContainer}>
          {(choices || []).map((choice, index) => {
            const { zoneIndex } = this.findChoiceInAnswer(choice.option);

            return (
              <Zone
                key={choice.option}
                dropSuccess={(zone, choice) => this.dropSuccess(zone, choice)}
                choice={choice}
                isSelected={!isUndefinedOrNull(zoneIndex)}
                isDragMore={isSort || isDragMore}
                isOdd={index % 2 === 1}
              />
            );
          })}
        </View>
      </View>
    );
  }

  // 渲染提示语
  renderTips() {
    return (
      <View className={styles.dragTip}>
        <View className={styles.dragTipP}>
          {
            this.props.isSort
              ? 'Drag your answer choices to the spaces where they belong.'
              : 'Drag your answer choices to the spaces where they belong. To remove an answer choice, click on it.'
          }
        </View>

        {
          !this.props.isSort &&
          <View className={styles.dragTipP}>
            To review the passage, click&nbsp;
            <span className={css(styles.dragBold)}>ViewText</span>.
          </View>
        }
      </View>
    );
  }

  // 渲染
  render() {
    const { materials, isSort, isReport, choices } = this.props;
    const isDragMore = materials.length > 1;
    if (isReport) {
      return (
        <View>
          {
            isSort &&
            <View className={styles.dragTip}>
              <View className={styles.dragTipP}>
              Drag your answer choices to the spaces where they belong. To remove an answer choice, click on it.
              </View>
            </View>
          }
          {
            materials[0] && materials[0].subStem &&
            <View className={styles.reportItemSubStems}>
              <View className={styles.reportItemSubStemBox}>
                {materials.map(material => (
                  <View className={styles.reportItemSubStem} key={material.id}>
                    {material.subStem && material.subStem.paragraphs.map(p => p.text).join()}
                  </View>
                ))}
              </View>
            </View>
          }

          {choices.map(choice => (
            <View
              key={choice.option}
              className={styles.reportItem}
            >
              <View className={styles.reportItemOption}>{choice.option}.</View>
              <View className={styles.reportItemText}>{choice.text}</View>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View className={styles.container}>
        {this.renderTips()}

        {
          isSort &&
          <View>
            {this.renderAnswers()}
            {this.renderZones(0, materials[0])}
          </View>
        }

        {
          !isSort && !isDragMore &&
          <View>
            {this.renderZones(0, materials[0], isDragMore)}
            {this.renderAnswers()}
          </View>
        }

        {
          !isSort && isDragMore &&
          <View className={styles.dragMoreContainer}>
            {this.renderAnswers()}
            <View className={styles.dragMoreZones}>
              {
                materials.map(
                  (subQuestion, index) =>
                    this.renderZones(index, subQuestion, isDragMore),
                )
              }
            </View>
          </View>
        }
      </View>
    );
  }
}

export default withRouter(DragDropContext(HTML5Backend)(Drag));
