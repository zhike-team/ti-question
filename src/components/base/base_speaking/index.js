import axios from 'axios';
import FormData from 'form-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { View, Image, Button } from '@zhike/ti-ui';
import { Article, Recorder, Modal, Utils, Header } from '@zhike/ti-component';
import { Player } from '../../audio';
import styles from './styles';

const { formatDuration } = Utils;

/**
 * 基础题库的口语题
 */
export default class BaseSpeaking extends Component {
  // 参数
  static propTypes = {
    step: PropTypes.object.isRequired,
    stepRecord: PropTypes.object.isRequired,
    setStepRecord: PropTypes.func.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    createPromise: PropTypes.func.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: 'default',
      recordStatus: 'default',
      time: 0,
      recordUrl: undefined,
    };
    this.formData = undefined;
    this.signature = undefined;
    this.isSilenceUpload = false;
    this.timeInterval = undefined;
    this.player = null;
  }

  // 模块即将加载
  componentDidMount() {
    this.initAnswer(this.props.step.index, this.props.stepRecord.answer || undefined);
  }

  // 更新
  componentWillReceiveProps(nextProps) {
    if (this.props.step.index !== nextProps.step.index) {
      this.initAnswer(nextProps.step.index, nextProps.stepRecord.answer || undefined);
    }
  }

  // 模块卸载
  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = undefined;
    }
    if (this.player) {
      this.player.stop();
      this.player = null;
    }
    Recorder.destroy();
  }

  // 初始化答案
  initAnswer(stepId, answer) {
    const { mode } = this.props.params;
    const unavailableButtons = [];
    if (stepId === 1) unavailableButtons.push('back');
    if (mode === 'test' && (!answer || !answer.src)) unavailableButtons.push('testNext');
    if (mode === 'package' && (!answer || answer.length === 0)) unavailableButtons.push('next');
    console.log('Speaking:', this.props.stepRecord);
    Header.config({
      inherit: true,
      showButtons: mode === 'test' ? ['testNext', 'testStop'] : ['correct', 'back', 'next'],
      unavailableButtons,
      isShowTime: true,
      onClickNext: () => {
        // if (get(this.props.stepRecord, 'answer.src')) {
        //   this.props.setStepRecord('answer', {
        //     src: get(this.props.stepRecord, 'answer.src'),
        //     duration: parseInt(this.state.time / 1000, 10),
        //   }, true);
        // }
        Header.next();
      },
      onClickBack: () => {
        // if (get(this.props.stepRecord, 'answer.src')) {
        //   this.props.setStepRecord('answer', {
        //     src: get(this.props.stepRecord, 'answer.src'),
        //     duration: parseInt(this.state.time / 1000, 10),
        //   }, true);
        // }
        Header.back();
      },
    });
    this.setState({
      recordUrl: answer ? answer.src : undefined,
      recordStatus: answer ? 'stop' : 'default',
      uploadStatus: 'default',
      time: answer ? answer.duration * 1000 : 0,
    });
    if (this.player) {
      this.player.stop();
      this.player = null;
    }
    this.formData = undefined;
    this.signature = undefined;
    this.isSilenceUpload = false;
    this.timeInterval = undefined;
  }

  // 开始录音
  startRecord() {
    const { mode } = this.props.params;
    Recorder.start({
      callback: () => {
        Header.config({
          inherit: true,
          unavailableButtons: mode === 'test' ? ['testNext'] : ['back', 'next'],
        });
        this.timeInterval = setInterval(() => {
          const { time } = this.state;

          if (time >= 90 * 1000) {
            Modal.show('ModalAlert', {
              title: '提示',
              buttons: [{ title: '好的' }],
              width: 400,
              component: (
                <View className={styles.modalAlert}>
                  <Image
                    className={styles.modalAlertImage}
                    src={require('./assets/lovely.png')}
                  />
                  <View className={styles.modalAlertText}>
                    录音时间已达上限咯~
                  </View>
                </View>
              ),
            });
            this.stopRecord();
            return;
          }

          this.setState({
            time: time + 1000,
          });
        }, 1000);
        this.setState({ recordStatus: 'start', time: 0, uploadStatus: 'default' });
      },
    });
  }

  // 停止录音
  stopRecord() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = undefined;
    }
    this.setState({ recordStatus: 'stop' });
    const { time } = this.state;
    Recorder.stop().then(data => {
      console.log(data.url, 'data.url');
      this.setState({
        recordUrl: data.url,
      });
      this.upload({
        duration: parseInt(time / 1000, 10),
        file: data.blob,
      });
    }).catch(error => {
      this.upload({ error });
    });
  }

  // 播放录音
  playRecord() {
    const { recordUrl } = this.state;

    this.setState({
      recordStatus: 'play',
    });
    this.player = new Player();
    this.player.play({
      src: recordUrl,
      onended: this.cancelPlay,
      onpause: this.cancelPlay,
    });
  }

  // 取消播放
  cancelPlay = () => {
    this.setState({
      recordStatus: 'stop',
    });
    this.player.stop();
    this.player = null;
  }

  // 上传录音
  async upload(data) {
    const { getUploadSignature, setStepRecord } = this.props;
    const { mode } = this.props.params;
    this.setState({
      uploadStatus: 'uploading',
    });

    Header.config({
      inherit: true,
      unavailableButtons: mode === 'test' ? ['testNext'] : ['back', 'next'],
    });

    let audio;
    if (data.file || data.error) {
      try {
        if (data.error) {
          this.isSilenceUpload = true;
          throw data.error;
        } else if (this.formData) {
          const audioData = await axios({
            url: this.signature.data.uploadAddress,
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: this.formData,
            timeout: 30000,
          });

          audio = { src: audioData.data.data.transcodeUrl, duration: data.duration };
        } else {
          // const type = data.file.type && data.file.type.split('audio/')[1] || 'webm';
          this.signature = await this.props.createPromise(getUploadSignature, {
            business: 'exercise/speaking',
            fileName: `${data.duration}.webm`,
          });

          this.formData = new FormData();
          this.formData.append('key', this.signature.data.key);
          this.formData.append('policy', this.signature.data.policy);
          this.formData.append('OSSAccessKeyId', this.signature.data.accessKeyId);
          this.formData.append('signature', this.signature.data.signature);
          this.formData.append('callback', this.signature.data.callback);
          this.formData.append('file', data.file);
          const audioData = await axios({
            url: this.signature.data.uploadAddress,
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: this.formData,
            timeout: 30000,
          });

          audio = { src: audioData.data.data.transcodeUrl, duration: data.duration };
        }
      } catch (e) {
        if (this.isSilenceUpload) {
          this.setState({ uploadStatus: 'fail' });
          const unavailableButtons = [];
          if (this.props.step.index === 1) unavailableButtons.push('back');
          Header.config({
            inherit: true,
            unavailableButtons,
          });
        } else {
          this.isSilenceUpload = true;
          setTimeout(() => {
            this.upload(data);
          }, 2000);
        }

        return;
      }
    }
    this.formData = undefined;
    this.signature = undefined;
    if (audio.src) await setStepRecord('answer', audio);
    this.setState({ uploadStatus: 'success', recordUrl: audio.src, time: audio.duration * 1000 });
    const unavailableButtons = [];
    if (this.props.step.index === 1) unavailableButtons.push('back');
    Header.config({
      inherit: true,
      unavailableButtons,
    });
  }

  // 提示信息
  generateTip() {
    const { uploadStatus } = this.state;
    if (uploadStatus === 'uploading') {
      return <View className={styles.tip}>正在保存录音...</View>;
    } else if (uploadStatus === 'success') {
      return <View className={[styles.tip, styles.color52B343]}>录音保存成功</View>;
    } else if (uploadStatus === 'fail') {
      return <View className={[styles.tip, styles.colorFD5454]}>音频保存失败，请检查网络连接或使用Chrome浏览器重录</View>;
    }
    return false;
  }

  // 渲染
  render() {
    const { step } = this.props;
    const { question } = step;
    const direction = get(question, 'materials.0.direction'); // 指导语
    const origin = get(question, 'materials.0.origin'); // 材料
    const stem = get(question, 'stem'); // 题目
    const { recordStatus, time, recordUrl, uploadStatus } = this.state;
    return (
      <View className={styles.container}>
        <View className={styles.meterial}>
          {
            direction && <Article material={direction} />
          }
          {
            origin && <Article material={origin} progressWidth={538} />
          }
          {
            stem && <Article material={stem} />
          }
        </View>
        <View className={styles.recorderBox}>
          {
            recordStatus === 'default' &&
            <Image className={styles.image} src={require('./assets/recorder.png')} />
          }
          {
            recordStatus === 'start' &&
            <Image className={styles.image} src={require('./assets/recorder.gif')} />
          }
          {
            recordStatus === 'stop' &&
            <Image className={styles.image} src={require('./assets/volume.png')} />
          }
          {
            recordStatus === 'play' &&
            <Image className={styles.image} src={require('./assets/volume.gif')} />
          }
          <View className={styles.buttons}>
            {
              recordUrl &&
                <Button
                  className={styles.button}
                  isAvailable={!(recordStatus === 'start')}
                  text={recordStatus === 'play' ? '取消播放' : '播放录音'}
                  onClick={() => {
                    if (recordStatus === 'stop') {
                      this.playRecord();
                    } else {
                      this.cancelPlay();
                    }
                  }}
                />
            }
            <Button
              className={[
                styles.button,
                recordUrl && styles.gray,
              ]}
              textClassName={recordUrl && styles.grayText}
              isAvailable={(uploadStatus !== 'uploading' && recordStatus !== 'play')}
              text={recordStatus === 'start' ? '停止录音' : recordUrl ? '重新录音' : '开始录音'}
              onClick={() => {
                if (uploadStatus === 'uploading') return false;
                if (recordStatus === 'start') {
                  this.stopRecord();
                } else {
                  this.startRecord();
                }
              }}
            />
          </View>
          <View className={styles.time}>
            {formatDuration(time)}
          </View>
          {this.generateTip()}
        </View>
      </View>
    );
  }
}
