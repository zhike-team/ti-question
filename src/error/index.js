import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import { View, Image, Button } from '@zhike/ti-ui';
import styles from './styles';

// 初始化
export default class Error extends Component {
  // 参数
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  // 加载
  componentDidMount() {
    global.document.title = 'Oops... 发生错误 - 智课';
  }

  // 重试
  retry() {
    const { retryUrl } = this.props.match.params;
    global.location.href = decodeURIComponent(retryUrl);
  }

  // 渲染
  render() {
    const { type } = this.props.match.params;
    if (type === 'loading') {
      return (
        <View className={styles.container}>
          <Image
            className={styles.image}
            src={require('./assets/loading.png')}
          />
          <View>
            <View className={styles.text}>题目加载失败...</View>
            <View className={styles.text}>请检查您是否已经登录或联系我们的客服人员</View>
            <View className={styles.text}>电话：400-011-9191</View>
          </View>
        </View>
      );
    }

    if (type === 'compatible') {
      return (
        <View className={styles.container}>
          <Image
            className={styles.image}
            src={require('./assets/loading.png')}
          />
          <View className={styles.text}>暂不支持当前浏览器...</View>
          <View className={styles.text}>
            <a
              style={{ color: '#fff' }}
              href="http://www.google.cn/chrome/browser/desktop/index.html"
              target="_blank" // eslint-disable-line
            >
              请下载最新版本Chrome浏览器
            </a>
          </View>
        </View>
      );
    }

    if (type === 'multiple') {
      return (
        <View className={styles.container}>
          <Image
            className={styles.image}
            src={require('./assets/loading.png')}
          />
          <View className={styles.text}>对于同一场练习，暂不支持打开多个标签页...</View>
          <View className={styles.text}>请在原标签页作答，或者关闭原标签页重新打开练习</View>
        </View>
      );
    }

    if (type === 'upload') {
      return (
        <View className={styles.container}>
          <Image
            className={styles.image}
            src={require('./assets/save.png')}
          />
          <View className={styles.text}>答案上传失败...</View>
          <View className={styles.text}>请检查网络，并点击下面的按钮重新提交答案</View>
          <Button
            className={styles.button}
            textClassName={styles.buttonText}
            text="重试"
            theme="hollow"
            onClick={() => this.retry()}
          />
          <View className={styles.text}>如果还有问题，请联系我们的客服人员</View>
          <View className={styles.text}>电话：400-011-9191</View>
        </View>
      );
    }

    if (type === 'save') {
      return (
        <View className={styles.container}>
          <Image
            className={styles.image}
            src={require('./assets/save.png')}
          />
          <View className={styles.text}>无法连接到网络，请尝试以下解决方案：</View>
          <div className={css(styles.project)}>
            <View className={styles.project1}>
              <View className={styles.text}>方案一：请检查网络连接是否正常，正常后点击“重试”按钮；</View>
              <Button
                className={styles.button}
                textClassName={styles.buttonText}
                text="重试"
                theme="hollow"
                onClick={() => this.retry()}
              />
            </View>
            <View className={[styles.text, styles.project2]}>方案二：关闭此页面，尝试重新进入（已保存的答案不会丢失）</View>
          </div>
          <View className={styles.text} style={{ paddingTop: '80px' }}>如果还有问题，请联系我们的客服人员</View>
          <View className={styles.text}>电话：400-011-9191</View>
        </View>
      );
    }

    return <View />;
  }
}
