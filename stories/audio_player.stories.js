import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import AudioPlayerDemo from './demo/audio_player';

/* eslint-disable */
storiesOf('AudioPlayer', module)
  .add('内置了play, pause, unload, getStatus, setVolume的API',
		withInfo(`音频播放器组件案例  使用组件方法如下：
			<AudioPlayerDemo></AudioPlayerDemo>
		`)
		(() =>
			(<AudioPlayerDemo />)
		))