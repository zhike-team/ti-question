import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from '@zhike/ti-ui';
import { handleIeltsAnswer } from '../../utils';
import Article from '../article';
import ChooseOne from './choose_one';
import ChooseMany from './choose_many';
import Blank from './blank';
import BlankTable from './blankTable';
import Speaking from './speaking';
import Drag from './drag';
import styles from './styles';

// 阅读题目
export default class Question extends Component {
  // 参数
  static propTypes = {
    params: PropTypes.object.isRequired,
    newSetRecord: PropTypes.object,
    question: PropTypes.object,
    newSetStepRecord: PropTypes.func,
    step: PropTypes.object,
    isReport: PropTypes.bool,
    // 记录是第几个question，为了阅读题，第一个单选或者多选是展开的
    questionIndex: PropTypes.number,
    getUploadSignature: PropTypes.func,
  };

  // 默认参数
  static defaultProps = {
    question: {},
    newSetRecord: {},
    newSetStepRecord: () => {},
    step: {},
    isReport: false,
    questionIndex: -1,
    getUploadSignature: () => {},
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      materialIds: [],
    };
  }

  componentWillMount() {
    const { question } = this.props;
    const { materials, type } = question;
    // 填空或拖拽题，需要整合 materialId
    const materialIds = [];
    if (type === 'Blank' || type === 'Drag' || type === 'BlankTable') {
      materials.forEach(material => {
        material.answer.forEach(() => {
          materialIds.push(material.id);
        });
      });
    }
    this.setState({
      materialIds,
    });
  }

  // 监听答案填写
  handleAnswer(answer, questionMaterialId, questionId, questionType, isPost = true) {
    const { newSetStepRecord } = this.props;
    newSetStepRecord('answer', answer, questionMaterialId, questionId, questionType, isPost);
  }

  // 监听小题是否选中展开
  handleQuestionSelect(questionMaterialId) {
    const { newSetStepRecord } = this.props;
    newSetStepRecord('selected', questionMaterialId);
  }

  // 渲染
  render() {
    const { question, newSetRecord, step, isReport, questionIndex, getUploadSignature } = this.props;
    const { materials, extra, type, id, subjectId, stem } = question;
    const { headingNumber, instructions, imageMaterial } = extra || {};
    const { materialIds } = this.state;
    const selectedMaterialId = newSetRecord.selected;
    const renderProps = {
      handleAnswer: (answer, questionMaterialId, isPost) =>
        this.handleAnswer(answer, questionMaterialId, id, type, isPost),
      handleQuestionSelect: questionMaterialId =>
        this.handleQuestionSelect(questionMaterialId),
      selectedMaterialId,
      extra,
      stem,
      subjectId,
      imageMaterial,
      materialIds,
      step,
      isReport,
      answerRsult: isReport ? handleIeltsAnswer(materials, type) : [],
      newSetRecord,
      question,
      getUploadSignature,
    };
    console.log('renderProps:', renderProps);
    return (
      <View className={styles.container}>
        {
          headingNumber &&
          <View className={styles.titleBox}>
            <View className={styles.headingNumber}>{headingNumber}</View>
            {
              isReport &&
              <View style={{ marginLeft: '20px' }}>
                {/* <Collect question={question} exerciseId={exerciseId} /> */}
              </View>
            }
          </View>
        }
        <View className={styles.instructions}>
          {
            instructions && <Article material={instructions} />
          }
        </View>
        <View className={styles.questions}>
          {
            ['ChooseOne', 'ChooseMany', 'Speaking', 'Judge'].indexOf(type) !== -1 &&
            Array.isArray(materials) &&
            materials.map((material, index) => {
              const answer = newSetRecord[material.id] &&
              newSetRecord[material.id].answer || (step.type === 'SpeakingQuestion' ? {} : []);
              // 阅读题，如果没有选中的，默认选中第一个
              if (questionIndex === 0 && index === 0 &&
                !renderProps.selectedMaterialId && (step.type === 'ReadingQuestion' || step.type === 'SpeakingQuestion')) {
                renderProps.selectedMaterialId = material.id;
              }
              console.log('answerddd:', answer);
              if (type === 'ChooseOne' || type === 'Judge') {
                return (<ChooseOne
                  {...renderProps}
                  key={index}
                  material={material}
                  answer={answer}
                />);
              } else if (type === 'ChooseMany') {
                return (<ChooseMany
                  {...renderProps}
                  key={index}
                  material={material}
                  answer={answer}
                />);
              } else if (type === 'Speaking' && renderProps.selectedMaterialId === material.id) {
                return (<Speaking
                  {...renderProps}
                  key={index}
                  material={material}
                  answer={answer}
                  rank={questionIndex}
                />);
              }
              return false;
            })
          }
          {
            type === 'Blank' &&
              <Blank
                {...renderProps}
              />
          }
          {
            type === 'BlankTable' &&
              <BlankTable
                {...renderProps}
              />
          }
          {
            type === 'Drag' &&
              <Drag
                {...renderProps}
              />
          }
        </View>
      </View>
    );
  }
}
