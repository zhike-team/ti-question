import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, findIndex } from 'lodash';
import { View, Scrollbar } from '@zhike/ti-ui';
import { AudioPlayer, Header } from '@zhike/ti-component';
import Question from '../question';
import Article from '../article';

import styles from './styles';

// 单项选择题
export default class listeningQuestion extends Component {
  // 参数
  static defaultProps = {
  };
  static propTypes = {
    step: PropTypes.object.isRequired,
    newSetStepRecord: PropTypes.func.isRequired,
    newSetRecord: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    cdnUrl: PropTypes.string.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // 模块加载
  async componentDidMount() {
    this.setHeader(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setHeader(nextProps);
  }

  // 设置头部
  setHeader(props) {
    const { params } = props;
    let showButtons = [];
    if (params.mode === 'package') {
      showButtons = ['next'];
    } else {
      showButtons = ['correct', 'pause', 'submit', 'volume'];
    }
    const unavailableButtons = [];
    Header.config({
      inherit: true,
      showButtons,
      unavailableButtons,
      isShowTime: true,
      onClickNext: () => {
        Header.next();
      },
    });
    setTimeout(() => {
      // 当head设置的参数返回之后, 播放音频
      this.playAudio();
    }, 300);
  }
  // 按照顺序，获取指导语音频以及材料音频。
  getAudioMaterial(step) {
    const audioMaterials = [];
    const { params, cdnUrl } = this.props;
    function getAudio(item) {
      const instructionalAudio = get(item, 'extra.instructionalAudio.src');
      const instructionalAudioName = get(item, 'extra.instructionalAudio.name');
      if (instructionalAudio) {
        audioMaterials.push({
          src: instructionalAudio,
          name: instructionalAudioName,
        });
      }
      const audioMaterial = get(item, 'extra.audioMaterial.src');
      const audioMaterialName = get(item, 'extra.audioMaterial.name');
      const isRepeatSrc = findIndex(audioMaterials, { name: audioMaterialName || '' });
      if (audioMaterial && isRepeatSrc === -1) {
        audioMaterials.push({
          src: audioMaterial,
          name: audioMaterialName,
        });
      }
    }
    let question;
    if (params.mode === 'package') {
      question = step && [step.question] || [];
    } else {
      question = step.practice && step.practice.questions && step.practice.questions || [];
    }
    Array.isArray(question) && question.map(item => {
      getAudio(item);
      return false;
    });

    const newAudioMaterials = audioMaterials.map(item => {
      const newSrc = item.src.indexOf('//') === -1 ? `${cdnUrl}/${item.src}` : item.src;
      return newSrc;
    });
    return newAudioMaterials;
  }

  // 播放音频
  async playAudio() {
    const { step } = this.props;
    // 获取音频， 并传给头部
    const audioMaterials = await this.getAudioMaterial(step);
    AudioPlayer.play({
      src: audioMaterials,
      onEnd: () => {
        Header.config({
          unavailableButtons: ['pause'],
          inherit: true,
        });
      },
    });
  }
  // 渲染
  render() {
    const { step, newSetRecord, newSetStepRecord, params } = this.props;
    let questions = [];
    if (params.mode === 'package') {
      questions.push(step.question);
    } else {
      questions = step.practice.questions; // eslint-disable-line
    }
    const { material } = step.practice || {};
    const renderProps = {
      newSetStepRecord,
      newSetRecord,
      step,
      params,
    };
    return (
      <Scrollbar
        className={styles.container}
      >
        <View className={styles.articleWrapper}>
          <View className={styles.article}>
            <View className={styles.articleTitle}>{material && material.title}</View>
            {
              material && <Article material={step.practice.material.origin} />
            }
          </View>
        </View>
        <View className={styles.questionWrapper}>
          <View className={styles.questions}>
            {
              Array.isArray(questions) &&
              questions.map((item, index) => (
                <View key={index} className={styles.question}>
                  <Question question={item} {...renderProps} />
                </View>))
            }
          </View>
        </View>
      </Scrollbar>
    );
  }
}

