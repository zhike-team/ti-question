import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, Input, Textarea } from '../src';

storiesOf('Button', module)
  .add('theme', () => (
    <React.Fragment>
      <Button text="default"></Button>
      <br />
      <Button text="darken" theme="darken"></Button>
      <br />
      <Button text="hollow" theme="hollow"></Button>
    </React.Fragment>
  ))
  .add('onClick', () => (
    <Button text="click" onClick={action('clicked')}></Button>
  ));
