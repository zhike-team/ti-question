import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Scrollbar } from '@zhike/ti-ui';
import SearchWords from '../src/search_words';
import Article from '../show/article';
import { material1, question1 } from './article_data';

/* eslint-disable */
storiesOf('SearchWords', module)
  .add('SearchWords ',
  withInfo(`
  音频播放组件 可以传入需要播放的音频路径 使用组件方法如下：
  ~~~js
    <div style={{width: '500px', height: '500px'}}>
      <Scrollbar
        onScrollStart={() => {SearchWords.hide()}}
      >
        <Article material={material1} question={question1}></Article>
        <SearchWords
          ref={searchWords => { SearchWords.instance = searchWords; }}
          getSearchWord="https://api.smartstudy.com/word/brief"
        ></SearchWords>
      </Scrollbar>
    </div>
  ~~~
`)
 (() => (
    <div style={{width: '500px', height: '500px'}}>
      <Scrollbar
        onScrollStart={() => {SearchWords.hide()}}
      >
        <Article material={material1} question={question1}></Article>
        <SearchWords
          ref={searchWords => { SearchWords.instance = searchWords; }}
          getSearchWord="https://api.smartstudy.com/word/brief"
        ></SearchWords>
      </Scrollbar>
    </div>
  )))