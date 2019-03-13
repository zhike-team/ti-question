import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { Writing } from '../../src/base';
import { WritingData } from './base_data';

// 阅读题目
export default class WritingView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ heigth: '900px' }}>
        <Writing
          {...this.props}
          params={{ mode: 'package' }} // eslint-disable-line
          {...WritingData}
        />
      </View>
    );
  }
}
