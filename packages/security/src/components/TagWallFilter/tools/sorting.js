/**
 * Use the local `localCompare` with the `numeric` option to sort two,
 * potentially alpha-numeric, strings in a list of items.
 *
 * @param {string} locale
 * @param {string} itemA
 * @param {string} itemB
 * @returns {number}
 */
export const defaultCompareItems = (locale, itemA, itemB) =>
  itemA.localeCompare(itemB, locale, {
    numeric: true,
  });

/**
 * Default sorting algorithm for options in a selection control
 *
 * @param {Array} items
 * @param {Function} itemToString
 * @param {Function} compareItems
 * @returns {Array}
 */
export const defaultSortItems = (items, { itemToString, compareItems }) =>
  items.sort((itemA, itemB) => {
    compareItems = compareItems || defaultCompareItems.bind(this, 'en');

    // Prefer whichever item is in the `selectedItems` array first
    if (itemA.isSelected && !itemB.isSelected) {
      return -1;
    }

    if (itemB.isSelected && !itemA.isSelected) {
      return 1;
    }

    return compareItems(itemToString(itemA), itemToString(itemB));
  });
