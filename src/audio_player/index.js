import React, { Component } from 'react';
import { Howl } from 'howler';
import { View } from '@zhike/ti-ui';

// 音频播放器
export default class AudioPlayer extends Component {
  static instance = { state: { volume: null } };
  static player;

  // 播放音频 修改为支持循环播放 多段音频
  static play(options = {}) {
    this.unload();

    // 多个音频存放在数组中  播放完每条音频，更新数组
    const audioArr = options.src;
    // 调用循环播放音频的函数
    this.playAudios(audioArr, options);
  }

  // 循环播放音频
  static playAudios(audioArr, options) {
    const { volume } = this.instance.state;
    this.player = new Howl({
      src: audioArr,
      format: options.format ? [options.format] : null,
      volume,
    });
    this.player.play();
    this.player.once('end', () => {
      if (audioArr.length > 1) {
        audioArr.shift();
      } else if (audioArr.length === 1) {
        this.unload();
        if (options.onEnd) {
          options.onEnd();
        }
        return false;
      }
      this.playAudios(audioArr, options);
    });
  }

  // 恢复播放
  static resume() {
    if (this.player) {
      this.player.play();
    }
  }

  // 暂停播放
  static pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  // 卸载音频
  static unload() {
    if (this.player) {
      this.player.unload();
      this.player = undefined;
    }
  }

  // 获取当前状态
  static getStatus() {
    return {
      state: this.player.state(),
      volume: this.player.volume(),
      seek: parseInt(this.player.seek() * 1000, 10),
      duration: parseInt(this.player.duration() * 1000, 10),
    };
  }

  // 设置音量
  static setVolume(volume) {
    this.instance.setState({
      volume,
    });

    if (this.player) {
      this.player.volume(volume);
    }
  }

  // 构造函数
  constructor(props) {
    super(props);
    this.state = Object.assign({
      volume: 1,
    });
  }

  // 渲染
  render() {
    return (
      <View />
    );
  }
}
