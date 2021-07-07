/**
 * @file Slider stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';

import React from 'react';

import { carbon } from '../../../.storybook';

import { Slider, SliderSkeleton } from '../../';

const props = () => ({
  name: text('Form item name (name)', ''),
  inputType: text('The form element type (inputType)', 'number'),
  ariaLabelInput: text('The ARIA label for the <input> (ariaLabelInput)', ''),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  hideTextInput: boolean('Without text input (hideTextInput)', false),
  value: number('The value (value)', 50),
  min: number('The minimum value (min)', 0),
  max: number('The maximum value (max)', 100),
  step: number('The step (step)', 1),
  stepMuliplier: number(
    'The step factor for Shift+arrow keys (stepMuliplier)',
    4
  ),
  labelText: text('Label text (labelText)', 'Slider Label'),
  minLabel: text('Label for minimum value (minLabel)', ''),
  maxLabel: text('Label for maximum value (maxLabel)', ''),
  onChange: action('onChange'),
  onRelease: action('onRelease'),
});

storiesOf(carbon('Slider'), module)
  .add('default', () => <Slider id="slider" {...props()} />, {
    info: {
      text: `
            Sliders provide a visual indication of adjustable content, where the user can move the handle along a horizontal track to increase or decrease the value.
          `,
    },
  })
  .add('skeleton', () => <SliderSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
