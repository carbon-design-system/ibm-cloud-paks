/**
 * @file Decorator stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { security } from '../../../../.storybook';
import { carbonPrefix } from '../../../globals/namespace';

import { Decorator } from '../../..';

import { props, midLine } from '../_mocks_';

const { type, value, score, href } = props;
const { scoreThresholds } = Decorator.defaultProps;

const storyProps = () => ({
  type: text('Type (`type`)', type),
  value: text('Value (`value`)', value),
  title: text('Title (`title`)', value),
  score: number('Score (`score`)', score, {
    max: scoreThresholds[scoreThresholds.length - 1],
    min: scoreThresholds[0],
    range: true,
  }),
  active: boolean('Active (`active`)', false),
  noIcon: boolean('No icon (`noIcon`)', false),
});

const midLineStoryProps = () => ({
  type: text('Type (`type`)', midLine.type),
  value: text('Value (`value`)', midLine.value),
  score: number('Score (`score`)', midLine.score, {
    max: scoreThresholds[scoreThresholds.length - 1],
    min: scoreThresholds[0],
    range: true,
  }),
  active: boolean('Active (`active`)', false),
  noIcon: boolean('No icon (`noIcon`)', false),
  midLineTruncation: {
    enabled: true,
    maxLength: 20,
    front: 12,
    back: 4,
  },
});

storiesOf(security('Decorator'), module)
  .add('Default', () => (
    <>
      <p className={`${carbonPrefix}--type-body-long-01`}>
        This Decorator is inert.
      </p>
      <p>
        <Decorator {...storyProps()} />
      </p>
    </>
  ))
  .add('Mid-line truncation', () => (
    <>
      <p className={`${carbonPrefix}--type-body-long-01`}>
        This Decorator is with mid-line truncation.
      </p>
      <p>
        <Decorator {...midLineStoryProps()} />
      </p>
    </>
  ))
  .add('Inline', () => (
    <p className={`${carbonPrefix}--type-body-long-01`}>
      This is an inline Decorator <Decorator {...storyProps()} inline /> that
      appears alongside some text.
    </p>
  ))
  .add('with href', () => (
    <>
      <p className={`${carbonPrefix}--type-body-long-01`}>
        This Decorator is a link.
      </p>
      <p>
        <Decorator {...storyProps()} href={text('Link (`href`)', href)} />
      </p>
    </>
  ))
  .add('with onClick', () => (
    <>
      <p className={`${carbonPrefix}--type-body-long-01`}>
        This Decorator is a button.
      </p>
      <p>
        <Decorator {...storyProps()} onClick={action('onClick')} />
      </p>
    </>
  ))
  .add('Icons', () => {
    const size = select(
      'Icon size (size)',
      {
        12: 12,
        16: 16,
      },
      16
    );

    return (
      <>
        <p className={`${carbonPrefix}--type-body-long-01`}>
          You can use Decorator icons as separate components.
        </p>
        <p>
          <Decorator.Unknown description="unknown severity" size={size} />
          <Decorator.Low description="low severity" size={size} />
          <Decorator.Medium description="medium severity" size={size} />
          <Decorator.High description="high severity" size={size} />
          <Decorator.Critical description="critical severity" size={size} />
        </p>
      </>
    );
  });
