/**
 * @file TagWallFilter
 * @copyright IBM Security 2019 - 2020
 */

import PropTypes from 'prop-types';
import React from 'react';
import { withReducer, mapProps, compose } from 'recompose';
import { createReducer, combineReducers } from 'reduced-utils';

import { getComponentNamespace } from '../../globals/namespace/index';

import FilterRaw from './Filter';
import TagWall from '../TagWall';
import { TearsheetSmall } from '../Tearsheet';
import { buttonType } from '../Tearsheet/TearsheetSmall/TearsheetSmall';

import { defaultSortItems } from './tools/sorting';

const namespace = getComponentNamespace('tag-wall-filter');

const defaultTo = (value, defaultVal) => (value == null ? defaultVal : value);

export const noop = () => {};
export const itemToString = (item) =>
  defaultTo(item, { text: '', label: '' }).label ||
  defaultTo(item, { text: '', label: '' }).text;

export const selectedItemsReducer = createReducer({
  SELECT_ITEM: (state = { items: [] }, { item }) => ({
    ...state,
    items: defaultSortItems([{ ...item, isSelected: true }, ...state.items], {
      itemToString,
    }),
  }),
  UNSELECT_ITEM: (state = { items: [] }, { item: { id } = {} }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== id),
  }),
  CLEAR_SELECTED_ITEMS: (state = { items: [] }) => ({ ...state, items: [] }),
});

export const availableItemsReducer = createReducer({
  SELECT_ITEM: (
    state = { items: [], allItems: [] },
    { item: { id } = {} }
  ) => ({
    ...state,
    items: state.items.filter((item) => item.id !== id),
  }),
  UNSELECT_ITEM: (
    state = { items: [], allItems: [] },
    { item: { id, label } }
  ) => ({
    ...state,
    items: [{ id, label }, ...state.items],
  }),
  CLEAR_SELECTED_ITEMS: (state = { items: [], allItems: [] }) => ({
    ...state,
    items: state.allItems,
  }),
});

export const itemReducer = combineReducers({
  selected: selectedItemsReducer,
  available: availableItemsReducer,
});

export const withItemReducer = withReducer(
  'itemState',
  'dispatchItemChange',
  itemReducer,
  ({ selectedItems = [], availableItems = [], allItems }) => {
    const values = [...selectedItems, ...availableItems].reduce(
      (itemMap, item) => {
        itemMap[item.id] = item;
        return itemMap;
      },
      {}
    );

    return {
      selected: { items: selectedItems },
      available: {
        items: availableItems,
        allItems: allItems || Object.keys(values).map((value) => values[value]),
      },
    };
  }
);

export const withMappedProps = mapProps(({ itemState, ...otherProps }) => ({
  ...otherProps,
  selectedItems: itemState.selected.items || [],
  availableItems: itemState.available.items || [],
}));

export const withMappedItemReducer = compose(withItemReducer, withMappedProps);

export const FilterTagFragmentRender = ({
  selectedItems,
  availableItems,
  dispatchItemChange,
  id,
  itemToString,
  onChange,
  tagWallLabel,
  tearsheetProps,
  ...otherProps
}) => (
  <TearsheetSmall
    {...tearsheetProps}
    description={() => (
      <div className={`${namespace}__description`}>
        {tearsheetProps.description}
        <TagWall
          className={`${namespace}__tag-wall`}
          items={selectedItems}
          itemToString={itemToString}
          label={tagWallLabel}
          onChange={(change) => dispatchItemChange(change, onChange)}
          addButtonDisabled
        />
      </div>
    )}>
    <FilterRaw
      id={id}
      items={availableItems}
      itemToString={itemToString}
      onChange={(change) => dispatchItemChange(change, onChange)}
      {...otherProps}
    />
  </TearsheetSmall>
);

FilterTagFragmentRender.propTypes = {
  /** @type {arrayOf} initially selected items */
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /** @type {arrayOf} availableItems in the list to select from */
  availableItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  dispatchItemChange: PropTypes.func.isRequired,
  itemToString: PropTypes.func.isRequired,
  onChange: PropTypes.func,

  /** @type {string} Tag wall label. */
  tagWallLabel: PropTypes.string,

  /** @type {string} Specify a custom id. */
  id: PropTypes.string.isRequired,
};
FilterTagFragmentRender.defaultProps = {
  selectedItems: [],
  onChange: noop,
  tagWallLabel: null,
};

const FilterTagFragment = withMappedItemReducer(FilterTagFragmentRender);
FilterTagFragment.propTypes = { ...FilterTagFragmentRender.propTypes };
delete FilterTagFragment.propTypes.dispatchItemChange;
FilterTagFragment.defaultProps = FilterTagFragmentRender.defaultProps;
FilterTagFragment.displayName = 'FilterTagFragment';

export { FilterTagFragment };

export const TagWallFilter = ({
  focusTrap,
  heading,
  id,
  description,
  selectedItems,
  availableItems,
  onChange,
  inputFieldPlaceholder,
  primaryButton,
  secondaryButton,
  tagWallLabel,
  closeButton,
  allItems,
  filterFieldClearSelectionTooltip,
  filterFieldClearAllTooltip,
}) => {
  const tearsheetProps = {
    className: namespace,
    flush: true,
    focusTrap,
    heading,
    description,
    primaryButton,
    secondaryButton,
    closeButton,
    filterFieldClearSelectionTooltip,
    filterFieldClearAllTooltip,
  };

  return (
    <FilterTagFragment
      id={id}
      selectedItems={selectedItems}
      availableItems={availableItems}
      allItems={allItems}
      itemToString={itemToString}
      onChange={onChange}
      placeholder={inputFieldPlaceholder}
      tagWallLabel={tagWallLabel}
      tearsheetProps={tearsheetProps}
      filterFieldClearSelectionTooltip={filterFieldClearSelectionTooltip}
      filterFieldClearAllTooltip={filterFieldClearAllTooltip}
    />
  );
};

TagWallFilter.propTypes = {
  /** @type {object<object>} An object list of primary button props. */
  primaryButton: buttonType.isRequired,

  /** @type {object<object>} An object list of secondary button props. */
  secondaryButton: buttonType.isRequired,

  /** @type {object<object>} An object list of close button props. */
  closeButton: buttonType.isRequired,

  /** @type {string} The view title. */
  heading: PropTypes.string.isRequired,

  /** @type {element|Function|string} The element, function, or string for the description. */
  description: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),

  /** @type {boolean} Focus trap. */
  focusTrap: PropTypes.bool,

  /** @type {string} Specify a custom id for the filter. */
  id: PropTypes.string,

  /** @type {arrayOf} initially selected items */
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),

  /** @type {string} Tag wall label. */
  tagWallLabel: PropTypes.string,

  /** @type {arrayOf} availableItems in the list to select from */
  availableItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,

  /** @type {arrayOf} all possible items. If not set, it is derived from the joint set of selectedItems and availableItems */
  allItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),

  /** @type {func} Called whenever a something changed. Is called with the latest state */
  onChange: PropTypes.func,

  /** @type {string} Set a placeholder for the filter input field via this prop */
  inputFieldPlaceholder: PropTypes.string,
  /** @type {string} tooltip label for clearing a selected item */
  filterFieldClearSelectionTooltip: PropTypes.string,
  /** @type {string} tooltip label for clearing all selected items */
  filterFieldClearAllTooltip: PropTypes.string,
};
TagWallFilter.defaultProps = {
  description: '',
  focusTrap: true,
  id: namespace,
  selectedItems: [],
  allItems: undefined,
  onChange: noop,
  inputFieldPlaceholder: '',
  tagWallLabel: null,
  filterFieldClearSelectionTooltip: 'Clear selected item',
  filterFieldClearAllTooltip: 'Clear all selected items',
};
TagWallFilter.displayName = 'TagWallFilter';

export default TagWallFilter;
