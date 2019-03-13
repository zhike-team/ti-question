import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { ChooseOne } from '../../src/base';
import { ChooseOneData } from './base_data';

// 阅读题目
export default class ChooseOneView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ width: '1100px', height: '900px', alignItems: 'center' }}>
        <ChooseOne
          {...this.props}
          params={{ mode: 'package' }} // eslint-disable-line
          {...ChooseOneData}
        />
      </View>
    );
  }
}
