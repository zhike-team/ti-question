/**
 * 按钮样式（默认颜色是蓝色的那个）, 灰色class=gray
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from '@zhike/ti-ui';
import Modal from '../index';
import styles from './styles';

export default class ModalAlert extends Component {
  // 参数
  static propTypes = {
    modalId: PropTypes.string.isRequired,
    buttons: PropTypes.array.isRequired,
    component: PropTypes.object.isRequired,
  };

  // 渲染
  render() {
    const { modalId, buttons, component } = this.props;
    return (
      <View className={styles.container}>
        {component}
        <View className={styles.buttons}>
          {
            buttons.map((item, index) => (
              <Button
                key={index}
                className={[styles.btn, item.class && styles[item.class]]}
                textClassName={[item.class && styles[`${item.class}Text`]]}
                text={item.title}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  Modal.hide(modalId);
                }}
              />
            ))
          }
        </View>
      </View>
    );
  }
}
