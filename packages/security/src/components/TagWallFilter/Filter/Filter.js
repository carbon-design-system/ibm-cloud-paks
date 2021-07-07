/**
 * @file Filter.
 * @copyright IBM Security 2019 - 2021
 */

import { Add20, Search20 } from '@carbon/icons-react';

import { defaultFilterItems } from 'carbon-components-react/es/components/ComboBox/tools/filter';

import classnames from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  carbonPrefix,
  getComponentNamespace,
} from '../../../globals/namespace';

import theme from '../../../globals/theme';

import { defaultItemToString } from './tools/itemToString';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';

import Icon from '../../Icon';
import ListBox from '../../ListBox';

const { Field, Menu, MenuItem, Selection } = ListBox;

const namespace = getComponentNamespace('filter');

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      inputValue: '',
    };
  }

  handleOnInputKeyDown = (event) => {
    event.stopPropagation();
  };

  handleOnInputValueChange = (inputValue, stateAndHelpers) => {
    if (stateAndHelpers.type === '__autocomplete_mouseup__') {
      return;
    }
    this.setState(() => {
      if (Array.isArray(inputValue)) {
        return {
          inputValue: '',
        };
      }

      return {
        inputValue: inputValue || '',
      };
    });
  };

  clearInputValue = (event) => {
    event.stopPropagation();
    this.setState({ inputValue: '' });
  };

  handleOnStateChange = (changes) => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.changeInput:
        this.setState({ inputValue: changes.inputValue });
        break;
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
        break;

      default:
    }
  };

  handleClearSelection = () => {
    this.setState({ inputValue: '' });
    this.props.onChange({ selectedItems: [], type: 'CLEAR_SELECTED_ITEMS' });
  };

  handleItemChange = (selectedItem) => {
    this.setState(
      { inputValue: '' },
      this.props.onChange({ item: selectedItem, type: 'SELECT_ITEM' })
    );
  };

  handleKeyDownChange = (event, item) => {
    if (event.key === 'Enter') {
      this.handleItemChange(item);
    }
  };

  buildMenuItems = (getItemProps) => {
    const {
      items,
      itemToString,
      filterItems,
      locale,
      selectedItems,
      sortItems,
      compareItems,
    } = this.props;

    const { inputValue } = this.state;

    const menuItems = sortItems(
      filterItems(items, { itemToString, inputValue }),
      {
        selectedItems,
        itemToString,
        compareItems,
        locale,
      }
    ).map((item) => {
      const itemProps = getItemProps({ item });
      const itemText = itemToString(item);

      return (
        <MenuItem
          className={`${namespace}__list-item`}
          key={itemProps.id}
          isActive={selectedItems.indexOf(item) !== -1}
          onKeyDown={(e) => this.handleKeyDownChange(e, item)}
          role="button"
          tabIndex="0"
          {...itemProps}>
          <div
            className={`${namespace}__list-item__entry`}
            aria-labelledby={itemProps.id}>
            <span
              className={`${carbonPrefix}--text-truncate--end`}
              title={itemText}>
              {itemText}
            </span>
            <span className={`${namespace}__add`}>
              <Icon className={`${namespace}__add__icon`} renderIcon={Add20} />
            </span>
          </div>
        </MenuItem>
      );
    });

    return menuItems;
  };

  render() {
    const { inputValue, highlightedIndex } = this.state;
    const { itemToString, id, disabled, placeholder } = this.props;

    const clearButton = inputValue ? (
      <Selection
        clearSelection={this.clearInputValue}
        translateWithId={(id) => {
          switch (id) {
            case 'clear.all':
              return this.props.filterFieldClearAllTooltip;
            case 'clear.selection':
              return this.props.filterFieldClearSelectionTooltip;
            default:
              return '';
          }
        }}
      />
    ) : null;

    return (
      <Downshift
        highlightedIndex={highlightedIndex}
        inputValue={inputValue}
        onInputValueChange={this.handleOnInputValueChange}
        onChange={this.handleItemChange}
        itemToString={itemToString}
        onStateChange={this.handleOnStateChange}
        clearSelection={this.handleClearSelection}
        isOpen>
        {({
          getInputProps,
          getItemProps,
          getRootProps,
          getToggleButtonProps,
        }) => (
          <ListBox {...getRootProps({ id, className: namespace, disabled })}>
            <Field {...getToggleButtonProps({ disabled, id, tabIndex: -1 })}>
              <input
                className={`${namespace}__input-field ${carbonPrefix}--text-input`}
                {...getInputProps({
                  disabled,
                  id,
                  placeholder,
                  onBlur: (event) => event.preventDefault(),
                  onKeyDown: this.handleOnInputKeyDown,
                })}
              />
              {clearButton}
              <span className={`${namespace}__search`}>
                <Icon
                  className={classnames(`${namespace}__search__icon`, {
                    [`${namespace}__input--active`]:
                      this.state.inputValue !== '',
                  })}
                  renderIcon={Search20}
                  fill={theme.icon01}
                />
              </span>
            </Field>
            <Menu className={`${namespace}__list-container`} id={id}>
              {this.buildMenuItems(getItemProps)}
            </Menu>
          </ListBox>
        )}
      </Downshift>
    );
  }
}

Filter.defaultProps = {
  className: '',
  onChange: '',
  compareItems: defaultCompareItems,
  disabled: false,
  filterItems: defaultFilterItems,
  initialSelectedItems: [],
  selectedItems: [],
  itemToString: defaultItemToString,
  locale: 'en',
  sortItems: defaultSortItems,
  filterFieldClearSelectionTooltip: 'Clear selected item',
  filterFieldClearAllTooltip: 'Clear all selected items',
};

Filter.propTypes = {
  /** @type {string} Extra classes to add. */
  className: PropTypes.string,

  /** @type {arrayOf} Collection of data structure. */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,

  /** @type {arrayOf} Arbitrary items from their collection */
  initialSelectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),

  /** @type {func} Render a given item to a string label */
  itemToString: PropTypes.func,

  /** @type {string} Used for sorting the list of items */
  locale: PropTypes.string,

  /** @type {func} Used for internal state changes that are occuring */
  onChange: PropTypes.func,

  /** @type {string} Used as the textual representation */
  placeholder: PropTypes.string.isRequired,

  /** @type {Function} Provide a compare function that is used to determine the ordering of options. */
  compareItems: PropTypes.func,

  /** @type {func} Handle the sort logic for selected versus un-selected items. */
  sortItems: PropTypes.func,

  /** @type {string} Specify a custom id. */
  id: PropTypes.string.isRequired,

  /** @type {func} Handle the filter of items. */
  filterItems: PropTypes.func,

  /** @type {bool} Handle the disabled of selected items. */
  disabled: PropTypes.bool,

  /** @type {string} tooltip label for clearing a selected item */
  filterFieldClearSelectionTooltip: PropTypes.string,

  /** @type {string} tooltip label for clearing all selected items */
  filterFieldClearAllTooltip: PropTypes.string,
};

export default Filter;
