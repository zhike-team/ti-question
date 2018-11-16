import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, View } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { Article, Audio, Modal, Block } from '../src';
import { material1, material2, material3, tableBlank,
  material5, material6, material7, material8, material9,
  material10, material11, material12, material13, material14,
  question1, question2, p, p1, p2, answerAnalysis } from './article_data';
import { onShow, onHide } from './utils';
import RecorderDemo from './demo/recorder';
import AudioPlayerDemo from './demo/audio_player';
import styles from './styles';

// 使用docgen 从 Button 组件源码里分析出 propTypes

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
  .add('段落定位', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 文章样式：
        <br />
        <Article material={material1} question={question1}></Article>
      </div>
    </React.Fragment>
  ))
  .add('高亮/加粗/斜体/下划线', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 行内样式（一）
      <br />
        <Article material={material2}></Article>
      </div>
    </React.Fragment>
  ))
  .add('大/小标题 普通 上/下标', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 行内样式（二）
      <br />
      <Article material={material5}></Article>
      </div>
    </React.Fragment>
  ))
  .add('插入耳机， 插入黑块️， 插入箭头', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 行内样式（三）
      <br />
      <br />
      <Article
        material={material6}
        handleAnswer={e => { console.log('插入题 答案保存～', e)}}
        answer={['answer1']}
      ></Article>
      </div>
    </React.Fragment>
  ))
  .add('插入题 报告页演示', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 行内样式（三）
      <br />
      <br />
      <Article
        material={material14}
        question={question2}
        handleAnswer={e => { console.log('插入题 答案保存～', e)}}
        // answer={[1]}
        isReport={true}
      ></Article>
      </div>
    </React.Fragment>
  ))
  .add('插入短横线， 插入中横线， 插入长横线', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 行内样式（四）
      <br />      
      <Article material={material7}></Article>
      </div>
    </React.Fragment>
  ))
  .add('左对齐', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 段落样式（一）
      <br />      
      <Article material={material9}></Article>
      </div>
    </React.Fragment>
  ))
  .add('右对齐', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 段落样式（二）
      <br />      
      <Article material={material10}></Article>
      </div>
    </React.Fragment>
  ))
  .add('居中', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 段落样式（三）
      <br />      
      <Article material={material11}></Article>
      </div>
    </React.Fragment>
  ))
  .add('缩进', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 段落样式（一）
      <br />      
      <Article material={material8}></Article>
      </div>
    </React.Fragment>
  ))
  .add('添加图片', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 段落样式（二）
      <br />      
      <Article
        material={material12}
        paragraphClassName={styles.paragraph1}
      >
      </Article>
      </div>
    </React.Fragment>
  ))
  .add('添加音频', () => (
    <React.Fragment>
      <div style={styles.container}>
      富文本 段落样式（二）
      <br />      
      <Article
        material={material13}
        progressWidth={338}
        paragraphClassName={styles.paragraph2}
      ></Article>
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
  .add('question', () => (
    <React.Fragment>
      <div style={styles.container}>
        <Article material={material1} question={question1}></Article>
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
  .add('answer', () => (
    <React.Fragment>
      <div style={styles.container}>
        <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      </div>
    </React.Fragment>
  ))
  .add('isTextOnly', () => (
    <React.Fragment>
      <div style={styles.container}>
        <Block p={p1} isTextOnly={true}></Block>
      </div>
    </React.Fragment>
  ))
  .add('handleAnswer', () => (
    <React.Fragment>
      <div style={styles.container}>
        <Block p={p1} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}></Block>
      </div>
    </React.Fragment>
  ))
  .add('progressWidth', () => (
    <React.Fragment>
      <div style={styles.container}>
        <Block
          p={p2}
          progressWidth={338}
          paragraphClassName={styles.paragraph2}
        ></Block>
      </div>
    </React.Fragment>
  ))
  .add('isReport', () => (
    <React.Fragment>
      <div style={styles.container}>
        <Block p={p1} isReport={true}></Block>
      </div>
    </React.Fragment>
  ))
 //  answer, location, handleAnswer, insertSentence, hasAction, isPositionTip, paragraphClassName
 // qNum, externalInitAnswer, handleQuestionSelect, materialIds, answerRsult, isReport, isIelts
storiesOf('Audio', module)
  .add('src', () => (
    <React.Fragment>
      <div style={{ width: '500px', height: '100px'}} >
      <Audio
        src={'/atheneBackend/1539519944613QFkn3X.mp3'}
        cdnUrl={'https://media8.smartstudy.com/'}
      ></Audio>
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
  ))
  .add('cdnUrl (必传)', () => (
    <React.Fragment>
      <div style={{ width: '500px', height: '100px'}} >
      <Audio
        src={'/atheneBackend/1539519944613QFkn3X.mp3'}
        cdnUrl={'https://media8.smartstudy.com/'}
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
          getUploadSignature: () => {alert('上传纠错 postCorrection');},
          postCorrection: () => {alert('上传纠错 postCorrection');},
          step: {
            id: 1,
            practice: {id: 1001614, name: "测试 富文本渲染" },
            question: {id: 1006476, name: "测试 富文本渲染 Q1"},
          },
          isReport: false,
          })
        }
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
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
          isReport: false,
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
        }, onShow, onHide)}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ))
  .add('type ModalPreview', () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="图片预览"
        onClick={() => Modal.show('ModalPreview', {
          src:'http://img.zcool.cn/community/01d55b569c43fa6ac725af2356a161.jpg@1280w_1l_2o_100sh.jpg',
          hideHeader: true,
        })}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ))
  .add('type ModalAnalysis', () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="答案解析"
        onClick={() => Modal.show('ModalAnalysis', {
          answerAnalysis,
        })}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ))
  .add('type onShow', () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="我要纠错"
        onClick={() => Modal.show('ModalCorrect', {
          title: '我要纠错',
          width: 700,
          version: '1.0.0', // 请从common/config引用version字段
          source: 'ti-base', // 纠错来源
          getUploadSignature: () => {alert('上传纠错 postCorrection');},
          postCorrection: () => {alert('上传纠错 postCorrection');},
          step: {
            id: 1,
            practice: {id: 1001614, name: "测试 富文本渲染" },
            question: {id: 1006476, name: "测试 富文本渲染 Q1"},
          },
          isReport: false,
          }, onShow, null)
        }
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  ))
  .add('type onHide', () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="我要纠错"
        onClick={() => Modal.show('ModalCorrect', {
          title: '我要纠错',
          width: 700,
          version: '1.0.0', // 请从common/config引用version字段
          source: 'ti-base', // 纠错来源
          getUploadSignature: () => {alert('上传纠错 postCorrection');},
          postCorrection: () => {alert('上传纠错 postCorrection');},
          step: {
            id: 1,
            practice: {id: 1001614, name: "测试 富文本渲染" },
            question: {id: 1006476, name: "测试 富文本渲染 Q1"},
          },
          isReport: false,
          }, null, onHide)
        }
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  ))
  .add('type isUnhide', () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="提示弹框"
        onClick={() => Modal.show('ModalAlert', {
          title: '温馨提示',
          isUnhide: true,
          buttons: [{
            title: '开始测评',
            onClick: () => {
              alert('开始测评～～');
            },
            class: 'alertTip',
          }],
          width: 400,
          isReport: false,
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
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ));
