import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { formatDuration } from 'utils';
import { View, Image, Button } from '@zhike/ti-ui';
import Recorder from 'src/recorder';
import Article from 'components/article';
import { Player } from 'components/audio';
import styles from './styles';

// 口语题目
export default class Recorder extends Component {
  // 参数
  static propTypes = {
    step: PropTypes.object.isRequired,
    newSetStepRecord: PropTypes.func.isRequired,
    newSetRecord: PropTypes.object.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
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
    const { step, newSetRecord } = this.props;
    const question = get(step, 'practice.questions.0');
    const questionMaterialId = get(question, 'materials.0.id');
    this.initAnswer(newSetRecord[questionMaterialId]
      && newSetRecord[questionMaterialId].answer || undefined);
  }

  // 更新
  componentWillReceiveProps(nextProps) {
    if (this.props.step.id !== nextProps.step.id) {
      const { step, newSetRecord } = nextProps;
      const question = get(step, 'practice.questions.0');
      const questionMaterialId = get(question, 'materials.0.id');
      this.initAnswer(newSetRecord[questionMaterialId]
        && newSetRecord[questionMaterialId].answer || undefined);
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
  initAnswer(answer) {
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

  // 监听页面离开
  monitorPageLeave() {
    const hidden = global.document.hidden || // Opera 12.10 and Firefox 18 and later support
      global.document.msHidden ||
      global.document.webkitHidden;

    if (hidden) {
      console.log('离开');
      Recorder.pause();
    } else {
      console.log('回来');
      Recorder.resume();
    }
  }

  // 开始录音
  startRecord() {
    Recorder.start({
      mode: 'practice',
      skip: () => {},
      callback: () => {
        global.document.addEventListener('visibilitychange', this.monitorPageLeave, false);
        this.timeInterval = setInterval(() => {
          const { time } = this.state;
          if (time >= 120 * 1000) {
            this.setState({ recordStatus: 'stop' });
            Recorder.stop().then(data => {
              this.upload({
                duration: parseInt(time / 1000, 10),
                file: data.blob,
              });
            }).catch(error => {
              this.upload({ error });
            });
            Modal.show(ModalAlert, {
              title: '提示',
              buttons: [{ title: '好的' }],
              width: 400,
              component: (
                <View className={styles.modalAlert}>
                  <Image
                    className={styles.modalAlertImage}
                    src={require('components/assets/default.png')}
                  />
                  <View className={styles.modalAlertText}>
                    录音时间已达上限咯~
                  </View>
                </View>
              ),
            });

            global.document.removeEventListener('visibilitychange', this.monitorPageLeave);
            if (this.timeInterval) {
              clearInterval(this.timeInterval);
              this.timeInterval = undefined;
            }
          }
          this.setState({
            time: time + 10,
          });
        }, 10);
      },
    });
    this.setState({ recordStatus: 'start', time: 0, uploadStatus: 'default' });
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
      this.setState({
        recordUrl: data.url,
      });

      global.document.removeEventListener('visibilitychange', this.monitorPageLeave);
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


  // 提示信息
  generateTip() {
    const { uploadStatus } = this.state;
    if (uploadStatus === 'success') {
      setTimeout(() => {
        this.setState({ uploadStatus: 'saved' });
      }, 2000);
    }
    if (uploadStatus === 'uploading') {
      return <View className={styles.tip}>正在保存录音...</View>;
    } else if (uploadStatus === 'success') {
      return <View style={{ color: '#52B343', marginTop: '10px' }}>录音保存成功</View>;
    } else if (uploadStatus === 'fail') {
      return <View className={[styles.tip, styles.colorFD5454]}>音频保存失败，请检查网络连接或使用Chrome浏览器重录</View>;
    }
    return false;
  }

  // 保存答案
  async handleAnswer(audio) {
    const { step } = this.props;
    const question = get(step, 'practice.questions.0');
    const { id, type, materials } = question;
    const questionMaterialId = get(materials, '0.id');
    const { newSetStepRecord } = this.props;
    await newSetStepRecord('answer', audio, questionMaterialId, id, type, step);
  }

  // 渲染
  render() {
    const { step } = this.props;
    const question = get(step, 'practice.questions.0');
    const direction = get(question, 'materials.0.direction'); // 指导语
    const stem = get(question, 'stem'); // 题目
    const { recordStatus, time, recordUrl, uploadStatus } = this.state;
    return (
      <View className={styles.container}>
        <View className={styles.article}>
          <View className={styles.text}>Direction:</View>
          {
            direction &&
            <Article
              material={direction}
            />
          }
          <View className={styles.text}>Questions:</View>
          {
            stem &&
            <Article
              material={stem}
            />
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
