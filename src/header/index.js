import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { View, Image, Button } from '@zhike/ti-ui';
import { Modal, AudioPlayer, Recorder } from '@zhike/ti-component';
import { formatDuration } from '../utils';
import styles from './styles';

const history = createHistory();
// 初始状态
const initialOptions = {
  exerciseId: undefined,
  stepId: undefined,
  showButtons: [], // 'next', 'viewText', 'viewQuestion'
  unavailableButtons: [], //
  isShowTime: false,
  isShowShortcutTip: false,
  onClickNext: undefined,
};

// 页面头部
export default class Header extends Component {
    static instance;
    // 设置头部
    static config(options = {}) {
      if (this.instance) {
        this.instance.setState({
          options: Object.assign(
            {},
            initialOptions,
            options.inherit ? this.instance.state.options : {},
            options,
          ),
        });
      } else {
        setTimeout(() => {
          this.config(options);
        }, 100);
      }
    }

    // 下一步
    static next() {
      this.instance && this.instance.next();
    }

    // 设置倒计时
    static setTimer(options) {
      this.instance && this.instance.setTimer(options);
    }

    // 清空倒计时
    static cleanTimer() {
      if (this.instance) {
        this.instance.cleanTimer();
      }
    }

    // 开启计时
    static startTimer() {
      this.instance && this.instance.setState({
        isPauseTimer: false,
      });
    }

    // 暂停计时
    static pauseTimer() {
      this.instance && this.instance.setState({
        isPauseTimer: true,
      });
    }

    // 开启计时（弹窗）
    static startTimerForModal() {
      this.instance && this.instance.setState({
        isPauseTimerForModal: false,
      });
    }

    // 暂停计时（弹窗）
    static pauseTimerForModal() {
      this.instance && this.instance.setState({
        isPauseTimerForModal: true,
      });
    }

    // 获取计时
    static getTime() {
      return this.instance.props.timer ? (this.instance.props.timer.time || 0) : 0;
    }

    // 参数
    static propTypes = {
      name: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
      step: PropTypes.object.isRequired,
      stepList: PropTypes.array.isRequired,
      timer: PropTypes.object.isRequired,
      setTimer: PropTypes.func.isRequired,
      postDuration: PropTypes.func.isRequired,
    };
    // 构造函数
    constructor(props) {
      super(props);
      this.state = Object.assign({
        options: initialOptions,
        isPauseTimer: false,
        isPauseTimerForModal: false,
        isShowVolume: true,
        volume: 1,
      });
      this.saveDurationTime = 0;
      this.setIntervalTime = null;
    }

    // 模块加载
    componentDidMount() {
      const { name, step } = this.props;
      global.document.title = name;
      if (step.index > 1) {
        setTimeout(() => {
          this.resetTimer(this.props);
        }, 100);
        if (['ToeflReading', 'ToeflListening', 'ReadingQuestion', 'ListeningQuestion'].indexOf(step.type) !== -1) {
          if (!this.setIntervalTime) this.setIntervalTime = setInterval(() => this.countDown(), 1000);
        }
      }
      global.document.addEventListener('keydown', this.onArrowRightDown);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.step.index !== this.props.step.index && nextProps.step.index > 1) {
        setTimeout(() => {
          this.resetTimer(this.props);
        }, 100);
        if (['ToeflReading', 'ToeflListening', 'ReadingQuestion', 'ListeningQuestion'].indexOf(nextProps.step.type) !== -1) {
          if (!this.setIntervalTime) this.setIntervalTime = setInterval(() => this.countDown(), 1000);
          console.log('this.setIntervalTime:', this.setIntervalTime);
        }
      }
    }

    // 模块销毁
    componentWillUnmount() {
      if (this.setIntervalTime) {
        clearInterval(this.setIntervalTime);
      }
      global.document.removeEventListener('keydown', this.onArrowRightDown);
    }

    // 设置计时器
    setTimer(value) {
      const { timer, setTimer } = this.props;
      const { mode, exerciseId } = this.props.params;
      setTimer({
        mode,
        id: exerciseId,
        value: Object.assign({}, timer, value),
      });
    }

    // 清空计时器
    cleanTimer() {
      const { setTimer } = this.props;
      const { mode, exerciseId } = this.props.params;

      setTimer({
        mode,
        id: exerciseId,
        value: {},
      });
    }

    // 重设计时器
    resetTimer(nextProps) {
      const { timer } = nextProps;
      // 监测是否开始倒计时
      if (JSON.stringify(timer) === '{}') {
        this.setTimer({
          time: 30 * 60 * 1000,
          isEnd: false,
        });
        this.alertTimeExpried = false;
      }
    }

    // 暂停计时
    pauseTimer() {
      this.setState({
        isPauseTimer: true,
      });
    }

    // 开启计时
    startTimer() {
      this.setState({
        isPauseTimer: false,
      });
    }

    // 下一步
    next() {
      const { step, params } = this.props;
      const { mode, exerciseId, practiceId } = params;
      const search = global.location.search; // eslint-disable-line
      history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index + 1}${search}`);
    }

    // 处理倒计时结束
    handleTimeExpried() {
      const { stepList } = this.props;
      const { mode, exerciseId, practiceId } = this.props.params;
      const search = global.location.search; // eslint-disable-line
      const stepId = stepList[stepList.length - 1] && stepList[stepList.length - 1].id;
      history.push(`/${mode}/${practiceId}/${exerciseId}/${stepId}${search}`);
    }

    // 倒计时
    countDown() {
      const { timer } = this.props;
      const { isPauseTimer, isPauseTimerForModal } = this.state;
      // 如果是非做题页 不保存时间
      if (timer.isEnd && !this.alertTimeExpried) {
        Modal.show('ModalAlert', {
          title: '提示',
          width: 400,
          isUnhide: true,
          buttons: [
            { title: '提交', onClick: () => this.handleTimeExpried() },
          ],
          component: (
            <View className={styles.modalAlert}>
              <Image
                className={styles.modalAlertImage}
                src={require('./assets/default.png')}
              />
              <View className={styles.modalAlertText}>
                时间已耗尽，点击“提交”生成测评报告
              </View>
            </View>),
        }, this.onShow, this.onHide);
        this.alertTimeExpried = true;
      }
      if (timer.isEnd || isPauseTimer || isPauseTimerForModal) return false;
      const cntTime = Math.max(0, timer.time - 1000);
      const cntIsEnd = cntTime === 0;
      this.setTimer({
        time: cntTime,
        isEnd: cntIsEnd,
      });
    }

    // 隐藏显示时间
    toggleTimer() {
      const { timer } = this.props;

      this.setTimer({
        isHide: !timer.isHide,
      });
    }

    // 隐藏显示音量
    toggleVolume() {
      const { isShowVolume } = this.state;
      this.setState({
        isShowVolume: !isShowVolume,
      });
    }
    // 调整音量
    adjustVolume(status, event) {
      if (status === 'start') {
        global.window.onmouseup = () => this.adjustVolume('end');
        global.window.onmousemove = event => this.adjustVolume('adjust', event);
      }
      if (status === 'end') {
        global.window.onmouseup = undefined;
        global.window.onmousemove = undefined;
      }
      if (status === 'adjust') {
        const processBar =
          /* eslint-disable */
          ReactDOM.findDOMNode(this.volumeProcessBar).getBoundingClientRect();
          /* eslint-enable */
        const offset = event.x - (processBar.x || processBar.left);
        const volume = Math.max(Math.min(offset / processBar.width, 1), 0);
        this.setState({
          volume,
        });
        AudioPlayer.setVolume(volume);
      }
    }

    // 按下rightArrow键（绑定this到实例，并确保事件可卸载）
    onArrowRightDown = event => {
      const { altKey, ctrlKey, metaKey, shiftKey, keyCode } = event;
      const { unavailableButtons, onClickNext } = this.state.options;
      const isAvailable = unavailableButtons.indexOf('next') === -1;
      isAvailable && !altKey && !ctrlKey && !metaKey && !shiftKey && keyCode === 39 &&
      !this.alertTimeExpried && this.nextStep(onClickNext);
    }

    // 点击下一题
    async nextStep(onClickNext, unavailableButtons = []) {
      if (onClickNext) {
        await onClickNext();
      } else {
        this.next();
      }

      this.toggleShortcut(unavailableButtons, false);
    }
    // Next按钮鼠标hover提示快捷键
    toggleShortcut(unavailableButtons, isShowShortcutTip) {
      const isAvailable = unavailableButtons.indexOf('next') === -1;
      this.setState({
        isShowShortcutTip: isAvailable && isShowShortcutTip,
      });
    }

    // 渲染
    render() {
      const { timer, step, name, params } = this.props;
      const search = global.location.search; // eslint-disable-line
      const {
        showButtons, isShowTime, unavailableButtons, onClickNext,
      } = this.state.options;
      console.log('this.state.options:', this.state.options);
      const { mode, exerciseId, practiceId } = params;
      const { questionIndex, questionCount } = step;
      const { volume, isShowVolume, isShowShortcutTip } = this.state;

      return (
        <View className={styles.container}>
          <View className={styles.title}>
            <Image
              className={styles.titleLogo}
              src={require('./assets/logo.png')}
            />
            <View className={styles.titleSplit} />
            <View className={styles.titleText}>{name}</View>
          </View>
          {
            step.questionIndex > 1 &&
            <View className={styles.question}>
              <View>Question {questionIndex} of {questionCount}</View>
            </View>
          }
          <View>
            <View className={styles.normalButtons}>
              {
                isShowTime &&
                <View>
                  {
                    !timer.isHide &&
                    <View className={styles.buttonTimeTest}>
                      <Image className={styles.timeIcon} src={require('./assets/time.png')} />
                      {formatDuration(timer.time || 0, true)}
                    </View>
                  }
                </View>
              }
              {
                showButtons.indexOf('volume') !== -1 &&
                <View className={styles.volumeWrapper}>
                  <Button
                    className={styles.button}
                    leftIcon={require('./assets/volume.png')}
                    isAvailable={unavailableButtons.indexOf('volume') === -1}
                    text="Volume"
                    onClick={() => this.toggleVolume()}
                  />
                  {
                    isShowVolume &&
                    <View
                      className={styles.volume}
                    >
                      <View
                        ref={
                          volumeProcessBar => {
                            this.volumeProcessBar = volumeProcessBar;
                          }
                        }
                        className={styles.volumeProcessBarWrapper}
                      >
                        <View
                          className={styles.volumeProcessBar}
                          style={{ width: volume * 66 }}
                        />
                        <View
                          className={styles.volumeProcessCircle}
                          style={{ left: volume * 66 - 5 }}
                          onMouseDown={() => this.adjustVolume('start')}
                        />
                      </View>
                      <View className={styles.volumeTriangle} />
                    </View>
                  }
                  {
                    isShowVolume &&
                    <View
                      className={styles.volumeBodyWrapper}
                      onClick={() => this.toggleVolume()}
                    />
                  }
                </View>
              }
              {
                showButtons.indexOf('viewText') !== -1 &&
                <Button
                  className={styles.button}
                  isAvailable={unavailableButtons.indexOf('viewText') === -1}
                  text="View Text"
                  onClick={() => {
                    history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index}/ViewText${search}`);
                  }}
                />
              }
              {
                showButtons.indexOf('viewQuestion') !== -1 &&
                <Button
                  className={styles.button}
                  isAvailable={unavailableButtons.indexOf('viewQuestion') === -1}
                  text="View Question"
                  onClick={() => {
                    history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index}${search}`);
                  }}
                />
              }
              {
                showButtons.indexOf('next') !== -1 &&
                <View
                  className={styles.shortcutTipWrapper}
                  onMouseEnter={() => this.toggleShortcut(unavailableButtons, true)}
                  onMouseLeave={() => this.toggleShortcut(unavailableButtons, false)}
                >
                  <Button
                    className={styles.button}
                    rightIcon={require('./assets/next.png')}
                    isAvailable={unavailableButtons.indexOf('next') === -1}
                    text={step.questionIndex && step.questionIndex === step.questionCount ? 'Submit' : 'Next'}
                    onClick={() => this.nextStep(onClickNext)}
                  />
                  {
                    isShowShortcutTip &&
                    <View className={styles.shortcutTip}>快捷键：&#8594;</View>
                  }
                </View>
              }
            </View>
          </View>
          <Modal ref={modal => { Modal.instance = modal; }} />
          <AudioPlayer ref={audioPlayer => { AudioPlayer.instance = audioPlayer; }} />
          <Recorder ref={recorder => { Recorder.instance = recorder; }} />
        </View>
      );
    }
}
