import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Scrollbar } from '@zhike/ti-ui';
import { AudioPlayer, Header, Utils } from '@zhike/ti-component';
import styles from './styles';

const { formatDuration } = Utils;
// 听力播放
export default class ListeningPlayer extends Component {
  // 参数
  static propTypes = {
    step: PropTypes.object.isRequired,
    cdnUrl: PropTypes.string.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      audioStatus: {},
      lastStepId: undefined,
    };
    this.checkStatusInterval = undefined;
  }

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
    if (this.checkStatusInterval) {
      clearInterval(this.checkStatusInterval);
      AudioPlayer.unload();
      this.checkStatusInterval = undefined;
    }
  }

  // 设置头部
  setHeader(props) {
    const { step, cdnUrl } = props;
    const { lastStepId } = this.state;
    Header.config({
      showButtons: ['volume', 'next'],
      isShowTime: false,
    });

    // 处理音频
    if (step.index !== lastStepId) {
      this.setState({
        lastStepId: step.index,
      });

      // 清理之前的音频
      if (this.checkStatusInterval) {
        clearInterval(this.checkStatusInterval);
        AudioPlayer.unload();
      }

      // 播放音频
      AudioPlayer.play({
        /* eslint-disable */
        src: step.isRePlay
          ? `${cdnUrl}/${step.question.materials[0].audioReference.src}`
          : `${cdnUrl}/${step.practice.material.audios[0].src}`,
        /* eslint-enable */
        onEnd: () => Header.next(),
      });

      this.checkStatusInterval = setInterval(() => this.checkStatus(), 10);
    }
  }

  // 检查播放器状态
  checkStatus() {
    const audioStatus = AudioPlayer.getStatus();
    this.setState({
      audioStatus: Object.assign({}, audioStatus, {
        seek: this.state.audioStatus.seek > audioStatus.seek
          ? this.state.audioStatus.seek
          : audioStatus.seek,
      }),
    });
  }

  // 渲染
  render() {
    const { step, cdnUrl } = this.props;
    const { audioStatus } = this.state;
    const width = audioStatus.state === 'loaded' ? audioStatus.seek / audioStatus.duration * 100 : 0;
    return (
      <Scrollbar className={styles.container}>
        <Image
          className={styles.image}
          src={
            step.isRePlay ? (
              step.practice.name.indexOf('Lecture') === -1
                ? require('./assets/replay.jpg')
                : require('./assets/replay_lecture.jpg')
            ) : `${cdnUrl}/${step.practice.material.images[0].src}`
          }
        />

        {
          step.isRePlay &&
          <View className={styles.again}>
            <View className={styles.againP}>Listen again to part of the { step.practice.name.indexOf('Lecture') === -1 ? 'conversation' : 'lecture' }.</View>
            <View className={styles.againP}>Then answer the question.</View>
          </View>
        }

        <View className={styles.progressWrapper}>
          <View
            className={styles.progress}
            style={{ width: `${width < 5 ? 5 : width}%` }}
          >
            {
              audioStatus.state !== 'loaded' && <View className={styles.audioLoading} />
            }
          </View>
        </View>

        <View className={styles.duration}>
          {formatDuration(audioStatus.state === 'loaded' ? audioStatus.seek : 0)}
          /
          {formatDuration(audioStatus.state === 'loaded' ? audioStatus.duration : 0)}
        </View>
      </Scrollbar>
    );
  }
}
