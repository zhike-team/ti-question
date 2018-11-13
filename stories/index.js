import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, View } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { Article, Audio, Modal, Block } from '../src';
import { material, material1, material2, material3, material5, material6, material7, question1, p } from './article_data';
import RecorderDemo from './demo/recorder';
import AudioPlayerDemo from './demo/audio_player';
import styles from './styles';

/* eslint-disable */

// 故事书装饰者
const CenterDecorator = (storyFn) => (
  <div style={styles.container}>
    { storyFn() }
  </div>
);

storiesOf('Article', module)
  .addDecorator(CenterDecorator)
  .add('文章样式 段落定位', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material1} question={question1}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('行内样式 高亮/加粗/斜体/下划线', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material2}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('雅思 填空题', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material3}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('雅思 表格填空题', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('大/小标题 普通 上/下标', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material5}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('插入耳机， 插入黑块️， 插入箭头', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material6}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  // 
  .add('插入短横线， 插入中横线， 插入长横线', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material7}></Article>
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

storiesOf('Block', module)
  .addDecorator(CenterDecorator)
  .add('p', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Block p={p} hasAction={p.anchor}></Block>
      <br />
      </div>
    </React.Fragment>
  ))
 //  location, handleAnswer, insertSentence, hasAction, isPositionTip, paragraphClassName

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