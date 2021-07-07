/**
 * @file Filter Category tests.
 * @copyright IBM Security 2019
 */

import React from 'react';
import { shallow } from 'enzyme';
import FilterCategory from '..';
import {
  MockFilterData,
  filterData,
  filtersCollapseLabel,
  filtersExpandLabel,
  labels,
} from '../../../_mocks_';

const uniqueProps = {
  filtersCollapseLabel,
  filtersExpandLabel,
};

describe('FilterCategory', () => {
  let filterCategory;

  beforeEach(() => {
    filterCategory = shallow(
      <FilterCategory
        filterData={filterData}
        category={MockFilterData.categories.DEFAULT}
        labels={labels}
      />
    );
  });

  test('renders', () => expect(filterCategory).toMatchSnapshot());

  test('does not render without subcategories', () => {
    filterCategory.setProps({
      category: MockFilterData.categories.NO_SUBCATEGORIES,
    });
    expect(filterCategory).toMatchSnapshot();
  });

  test('does not render without filters', () => {
    filterCategory.setProps({ category: MockFilterData.categories.NO_FILTERS });
    expect(filterCategory).toMatchSnapshot();
  });

  test('should not overwrite `labels` when unique props defined', () => {
    filterCategory.setProps({ ...uniqueProps });
    expect(filterCategory).toMatchSnapshot();
  });
});
