import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter, get } from 'lodash';
import { View, Image } from '@zhike/ti-ui';
import { Modal } from '@zhike/ti-component';
import Article from '../../article';
import styles from './styles';

export default class Blank extends Component {
  // 参数
  static propTypes = {
    handleAnswer: PropTypes.func,
    handleQuestionSelect: PropTypes.func,
    subjectId: PropTypes.number,
    imageMaterial: PropTypes.object,
    step: PropTypes.object.isRequired,
    materialIds: PropTypes.array,
    newSetRecord: PropTypes.object,
    question: PropTypes.object,
    isReport: PropTypes.bool,
    answerRsult: PropTypes.array,
    selectedMaterialId: PropTypes.number,
  };
  static defaultProps = {
    handleAnswer: () => {},
    handleQuestionSelect: () => {},
    subjectId: 5,
    imageMaterial: {},
    materialIds: [],
    newSetRecord: {},
    question: {},
    isReport: false,
    answerRsult: [],
    selectedMaterialId: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      showScope: false,
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

  // 图片预览
  onImagePreview = src => {
    Modal.show('ModalPreview', {
      src,
      hideHeader: true,
    });
  }

  toggleScope = e => {
    this.setState({
      showScope: e.type === 'mouseenter',
    });
  }

  // 渲染
  render() {
    const { imageMaterial, materialIds, subjectId, question,
      selectedMaterialId, answerRsult, isReport, handleQuestionSelect } = this.props;
    const { showScope } = this.state;
    const { stem, extra } = question;
    const { qNum } = extra;
    if (isReport) {
      return (
        <View className={styles.container}>
          <View className={styles.contentForReading}>
            {
              imageMaterial && imageMaterial.src &&
              <View
                className={styles.imageForReading}
                onClick={() => { this.onImagePreview(imageMaterial.src); }}
                onMouseEnter={this.toggleScope}
                onMouseLeave={this.toggleScope}
              >
                <Image
                  src={imageMaterial.src}
                  className={styles.pic}
                />
                {
                  showScope &&
                  <Image
                    src={require('../assets/scope.png')}
                    className={styles.scope}
                  />
                }
              </View>
            }
            {
              stem &&
              <View className={styles.item} >
                <Article
                  material={stem}
                  handleAnswer={this.handleAnswer}
                  answer={this.initAnswer()}
                  handleQuestionSelect={handleQuestionSelect}
                  qNum={qNum}
                  materialIds={materialIds}
                  isReport={isReport}
                  answerRsult={answerRsult}
                  selectedMaterialId={selectedMaterialId}
                />
              </View>
            }
          </View>
        </View>
      );
    }
    return (
      <View className={styles.container}>
        <View className={
            subjectId === 5 ? styles.contentForListening : styles.contentForReading
          }
        >
          {
            imageMaterial && imageMaterial.src &&
            <View
              className={subjectId === 5 ? styles.imageForListening : styles.imageForReading}
              onClick={() => { this.onImagePreview(imageMaterial.src); }}
              onMouseEnter={this.toggleScope}
              onMouseLeave={this.toggleScope}
            >
              <Image
                src={imageMaterial.src}
                className={styles.pic}
              />
              {
                showScope &&
                <Image
                  src={require('../assets/scope.png')}
                  className={styles.scope}
                />
              }
            </View>
          }
          {
            stem &&
            <View className={styles.item} >
              <Article
                material={stem}
                handleAnswer={this.handleAnswer}
                answer={this.initAnswer()}
                handleQuestionSelect={handleQuestionSelect}
                qNum={qNum}
                materialIds={materialIds}
                isReport={isReport}
                answerRsult={answerRsult}
                selectedMaterialId={selectedMaterialId}
                paragraphClassName={styles.paragraphClass}
              />
            </View>
          }
        </View>
      </View>
    );
  }
}
