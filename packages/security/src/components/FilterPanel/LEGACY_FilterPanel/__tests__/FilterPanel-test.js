/**
 * @file Filter Panel tests.
 * @copyright IBM Security 2020
 */

import React from 'react';
import { shallow } from 'enzyme';
import FilterPanel from '..';
import {
  filterData,
  title,
  filtersExpandLabel,
  filtersCollapseLabel,
  noFiltersResultsLabel,
  filterSearchLabel,
  filter,
  labels,
} from '../../_mocks_';

describe('FilterPanel', () => {
  let filterPanel;
  const uniqueProps = {
    filtersExpandLabel,
    filtersCollapseLabel,
    noFiltersResultsLabel,
    filterSearchLabel,
  };

  beforeEach(() => {
    filterPanel = shallow(
      <FilterPanel filterData={filterData} labels={labels} />
    );
  });

  test('renders with no title', () => expect(filterPanel).toMatchSnapshot());

  test('renders with title', () => {
    filterPanel.setProps({ title });
    expect(filterPanel).toMatchSnapshot();
  });

  test('should overwrite `labels` when unique props defined', () => {
    filterPanel.setProps(uniqueProps);
    expect(filterPanel).toMatchSnapshot();
  });

  test('invokes `onChange` when filter is changed', () => {
    const onChange = jest.fn();
    filterPanel.setProps({ onChange });
    filterPanel.find('FilterSearch').simulate('change', filter);
    expect(onChange).toHaveBeenCalledWith(filter);
  });
});
