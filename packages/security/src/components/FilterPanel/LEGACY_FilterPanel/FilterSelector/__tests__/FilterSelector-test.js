/**
 * @file Filter Selector tests.
 * @copyright IBM Security 2019
 */

import React from 'react';
import { shallow } from 'enzyme';
import FilterSelector from '..';
import { MockFilterData } from '../../../_mocks_';

describe('FilterSelector', () => {
  let filterSelector;

  beforeEach(() => {
    filterSelector = shallow(
      <FilterSelector
        filter={MockFilterData.filters.DEFAULT}
        onChange={() => {}}
      />
    );
  });

  describe('Rendering', () => {
    test('renders unchecked filter', () =>
      expect(filterSelector).toMatchSnapshot());

    test('renders checked filter', () => {
      filterSelector.setProps({ filter: MockFilterData.filters.SELECTED });
      expect(filterSelector).toMatchSnapshot();
    });
  });

  describe('Events', () => {
    test('invokes `onChange` when filter is clicked', () => {
      const onChange = jest.fn();
      filterSelector.setProps({ onChange });
      filterSelector.find('FilterPanelCheckbox').simulate('change');
      expect(onChange).toHaveBeenCalledWith(MockFilterData.filters.DEFAULT);
    });
  });
});
