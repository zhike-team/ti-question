import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ChooseOneView, ChooseManyView, BlankView, SpeakingView, WritingView, FollowUpView } from './base';

export const history = createHistory();

/* eslint-disable */
storiesOf('基础题库 题型', module)
  .add('type ChooseOne',
  withInfo(`
    基础题库单选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={ChooseOneView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={'/'} component={ChooseOneView}>
        </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type ChooseMany',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={ChooseManyView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={'/'} component={ChooseManyView}>
        </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type Blank',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={BlankView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={'/'} component={BlankView}>
        </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type Speaking',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={SpeakingView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
      <Route path={'/'} component={SpeakingView}>
      </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type Writing',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={WritingView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={'/'} component={WritingView}>
        </Route>
      </Router>
    </React.Fragment>
  )))
  .add('type FollowUp',
  withInfo(`
  基础题库多选题，格式如下：
  ~~~js
    <React.Fragment>
      <Router history={history}>
        <Route path={`/`} component={FollowUpView}>
        </Route>
      </Router>
    </React.Fragment>
  ~~~
`)
  (() => (
    <React.Fragment>
      <Router history={history}>
        <Route path={'/'} component={FollowUpView}>
        </Route>
      </Router>
    </React.Fragment>
  )))

  