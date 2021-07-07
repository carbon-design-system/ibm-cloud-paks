/**
 * @file Radio button stories.
 * @copyright IBM Security 2019 - 2021
 */

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import React from 'react';

import { carbon } from '../../../.storybook';

import { RadioButton, RadioButtonSkeleton } from '../../';

const labelPositions = {
  'Left (left)': 'left',
  'Right (right)': 'right',
};

const radioProps = () => ({
  className: 'some-class',
  name: text('Form item name (name)', 'test'),
  value: text('Value (value)', 'standard'),
  labelText: text('Label text (labelText)', 'Standard Radio Button'),
  labelPosition: select(
    'Label position (labelPosition)',
    labelPositions,
    'right'
  ),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
});

storiesOf(carbon('RadioButton'), module)
  .add('Default', () => <RadioButton id="radio-1" {...radioProps()} />, {
    info: {
      text: `
            Radio buttons are used when a list of two or more options are mutually exclusive,
            meaning the user must select only one option. The example below shows how the Radio Button component
            can be used as an uncontrolled component that is initially checked by setting the defaultChecked property
            to true. To use the component in a controlled way, set the checked property instead.
          `,
    },
  })
  .add('skeleton', () => <RadioButtonSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
