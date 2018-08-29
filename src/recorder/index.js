import React, { Component } from 'react';
import { RecordRTCPromisesHandler } from 'recordrtc';
import { View } from '@zhike/ti-ui';
import Modal from 'components/modal';
import ModalAlert from 'components/modal/alert';

// 录音
export default class RecorderComponent extends Component {
  static instance;
  static isInit;
  static recorder;

  // 初始化
  static init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;

    navigator.getUserMedia = // eslint-disable-line
      navigator.getUserMedia || navigator.webkitGetUserMedia; // eslint-disable-line
  }

  // 开始录音
  static start({ callback = () => {} }) {
    this.init();
    this.destroy();

    if (!navigator.getUserMedia) { // eslint-disable-line
      this.onError();
      return;
    }

    navigator.getUserMedia( // eslint-disable-line
      { audio: true },
      stream => {
        this.recorder = new RecordRTCPromisesHandler(stream, { type: 'audio' });
        this.recorder.startRecording()
          .then(() => callback())
          .catch(() => this.onError());
      },
      () => this.onError(),
    );
  }

  // 暂停录音
  static pause() {
    try {
      // 组件库有问题，升级之后似乎并未内置该方法
      this.recorder.pauseRecording();
    } catch (e) {
      console.log(e);
    }
  }

  // 继续录音
  static resume() {
    try {
      // 组件库有问题，升级之后似乎并未内置该方法
      this.recorder.resumeRecording();
    } catch (e) {
      console.log(e);
    }
  }

  // 停止录音
  static stop() {
    return this.recorder.stopRecording()
      .then(url => {
        const blob = this.recorder.getBlob();
        return { url, blob };
      });
  }

  // 卸载录音
  static destroy() {
    if (this.recorder && this.recorder.destroy) {
      this.recorder.destroy();
    }
  }

  // 错误监听
  static onError() {
    Modal.show(ModalAlert, {
      title: '录音错误提示',
      buttons: [{
        title: '刷新页面',
        onClick: () => global.location.reload(), // eslint-disable-line
      }],
      width: 400,
      component: (
        <View style={{ aligenItems: 'center' }}>
          1.请检查浏览器是否允许使用麦克风权限；<br />
          2.请在修改该权限后刷新页面。
        </View>
      ),
    });
  }

  // 渲染
  render() {
    return (
      <View />
    );
  }
}
