import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Scrollbar } from '@zhike/ti-ui';
import { AudioPlayer, Header } from '@zhike/ti-component';
// import { get } from 'lodash';
// import { isUndefinedOrNull } from 'utils';
import Question from '../../question';
import styles from './styles';

// 阅读题目
export default class ListeningQuestion extends Component {
  // 参数
  static propTypes = {
    params: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired,
    stepRecord: PropTypes.object.isRequired,
    setStepRecord: PropTypes.func.isRequired,
    cdnUrl: PropTypes.string.isRequired,
  };

  // 模块加载
  componentDidMount() {
    this.setHeader(this.props);
  }

  // 模块接受参数
  componentWillReceiveProps(nextProps) {
    this.setHeader(nextProps);
  }

  // 模块卸载
  componentWillUnmount() {
    AudioPlayer.unload();
  }

  // 设置头部
  setHeader(nextProps) {
    const { step, stepRecord, setStepRecord, cdnUrl } = nextProps;

    const showButtons = ['volume', 'next'];
    // const unavailableButtons = [];
    // let answerCount = 1;
    // let realAnswerCount = 0;

    // switch (step.question.type) {
    //   case 'ChooseOne':
    //     realAnswerCount =
    //       stepRecord.answer !== -1 &&
    //       stepRecord.answer !== null &&
    //       stepRecord.answer !== undefined
    //         ? 1
    //         : 0;
    //     break;
    //   case 'Table':
    //     answerCount = step.question.materials.length;
    //     (stepRecord.answer || []).forEach(materialAnswer => {
    //       if (!isUndefinedOrNull(get(materialAnswer, '0'))) {
    //         realAnswerCount += 1;
    //       }
    //     });
    //     break;
    //   case 'ChooseMany':
    //     answerCount = step.question.materials[0].answer.length;
    //     (stepRecord.answer || []).forEach(item => {
    //       if (
    //         item !== -1 &&
    //         item !== null &&
    //         item !== undefined
    //       ) {
    //         realAnswerCount += 1;
    //       }
    //     });
    //     break;
    //   case 'Sort':
    //     answerCount = step.question.materials[0].answer.length;
    //     (get(stepRecord, 'answer.0') || []).forEach(item => {
    //       if (
    //         item !== null &&
    //         item !== undefined
    //       ) {
    //         realAnswerCount += 1;
    //       }
    //     });
    //     break;
    //   default:
    //     break;
    // }

    // (answerCount !== realAnswerCount) && unavailableButtons.push('next');

    Header.config({
      inherit: true,
      showButtons,
      // unavailableButtons,
      isShowTime: true,
    });

    Header.startTimer();

    // 播放音频
    if (!stepRecord.isPlayed) {
      if (
        step.question.materials[0].audio &&
        step.question.materials[0].audio.src
      ) {
        Header.pauseTimer();
        AudioPlayer.play({
          src: `${cdnUrl}/${step.question.materials[0].audio.src}`,
          onEnd: () => {
            console.log('sss');
            setStepRecord('isPlayed', true);
            Header.startTimer();
          },
        });
      } else {
        setStepRecord('isPlayed', true);
        Header.startTimer();
      }
    }
  }

  // 监听答案填写
  handleAnswer(answer) {
    const { setStepRecord } = this.props;
    setStepRecord('answer', answer);
  }

  // 渲染
  render() {
    const { step, stepRecord, params } = this.props;
    const { answer } = stepRecord;
    return (
      <Scrollbar className={styles.container}>
        <View>
          <Question
            question={step.question}
            params={params}
            answer={answer}
            handleAnswer={answer => this.handleAnswer(answer)}
            onlyStem={!stepRecord.isPlayed}
          />
        </View>
      </Scrollbar>
    );
  }
}
