/**
 * @file Search stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { carbon } from '../../../.storybook';

import {
  Search,
  SearchSkeleton,
  SearchFilterButton,
  SearchLayoutButton,
} from '../../';

const props = () => ({
  className: 'some-class',
  small: boolean('Small UI (small)', false),
  light: boolean('Light variant (light)', false),
  name: text('Form item name (name)', ''),
  defaultValue: text('Default value (defaultValue)', ''),
  labelText: text('Label text (labelText)', 'Search'),
  closeButtonLabelText: text(
    'The label text for the close button (closeButtonLabelText)',
    ''
  ),
  placeholder: text('Placeholder text (placeholder)', 'Search'),
  onChange: action('onChange'),
});

storiesOf(carbon('Search'), module)
  .add('Default', () => <Search {...props()} id="search-1" />, {
    info: {
      text: `
            Search enables users to specify a word or a phrase to find particular relevant pieces of content
            without the use of navigation. Search can be used as the primary means of discovering content,
            or as a filter to aid the user in finding content.
          `,
    },
  })
  .add(
    'custom buttons',
    () => (
      <div style={{ display: 'flex' }}>
        <Search {...props()} id="search-1" />
        <SearchFilterButton onClick={action('onClick')} />
        <SearchLayoutButton onClick={action('onClick')} />
      </div>
    ),
    {
      info: {
        text: `
            You can control what set of buttons you want.
          `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div style={{ width: '200px' }}>
        <SearchSkeleton small={boolean('Small UI (small)', false)} />
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
