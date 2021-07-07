/**
 * @file Text area section stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { carbon } from '../../../.storybook';

import { TextArea, TextAreaSkeleton } from '../..';

const TextAreaProps = () => ({
  className: 'some-class',
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  hideLabel: boolean('No label (hideLabel)', false),
  labelText: text('Label text (labelText)', 'Text Area label'),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Content of form validation UI (invalidText)',
    'A valid value is required'
  ),
  helperText: text('Helper text (helperText)', 'Optional helper text.'),
  placeholder: text('Placeholder text (placeholder)', 'Placeholder text.'),
  id: 'test2',
  cols: number('Columns (columns)', 50),
  rows: number('Rows (rows)', 4),
  onChange: action('onChange'),
  onClick: action('onClick'),
});

storiesOf(carbon('TextArea'), module)
  .add('Default', () => <TextArea {...TextAreaProps()} />, {
    info: {
      text: `
            Text areas enable the user to interact with and input data. A text area is used when you
            anticipate the user to input more than 1 sentence.
          `,
    },
  })
  .add('skeleton', () => <TextAreaSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
