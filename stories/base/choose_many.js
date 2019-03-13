import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { ChooseMany } from '../../src/base';
import { ChooseManyData } from './base_data';

// 阅读题目
export default class ChooseManyView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ width: '1100px', height: '900px', alignItems: 'center' }}>
        <ChooseMany
          {...this.props}
          params={{ mode: 'package' }}  // eslint-disable-line
          {...ChooseManyData}
        />
      </View>
    );
  }
}
