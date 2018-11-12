import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, View } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { Article, Audio, Modal } from '../src';
import RecorderDemo from './demo/recorder';
import AudioPlayerDemo from './demo/audio_player';
import styles from './styles';

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
  <div style={styles.container}>
    { storyFn() }
  </div>
);

storiesOf('Article', module)
  .addDecorator(CenterDecorator)
  .add('material', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('answer', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material} answer={["答案一", "答案二", "答案一"]}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('isTextOnly', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material} answer={["答案一", "答案二", "答案一"]} isTextOnly={true}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('handleAnswer', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}>
      </Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('progressWidth', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}>
      </Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('question', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}>
      </Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('isReport', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}>
      </Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('isPositionTip', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}>
      </Article>
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
  .add('AudioPlayer', () => (
    <React.Fragment>
      <AudioPlayerDemo />
    </React.Fragment>
  ));
  storiesOf('Recorder', module)
  .add('Recorder', () => (
    <React.Fragment>
      <RecorderDemo></RecorderDemo>
    </React.Fragment>
  ));

  storiesOf('Modal', module)
  .add('type ModalCorrect', () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="我要纠错"
        onClick={() => Modal.show('ModalCorrect', {
          title: '我要纠错',
          width: 700,
          version: '1.0.0', // 请从common/config引用version字段
          source: 'ti-base', // 纠错来源
          getUploadSignature: ()=> {},
          postCorrection: ()=> {}
        })}
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
      />
    </React.Fragment>
  ))
  .add('type ModalAlert', () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="提示弹框"
        onClick={() => Modal.show('ModalAlert', {
          title: '温馨提示',
          buttons: [{
            title: '开始测评',
            onClick: () => {
              alert('开始测评～～');
            },
            class: 'alertTip',
          }],
          width: 400,
          isReport: true,
          component: (
            <View className={styles.modalAlertText}>
              <View className={styles.alertText}>
              1.请尽可能完成所有题目，确保测试的准确性；
              </View>
              <View className={styles.alertText}>2.测试过程中不支持跳题或返回上一题；</View>
              <View className={styles.alertText}>3.本测试不支持
                <span className={css(styles.tipText)}>Safari</span>
                、<span className={css(styles.tipText)}>IE</span>和
                <span className={css(styles.tipText)}>Edge</span>浏览器，推荐使用
                <span className={css(styles.tipText1)}>chrome</span>；
              </View>
              <View className={styles.alertText}>4.可提前准备好耳机和纸笔。</View>
            </View>
          ),
        })}
      />
      <Modal ref={modal => { Modal.instance = modal; }}  />
    </React.Fragment>
  ));