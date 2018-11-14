import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, View } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { Article, Audio, Modal, Block } from '../src';
import { material, material1, material2, material3, tableBlank, material5, material6, material7, question1, p } from './article_data';
import RecorderDemo from './demo/recorder';
import AudioPlayerDemo from './demo/audio_player';
import styles from './styles';

/* eslint-disable */
let initAnswer = 0;
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
      <table className={css(styles.table)}>
          {
            Array.isArray(tableBlank) &&
            <tbody className={css(styles.tbody)}>
              {
                Array.isArray(tableBlank) && tableBlank.map((line, index) => (
                  <tr
                    key={index}
                    className={css(styles.tr)}
                  >
                    {
                      Array.isArray(line) && line.map((row, index1) => {
                        let count = 0;
                        if (row.content.inlineMarkup && Array.isArray(row.content.inlineMarkup)) {
                          count = row.content.inlineMarkup.filter(item =>
                            item.type === 'BlankTable').length;
                        }
                        initAnswer += count;
                        return (
                          <th className={css(styles.tableCell)} key={index1}>
                            <Article
                              material={row.content}
                              isIelts={true}
                              // handleAnswer={() => { alert('～处理答案的回调函数～')}}
                              // handleQuestionSelect={() => { alert('～处理子题选中的回调函数～')}}
                              answer={['答案一', '答案二', '答案三', '答案四']}
                              qNum={['10', '11', '12', '13', '14']}
                              externalInitAnswer={initAnswer - count}
                              materialIds={[26142, 26143, 26144, 26145, 26146]}
                              isReport={false}
                              paragraphClassName={styles.paragraphClass}
                            />
                          </th>
                        );
                      })
                    }
                  </tr>
                ))
              }
            </tbody>
          }
        </table>
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
  .add('插入短横线， 插入中横线， 插入长横线', () => (
    <React.Fragment>
      <div style={styles.container}>
      <Article material={material7}></Article>
      <br />
      </div>
    </React.Fragment>
  ))
  .add('雅思报告页', () => (
    <React.Fragment>
      <div style={styles.container}>
      <table className={css(styles.table)}>
          {
            Array.isArray(tableBlank) &&
            <tbody className={css(styles.tbody)}>
              {
                Array.isArray(tableBlank) && tableBlank.map((line, index) => (
                  <tr
                    key={index}
                    className={css(styles.tr)}
                  >
                    {
                      Array.isArray(line) && line.map((row, index1) => {
                        let count = 0;
                        if (row.content.inlineMarkup && Array.isArray(row.content.inlineMarkup)) {
                          count = row.content.inlineMarkup.filter(item =>
                            item.type === 'BlankTable').length;
                        }
                        initAnswer += count;
                        return (
                          <th className={css(styles.tableCell)} key={index1}>
                            <Article
                              material={row.content}
                              isIelts={true}
                              answerRsult={[
                                {answer: "answer1|answer2|answer3", userAnswer: "answer and", isCorrect: false},
                                {answer: "answer1|answer2|answer3", userAnswer: "answer2", isCorrect: true},
                                {answer: "answer1|answer2|answer3", userAnswer: "answer1", isCorrect: true},
                                {answer: "answer1|answer2|answer3", userAnswer: "smart", isCorrect: false},
                                {answer: "answer1|answer2|answer3", userAnswer: "study", isCorrect: false},
                              ]}
                              answer={['答案一', '答案二', '答案三', '答案四']}
                              // qNum={['10', '11', '12', '13', '14']}
                              externalInitAnswer={initAnswer - count}
                              materialIds={[26142, 26143, 26144, 26145, 26146]}
                              isReport={true}
                              paragraphClassName={styles.paragraphClass}
                            />
                          </th>
                        );
                      })
                    }
                  </tr>
                ))
              }
            </tbody>
          }
        </table>
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
  ))
  .add('progressWidth', () => (
    <React.Fragment>
      <Audio
        src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'}
        progressWidth={520}
      ></Audio>
    </React.Fragment>
  ))
  .add('showPlayer', () => (
    <React.Fragment>
      <div style={{ width: '500px', height: '100px'}} >
      <Audio
        src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'}
        showPlayer={false}
      ></Audio>
      </div>
    </React.Fragment>
  ));
storiesOf('AudioPlayer', module)
  .add('内置了play, pause, unload, getStatus, setVolume的API', () => (
    <React.Fragment>
      <AudioPlayerDemo />
    </React.Fragment>
  ));

storiesOf('Recorder', module)
  .add('内置了init, start, pause, resume, stop, destroy的API', () => (
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