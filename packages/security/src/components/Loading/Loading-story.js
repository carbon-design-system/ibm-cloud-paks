/**
 * @file Loading stories.
 * @copyright IBM Security 2019 - 2021
 */

import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { carbon, info } from '../../../.storybook';
import { Loading, LoadingMessage } from '../..';

const props = () => ({
  active: boolean('Active (active)', true),
  withOverlay: boolean('With overlay (withOverlay)', false),
  small: boolean('Small (small)', false),
});

storiesOf(carbon('Loading'), module)
  .add(
    'Default',
    () => <Loading {...props()} />,
    info(
      "Loading spinners are used when retrieving data or performing slow computations, and help to notify users that loading is underway. The 'active' property is true by default; set to false to end the animation."
    )
  )
  .add(
    'Message',
    () => (
      <LoadingMessage {...props()}>
        {text('Children (children)', 'Loading message')}
      </LoadingMessage>
    ),
    info(
      'The `LoadingMessage` component is like the `Loading` component, but it accepts a child node with a message to display within the loading overlay.'
    )
  );
