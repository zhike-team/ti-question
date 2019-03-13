import axios from 'axios';
import FormData from 'form-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { View, Image, Button } from '@zhike/ti-ui';
import { Recorder, Modal } from '@zhike/ti-component';
import { formatDuration } from '../../../utils';
import Header from '../../../header';
import Article from '../../article';
import { Player } from '../../../audio';
import styles from './styles';

// 口语题目
export default class Speaking extends Component {
  // 参数
  static propTypes = {
    stem: PropTypes.object.isRequired,
    material: PropTypes.object.isRequired,
    answer: PropTypes.any,
    handleAnswer: PropTypes.func,
    selectedMaterialId: PropTypes.number,
    subjectId: PropTypes.number,
    getUploadSignature: PropTypes.func.isRequired,
    rank: PropTypes.number.isRequired,
  };
  // 初始参数
  static defaultProps = {
    answer: {},
    handleAnswer: () => {},
    selectedMaterialId: 0,
    subjectId: 5,
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
    const { answer } = this.props;
    this.initAnswer(answer);
    /* eslint-disable */
    const unavailableButtons = [];
    Header.config({
      showButtons: ['correct', 'submit'],
      unavailableButtons,
      isShowTime: true,
    });
  }

  // 更新
  componentWillReceiveProps(nextProps) {
    if (this.props.answer.src !== nextProps.answer.src ||
      this.props.selectedMaterialId !== nextProps.selectedMaterialId) {
      this.initAnswer(nextProps.answer);
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

  // 处理答案
  handleAnswer(answer ) {
    const { id } = this.props.material;
    this.props.handleAnswer(answer, id);
  }

  // 初始化答案
  initAnswer(answer) {
    this.setState({
      recordUrl: JSON.stringify(answer) !== '{}' ? answer.src : undefined,
      recordStatus: JSON.stringify(answer) !== '{}' ? 'stop' : 'default',
      uploadStatus: 'default',
      time: JSON.stringify(answer) !== '{}' ? answer.duration * 1000 : 0,
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
      skip: () => Header.uploadFailed(),
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
            Modal.show('ModalAlert', {
              title: '提示',
              buttons: [{ title: '好的' }],
              width: 400,
              component: (
                <View className={styles.modalAlert}>
                  <Image
                    className={styles.modalAlertImage}
                    src={require('./assets/default.png')}
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
    Header.config({
      inherit: true,
      unavailableButtons: ['submit', 'correct'],
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
      this.upload({
        duration: parseInt(time / 1000, 10),
        file: data.blob,
      }).catch(error => {
        this.upload({ error });
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

  // 上传录音
  async upload(data) {
    const { getUploadSignature } = this.props;
    this.setState({
      uploadStatus: 'uploading',
    });
    Header.config({
      inherit: true,
      unavailableButtons: ['submit', 'correct'],
    });
    let audio;
    if (data.file || data.error) {
      try {
        if (data.error) {
          this.setState({
            recordStatus: 'stop',
          });
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
            timeout: 20000,
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
            timeout: 20000,
          });

          audio = { src: audioData.data.data.transcodeUrl, duration: data.duration };
        }
      } catch (e) {
        if (this.isSilenceUpload) {
          Header.config({
            inherit: true,
            unavailableButtons: [],
          });
          this.setState({ uploadStatus: 'fail' });
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
    await this.handleAnswer(audio);
    Header.config({
      inherit: true,
      unavailableButtons: [],
    });
    this.setState({ uploadStatus: 'success', recordUrl: audio.src, time: audio.duration * 1000 });
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

  // 渲染
  render() {
    const { direction } = this.props.material;
    const { stem, rank } = this.props; // 题目
    const { recordStatus, time, recordUrl, uploadStatus } = this.state;
    return (
      <View
        className={styles.container}
      >
        <View className={styles.article} style={rank === 0 ? { paddingTop: '28px' } : {}}>
          {
            direction && JSON.stringify(direction) !== '{}' &&
            get(direction, 'paragraphs') &&
            get(direction, 'paragraphs').length !== 0 &&
            <View className={styles.text}>Direction:</View>
          }
          {
            direction && JSON.stringify(direction) !== '{}' &&
            get(direction, 'paragraphs') &&
            get(direction, 'paragraphs').length !== 0 &&
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
