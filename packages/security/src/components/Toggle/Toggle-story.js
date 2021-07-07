/**
 * @file Toggle stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { carbon } from '../../../.storybook';

import { Toggle, ToggleSkeleton } from '../../';

const toggleProps = () => ({
  className: 'some-class',
  labelText: text('Label for toggle button input', ''),
  labelA: text('Label for untoggled state (labelA)', 'Off'),
  labelB: text('Label for toggled state (labelB)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

storiesOf(carbon('Toggle'), module)
  .add(
    'toggled',
    () => (
      <Toggle
        defaultToggled
        {...toggleProps()}
        className="some-class"
        id="toggle-1"
      />
    ),
    {
      info: {
        text: `
            Toggles are controls that are used to quickly switch between two possible states. The example below shows
            an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
            Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
            prop will only set the value initially. This example has defaultToggled set to true.
          `,
      },
    }
  )
  .add(
    'untoggled',
    () => <Toggle {...toggleProps()} className="some-class" id="toggle-1" />,
    {
      info: {
        text: `
            Toggles are controls that are used to quickly switch between two possible states. The example below shows
            an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
            Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
            prop will only set the value initially. This example has defaultToggled set to false.
          `,
      },
    }
  )
  .add('skeleton', () => <ToggleSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
