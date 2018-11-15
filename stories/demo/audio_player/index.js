import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { View, Image, Button } from '@zhike/ti-ui';

import AudioPlayer from '../../../src/audio_player';
import Recorder from '../../../src/recorder';
import styles from './styles';


// 页面头部
export default class AudioPlayerDemo extends Component {
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      volume: 1,
      isShowVolume: true,
      isPlaying: false,
      available: true,
    };
  }
  componentDidMount = () => {
    // 自动播放音频
    this.setState({
      isPlaying: true,
    });
    AudioPlayer.play({
      src: ['https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'],
      onEnd: () => {
        this.setState({
          available: false,
        });
      },
    });
  }

  componentWillMount = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.stopPlayAudio();
    }
  }
  // 调整音量
  adjustVolume = (status, event) => {
    if (status === 'start') {
      global.window.onmouseup = () => this.adjustVolume('end');
      global.window.onmousemove = event => this.adjustVolume('adjust', event);
    }

    if (status === 'end') {
      global.window.onmouseup = undefined;
      global.window.onmousemove = undefined;
    }

    if (status === 'adjust') {
      const processBar =
        /* eslint-disable */
        ReactDOM.findDOMNode(this.volumeProcessBar).getBoundingClientRect();
        /* eslint-enable */
      const offset = event.x - (processBar.x || processBar.left);
      const volume = Math.max(Math.min(offset / processBar.width, 1), 0);

      this.setState({
        volume,
      });

      AudioPlayer.setVolume(volume);
    }
  }

  // 继续播放
  resumeAudio = () => {
    AudioPlayer.resume();
    this.setState({
      isPlaying: true,
    });
  }

  // 暂停音频
  pauseAudio = () => {
    AudioPlayer.pause();
    this.setState({
      isPlaying: false,
    });
  }

  // 清除播放音频
  stopPlayAudio = () => {
    AudioPlayer.unload();
    this.setState({
      isPlaying: false,
    });
  }

  // 音频暂停与播放切换
  togglePlay = () => {
    const { isPlaying } = this.state;
    if (!isPlaying) {
      this.resumeAudio();
    } else {
      this.pauseAudio();
    }
    this.setState({
      isPlaying: !isPlaying,
    });
  }

  // 隐藏显示音量
  toggleVolume = () => {
    const { isShowVolume } = this.state;

    this.setState({
      isShowVolume: !isShowVolume,
    });
  }


  // 渲染
  render() {
    const search = global.location.search; // eslint-disable-line
    const { volume, isShowVolume, isPlaying, available } = this.state;
    return (
      <View className={styles.container}>
        <View className={styles.content}>
          <View className={styles.title}>
            <Image
              className={styles.titleLogo}
              src={require('./assets/logo.png')}
            />
            <View className={styles.titleSplit} />
            <View className={styles.titleText}>
              测试AudioPlayer组件
            </View>
          </View>
          <View className={styles.normalButtons}>
            <Button
              className={styles.button}
              leftIcon={isPlaying === true ? require('./assets/pause@2x.png') : require('./assets/play@2x.png')}
              isAvailable={available}
              text={isPlaying === true ? 'Pause' : 'Play'}
              onClick={available => {
                if (available) {
                  this.togglePlay();
                }
              }}
            />
            <View className={styles.volumeWrapper}>
              <Button
                className={styles.button}
                leftIcon={require('./assets/volume.png')}
                text="Volume"
                onClick={() => this.toggleVolume()}
              />
              {
                isShowVolume &&
                <View
                  className={styles.volume}
                >
                  <View
                    ref={
                      volumeProcessBar => {
                        this.volumeProcessBar = volumeProcessBar;
                      }
                    }
                    className={styles.volumeProcessBarWrapper}
                  >
                    <View
                      className={styles.volumeProcessBar}
                      style={{ width: volume * 66 }}
                    />
                    <View
                      className={styles.volumeProcessCircle}
                      style={{ left: volume * 66 - 5 }}
                      onMouseDown={this.adjustVolume('start')}
                    />
                  </View>
                  <View className={styles.volumeTriangle} />
                </View>
              }
              {
                isShowVolume &&
                <View
                  className={styles.volumeBodyWrapper}
                  onClick={() => this.toggleVolume()}
                />
              }
            </View>
          </View>
        </View>
        <AudioPlayer ref={audioPlayer => { AudioPlayer.instance = audioPlayer; }} />
        <Recorder ref={recorder => { Recorder.instance = recorder; }} />
      </View>
    );
  }
}
