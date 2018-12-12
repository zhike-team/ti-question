import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import SearchWords from '../src/search_words';
import Article from '../show/article';
import { material1, question1 } from './article_data';

/* eslint-disable */
storiesOf('SearchWords', module)
  .add('SearchWords ',
  withInfo(`
  音频播放组件 可以传入需要播放的音频路径 使用组件方法如下：
  ~~~js
    <div>
      <Article material={material1} question={question1}></Article>
      <SearchWords
        getSearchWord="https://api.smartstudy.com/word/brief"
      ></SearchWords>
    </div>
  ~~~
`)
 (() => (
    <div>
      the New York Times 纽约时报 
      Cycling Through the Air 空中飞车 
      <Article material={material1} question={question1}></Article>
      <SearchWords
        getSearchWord="https://api.smartstudy.com/word/brief"
      ></SearchWords>
    </div>
  )))