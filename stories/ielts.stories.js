import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { IeltsReadingView, IeltsListeningView } from './ielts';

export const history = createHistory();

/* eslint-disable */
storiesOf('雅思题库 题型', module)
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
  .add('type IeltsReading',
  withInfo(`
    基础题库单选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={IeltsReadingView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={'/'} component={IeltsReadingView}>
        </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type IeltsListening',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={IeltsListeningView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={'/'} component={IeltsListeningView}>
        </Route>
      </Router>
    </React.Fragment>
  )))



  