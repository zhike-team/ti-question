import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { View, Image, Scrollbar } from '@zhike/ti-ui';
import { Header, Article, Modal } from '@zhike/ti-component';
import Question from '../question';
import styles from './styles';

// 阅读题目
export default class ReadingQuestion extends Component {
  // 参数
  static propTypes = {
    operation: PropTypes.string,
    params: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired,
    stepRecord: PropTypes.object.isRequired,
    setStepRecord: PropTypes.func.isRequired,
  };

  // 初始参数
  static defaultProps = {
    operation: '',
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
  setHeader(nextProps) {
    const { step, stepRecord, setStepRecord, operation, params } = nextProps;
    const { mode } = params;

    if (!stepRecord.hasSeen) {
      setStepRecord('hasSeen', true);
    }

    const showButtons = ['correct'];
    step.isPreview && showButtons.push('continue');
    !step.isPreview && showButtons.push('next');
    (!step.isPreview || mode === 'mock' && step.isPreview) && showButtons.push('review');
    (!step.isPreview || mode === 'mock' && step.isPreview) && showButtons.push('back');
    step.question && step.question.type === 'Drag' && !operation && showButtons.push('viewText');
    step.question && step.question.type === 'Drag' && operation === 'ViewText' && showButtons.push('viewQuestion');
    const unavailableButtons = [];
    step.isPreview && unavailableButtons.push('review');
    (step.isPreview || step.index === 1 || operation === 'ViewText') && unavailableButtons.push('back');
    operation === 'ViewText' && unavailableButtons.push('review');
    operation === 'ViewText' && unavailableButtons.push('next');

    const questionTitle = step.question && step.question.name;

    let config = {};
    if (mode !== 'package') {
      config = {
        title: mode === 'mock'
          ? 'Reading'
          : step.isPreview
            ? ''
            : questionTitle,
        doNotConcatTitle: mode !== 'mock' && !step.isPreview && !!questionTitle,
        showButtons,
        unavailableButtons,
        isShowTime: true,
        questionIndex: step.isPreview ? undefined : step.sectionIndex,
        questionCount: step.isPreview ? undefined : step.sectionCount,
        onClickContinue: step.isPreview ? () => {
          if (!stepRecord.isRead) {
            Modal.show('ModalAlert', {
              title: 'More Text',
              buttons: [{ title: 'Continue' }],
              width: 400,
              component: (
                /* eslint-disable */
                <View>
                  <View>You should use the scroll bar to read the whole passage before you begin to answer the questions.</View>
                  <View style={{ marginTop: 10 }}>The passage will appear again with each question.</View>
                </View>
                /* eslint-enable */
              ),
            });
            return false;
          }

          return true;
        } : undefined,
      };
    } else {
      config = {
        inherit: true,
        showButtons,
        unavailableButtons,
        isShowTime: true,
      };
    }
    Header.config(config);
  }

  // 监听文档滚动
  handleArticleScroll(event) {
    const { step, stepRecord, setStepRecord } = this.props;
    if (!step.isPreview || stepRecord.isRead) {
      return;
    }
    const { offsetHeight, scrollHeight, scrollTop } = event.target;
    if (scrollHeight - offsetHeight - scrollTop < 50) {
      setStepRecord('isRead', true);
    }
  }

  // 监听答案填写
  handleAnswer(answer) {
    const { setStepRecord } = this.props;
    setStepRecord('answer', answer);
  }

  // 渲染
  render() {
    const { step, stepRecord, operation, params } = this.props;
    console.log('this.props', this.props);
    const { answer } = stepRecord;
    return (
      <View className={styles.container}>
        <View className={styles.questionWrapper}>
          <Scrollbar
            className={[
              styles.question,
              step.isFullScreen && operation !== 'ViewText'
                ? styles.questionOnly
                : undefined,
            ]}
          >
            {
              step.question &&
              step.question.type === 'Drag' &&
              step.question.materials[0].direction &&
              operation !== 'ViewText' &&
              <Article
                material={step.question.materials[0].direction}
              />
            }

            {
              !step.isPreview &&
              step.question &&
              step.question.type !== 'Insert' &&
              operation !== 'ViewText' &&
              <Question
                question={step.question}
                answer={answer}
                params={params}
                handleAnswer={answer => this.handleAnswer(answer)}
              />
            }

            {
              step.question &&
              step.question.type === 'Insert' &&
              <View className={styles.questionInsertDirection}>
                Look at the four squares [<Image className={styles.questionInsertDirectionBlock} src={require('../question/images/block.png')} />] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?
              </View>
            }

            {
              step.question &&
              step.question.type === 'Insert' &&
              <View className={styles.questionInsertSentence}>
                {get(step.question, 'materials.0.insertSentence.paragraphs.0.text')}
              </View>
            }

            {
              step.question &&
              step.question.type === 'Insert' &&
              <View>Where would be the sentence best fit? Click on a square to add the sentence to the passage.</View> // eslint-disable-line
            }
          </Scrollbar>
        </View>

        {
          (!step.isFullScreen || operation === 'ViewText') &&
          <View className={styles.articleWrapper}>
            <Scrollbar
              className={styles.article}
              onScroll={event => this.handleArticleScroll(event)}
            >
              <View className={styles.articleTitle}>{step.practice.material.title}</View>
              <Article
                material={step.practice.material.origin}
                question={step.question}
                answer={answer}
                isTextOnly={step.isFullScreen || step.isPreview}
                handleAnswer={answer => this.handleAnswer(answer)}
              />
            </Scrollbar>
          </View>
        }
      </View>
    );
  }
}
