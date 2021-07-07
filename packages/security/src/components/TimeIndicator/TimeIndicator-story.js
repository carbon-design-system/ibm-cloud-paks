/**
 * @file Time indicator stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';

import { getDocsParameters, security } from '../../../.storybook';
import { TimeIndicator } from '../..';

export default {
  title: security(TimeIndicator.name),
  component: TimeIndicator,
  args: {
    children: '10 minute setup',
  },
  parameters: {
    ...getDocsParameters(),
  },
};

export const Default = (args) => <TimeIndicator {...args} />;
