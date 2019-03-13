export const statusDict = {
  uploadError: {
    text: '音频保存失败，请检查网络连接或使用Chrome浏览器重录',
    type: 'error',
  },
  pigaiError: {
    text: '打分失败，请尝试使用Chrome浏览器重新录音或将问题反馈给我们',
    type: 'error',
  },
  uploading: {
    text: '正在保存录音...',
    type: 'default',
  },
  pigaiing: {
    text: '正在努力批改中...',
    type: 'default',
  },
  // 加载材料音频
  loadingAudio: {
    text: '',
    type: 'default',
  },
  // 播放材料音频
  playingAudio: {
    text: '',
    type: 'default',
  },
  // 录音
  recording: {
    text: '',
    type: 'default',
  },
  // 加载用户录音
  loadingRecord: {
    text: '',
    type: 'default',
  },
  // 播放用户录音
  playingRecord: {
    text: '',
    type: 'default',
  },
  // 计时时间到，弹窗状态
  timeUp: {
    text: '',
    type: 'default',
  },
  // 空状态
  '': {
    text: '',
    type: 'default',
  },
}

// can not do something when...
export const canNot = {
  playAudio: ['loadingAudio', 'recording', 'uploading', 'pigaiing'],
  record: ['loadingAudio', 'uploading', 'pigaiing'],
  playRecord: ['loadingAudio', 'loadingRecord', 'recording', 'uploading', 'pigaiing'],
  playPronounce: ['recording', 'playingAudio', 'playingRecord'],
  showAnswer: ['recording', 'uploading', 'pigaiing', 'timeUp'],
}
