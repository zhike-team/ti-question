import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { ToeflReading } from '../../src/toefl';
import { ToeflReadingData } from './toefl_data';

// 阅读题目
export default class ReadingView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ height: '900px' }}>
        <ToeflReading
          {...this.props}
          params={this.props.match} // eslint-disable-line
          {...ToeflReadingData}
        />
      </View>
    );
  }
}
