import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from 'form-data';
import { View } from '@zhike/ti-ui';
import { Header } from '@zhike/ti-component';
import Content from './content';
import { handlePractice } from './utils';
import styles from './styles';

/**
 * 基础题库的跟读题
 */
export default class BaseFollowUp extends Component {
  // 参数
  static defaultProps = {
    stepRecord: {},
  };
  static propTypes = {
    step: PropTypes.object.isRequired,
    stepRecord: PropTypes.object,
    setRecord: PropTypes.func.isRequired,
    setStepRecord: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
    createPromise: PropTypes.func.isRequired,
    cdnUrl: PropTypes.string.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      practice: {
        questionParts: [],
      },
      answer: null,
    };
  }

  componentDidMount() {
    console.log('FollowUp:', this.props.stepRecord);
    const practice = handlePractice({
      practice: {
        data: this.props.step.practice,
      },
    });
    this.setState({ practice });
    this.initAnswer(this.props.step.index, this.props.stepRecord.answer || undefined);
  }

  // 更新
  componentWillReceiveProps(nextProps) {
    if (this.props.step.index !== nextProps.step.index) {
      this.initAnswer(nextProps.step.index, nextProps.stepRecord.answer || undefined);
    }
  }

  initAnswer(stepId, answer) {
    // console.log(this.props);
    const { mode } = this.props.params;

    Header.config({
      showButtons: mode === 'test' ? ['testNext', 'testStop'] : ['correct', 'back', 'next'],
      unavailableButtons: this.findUnavailableButtons(stepId, !!answer),
      isShowTime: true,
      onClickNext: () => {
        Header.next();
      },
      onClickBack: () => {
        Header.back();
      },
    });

    this.setState({ answer });
  }

  findUnavailableButtons(stepId = this.props.step.index, answer = !!this.props.stepRecord.answer) {
    const { mode } = this.props.params;
    const unavailableButtons = [];

    if (stepId === 1) unavailableButtons.push('back');
    if (mode === 'test' && !answer) unavailableButtons.push('testNext');
    if (mode === 'package' && (!answer || answer.length === 0)) unavailableButtons.push('next');
    return unavailableButtons;
  }

  /**
   * 上传用户录音
   * data: 用户的录音数据
   * reTry: 第一次上传失败时自动重试一次，并添加重试标志，第二次依然失败时才放弃
   * signature: 上传阿里云的签名，在第一次上传失败后重试，可以直接传入已经获取的签名，不用重新获取
   * formData: 数据结构，同上，可以在重试时直接传入
   */
  handleRecord = async ({ data, reTry, signature, formData }) => {
    try {
      const unavailableButtons = this.findUnavailableButtons().concat(['back', 'next']);
      Header.config({
        unavailableButtons: Array.from(new Set([...unavailableButtons])), // 去重
        inherit: true,
      });

      if (!signature || !formData) {
        const { getUploadSignature } = this.props;

        signature = await this.props.createPromise(getUploadSignature, {
          business: 'exercise/speaking',
          fileName: `${Date.now()}.webm`,
        });

        formData = new FormData();
        formData.append('key', signature.data.key);
        formData.append('policy', signature.data.policy);
        formData.append('OSSAccessKeyId', signature.data.accessKeyId);
        formData.append('signature', signature.data.signature);
        formData.append('callback', signature.data.callback);
        formData.append('file', data.blob);
      }

      const audioData = await axios({
        url: signature.data.uploadAddress,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        timeout: 20000,
      });

      return Promise.resolve(audioData.data.data.transcodeUrl);
    } catch (e) {
      console.error(e);

      return reTry
        ? Promise.reject()
        : this.handleRecord({ data, signature, formData, reTry: true })
    }
  }

  handlePigai = async ({ url, transcript, reTry }) => {
    try {
      const { step, setStepRecord, setRecord } = this.props;
      const userAnswer = { audioUrl: url, transcript };
      const machinePigaiResult = await setStepRecord('answer', userAnswer);
      const fullAnswer = {
        ...machinePigaiResult.data.records[0],
        answer: userAnswer,
      }

      await setRecord(['step', step.index, 'answer'], fullAnswer); // 手动存一次带机批结果的答案
      await this.setState({ answer: fullAnswer });

      Header.config({
        unavailableButtons: this.findUnavailableButtons(),
        inherit: true,
      });

      return Promise.resolve();
    } catch (e) {
      console.error(e);

      return reTry
        ? Promise.reject()
        : this.handlePigai({ url, transcript, reTry: true });
    }
  }

  render() {
    const { step, params } = this.props;
    const { practice, answer } = this.state;
    let repeatPart;
    if (params.mode === 'package') {
      repeatPart = practice.questionParts[0]; // eslint-disable-line
    } else {
      repeatPart = practice.questionParts[step.index - 1];
    }
    // 跟读题每一题只能有一个句子，只取一条，以防老师配了多个句子
    if (repeatPart) repeatPart.translation = repeatPart.translation.slice(0, 1)

    const renderProps = {
      repeatPart,
      answersDict: { answers: { 0: answer } },
      handleRecord: this.handleRecord,
      handlePigai: this.handlePigai,
      handleFeedback: Header.handleCorrect,
      cdnUrl: this.props.cdnUrl,
    };

    return !repeatPart ? null : (
      <View className={styles.container}>
        <Content {...renderProps} />
      </View>
    );
  }
}
