import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from '@zhike/ti-ui';
import { Modal, Recorder, Utils } from '@zhike/ti-component';
import { statusDict, canNot } from './status';
import Pronounce from './pronounce';
import RawAndFlag from './raw_and_flag';
import styles from './styles';

const { smoothScroll } = Utils;
/**
 * 这个组件的状态管理非常繁杂，要特别小心
 */

export default class Content extends Component {
  static defaultProps = {
    getSentenceIndex: active => active,
  };

  static propTypes = {
    repeatPart: PropTypes.object.isRequired,
    answersDict: PropTypes.object.isRequired,
    handleRecord: PropTypes.func.isRequired,
    handlePigai: PropTypes.func.isRequired,
    handleFeedback: PropTypes.func.isRequired,
    getSentenceIndex: PropTypes.func, // 多个材料时, 计算句子的唯一索引应该由父组件完成, 当前组件只负责处理当前材料, 不应该也不必要知道一共有多少个材料, 以及自己是第几个材料
    cdnUrl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.timer = null;
    this.AudioTimer = null;
    this.AudioPlayer = null;
    this.RecordPlayer = null;
    this.state = {
      active: 0, // 当前跟读的句子
      status: '', // 状态控制
    };
    // 判断是否是老师身份，如果是禁止录音功能
    const search = global.location.search; // eslint-disable-line
    const role = decodeURIComponent(search.match(new RegExp('[?#&]role=([^?#&]+)', 'i')) ? RegExp.$1 : '');
    if (role === 'teacher') this.isTeacher = true;
  }

  componentDidMount() {
    this.initPlayer({
      player: 'Audio',
      src: this.props.repeatPart.src,
      cdnUrl: this.props.cdnUrl,
      callback: () => this.switchCurrentRepeat({ index: 0, autoPlay: false }), // 初始化时不自动播放
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.repeatPart.src !== this.props.repeatPart.src) {
      this.initPlayer({
        player: 'Audio',
        src: this.props.repeatPart.src,
        cdnUrl: this.props.cdnUrl,
        callback: () => this.switchCurrentRepeat({ index: 0, autoPlay: false }),
      });
    }
  }

  componentWillUnmount() {
    this.clearStatus();
  }

  // 清除一切可能正在进行的状态：播放音频材料/录音/播放用户的录音
  clearStatus = async () => {
    const { status } = this.state;

    switch (status) {
      case 'playingAudio': {
        await this.toggleAudioPlay({ force: 'pause' });
        break;
      }
      case 'recording': {
        await this.toggleRecorder({ autoUpload: false, force: 'stop' });
        break;
      }
      case 'playingRecord': {
        await this.toggleRecordPlay({ force: 'pause' });
        break;
      }
      case 'loadingAudio': {
        break;
      }
      default: {
        status && await this.setState({ status: '' });
        break;
      }
    }
  }

  /**
   * 初始化音频材料/用户录音播放器
   * player: 播放器名称，可选Audio，Record
   * src: 音频链接
   * callback: 音频加载完成之后的回调函数，比如自动播放什么的
   */
  initPlayer = async ({ player, src, cdnUrl, callback }) => {
    await this.clearStatus();
    await this.setState({ status: `loading${player}` });

    if (!src.includes('http')) src = `${cdnUrl}/${src}` // eslint-disable-line

    this[`${player}Player`] = new global.window.Audio(src);

    this[`${player}Player`].onloadedmetadata = async () => {
      await this.setState({ status: '' }, callback);
    };
    this[`${player}Player`].onplay = async () => {
      await this.setState({ status: `playing${player}` });
    };
    this[`${player}Player`].onpause = async () => {
      await this.setState({ status: '' });
    };
    this[`${player}Player`].onended = async () => {
      await this.setState({ status: '' });
    };
  }

  /**
   * 切换当前跟读的句子
   * index: 句子在translation数组中的索引
   * autoPlay: 切换后是否自动播放句子音频
   */
  switchCurrentRepeat = async ({ index, autoPlay = true }) => {
    await this.clearStatus();

    const element = global.document.querySelector(`#item-${index}`)
    element && smoothScroll({
      element,
      position: 'start',
      duration: 500,
      callback: async () => {
        if (this.state.active !== index) {
          await this.setState({ active: index });
        }
        autoPlay && this.toggleAudioPlay({ force: 'play' });
      },
    })
  }

  // 切换音频材料播放/暂停，优先基于强制命令执行, 否则自动根据当前状态切换即可
  toggleAudioPlay = async ({ force }) => {
    const { translation } = this.props.repeatPart;
    const { active, status } = this.state;
    const { start, end } = translation[active];

    if (['playingRecord'].includes(status)) {
      await this.clearStatus();
    }

    const pause = () => {
      this.AudioPlayer.pause();
      clearTimeout(this.AudioTimer);
    }
    const play = () => {
      if (status !== 'loadingAudio') {
        this.AudioPlayer.currentTime = start;
        this.AudioPlayer.play().then(() => {
          // 用定时器而不是 ontimeupdate 这个 api 的原因是，需要精确到10ms级，原生的精度是250ms
          this.AudioTimer = setTimeout(() => {
            // console.log(start, this.AudioPlayer.currentTime, end)
            this.state.status = 'playingAudio' && pause();
          }, 1000 * (end - start));
        });
      }
    };

    if (force) {
      force === 'pause' ? pause() : force === 'play' ? play() : '';
    } else if (canNot.playAudio.includes(status)) {
      return false;
    } else if (status === 'playingAudio') {
      pause();
    } else {
      play();
    }
  }

  // 切换录音状态，优先基于强制命令执行, 否则自动根据当前状态切换即可
  // autoUpload 的作用在于放弃录音或者需要将上传录音操作后置的情况下，不主动调用上传录音操作
  // nextStatus: 在录音超时的时候需要将状态设为 timeUp ，避免出现已保存的答案
  toggleRecorder = async ({ force, autoUpload = true, nextStatus = '' }) => {
    if (this.isTeacher) return false;
    const { status } = this.state;

    if (['playingAudio', 'playingRecord'].includes(status)) {
      await this.clearStatus();
    }

    const stop = () => {
      clearInterval(this.timer);

      return Recorder.stop().then(res => {
        if (autoUpload) {
          this.uploadRecord({ data: res });
        } else {
          this.setState({ status: nextStatus });
        }
        return res;
      });
    };
    const start = () => {
      Recorder.start({ callback: () => {
        let time = 0;
        this.setState({ status: 'recording' });

        this.timer = setInterval(() => {
          time += 1;
          if (time >= 60) { // 录音时间限制60s
            this.toggleRecorder({
              autoUpload: false,
              force: 'stop',
              nextStatus: 'timeUp',
            }).then(res => {
              this.onTimeUp(res);
            });
          }
        }, 1000);
      } });
    };

    if (force) {
      return force === 'stop' ? stop() : force === 'start' ? start() : '';
    } else if (canNot.record.includes(status)) {
      return false;
    } else if (status === 'recording') {
      return stop();
    } else {
      return start();
    }
  }

  // 切换用户录音播放/暂停，优先基于强制命令执行, 否则自动根据当前状态切换即可
  toggleRecordPlay = async ({ force }) => {
    const { getSentenceIndex, answersDict, cdnUrl } = this.props;
    const { status, active } = this.state;
    const answerIndex = getSentenceIndex(active);
    const answer = answersDict.answers[answerIndex];

    if (['playingAudio'].includes(status)) {
      await this.clearStatus();
    }

    const pause = () => this.RecordPlayer.pause();
    const play = () => {
      if (this.RecordPlayer && this.RecordPlayer.currentSrc === answer.answer.audioUrl) {
        this.RecordPlayer.currentTime = 0;
        this.RecordPlayer.play();
      } else {
        this.initPlayer({
          player: 'Record',
          src: answer.answer.audioUrl,
          cdnUrl,
          callback: () => this.RecordPlayer.play(),
        });
      }
    };

    if (force) {
      force === 'pause' ? pause() : force === 'play' ? play() : '';
    } else if (canNot.playRecord.includes(status)) {
      return false;
    } else if (status === 'playingRecord') {
      pause();
    } else {
      play();
    }
  }

  // 60s录音时间到，停止录音并强制要求用户提交
  onTimeUp = data => {
    Modal.show('ModalAlert', {
      title: '提示',
      buttons: [{
        title: '好的',
        onClick: () => this.uploadRecord({ data }),
      }],
      isUnhide: true,
      width: 400,
      component: (
        <View className={styles.modalAlert}>
          <Image
            className={styles.modalAlertImage}
            src={require('./assets/timeup.png')}
          />
          <View className={styles.modalAlertText}>
            录音时间已达上限咯~
          </View>
        </View>
      ),
    });
  }

  /**
   * 上传用户录音，具体上传方法由父组件传入，并返回一个Promise
   * 跟读习题和跟读专项训练都会调用该组件，所以组件不关心具体上传方法，只关心成功与否
   * data: 用户的录音数据
   * index: 上传的等待过程中，不能保证用户不会手痒切换句子，甚至切换材料，
   * 所以上传一开始就要把这个数据记录下来，这一思想会延续到上传及批改结束
   */
  uploadRecord = async ({ data }) => {
    const { repeatPart, getSentenceIndex, handleRecord } = this.props;
    const { active } = this.state;
    const index = getSentenceIndex(active);
    const transcript = repeatPart.translation[active].raw;
    await this.setStateIfNeed({ prevIndex: index, nextStatus: 'uploading' });

    await handleRecord({ data }).then(url => {
      this.uploadPigai({ url, index, transcript });
    }).catch(() => {
      this.setStateIfNeed({ prevIndex: index, nextStatus: 'uploadError' });
    });
  }

  /* 用户录音提交批改，在上传成功后调用，同上，不关心具体上传方法
   * url: 已经上传的音频链接
   * index: 句子索引，作用见上
   * transcript: 句子原文
   */
  uploadPigai = async ({ url, index, transcript }) => {
    const { handlePigai } = this.props;
    await this.setStateIfNeed({ prevIndex: index, nextStatus: 'pigaiing' });

    await handlePigai({ url, index, transcript }).then(() => {
      this.setStateIfNeed({ prevIndex: index, nextStatus: '' });
    }).catch(() => {
      this.setStateIfNeed({ prevIndex: index, nextStatus: 'uploadError' });
    });
  }

  /**
   * 这一步风骚的操作的目的，理念和之前的上传和批改过程是一致的，
   * 即：假使在上传或者批改的等待过程中，用户切换音频材料或者句子，
   * 那么这时候已经触发了清理状态的函数，之后返回的上传或者批改结果的状态，
   * 是切换前的句子的状态，并非当前句子的，所以不应该再把状态更新到当前句子
   */
  setStateIfNeed = async ({ prevIndex, nextStatus }) => {
    const index = this.props.getSentenceIndex(this.state.active);

    if (prevIndex === index) {
      await this.setState({ status: nextStatus });
    } else {
      console.warn('current active changed', prevIndex, index);
    }
  }

  // tips中的反馈二字可点击
  parseTips = tips => {
    if (tips && tips.includes('反馈')) {
      const index = tips.indexOf('反馈');

      return (
        <span>
          {tips.substring(0, index)}
          <span style={{ color: '#385DAE', cursor: 'pointer' }} onClick={this.props.handleFeedback}>
          反馈
          </span>
          {tips.substring(index + 2, undefined)}
        </span>
      );
    } else {
      return tips;
    }
  }

  render() {
    const { repeatPart, answersDict, getSentenceIndex } = this.props;
    const { direction, hideRaw, translation } = repeatPart;
    const { active, status } = this.state;

    return (
      <View className={styles.container}>
        {
          direction && <View className={styles.direction}>{direction}</View>
        }
        <View className={styles.content}>
          {
            translation.map((item, index) => {
              const answerIndex = getSentenceIndex(index);
              const answer = !(active === index && canNot.showAnswer.includes(status)) &&
                 answersDict.answers[answerIndex] || null;

              return (
                <View
                  key={index}
                  id={`item-${index}`}
                  className={[styles.item, active !== index && styles.clickable]}
                  onClick={() => active !== index && this.switchCurrentRepeat({ index })}
                >
                  <RawAndFlag
                    raw={item.raw}
                    answer={answer}
                    hideRaw={hideRaw}
                    active={active === index}
                  />
                  {
                    active === index &&
                    <View className={styles.recorder}>
                      <Image
                        className={[
                          styles.side,
                          status === 'playingAudio' && styles.shining,
                        ]}
                        onClick={() => this.toggleAudioPlay({})}
                        style={{ cursor: canNot.playAudio.includes(status) ? 'not-allowed' : 'pointer' }}
                        src={require(status === 'loadingAudio'
                          ? './assets/loading.gif'
                          : status === 'playingAudio'
                            ? './assets/pause.png'
                            : './assets/play.png')
                        }
                      />
                      <Image
                        className={styles.main}
                        onClick={() => this.toggleRecorder({})}
                        style={{ cursor: (canNot.record.includes(status) || this.isTeacher) ? 'not-allowed' : 'pointer' }}
                        src={require(status === 'uploading' || status === 'pigaiing'
                          ? './assets/loading.gif'
                          : status === 'recording'
                            ? './assets/recorder.gif'
                            : './assets/recorder.png')
                        }
                      />
                      <Image
                        className={styles.side}
                        onClick={() => answer && this.toggleRecordPlay({})}
                        style={{ cursor: !answer || canNot.playRecord.includes(status) ? 'not-allowed' : 'pointer' }}
                        src={require(!answer
                          ? './assets/no_speaker.png'
                          : status === 'loadingRecord'
                            ? './assets/loading.gif'
                            : status === 'playingRecord'
                              ? './assets/speaker.gif'
                              : './assets/speaker.png')
                        }
                      />
                      <View
                        className={[styles.tips, statusDict[status].type === 'error' && styles.error]}
                      >
                        {this.parseTips(statusDict[status].text)}
                      </View>
                    </View>
                  }
                  {
                    active === index &&
                    <Pronounce answer={answer} disabled={canNot.playPronounce.includes(status)} />
                  }
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
}
