
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Audio } from '../src';

/* eslint-disable */
storiesOf('Audio', module)
  .add('src',
  withInfo(`
  音频播放组件 可以传入需要播放的音频路径 使用组件方法如下：
  ~~~js
    <Audio
			src={'/atheneBackend/1539519944613QFkn3X.mp3'}
			cdnUrl={'https://media8.smartstudy.com/'}
		></Audio>
  ~~~
`)
 (() => (
    <div style={{ width: '500px', height: '100px'}} >
        <Audio
        src={'/atheneBackend/1539519944613QFkn3X.mp3'}
        cdnUrl={'https://media8.smartstudy.com/'}
        ></Audio>
    </div>
  )))
	.add('progressWidth',
	withInfo(`
  音频播放组件 可以设置音频播放器的宽度progressWidth 使用组件方法如下：
  ~~~js
			<Audio
				src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'}
				progressWidth={520}
			></Audio>
  ~~~
`)
	(() => (
      <Audio
        src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'}
        progressWidth={520}
      ></Audio>
  )))
	.add('showPlayer',
	withInfo(`
  音频播放组件 可以选择隐藏或者显示播放器 使用组件方法如下：
  ~~~js
		<Audio
			src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'}
			showPlayer={false}
		></Audio>
  ~~~
`)
	(() => (
      <div style={{ width: '500px', height: '100px'}} >
      <Audio
        src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3X.mp3'}
        showPlayer={false}
      ></Audio>
      </div>
  )))
	.add('cdnUrl (必传)',
	withInfo(`
  音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
  ~~~js
		<Audio
			src={'/atheneBackend/1539519944613QFkn3X.mp3'}
			cdnUrl={'https://media8.smartstudy.com/'}
		></Audio>
  ~~~
`)
	(() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
            src={'/atheneBackend/1539519944613QFkn3X.mp3'}
            cdnUrl={'https://media8.smartstudy.com/'}
        ></Audio>
    </div>
  )));