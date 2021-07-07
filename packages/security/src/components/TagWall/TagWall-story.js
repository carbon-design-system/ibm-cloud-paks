/**
 * @file Tag wall stories.
 * @copyright IBM Security 2019
 */

import { action } from '@storybook/addon-actions';

import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { patterns } from '../../../.storybook';

import { TagWall } from '../..';

import props from './_mocks_';

const { items, label, addLabel } = props;

const storyProps = () => ({
  items,
  label: text('Label (label)', label),
  addLabel: text('Add button label (addLabel)', addLabel),
  disable: boolean('Disabled (disable)', false),
  onChange: action('onChange'),
  onAddButton: action('onAddButton'),
});

storiesOf(patterns('TagWall'), module).add('Default', () => (
  <TagWall {...storyProps()} />
));
