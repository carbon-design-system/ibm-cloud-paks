/**
 * @file Stacked notification stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { text, boolean } from '@storybook/addon-knobs';

import { iconDescription, title, subtitle, caption } from './_mocks_';

import { security } from '../../../.storybook';

import { StackedNotification } from '../..';

const props = () => ({
  iconDescription: text('Icon Description (iconDescription)', iconDescription),
  title: text('Title (title)', title),
  subtitle: text('Subtitle (subtitle)', subtitle),
  caption: text('Caption (caption)', caption),
  hideCloseButton: boolean('Hide close button (hideCloseButton)', false),
});

storiesOf(security('StackedNotification'), module).add('Default', () => (
  <StackedNotification {...props()} />
));
