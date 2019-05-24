
import { remove } from 'lodash';

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
