/**
 * @file Time picker stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { carbon } from '../../../.storybook';

import { TimePicker, TimePickerSelect, SelectItem } from '../..';

const props = {
  timepicker: () => ({
    pattern: text(
      'Regular expression for the value (pattern in <TimePicker>)',
      '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)'
    ),
    placeholder: text(
      'Placeholder text (placeholder in <TimePicker>)',
      'hh:mm'
    ),
    disabled: boolean('Disabled (disabled in <TimePicker>)', false),
    light: boolean('Light variant (light in <TimePicker>)', false),
    hideLabel: boolean('No label (hideLabel in <TimePicker>)', false),
    labelText: text('Label text (labelText in <TimePicker>)', 'Select a time'),
    invalid: boolean(
      'Show form validation UI (invalid in <TimePicker>)',
      false
    ),
    invalidText: text(
      'Form validation UI content (invalidText in <TimePicker>)',
      'A valid value is required'
    ),
    maxLength: number('Maximum length (maxLength in <TimePicker>)', 5),
    onClick: action('onClick'),
    onChange: action('onChange'),
    onBlur: action('onBlur'),
  }),
  select: () => ({
    disabled: boolean('Disabled (disabled in <TimePickerSelect>)', false),
    hideLabel: boolean('No label (hideLabel in <TimePickerSelect>)', true),
    labelText: text(
      'Label text (labelText in <TimePickerSelect>)',
      'Please select'
    ),
    iconDescription: text(
      'Trigger icon description (iconDescription in <TimePickerSelect>)',
      'open list of options'
    ),
  }),
};

storiesOf(carbon('TimePicker'), module).add(
  'Default',
  () => {
    const selectProps = props.select();
    return (
      <TimePicker id="time-picker" {...props.timepicker()}>
        <TimePickerSelect id="time-picker-select-1" {...selectProps}>
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect id="time-picker-select-2" {...selectProps}>
          <SelectItem value="Time zone 1" text="Time zone 1" />
          <SelectItem value="Time zone 2" text="Time zone 2" />
        </TimePickerSelect>
      </TimePicker>
    );
  },
  {
    info: {
      text: `
            The time picker allow users to select a time.
          `,
    },
  }
);
