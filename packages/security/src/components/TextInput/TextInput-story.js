/**
 * @file Text input stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { carbon } from '../../../.storybook';

import { TextInput, TextInputSkeleton } from '../..';

const types = {
  None: '',
  'Text (text)': 'text',
  'For email (email)': 'email',
  'For password (password)': 'password',
};

const props = {
  textInput: () => ({
    className: 'some-class',
    id: 'test2',
    defaultValue: text(
      'Default value (defaultValue)',
      'This is not a default value'
    ),
    labelText: text('Label text (labelText)', 'Text Input label'),
    placeholder: text('Placeholder text (placeholder)', 'Placeholder text'),
    light: boolean('Light variant (light)', false),
    disabled: boolean('Disabled (disabled)', false),
    hideLabel: boolean('No label (hideLabel)', false),
    invalid: boolean('Show form validation UI (invalid)', false),
    charCount: boolean('Add character counter (charCount)', false),
    maxLength: number('Input length limit (maxLength)', 100),
    invalidText: text(
      'Form validation UI content (invalidText)',
      'A valid value is required'
    ),
    helperText: text('Helper text (helperText)', 'Optional helper text.'),
    onClick: action('onClick'),
    onChange: action('onChange'),
  }),
  passwordInput: () => ({
    className: 'some-class',
    id: 'test2',
    defaultValue: text(
      'Default value (defaultValue)',
      'This is not a default value'
    ),
    labelText: text('Label text (labelText)', 'Text Input label'),
    placeholder: text('Placeholder text (placeholder)', 'Placeholder text'),
    light: boolean('Light variant (light)', false),
    disabled: boolean('Disabled (disabled)', false),
    hideLabel: boolean('No label (hideLabel)', false),
    invalid: boolean('Show form validation UI (invalid)', false),
    maxLength: number('Input length limit (maxLength)', 100),
    invalidText: text(
      'Form validation UI content (invalidText)',
      'A valid value is required'
    ),
    helperText: text('Helper text (helperText)', 'Optional helper text.'),
    onClick: action('onClick'),
    onChange: action('onChange'),
  }),
};

class ControlledPasswordInputApp extends React.Component {
  state = {
    type: 'password',
  };

  togglePasswordVisibility = () => {
    this.setState({
      type: this.state.type === 'password' ? 'text' : 'password',
    });
  };

  render() {
    return (
      <TextInput.ControlledPasswordInput
        type={this.state.type}
        togglePasswordVisibility={this.togglePasswordVisibility}
        {...props.passwordInput()}
      />
    );
  }
}

storiesOf(carbon('TextInput'), module)
  .addDecorator((story) => <div style={{ width: '300px' }}>{story()}</div>)
  .add(
    'Default',
    () => (
      <TextInput
        type={select('Form control type (type)', types, 'text')}
        {...props.textInput()}
      />
    ),
    {
      info: {
        text: `
            Text fields enable the user to interact with and input data. A single line
            field is used when the input anticipated by the user is a single line of
            text as opposed to a paragraph.
            The default type is 'text' and its value can be either 'string' or 'number'.
          `,
      },
    }
  )
  .add(
    'Toggle password visibility',
    () => <TextInput.PasswordInput {...props.passwordInput()} />,
    {
      info: {
        text: `
          Text field with password visibility toggle.
        `,
      },
    }
  )
  .add(
    'Fully controlled toggle password visibility',
    () => <ControlledPasswordInputApp />,
    {
      info: {
        text: `
        Fully controlled text field with password visibility toggle.
      `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <TextInputSkeleton />
        <br />
        <TextInputSkeleton hideLabel />
      </div>
    ),
    {
      info: {
        text: `
            Placeholder skeleton state to use when content is loading.
            `,
      },
    }
  );
