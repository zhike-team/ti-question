import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { filter, get } from 'lodash';
import { View, Image } from '@zhike/ti-ui';
import { Modal } from '@zhike/ti-component';
import { css } from 'aphrodite';
import Article from '../../article';
import Choice from './choice';

import styles from './styles';

class Drag extends Component {
  // 参数
  static propTypes = {
    extra: PropTypes.object.isRequired,
    stem: PropTypes.object.isRequired,
    handleAnswer: PropTypes.func,
    handleQuestionSelect: PropTypes.func,
    subjectId: PropTypes.number,
    imageMaterial: PropTypes.object,
    newSetRecord: PropTypes.object,
    question: PropTypes.object,
    step: PropTypes.object.isRequired,
    materialIds: PropTypes.array,
    isReport: PropTypes.bool,
    answerRsult: PropTypes.array,
  }
  // 默认参数
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
  }

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      showScope: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.newSetRecord !== nextProps.newSetRecord ||
      this.state.showScope !== nextState.showScope) {
      return true;
    }
    return false;
  }

  // 初始化答案
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
  handleAnswer = (value, answerIndex, materialId) => {
    const { newSetRecord, step } = this.props;
    const materialAnswer = newSetRecord[materialId] && newSetRecord[materialId].answer || [];
    const materialAnswerIndexs = get(filter(step.questionMaterialIds, { questionMaterialId: materialId }), '0.answerIndexs') || [];
    if (materialAnswerIndexs.indexOf(answerIndex) !== -1) {
      materialAnswer[materialAnswerIndexs.indexOf(answerIndex)] = value;
      this.props.handleAnswer(materialAnswer, materialId);
    }
  }

  // choiceIndex 拖动的选项的索引
  // targetIndex 拖动目的地的索引
  // zoneIndex 如果是在答题区拖动选项 所在答题区位置
  // isLeave 清除选项
  dropSuccess = (choiceIndex, targetIndex, zoneIndex, isLeave = false) => {
    const { materialIds } = this.props;
    if (!isLeave) {
      // 设置步骤记录 保存答案
      this.handleAnswer(choiceIndex, targetIndex, materialIds[targetIndex]);
    }
    // 更新
    this.handleAnswer(null, zoneIndex, materialIds[zoneIndex]);
    // 同步当前题目
    this.props.handleQuestionSelect(materialIds[targetIndex]);
  }

  // 渲染选项
  renderChoice(choices) {
    const { subjectId, isReport, imageMaterial } = this.props;
    return choices.map((item, index) => (
      <div
        className={css([
          styles.sourceContainer,
          isReport && styles.sourceForReport,
          !isReport &&
          subjectId === 5 ?
          ((imageMaterial && imageMaterial.src) ? styles.sourceForImage : styles.sourceForNoImage)
          : styles.sourceForReading,
        ])}
        key={index}
      >
        <Choice
          colorRandom={Math.floor(Math.random() * 10)}
          dropSuccess={this.dropSuccess}
          choiceIndex={index}
          choice={item}
          isReport={isReport}
          subjectId={subjectId}
        />
      </div>
    ));
  }

  // 渲染选区
  renderZones() {
    const { extra, stem, subjectId,
      isReport, materialIds, answerRsult } = this.props;
    const { choices, qNum } = extra;
    return (
      <div
        style={{ width: '100%', lineHeight: '40px' }}
      >
        <Article
          isReport={isReport}
          material={stem}
          qNum={qNum}
          dropSuccess={(choiceIndex, targetIndex, zoneIndex, isLeave) =>
    this.dropSuccess(choiceIndex, targetIndex, zoneIndex, isLeave)}
          choices={choices}
          answer={this.initAnswer()}
          materialIds={materialIds}
          subjectId={subjectId}
          answerRsult={answerRsult}
        />
      </div>
    );
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

  render() {
    const { extra, imageMaterial, subjectId, isReport } = this.props;
    const { showScope } = this.state;
    const { choices } = extra;

    if (isReport) {
      return (
        <View className={styles.container}>
          {
            imageMaterial && imageMaterial.src &&
            <View
              className={styles.imgForDrag}
              onClick={() => { this.onImagePreview(imageMaterial.src); }}
              onMouseEnter={this.toggleScope}
              onMouseLeave={this.toggleScope}
            >
              <Image
                src={imageMaterial.src}
                className={styles.picReport}
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
            this.renderChoice(choices)
          }
          <View className={styles.rightForListening}>
            {
            this.renderZones()
            }
          </View>
        </View>);
    }
    return (
      <View className={
          subjectId === 5 ? styles.dragContainer : styles.contentForReading
        }
      >
        {
          imageMaterial && imageMaterial.src &&
          <View
            className={styles.imgForDrag}
            onClick={() => { this.onImagePreview(imageMaterial.src); }}
            onMouseEnter={this.toggleScope}
            onMouseLeave={this.toggleScope}
          >
            <Image
              src={imageMaterial.src}
              className={subjectId === 5 ? styles.pic : styles.picForReading}
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
          subjectId === 5 &&
          <View
            className={
              (imageMaterial && imageMaterial.src) ? styles.contentForImage : styles.contentNoImage}
          >
            <View className={!(imageMaterial && imageMaterial.src) && styles.leftForImage}>
              {
                (imageMaterial && imageMaterial.src) ? this.renderChoice(choices) : this.renderZones()
              }
            </View>
            <View className={imageMaterial && imageMaterial.src && styles.rightForListening}>
              {
                !(imageMaterial && imageMaterial.src) ? this.renderChoice(choices) : this.renderZones()
              }
            </View>
          </View>
        }
        {
          subjectId === 6 &&
          <View>
            <View className={styles.leftForReading}>
              {
                this.renderChoice(choices)
              }
            </View>
            <View className={styles.right}>
              {
                this.renderZones()
              }
            </View>
          </View>
        }
      </View>
    );
  }
}

export default DragDropContext(HTML5Backend)(Drag);
