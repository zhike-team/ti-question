import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import { FollowUp } from '../../src/base';
import { FollowUpData } from './base_data';

// 阅读题目
export default class FollowUpView extends Component {
  // 渲染
  render() {
    return (
      <View style={{ width: '1100px', height: '900px', alignItems: 'center' }}>
        <FollowUp
          {...this.props}
          params={{ mode: 'package' }} // eslint-disable-line
          {...FollowUpData}
        />
      </View>
    );
  }
}
