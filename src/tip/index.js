import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from '@zhike/ti-ui';
import { Header } from '@zhike/ti-component';
import createHistory from 'history/createBrowserHistory';
import styles from './styles';

const history = createHistory();

// 阅读题目
export default class Tip extends Component {
  // 参数
  static propTypes = {
    params: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired,
  };

  componentDidMount() {
    Header.config({
      showButtons: [],
      unavailableButtons: [],
      isShowTime: false,
    });
  }

  // 渲染
  render() {
    const { params, step } = this.props;
    const search = global.location.search; // eslint-disable-line
    const { mode, exerciseId, practiceId } = params;
    return (
      <View className={styles.container}>
        <View className={styles.tip} >
          {/* <Image className={styles.image} src={require('components/assets/logo.png')} /> */}
          💡小提示
        </View>
        <View>• 本测试不支持Safari、IE和Edge浏览器，推荐使用Chrome</View>
        <View>• 提前准备好耳机和纸笔哦</View>
        <View>• 测试过程中不支持跳题或返回上一题</View>
        <Button
          className={styles.button}
          text="知道了"
          onClick={() => {
            history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index + 1}${search}`);
          }}
        />
      </View>
    );
  }
}
