import React, { Component } from 'react';
import { concat, filter, find } from 'lodash';
import uuid from 'uuid';
import { View, Image } from '@zhike/ti-ui';
import Header from 'components/header';
import AudioPlayer from 'components/audio_player';
import styles from './styles';

export default class ModalComponent extends Component {
  static instance;

  static show(modalInstance, props = {}) {
    if (!this.instance || !this.instance.setState) {
      return;
    }

    const { modals } = this.instance.state;
    const id = uuid.v1();

    this.instance.setState({
      modals: concat(modals, {
        id,
        instance: modalInstance,
        props: Object.assign({}, { modalId: id }, props),
      }),
    });

    if (!props.isReport) {
      AudioPlayer.pause();
      Header.pauseTimerForModal();
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
    };
  }

  hide(id) {
    const { modals } = this.state;
    const modal = find(modals, item => item.id === id);
    const newModals = filter(modals, item => item.id !== id);

    this.setState({
      modals: newModals,
    });
    if (
      !modal.props.isReport &&
      newModals.length === 0
    ) {
      Header.startTimerForModal();
      AudioPlayer.resume();
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
              <View className={styles.header}>
                <View className={styles.title}>{modal.props.title}</View>
                {
                  !modal.props.isUnhide &&
                  <Image
                    className={styles.close}
                    src={require('./assets/close.png')}
                    onClick={() => this.hide(modal.id)}
                  />
                }
              </View>
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
