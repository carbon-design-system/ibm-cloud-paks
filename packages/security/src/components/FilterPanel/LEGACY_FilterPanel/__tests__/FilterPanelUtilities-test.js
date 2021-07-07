/**
 * @file Filter Panel utility tests.
 * @copyright IBM Security 2019
 */

import { filterData } from '../../_mocks_';
import {
  getFilterCategoriesArray,
  getFilterSubcategoriesArray,
  getFiltersArray,
  getSelectedFiltersArray,
} from '../FilterPanelUtilities';

describe('FilterPanelUtilities', () => {
  test('getFilterCategoriesArray gets array of categories', () =>
    expect(getFilterCategoriesArray(filterData)).toMatchSnapshot());

  test('getFilterSubcategoriesArray gets array of subcategories', () =>
    expect(getFilterSubcategoriesArray(filterData)).toMatchSnapshot());

  test('getFiltersArray gets array of filters', () =>
    expect(getFiltersArray(filterData)).toMatchSnapshot());

  test('getSelectedFiltersArray gets array of filters', () => {
    expect(getSelectedFiltersArray(filterData)).toMatchSnapshot();
  });
});
