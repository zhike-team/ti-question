import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { Blank } from '../../src/base';
import { BlankData } from './base_data';

// 阅读题目
export default class BlankView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ width: '1100px', height: '900px', alignItems: 'center' }}>
        <Blank
          {...this.props}
          params={{ mode: 'package' }} // eslint-disable-line
          {...BlankData}
        />
      </View>
    );
  }
}
