import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { ToeflListenPlayer } from '../../src/toefl';
import { ToeflListenPlayerData } from './toefl_data';

// 阅读题目
export default class ToeflListenPlayerView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ height: '900px' }}>
        <ToeflListenPlayer
          {...this.props}
          params={this.props.match} // eslint-disable-line
          {...ToeflListenPlayerData}
        />
      </View>
    );
  }
}
