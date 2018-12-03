import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import RecorderDemo from './demo/recorder';
import { Modal } from '../src';

/* eslint-disable */
storiesOf('Recorder', module)
  .add('内置了init, start, pause, resume, stop, destroy的API',
  withInfo(`
  录音功能组件，调用了h5录音API 使用组件方法如下：
  ~~~js
    <React.Fragment>
        <RecorderDemo />
        <Modal
            ref={modal => { Modal.instance = modal; }}
            isReport={false}
        />
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <RecorderDemo />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  )));