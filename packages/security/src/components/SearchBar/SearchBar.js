/**
 * @file SearchBar.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import Search from '../Search';
import MultiSelect from '../MultiSelect';

import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('search-bar');

/**
 * Custom scope validator for props that are only required when scopes has been provided.
 * @param {object} props Object containing passed in props.
 * @param {string} propName Name of prop the validator is for.
 * @param {string} componentName Name of component.
 * @param  {...any} rest Rest of parameters to pass down to string prop validator.
 * @returns {Error|null} Error if validation failed otherwise nothing.
 */
const conditionalScopePropValidator = (
  props,
  propName,
  componentName,
  ...rest
) => {
  if (props.scopes && props.scopes.length > 0 && !props[propName]) {
    return new Error(
      `Required \`${propName}\` when \`scopes\` prop type is supplied to \`${componentName}\`. Validation failed.`
    );
  }

  return PropTypes.string(props, propName, componentName, ...rest);
};

export default class SearchBar extends React.Component {
  static propTypes = {
    /** @type {string} Optional additional class name. */
    className: PropTypes.string,

    /** @type {string} Search query value. */
    value: PropTypes.string,

    /** @type {Function} Function handler for when the user submits a search. */
    onSubmit: PropTypes.func,

    /** @type {Function} Function handler for when the user changes their query search. */
    onChange: PropTypes.func,

    /** @type {string} The label text for the search text input. */
    clearButtonLabelText: PropTypes.string.isRequired,

    /** @type {string} Placeholder text to be displayed in the search input. */
    placeHolderText: PropTypes.string.isRequired,

    /** @type {string} The label text for the search text input. */
    labelText: PropTypes.string.isRequired,

    /** @type {string} The label text for the search submit button. */
    submitLabel: PropTypes.string.isRequired,

    /** @type {Array<any>} Array of allowed search scopes. */
    scopes: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),

    /** @type {Array<any> Array of initially selected search scopes. */
    selectedScopes: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),

    /** @type {Function} Function to get the text for each sscope to display in dropdown. */
    scopeToString: PropTypes.func,

    /** @type {string} The name text for the search scope type. */
    // eslint-disable-next-line react/require-default-props
    scopesTypeLabel: conditionalScopePropValidator,

    /** @type {func} Callback function for translating MultiSelect's child ListBoxMenuIcon SVG title. */
    translateWithId: PropTypes.func, // eslint-disable-line react/require-default-props

    /**
     * Optional custom sorting algorithm for an array of scope items.
     * By default, scope items are sorted in ascending alphabetical order,
     * with "selected" items moved to the start of the scope items array.
     */
    sortItems: PropTypes.func, // eslint-disable-line react/require-default-props

    /**
     * Provide accessible label text for the scopes MultiSelect.
     */
    titleText: PropTypes.string,

    /**
     * Whether or not the scopes MultiSelect label is visually hidden.
     */
    hideScopesLabel: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    value: '',
    onSubmit: () => {},
    onChange: () => {},
    scopeToString: () => {},
    scopes: [],
    selectedScopes: [],
    titleText: 'Scopes multiselect',
    hideScopesLabel: true,
  };

  /**
   * Handler for search input changes that calls onChange prop.
   * @param {KeyboardEvent} event Event object from input change.
   */
  handleInputChange = (event) => {
    const { value } = event.target;
    const eventObject = { value };

    if (this.props.scopes.length > 0) {
      eventObject.selectedScopes = this.props.selectedScopes;
    }

    this.props.onChange(eventObject);
  };

  /**
   * Handler for form submit that calls onSubmit prop.
   * @param {Event} event Submit event generated.
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const eventObject = { value: this.props.value };

    if (this.props.scopes.length > 0) {
      eventObject.selectedScopes = this.props.selectedScopes;
    }

    this.props.onSubmit(eventObject);
  };

  /**
   * Handler for when scope selection changes that calls onChangeProp.
   * @param {{selectedItems: Array<any>}} {selectedItems} Object containing array of selected items.
   */
  handleSearchScopeChange = ({ selectedItems }) => {
    this.props.onChange({
      selectedScopes: selectedItems,
      value: this.props.value,
    });
  };

  /**
   * Renders scope selector dropdown.
   * @returns {ReactElement} Scope selector.
   */
  renderScopeSelector() {
    const {
      scopes,
      scopeToString,
      scopesTypeLabel,
      selectedScopes,
      translateWithId,
      sortItems,
      titleText,
    } = this.props;

    if (scopes.length === 0) {
      return null;
    }

    return (
      <MultiSelect
        id={`${namespace}__multi-select`}
        name="search-scopes"
        className={`${namespace}__scopes`}
        label={scopesTypeLabel}
        onChange={this.handleSearchScopeChange}
        initialSelectedItems={selectedScopes}
        items={scopes}
        itemToString={scopeToString}
        translateWithId={translateWithId}
        sortItems={sortItems}
        titleText={titleText}
      />
    );
  }

  render() {
    const {
      labelText,
      placeHolderText,
      submitLabel,
      value,
      className,
      scopes,
      selectedScopes,
      clearButtonLabelText,
      hideScopesLabel,
    } = this.props;

    return (
      <form
        className={classnames(namespace, className, {
          [`${namespace}--hide-scopes-label`]: hideScopesLabel,
        })}
        onSubmit={this.handleSubmit}>
        {this.renderScopeSelector()}
        <Search
          className={`${namespace}__input`}
          closeButtonLabelText={clearButtonLabelText}
          labelText={labelText}
          name="search-input"
          onChange={this.handleInputChange}
          placeholder={placeHolderText}
          value={value}
        />
        <Button
          name="search-submit"
          kind="primary"
          type="submit"
          className={`${namespace}__submit`}
          disabled={
            !value ||
            value.length === 0 ||
            (scopes.length !== 0 && selectedScopes.length === 0)
          }>
          {submitLabel}
        </Button>
      </form>
    );
  }
}
