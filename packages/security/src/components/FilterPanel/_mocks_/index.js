/**
 * @file Filter Panel mock data used in tests and Storybook stories.
 * @copyright IBM Security 2019
 */

import filterData from './data.json';

const MockFilterData = {
  categories: {
    DEFAULT: filterData.categories.DEFAULT,
    NO_SUBCATEGORIES: filterData.categories.NO_SUBCATEGORIES,
    NO_FILTERS: filterData.categories.NO_FILTERS,
  },
  subcategories: {
    DEFAULT: filterData.subcategories.DEFAULT,
    TRUNCATED: filterData.subcategories.TRUNCATED,
    NO_FILTERS: filterData.subcategories.NO_FILTERS,
    ZERO_FILTERS_COUNT: filterData.subcategories.ZERO_FILTERS_COUNT,
    OPEN: filterData.subcategories.OPEN,
  },
  filters: {
    DEFAULT: filterData.filters.DEFAULT,
    SELECTED: filterData.filters.SELECTED,
    LONG_TEXT: filterData.filters.LONG_TEXT,
  },
};

const title = 'Filters';
const filtersExpandLabel = 'View more - prop';
const filtersCollapseLabel = 'View less - prop';
const noFiltersResultsLabel = 'No filter matches your search - prop';
const filterSearchLabel = 'Find filter - prop';

const labels = {
  FILTER_PANEL_CATEGORY_EXPAND_LABEL: 'View more',
  FILTER_PANEL_CATEGORY_COLLAPSE_LABEL: 'View less',
  FILTER_PANEL_SEARCH_LABEL: 'Find filter...',
  FILTER_PANEL_SEARCH_NO_RESULTS_LABEL: 'No filter matches your search',
  FILTER_PANEL_SEARCH_CLOSE_BUTTON: 'Clear search',
};

const category = filterData.categories.DEFAULT;
const subcategory = filterData.subcategories[category.subcategories[0]];
const filter = filterData.filters[subcategory.filters[0]];

export {
  MockFilterData,
  title,
  filtersExpandLabel,
  filtersCollapseLabel,
  noFiltersResultsLabel,
  filterSearchLabel,
  filterData,
  category,
  subcategory,
  filter,
  labels,
};
