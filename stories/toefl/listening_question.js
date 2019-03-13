import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { ToeflListening } from '../../src/toefl';
import { ToeflListeningData } from './toefl_data';

// 阅读题目
export default class ChooseOneView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ height: '900px' }}>
        <ToeflListening
          {...this.props}
          params={this.props.match} // eslint-disable-line
          {...ToeflListeningData}
        />
      </View>
    );
  }
}
