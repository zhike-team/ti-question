import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { Speaking } from '../../src/base';
import { SpeakingData } from './base_data';

// 阅读题目
export default class SpeakingView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ width: '1100px', height: '900px', alignItems: 'center' }}>
        <Speaking
          {...this.props}
          params={{ mode: 'package' }} // eslint-disable-line
          {...SpeakingData}
        />
      </View>
    );
  }
}
