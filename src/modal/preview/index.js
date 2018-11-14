import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from '@zhike/ti-ui';
import { getBodyHeight } from '../utils';
import styles from './styles';

export default class ModalComponent extends Component {
  // 参数
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  // 渲染
  render() {
    const { src } = this.props;
    return (
      <View className={styles.container} style={{ maxHeight: `${getBodyHeight() - 140}px` }}>
        <Image style={{ width: '100%', height: 'auto' }} src={src} />
      </View>
    );
  }
}
