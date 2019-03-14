import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { View, Button, Textarea, Image } from '@zhike/ti-ui';
import { Article, Modal, Header, Utils } from '@zhike/ti-component';
import styles from './styles';

const { countWords, getCursorPosition } = Utils;
// 阅读题目
export default class WirtingQuestion extends Component {
  // 参数
  static propTypes = {
    step: PropTypes.object.isRequired,
    stepRecord: PropTypes.object.isRequired,
    setStepRecord: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      count: 0,
      clipboard: '',
      interval: undefined,
    };
    this.textLimit = 500;
  }

  // 模块加载
  componentDidMount() {
    this.initAnswer(this.props.step.index, this.props.stepRecord.answer || '');
  }

  // 更新
  componentWillReceiveProps(nextProps) {
    if (this.props.step.index !== nextProps.step.index) {
      this.initAnswer(nextProps.step.index, nextProps.stepRecord.answer || '');
    }
  }

  // 模块卸载
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  // next function
  async nextFun(isNext = false) {
    const { count } = this.state;
    if (count > this.textLimit) {
      Modal.show('ModalAlert', {
        title: '字数超限无法提交',
        buttons: [{ title: 'OK' }],
        width: 400,
        component: (
          <View style={{ alignItems: 'center' }}>
            <Image style={{ height: 90 }} src={require('./assets/limit.png')} />
            <View style={{ marginTop: 20 }}>
              字数超过限制，最多{this.textLimit}个单词
            </View>
          </View>
        ),
      });
      return false;
    }
    await this.save(isNext);
    if (isNext) {
      Header.next();
    } else {
      Header.back();
    }
  }

  // 初始化答案
  initAnswer(stepId, answer) {
    const { mode } = this.props.params;
    const unavailableButtons = [];
    if (stepId === 1) unavailableButtons.push('back');
    if (mode === 'test' && (!answer)) unavailableButtons.push('testNext');
    if (mode === 'package' && (!answer || answer.length === 0)) unavailableButtons.push('next');
    console.log('Wirting:', this.props.stepRecord);
    Header.config({
      inherit: true,
      showButtons: mode === 'test' ? ['testNext', 'testStop'] : ['correct', 'back', 'next'],
      unavailableButtons,
      isShowTime: true,
      onClickNext: async () => {
        await this.nextFun(true);
      },
      onClickBack: async () => {
        await this.nextFun();
      },
    });

    if (this.state.interval) {
      clearInterval(this.state.interval);
    }

    this.setState({
      text: answer,
      count: countWords(answer),
      interval: setInterval(async () => {
        await this.save();
      }, 5000),
    });
    // 滚动到顶部
    if (this.anchor) {
      setTimeout(() => {
        this.anchor.scrollIntoView({
          behavior: 'smooth',
        });
      }, 50);
    }
  }

  // 监听文本变化
  handleTextChange(e) {
    const { mode } = this.props.params;
    if (e.target.value) {
      Header.config({
        inherit: true,
        unavailableButtons: [],
      });
    } else {
      Header.config({
        inherit: true,
        unavailableButtons: mode === 'test' ? ['testNext'] : [],
      });
    }
    this.setState({
      text: e.target.value,
      count: countWords(e.target.value),
    });
  }

  // 编辑当前文本
  editText(operation) {
    const { text, clipboard } = this.state;
    const cursor =
      getCursorPosition(this.textarea._reactInternalFiber.child.stateNode); // eslint-disable-line

    if (operation === 'copy' && cursor.start !== cursor.end) {
      this.setState({
        clipboard: cursor.text,
      });
    }

    if (operation === 'cut' && cursor.start !== cursor.end) {
      const newTextStart = text.substr(0, cursor.start);
      const newTextEnd = text.substr(cursor.end, text.length - cursor.end);
      const newText = newTextStart + newTextEnd;

      this.setState({
        text: newText,
        count: countWords(newText),
        clipboard: cursor.text,
      });
    }

    if (operation === 'paste') {
      const newTextStart = text.substr(0, cursor.start);
      const newTextEnd = text.substr(cursor.end, text.length - cursor.end);
      const newText = newTextStart + clipboard + newTextEnd;

      this.setState({
        text: newText,
        count: countWords(newText),
      });
    }
  }

  // 保存答案
  async save(isLast = false) {
    const { text } = this.state;
    const { setStepRecord } = this.props;
    if (countWords(text) <= this.textLimit) {
      await setStepRecord('answer', text, isLast);
    }
  }

  // 渲染
  render() {
    const { step } = this.props;
    const { text, count } = this.state;
    const { question } = step;
    const direction = get(question, 'materials.0.direction'); // 指导语
    const origin = get(question, 'materials.0.origin'); // 材料
    const stem = get(question, 'stem'); // 题目
    return (
      <View className={styles.container}>
        <View className={styles.articleWrapper}>
          <View className={styles.article}>
            <div ref={anchor => { this.anchor = anchor; }} />
            {
              direction && <Article material={direction} />
            }
            {
              origin && <Article material={origin} progressWidth={338} />
            }
            {
              stem && <Article material={stem} />
            }
          </View>
        </View>
        <View className={styles.editorWrapper}>
          <View className={styles.editorToolbar}>
            <Button
              className={styles.editorToolbarBtn}
              text="Copy"
              theme="hollow"
              onClick={() => this.editText('copy')}
            />
            <Button
              className={styles.editorToolbarBtn}
              text="Cut"
              theme="hollow"
              onClick={() => this.editText('cut')}
            />
            <Button
              className={styles.editorToolbarBtn}
              text="Paste"
              theme="hollow"
              onClick={() => this.editText('paste')}
            />
            <View className={styles.editorToolbarCount}>
              Word Count: {count}
            </View>
          </View>
          <Textarea
            ref={textarea => { this.textarea = textarea; }}
            className={styles.editorTextarea}
            value={text}
            onChange={e => this.handleTextChange(e)}
            placeholder={`You can only enter maximum of ${this.textLimit} words.`}
          />
        </View>
      </View>
    );
  }
}
