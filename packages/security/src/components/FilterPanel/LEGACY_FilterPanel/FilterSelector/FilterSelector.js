/**
 * @file Filter selector.
 * @copyright IBM Security 2019
 */

import PropTypes from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../../../globals/namespace';

import { filterFiltersPropTypes } from '../FilterPanelUtilities';
import FilterPanelCheckbox from '../../FilterPanelCheckbox';

export const namespace = getComponentNamespace('filter-selector');

const FilterSelector = ({ filter, onChange }) => (
  <FilterPanelCheckbox
    checked={filter.enabled}
    onChange={() => onChange(filter)}
    id={`filter-selector-${filter.id}`}
    count={filter.count}
    labelText={filter.name}
  />
);

FilterSelector.propTypes = {
  /** @type {Filter} Filter to render selector for */
  filter: filterFiltersPropTypes.isRequired,

  /** @type {(filter: Filter) => {}} Callback function when any filter is toggled */
  onChange: PropTypes.func,
};

FilterSelector.defaultProps = {
  onChange: () => {},
};

export default FilterSelector;
