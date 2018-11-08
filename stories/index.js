import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { Article, Audio, AudioPlayer } from '../src';

const styles = {
  marginTop: '50px',
  marginLeft: '50px',
};
const styles1 = {
  width: '600px',
  height: '200px',
  overflowY: 'auto',
  border: '1px solid gray',
  padding: '10px',
};
const styles2 = {
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
  background: 'lightyellow',
  justifyContent: 'space-between',
  alignItems: 'space-around',
  borderRadius: '20px',
};
const styles3 = {
  display: 'flex',
  marginTop: '20px',
  width: '80px',
  height: '40px',
  background: 'lightgray',
  marginRight: '20px',
  borderRadius: '10px',
  justifyContent: 'center',
  alignItems: 'center',
};
const styles4 = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const styles5 = {
  display: 'inline-block',
  width: '80px',
  height: '40px',
  marginRight: '20px',
};

//
let isPlay = false;
const playAudios = () => {
  if (isPlay) return false;
  AudioPlayer.playAudios([
    'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3',
  ], {});
  isPlay = true;
};

const pause = () => {
  AudioPlayer.pause();
};

const resume = () => {
  AudioPlayer.resume();
};
const unload = () => {
  AudioPlayer.unload();
  isPlay = false;
};

const setVolume = () => {
  const volume = window.document.getElementById('volume').value * 0.1;
  AudioPlayer.setVolume(volume);
};
const getStatus = () => {
  if (!isPlay) return false;
  alert(JSON.stringify(AudioPlayer.getStatus()));
};

/* eslint-disable */
let material = {
  "paragraphs": [
      {
          "id": "d727b95f-0663-53ae-79f0-5e2dbc5ce8c4",
          "text": "By the year 2050, nearly 80% of the Earth's population will live in urban centres. Applying the most conservative estimates to current demographic trends, the human population will increase by about three billion people by then. An estimated 109 hectares of new land (about 20% larger than Brazil) will be needed to grow enough food to feed them, if traditional farming methods continue as they are practised today. At present, throughout the world, over 80% of the land that is suitable for raising crops is in use. Historically, some 15% of that has been laid waste by poor management practices. What can be done to ensure enough food for the world's population to live on?",
          "type": "Text"
      }
  ],
  "inlineMarkup": [
      {
          "pid": "d727b95f-0663-53ae-79f0-5e2dbc5ce8c4",
          "type": "InsertBlank",
          "index": 43,
          "length": 1
      },
      {
          "pid": "d727b95f-0663-53ae-79f0-5e2dbc5ce8c4",
          "type": "InsertBlank",
          "index": 175,
          "length": 1
      },
      {
          "pid": "d727b95f-0663-53ae-79f0-5e2dbc5ce8c4",
          "type": "InsertBlank",
          "index": 377,
          "length": 1
      }
  ]
};
// 故事书装饰者
const CenterDecorator = (storyFn) => (
  <div style={styles}>
    { storyFn() }
  </div>
);

storiesOf('Article', module)
  .addDecorator(CenterDecorator)
  .add('material', () => (
    <React.Fragment>
      <div style={styles1}>
      <Article  material={material}></Article>
      <br />
      </div>
    </React.Fragment>
  ));

  storiesOf('Audio', module)
  .add('src', () => (
    <React.Fragment>
      <div style={{ width: '500px', height: '100px'}} >
      <Audio src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'}></Audio>
      </div>
    </React.Fragment>
  ));

  storiesOf('AudioPlayer', module)
  .add('playAudios', () => (
    <React.Fragment>
      <div
        style={styles2}
      >
        <div
        style={styles4}
        >
          <div
            style={styles3}
            onClick={playAudios.bind(this)}
          >
          playAudios</div>
          <div
            style={styles3}
            onClick={pause.bind(this)}
          >
          pause</div>
          <div
            style={styles3}
            onClick={resume.bind(this)}
          >
          resume</div>
          <div
            style={styles3}
            onClick={unload.bind(this)}
          >
          unload</div>
          <input 
            style={{ marginTop: '10px', marginRight: "20px", width: '80px' }}
            placeholder="请输入1- 10"
            id="volume"
          />
          <div
            style={styles3}
            onClick={setVolume.bind(this)}
          >
          setVolume</div>
          <div
            style={styles3}
            onClick={getStatus.bind(this)}
          >
          getStatus</div>
          
        </div>
        <div style={styles4}> 
          <span style={styles5}>点击播放</span>
          <span style={styles5}>暂停播放</span>
          <span style={styles5}>继续播放</span>
          <span style={styles5}>卸载音频</span>
          <span style={styles5}>点击按钮 </span>
          <span style={styles5}>设置音量</span>
          <span style={styles5}>获取状态</span>
        </div>
        
        <AudioPlayer ref={audioPlayer => { AudioPlayer.instance = audioPlayer; }} />
      </div>
    </React.Fragment>
  ));

  storiesOf('Recorder', module)
  .add('src', () => (
    <React.Fragment>
      <div style={{ width: '500px', height: '100px'}} >
      </div>
    </React.Fragment>
  ));