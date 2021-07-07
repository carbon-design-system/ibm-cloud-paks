/**
 * @file Filter stories.
 * @copyright IBM Security 2019
 */
/* eslint-disable no-param-reassign */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { compose } from 'recompose';

import { patterns } from '../../../.storybook';

import TagWallFilter from './index';
import { items } from './Filter/_mocks_';

const buttons = {
  primaryButton: {
    onClick: action('primary-click'),
    label: 'Okay',
    isDisabled: false,
  },
  secondaryButton: {
    onClick: action('secondary-click'),
    label: 'Cancel',
    isDisabled: false,
  },
  closeButton: {
    onClick: action('close-click'),
    label: 'Close',
    isDisabled: false,
  },
};

const itemsReducer = (items, item) => {
  items[item.id] = item;
  return [items, item];
};
const filterItems =
  (selectedItemsMap) =>
  ([items, item]) => {
    if (item.id in selectedItemsMap) {
      delete items[item.id];
    }
    return [items, item];
  };
const selectFirst = ([items]) => items;

storiesOf(patterns('TagWallFilter'), module).add(
  `TagWall with Filter list for multiselect`,
  () => {
    const selectedItems = object('selectedItems', [
      {
        id: 'item-0',
        label:
          'Tag that is a very long string and will need to be truncated with an ellipsis',
      },
    ]);
    const selectedItemsMap = selectedItems.reduce(
      compose(selectFirst, itemsReducer),
      {}
    );
    const availableItems = Object.values(
      object(
        'availableItems',
        Object.values(
          items.reduce(
            compose(selectFirst, filterItems(selectedItemsMap), itemsReducer),
            {}
          )
        )
      ).reduce(
        compose(selectFirst, filterItems(selectedItemsMap), itemsReducer),
        {}
      )
    );
    const visible = boolean('visible (toggle to apply changes to items)', true);
    return (
      visible && (
        <TagWallFilter
          focusTrap={boolean('focusTrap', false)}
          heading="Cities"
          description="Filter and select city names."
          selectedItems={selectedItems}
          availableItems={availableItems}
          onChange={action('onChange')}
          inputFieldPlaceholder="Search cities"
          tagWallLabel="Cities"
          {...buttons}
        />
      )
    );
  }
);
