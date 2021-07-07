/**
 * @file Content switcher stories.
 * @copyright IBM Security 2019 - 2021
 */

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import React from 'react';

import { carbon } from '../../../.storybook';

import { ContentSwitcher, Switch } from '../..';

const props = {
  contentSwitcher: () => ({
    onChange: action('onChange'),
  }),
  switch: () => ({
    onClick: action('onClick - Switch'),
    disabled: boolean('Disabled (disabled)', false),
  }),
};

storiesOf(carbon('ContentSwitcher'), module)
  .add(
    'Default',
    () => {
      const switchProps = props.switch();
      return (
        <ContentSwitcher {...props.contentSwitcher()}>
          <Switch name="one" text="First section" {...switchProps} />
          <Switch name="two" text="Second section" {...switchProps} />
          <Switch name="three" text="Third section" {...switchProps} />
        </ContentSwitcher>
      );
    },
    {
      info: {
        text: `
            The Content Switcher component manipulates the content shown following an exclusive or “either/or” pattern.
            Create Switch components for each section in the content switcher.
          `,
      },
    }
  )
  .add(
    'Selected',
    () => {
      const switchProps = props.switch();
      return (
        <ContentSwitcher {...props.contentSwitcher()} selectedIndex={1}>
          <Switch name="one" text="First section" {...switchProps} />
          <Switch name="two" text="Second section" {...switchProps} />
          <Switch name="three" text="Third section" {...switchProps} />
        </ContentSwitcher>
      );
    },
    {
      info: {
        text: `
             Render the Content Switcher with a different section automatically selected
           `,
      },
    }
  );
