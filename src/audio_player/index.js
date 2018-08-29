import React, { Component } from 'react';
import { Howl } from 'howler';
import { View } from '@zhike/ti-ui';

// 音频播放器
export default class AudioPlayer extends Component {
  static instance = { state: { volume: null } };
  static player;

  // 播放音频
  static play(options = {}) {
    const { volume } = this.instance.state;

    this.unload();

    this.player = new Howl({
      src: [options.src],
      format: options.format ? [options.format] : null,
      // html5: !options.noHtml5,
      volume,
    });
    this.player.play();
    this.player.once('end', () => {
      this.unload();

      if (options.onEnd) {
        options.onEnd();
      }
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
