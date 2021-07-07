/**
 * @file Search bar tests.
 * @copyright IBM Security 2019
 */

import { shallow } from 'enzyme';
import React from 'react';

import { SearchBar } from '../../..';
import props from '../_mocks_';

import { namespace } from '../SearchBar';

const {
  clearButtonLabelText,
  labelText,
  placeHolderText,
  selectedScopes,
  scopes,
  scopesTypeLabel,
  submitLabel,
  value,
} = props;

const regularProps = {
  submitLabel,
  placeHolderText,
  labelText,
  clearButtonLabelText,
};

const { fn } = jest;

describe('SearchBar', () => {
  let searchBar;
  let onChange;

  beforeEach(() => {
    onChange = fn();

    searchBar = shallow(<SearchBar {...regularProps} onChange={onChange} />);
  });

  describe('Rendering', () => {
    it('renders', () => {
      expect(searchBar).toMatchSnapshot();
    });

    it('renders an initial value', () => {
      searchBar.setProps({ value });
      expect(searchBar).toMatchSnapshot();
    });

    it('renders scopes', () => {
      searchBar.setProps({ scopes, scopesTypeLabel });
      expect(searchBar).toMatchSnapshot();
    });

    it('renders selected scopes', () => {
      searchBar.setProps({ scopes, scopesTypeLabel, selectedScopes });

      expect(searchBar).toMatchSnapshot();
    });

    it('disables the submit button with no value', () => {
      searchBar.setProps({ value: null });

      expect(searchBar).toMatchSnapshot();
    });

    it('disables the submit button with no selected scopes', () => {
      searchBar.setProps({
        scopes,
        scopesTypeLabel,
        selectedScopes: [],
      });

      expect(searchBar).toMatchSnapshot();
    });
  });

  describe('Events', () => {
    const simulate = (event, parameters, className = '') =>
      searchBar.find(`.${namespace}${className}`).simulate(event, parameters);

    it('calls the change handler when the value changes', () => {
      simulate('change', { target: { value } }, '__input');

      expect(onChange).toHaveBeenCalledWith({ value });
    });

    it('calls the change handler when the scope changes', () => {
      searchBar.setProps({ scopes, scopesTypeLabel });

      simulate('change', { selectedItems: selectedScopes }, '__scopes');

      expect(onChange).toHaveBeenCalledWith({
        selectedScopes,
        value: SearchBar.defaultProps.value,
      });
    });

    it('calls the submit handler when the submit button is selected', () => {
      const onSubmit = fn();
      searchBar.setProps({ onSubmit, value });

      simulate('submit', { preventDefault: fn() });

      expect(onSubmit).toHaveBeenCalledWith({ value });
    });

    it('prevents the default submit action', () => {
      const preventDefault = fn();

      simulate('submit', { preventDefault });

      expect(preventDefault).toHaveBeenCalledTimes(1);
    });
  });
});
