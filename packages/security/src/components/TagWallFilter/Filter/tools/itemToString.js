/**
 * @file Filter.
 * @copyright IBM Security 2018
 */

/**
 * This function is used to convert all industries labels into strings. So we know labels are always strings and not another variable.
 */

import invariant from 'invariant';

const itemToString = (item) => {
  invariant(
    typeof item.label === 'string',
    '[MultiSelect] the default `itemToString` method expected to receive ' +
      'an item with a `label` field of type `string`. Instead received: `%s`',
    typeof item.label
  );
  return item.label || '';
};

export const defaultItemToString = (item) => {
  if (Array.isArray(item)) {
    return item.map(itemToString);
  }
  return itemToString(item);
};

export default itemToString;
