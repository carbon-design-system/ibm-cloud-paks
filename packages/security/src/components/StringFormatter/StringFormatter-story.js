/**
 * @file String formatter stories.
 * @copyright IBM Security 2019 - 2021
 */

import { boolean, text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { security } from '../../../.storybook';
import { StringFormatter } from '../..';
import value from './_mocks_';

const storyProps = () => ({
  lines: number('Lines (`lines`)', 1),
  truncate: boolean('Truncate (`truncate`)', true),
  value: text('Value (`value`)', value),
  width: text('Width (`width`)', `200px`),
});

storiesOf(security('StringFormatter'), module).add('Default', () => (
  <StringFormatter {...storyProps()} />
));
