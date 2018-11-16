import React, { Component } from 'react';
import { concat, filter, find } from 'lodash';
import uuid from 'uuid';
import { View, Image } from '@zhike/ti-ui';
import ModalAlert from './alert';
import ModalCorrect from './correct';
import ModalPreview from './preview';
import ModalAnalysis from './analysis';
import ModalUserGrade from './user_grade';
import styles from './styles';

export default class Modal extends Component {
  static instance;

  static show(type = '', props = {}, onShow, onHide) {
    if (!this.instance || !this.instance.setState) {
      return;
    }

    const { modals, modalInstance } = this.instance.state;
    const id = uuid.v1();

    this.instance.setState({
      modals: concat(modals, {
        id,
        instance: modalInstance[type],
        props: Object.assign({}, { modalId: id }, props),
      }),
      onShow: onShow ? onShow : null,
      onHide: onHide ? onHide : null,
    });

    if (!props.isReport) {
      onShow && onShow();
    }

    return id;
  }

  static hide(id) {
    this.instance.hide(id);
  }

  constructor(props) {
    super(props);
    this.state = {
      modals: [],
      modalInstance: {
        ModalAlert,
        ModalCorrect,
        ModalPreview,
        ModalAnalysis,
        ModalUserGrade,
      },
      onShow: null,
      onHide: null,
    };
  }

  hide(id) {
    const { modals, onHide } = this.state;
    const modal = find(modals, item => item.id === id);
    const newModals = filter(modals, item => item.id !== id);

    this.setState({
      modals: newModals,
    });
    if (!modal.props.isReport && newModals.length === 0) {
      onHide && onHide();
    }
  }

  render() {
    const { modals } = this.state;
    return (
      <View>
        {modals.map(modal => (
          <View
            key={modal.id}
            className={styles.modal}
          >
            <View
              className={styles.front}
              style={modal.props.width ? { width: modal.props.width } : {}}
            >
              {
                // hideHeader 这个参数在预览图片时传入，隐藏标题
                modal.props.hideHeader
                ?
                  <Image
                    className={styles.imageClose}
                    src={require('../assets/close.png')}
                    onClick={() => this.hide(modal.id)}
                  />
                :
                  <View className={styles.header}>
                    <View className={styles.title}>{modal.props.title}</View>
                    {
                      !modal.props.isUnhide &&
                      <Image
                        className={styles.close}
                        src={require('../assets/close.png')}
                        onClick={() => this.hide(modal.id)}
                      />
                    }
                  </View>
              }
              <modal.instance {...modal.props} />
            </View>
            <View
              className={styles.backdrop}
              onClick={!modal.props.isUnhide ? () => this.hide(modal.id) : undefined}
            />
          </View>
        ))}
      </View>
    );
  }
}
