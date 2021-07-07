/**
 * @file Filter panel checkbox with overflow menu stories.
 * @copyright IBM Security 2020
 */

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import React from 'react';

import { patterns, info } from '../../../../.storybook';
import { FilterPanelCheckbox, Checkbox } from '../../..';

// Expose all possible props
FilterPanelCheckbox.__docgenInfo = Checkbox.__docgenInfo;

storiesOf(patterns(`FilterPanel/${FilterPanelCheckbox.name}`), module).add(
  'default',
  () => (
    <FilterPanelCheckbox
      labelText={text('Checkbox label (labelText)', 'Checkbox label')}
      count={text('Checkbox count (count)', 10)}
      onChange={action('onChange')}
      id="checkbox-id"
      title={text(
        'FilterPanelCheckbox title attribute (title)',
        'Checkbox title attribute'
      )}
    />
  ),

  info(`## Filter panel checkbox
This component allows users to select a simple filter.`)
);
