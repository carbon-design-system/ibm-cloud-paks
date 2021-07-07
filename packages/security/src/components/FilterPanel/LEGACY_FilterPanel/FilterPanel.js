/**
 * @file Filter Panel.
 * @copyright IBM Security 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import FilterSearch from './FilterSearch';
import FilterCategory from './FilterCategory';
import {
  filterDataPropTypes,
  filterDataDefaultProps,
  getFilterCategoriesArray,
} from './FilterPanelUtilities';
import { getComponentNamespace } from '../../../globals/namespace';
import * as defaultLabels from '../../../globals/nls';

export const namespace = getComponentNamespace('filter-panel');

const FilterPanel = (props) => {
  const {
    title,
    filterData,
    onChange,
    filtersExpandLabel,
    filtersCollapseLabel,
    filterSearchLabel,
    noFiltersResultsLabel,
    labels,
  } = props;
  const componentLabels = {
    ...defaultLabels.labels,
    ...labels,
    ...defaultLabels.filterFalsey({
      FILTER_PANEL_CATEGORY_EXPAND_LABEL: filtersExpandLabel,
      FILTER_PANEL_CATEGORY_COLLAPSE_LABEL: filtersCollapseLabel,
      FILTER_PANEL_SEARCH_LABEL: filterSearchLabel,
      FILTER_PANEL_SEARCH_NO_RESULTS_LABEL: noFiltersResultsLabel,
    }),
  };

  return (
    <aside className={namespace} data-testid="legacy-filter-panel">
      {title && <h1 className={`${namespace}__title`}>{title}</h1>}
      <div className={`${namespace}__search`}>
        <FilterSearch
          filterData={filterData}
          onChange={onChange}
          labels={componentLabels}
        />
      </div>

      <div className={`${namespace}__category-list`}>
        {getFilterCategoriesArray(filterData)
          .filter((category) => category.count > 0)
          .map((category) => (
            <FilterCategory
              key={category.id}
              filterData={filterData}
              category={category}
              onChange={onChange}
              labels={componentLabels}
            />
          ))}
      </div>
    </aside>
  );
};

FilterPanel.propTypes = {
  /** @type {string} Title on filter panel */
  title: PropTypes.string,

  /** @type {string} Label for truncated filters list to expand */
  filtersExpandLabel: PropTypes.string,

  /** @type {string} Label for expanded filters list to collapse */
  filtersCollapseLabel: PropTypes.string,

  /** @type {string} Label for filter search input */
  filterSearchLabel: PropTypes.string,

  /** @type {string} Label for filter search when no filters are found */
  noFiltersResultsLabel: PropTypes.string,

  /** @type {object} Labels for FilterPanel and children */
  labels: defaultLabels.propType,

  /** @type {(filter: Filter) => {}} Callback function when any filter is toggled */
  onChange: PropTypes.func,

  /** @type {FilterData}  Filter data to used to render panel */
  filterData: filterDataPropTypes,
};

FilterPanel.defaultProps = {
  title: null,
  filtersExpandLabel: '',
  filtersCollapseLabel: '',
  filterSearchLabel: '',
  noFiltersResultsLabel: '',
  labels: {},
  onChange: () => {},
  filterData: filterDataDefaultProps,
};

export default FilterPanel;
