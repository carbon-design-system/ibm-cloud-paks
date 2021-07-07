/**
 * @file Trending card stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';

import { getDocsParameters, security } from '../../../.storybook';
import { TrendingCard } from '../..';

export default {
  title: security(TrendingCard.name),
  component: TrendingCard,
  args: {
    title: 'Title',
    href: '#',
    subtitle: 'Subtitle',
  },
  parameters: {
    ...getDocsParameters(),
  },
};

export const Default = (args) => <TrendingCard {...args} />;
