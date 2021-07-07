/**
 * @file Data decorator stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';

import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { patterns } from '../../../.storybook';

import { Button, DataDecorator, Decorator } from '../..';

import { props, midLine } from './_mocks_';

const { type, value, score, href } = props;
const { scoreThresholds } = Decorator.defaultProps;

const storyProps = () => ({
  type: text('Type (`type`)', type),
  value: text('Value (`value`)', value),
  score: number('Score (`score`)', score, {
    max: scoreThresholds[scoreThresholds.length - 1],
    min: scoreThresholds[0],
    range: true,
  }),
  href: text('Link (`href`)', href),
  onClick: action('onClick'),
  inert: boolean('Non-interactive (`inert`)', false),
  active: boolean('Active (`active`)', false),
  noIcon: boolean('No icon (`noIcon`)', false),
  renderFooter: () => <Button size="xl">Custom footer</Button>,
});

const midLineStoryProps = () => ({
  type: text('Type (`type`)', midLine.type),
  value: text('Value (`value`)', midLine.value),
  score: number('Score (`score`)', midLine.score, {
    max: scoreThresholds[scoreThresholds.length - 1],
    min: scoreThresholds[0],
    range: true,
  }),
  href: text('Link (`href`)', href),
  onClick: action('onClick'),
  inert: boolean('Non-interactive (`inert`)', false),
  active: boolean('Active (`active`)', false),
  noIcon: boolean('No icon (`noIcon`)', false),
  renderFooter: () => <Button size="xl">Custom footer</Button>,
  midLineTruncation: {
    enabled: true,
    maxLength: 20,
    front: 12,
    back: 4,
  },
});

storiesOf(patterns('DataDecorator'), module)
  .add('Default', () => <DataDecorator {...storyProps()} />)
  .add('Mid-line truncation', () => <DataDecorator {...midLineStoryProps()} />);
