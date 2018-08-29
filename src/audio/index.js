import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from '@zhike/ti-ui';
import { cdnUrl } from 'common/config';
import { remove } from 'lodash';
import styles from './styles';

const audioContainer = [];

// 没有播放组件的
export class Player {
  // 构造
  constructor() {
    this.player = null;
  }
  // 开始播放
  play(options = {}) {
    this.player = new global.window.Audio(options.src);
    this.player.onended = options.onended;
    this.player.onpause = options.onpause;
    audioContainer.forEach(audio => {
      audio.pause();
    });
    audioContainer.push(this.player);
    this.player.play();
  }
  // 停止播放
  stop() {
    remove(audioContainer, audio => audio === this.player);
    this.player.onpause = null;
    this.player.onended = null;
    this.player.src = '';
    this.player = null;
  }
}

export default class Audio extends Component {
  // 参数
  static defaultProps = {
    progressWidth: 338,
    showPlayer: true,
  };

  static propTypes = {
    src: PropTypes.string.isRequired,
    progressWidth: PropTypes.number,
    showPlayer: PropTypes.bool,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      duration: 0,
      currtime: '00:00',
      progress: 0,
      isload: true,
    };
    this.audio = null;
    this.isTry = 0;
  }

  componentWillMount() {
    this.setAudio(this.props.src);
  }

  // 模块接受参数
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      remove(audioContainer, audio => audio === this.audio);
      this.audio.onloadedmetadata = null;
      this.audio.ontimeupdate = null;
      this.audio.onplaying = null;
      this.audio.onpause = null;
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.src = '';

      this.audio = null;
      this.setAudio(nextProps.src);
    }
  }

  componentWillUnmount() {
    remove(audioContainer, audio => audio === this.audio);
    this.audio.onloadedmetadata = null;
    this.audio.ontimeupdate = null;
    this.audio.onplaying = null;
    this.audio.onpause = null;
    this.audio.onended = null;
    this.audio.onerror = null;
    this.audio.src = '';

    this.audio = null;
  }

  // 圆点onTouchStart
  onTouchStart = e => {
    console.log(e, 'start');
  }

  // 圆点onTouchMove
  onTouchMove = e => {
    console.log(e, 'move');
  }

  // 圆点onTouchEnd
  onTouchEnd = e => {
    console.log(e, 'end');
  }

  // 创建音频
  setAudio = src => {
    const newSrc = src.indexOf('//') === -1 ? `${cdnUrl}/${src}` : src;
    // const newSrc = 'https://zk-user-upload.oss-cn-hangzhou.aliyuncs.com/exercise/speaking/20180614-1704-58230Rcfc0.webm.mp3';
    // const newSrc = 'http://ti-toefl.dev.smartstudy.com/1458c937918622f444125ccd933e3e9d.mp3';
    this.audio = new global.window.Audio(newSrc);
    this.audio.onplaying = this.handlePlay;
    this.audio.onpause = this.handlePause;
    this.audio.onended = this.handleEnded;
    this.audio.onerror = this.handleError;
    this.audio.onloadedmetadata = this.handleLoadedmetadata;
    this.audio.ontimeupdate = this.handleTimeupdate;

    this.setState({
      playing: false,
      duration: 0,
      currtime: '00:00',
      progress: 0,
      isload: true,
    });
    audioContainer.push(this.audio);
  }

  // 音频加载完
  handleLoadedmetadata = () => {
    this.setState({
      isload: false,
      duration: this.audio.duration || 45,
    });
  }

  // 进度条
  handleTimeupdate = () => {
    const { duration } = this.state;

    if (this.audio && this.audio.currentTime) {
      const currentTime = this.timeFormat(parseInt(this.audio.currentTime, 10));

      this.setState({
        currtime: currentTime,
        progress: this.audio.currentTime / duration * 100,
      });
    }
  }

  // 处理时间
  timeFormat(times) {
    let day = 0;
    let hour = 0;
    let minute = 0;
    let seconds = 0;
    let newTimes = times;
    if (newTimes > 0) {
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      seconds = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }

    if (minute <= 9) minute = `0${minute}`;
    if (seconds <= 9) seconds = `0${seconds}`;
    newTimes = `${minute}:${seconds}`;

    return newTimes;
  }

  // 播放
  handlePlay = () => {
    this.setState({ playing: true });
  }

  // 暂停
  handlePause = () => {
    this.setState({ playing: false });
  }

  // 播放结束
  handleEnded = () => {
    this.setState({
      playing: false,
      progress: 0,
      currtime: '00:00',
    });
  }

  // 点击播放
  handleClickPlay = () => {
    if (!this.state.playing) {
      audioContainer.forEach(audio => {
        audio.pause();
      });
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  // 点击进度条
  handleClickProgress = e => {
    const { duration } = this.state;
    const { progressWidth } = this.props;
    this.audio.currentTime = e.nativeEvent.offsetX / progressWidth * duration;
  }

  // 报错信息
  handleError = () => {
    if (this.isTry < 2) {
      setTimeout(() => {
        if (!this.audio) return false;
        const oldSrc = this.audio.src;
        remove(audioContainer, audio => audio === this.audio);
        this.audio = null;
        this.setAudio(oldSrc);
      }, 2000);
      this.isTry += 1;
    }
  }

  render() {
    const { playing, progress, duration, currtime, isload } = this.state;
    const { progressWidth, showPlayer } = this.props;
    if (!showPlayer) return false;
    const playClass = [styles.default];
    playing ? playClass.push(styles.pause) : playClass.push(styles.play);
    const blueWidth = progressWidth * progress / 100;

    return (
      <View className={styles.container}>
        <View className={styles.audioBox}>
          <View className={playClass} onClick={this.handleClickPlay} />
          <View>{currtime}</View>
          <View className={styles.progressBox} style={{ width: `${progressWidth}px` }}>
            <View className={styles.progress} onClick={this.handleClickProgress}>
              <View className={styles.blueProgress} style={{ width: `${blueWidth}px` }} />
            </View>
            <View
              className={styles.dot}
              style={{ left: `${blueWidth - 6}px` }}
              onTouchStart={this.onTouchStart}
              onTouchMove={this.onTouchMove}
              onTouchEnd={this.onTouchEnd}
            />
          </View>
          <View>{this.timeFormat(parseInt(duration, 10))}</View>
          {
            isload &&
              <View className={styles.mask}>
                <View className={styles.spot} />
                <View className={styles.spot} />
                <View className={styles.spot} />
              </View>
          }
        </View>
      </View>
    );
  }
}
