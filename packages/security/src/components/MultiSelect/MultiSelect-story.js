/**
 * @file Multi select stories.
 * @copyright IBM Security 2018 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { boolean, select, text, object } from '@storybook/addon-knobs';

import { carbon } from '../../../.storybook';

import MultiSelect from './';

const items = [
  {
    id: 'item-1',
    text: 'Item 1',
  },
  {
    id: 'item-2',
    text: 'Item 2',
  },
  {
    id: 'item-3',
    text: 'Item 3',
  },
  {
    id: 'item-4',
    text: 'Item 4',
  },
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};

const props = () => ({
  id: text('MultiSelect ID (id)', 'carbon-multiselect-example'),
  titleText: text('Title (titleText)', 'Multiselect title'),
  helperText: text('Helper text (helperText)', 'This is not helper text'),
  filterable: boolean(
    'Filterable (`<MultiSelect.Filterable>` instead of `<MultiSelect>`)',
    false
  ),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  useTitleInItem: boolean('Show tooltip on hover', false),
  type: select('UI type (Only for `<MultiSelect>`) (type)', types, 'default'),
  label: text('Label (label)', defaultLabel),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'Invalid Selection'
  ),
  onChange: action('onChange'),
  listBoxMenuIconTranslationIds: object(
    'Listbox menu icon translation IDs (for translateWithId callback)',
    {
      'close.menu': 'Close menu',
      'open.menu': 'Open menu',
      'clear.all': 'Clear all',
      'clear.selection': 'Clear selection',
    }
  ),
});

storiesOf(carbon('MultiSelect'), module)
  .add(
    'default',
    () => {
      const { filterable, listBoxMenuIconTranslationIds, ...multiSelectProps } =
        props();
      const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
      const placeholder = !filterable ? undefined : defaultPlaceholder;
      return (
        <div style={{ width: 300 }}>
          <ComponentToUse
            {...multiSelectProps}
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            placeholder={placeholder}
            translateWithId={(id) => listBoxMenuIconTranslationIds[id]}
          />
        </div>
      );
    },
    {
      info: {
        text: `
            Basic implementation of a MultiSelect component.
          `,
      },
    }
  )
  .add(
    'with initial selected items',
    () => {
      const { filterable, listBoxMenuIconTranslationIds, ...multiSelectProps } =
        props();
      const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
      const placeholder = !filterable ? undefined : defaultPlaceholder;

      return (
        <div style={{ width: 300 }}>
          <ComponentToUse
            {...multiSelectProps}
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            initialSelectedItems={[items[0], items[1]]}
            placeholder={placeholder}
            translateWithId={(id) => listBoxMenuIconTranslationIds[id]}
          />
        </div>
      );
    },
    {
      info: {
        text: `
            Basic implementation of a MultiSelect component with pre-selected items.
          `,
      },
    }
  );
