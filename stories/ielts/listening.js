import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { IeltsListening } from '../../src/ielts';
import { IeltsListeningData } from './ielts_data';

// 阅读题目
export default class IeltsListeningView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ height: '900px' }}>
        <IeltsListening
          {...this.props}
          params={{ mode: 'package' }} // eslint-disable-line
          {...IeltsListeningData}
        />
      </View>
    );
  }
}
