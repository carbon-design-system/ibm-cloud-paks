/**
 * @file Filter panel checkbox with overflow menu stories.
 * @copyright IBM Security 2020 - 2021
 */

import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { patterns, info } from '../../../../.storybook';

import {
  FilterPanelCheckboxWithOverflowMenu,
  OverflowMenuItem,
} from '../../..';

storiesOf(
  patterns(`FilterPanel/${FilterPanelCheckboxWithOverflowMenu.name}`),
  module
).add(
  'default',
  () => (
    <FilterPanelCheckboxWithOverflowMenu
      labelText={text('Checkbox label (labelText)', 'Checkbox label')}
      count={text('Checkbox count (count)', 10)}
      onChange={action('onChange')}
      id="checkbox-id"
      selectorPrimaryFocus="[data-storybook-example-primary-focus]">
      <OverflowMenuItem
        itemText="Option 1"
        onClick={action('OverflowMenuItem onClick')}
      />
      <OverflowMenuItem
        itemText="Option 2 -- selected when menu opens"
        onClick={action('OverflowMenuItem onClick')}
        data-storybook-example-primary-focus
      />
    </FilterPanelCheckboxWithOverflowMenu>
  ),

  info(
    `## Filter panel checkbox with overflow menu
This component allows consumers to provide more than one option when selecting a filter. An example
use-case is when the application must provide an exclusionary filter option (also known as a
not-filter). The overflow menu options give users more ways to interact with a given filter.`,
    {
      group: 'patterns',
      library: 'ibm-security',
      story: 'filterpanel-filterpanelcheckbox',
    }
  )
);
