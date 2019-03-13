import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { IeltsReading } from '../../src/ielts';
import { IeltsReadingData } from './ielts_data';

// 阅读题目
export default class IeltsReadingView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ height: '900px' }}>
        <IeltsReading
            {...this.props}
            params={{ mode: 'package' }} // eslint-disable-line
            {...IeltsReadingData}
        />
      </View>
    );
  }
}
