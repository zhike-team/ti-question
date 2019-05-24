import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ToeflReadingView, ToeflListeningView, ToeflListenPlayerView } from './toefl';

export const history = createHistory();

/* eslint-disable */
storiesOf('托福题库 题型', module)
  .addParameters({
    info: {
      // Make a default for all stories in this book,
      styles: {
        header: {
          h1: {
            color: '#62C9FF',
          },
          h2: {
            color: '#32363A',
          }
        },
      },
      },
    },
  )
  .add('type ToeflReading',
  withInfo(`
    托福题库 阅读题，格式如下：
  ~~~js
    <React.Fragment>
    <Router history={history}>
      <Route path={`/`} component={ToeflReadingView}>
      </Route>
    </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={ToeflReadingView}>
        </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type ToeflListening',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
    <Router history={history}>
      <Route path={`/`} component={ToeflListeningView}>
      </Route>
    </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={ToeflListeningView}>
        </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type ToeflListenPlayer',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={ToeflListenPlayerView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={ToeflListenPlayerView}>
        </Route>
      </Router>
    </React.Fragment>
  )))