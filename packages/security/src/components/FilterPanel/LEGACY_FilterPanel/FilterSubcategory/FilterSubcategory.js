/**
 * @file Filter Subcategory.
 * @copyright IBM Security 2019 - 2021
 */

import { Add16, Subtract16 } from '@carbon/icons-react';

import PropTypes from 'prop-types';
import React from 'react';

import * as defaultLabels from '../../../../globals/nls';
import { getComponentNamespace } from '../../../../globals/namespace';
import theme from '../../../../globals/theme';

import { AccordionItem } from '../../../Accordion';
import Button from '../../../Button';
import FilterSelector from '../FilterSelector';
import {
  filterSubcategoryPropTypes,
  filterDataPropTypes,
} from '../FilterPanelUtilities';
import ScrollGradient from '../../../ScrollGradient';

export const namespace = getComponentNamespace('filter-subcategory');

const FilterSubcategory = ({
  filterData,
  subcategory,
  onChange,
  labels,
  filtersExpandLabel,
  filtersCollapseLabel,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [listContainer, setListContainer] = React.useState(null);
  const visibleChildren = React.useRef(null);

  const filters = subcategory.filters
    .map((filterId) => filterData.filters[filterId])
    .filter((filter) => filter.count > 0);

  const shouldTruncate = filters.length > 10;

  let displayCount = shouldTruncate ? 5 : filters.length;
  if (shouldTruncate && isExpanded) {
    displayCount = 10;
  }

  // After the component's expanded state has changed update the height of the list container to be
  // the same as its visible children set.
  React.useEffect(() => {
    if (shouldTruncate && listContainer && visibleChildren.current) {
      listContainer.style.height = `${visibleChildren.current.clientHeight}px`;
    }
  }, [isExpanded]);

  const handleExpand = () => {
    // Pre-set the height of the list container to its own current height so we can smoothly
    // transition into its new height in the React Effect hook.
    if (listContainer && visibleChildren.current) {
      listContainer.style.height = `${listContainer.clientHeight}px`;
    }
    setIsExpanded(!isExpanded);
  };

  const componentLabels = {
    ...defaultLabels.labels,
    ...defaultLabels.filterFalsey({
      FILTER_PANEL_CATEGORY_EXPAND_LABEL: filtersExpandLabel,
      FILTER_PANEL_CATEGORY_COLLAPSE_LABEL: filtersCollapseLabel,
    }),
    ...labels,
  };

  const buttonLabel = isExpanded
    ? componentLabels.FILTER_PANEL_CATEGORY_COLLAPSE_LABEL
    : componentLabels.FILTER_PANEL_CATEGORY_EXPAND_LABEL;

  return (
    <AccordionItem
      title={subcategory.name}
      className={namespace}
      open={subcategory.open}>
      <ul className={`${namespace}__filter-list`}>
        <ScrollGradient
          scrollElementClassName={`${namespace}__scroller`}
          color={theme.uiBackground}
          getScrollElementRef={setListContainer}>
          <div
            role="presentation"
            className={`${namespace}__filters ${namespace}__filters--visible`}
            ref={visibleChildren}>
            {filters.slice(0, displayCount).map((filter) => (
              <li className={`${namespace}__filter`} key={filter.id}>
                <FilterSelector filter={filter} onChange={onChange} />
              </li>
            ))}
          </div>
          {shouldTruncate && isExpanded && (
            <div
              role="presentation"
              className={`${namespace}__filters ${namespace}__filters--hidden`}>
              {filters.slice(displayCount).map((filter) => (
                <li className={`${namespace}__filter`} key={filter.id}>
                  <FilterSelector filter={filter} onChange={onChange} />
                </li>
              ))}
            </div>
          )}
        </ScrollGradient>
      </ul>
      {shouldTruncate && (
        <Button
          className={`${namespace}__button--toggle`}
          iconDescription={buttonLabel}
          kind="ghost"
          onClick={handleExpand}
          renderIcon={isExpanded ? Subtract16 : Add16}>
          {isExpanded
            ? buttonLabel
            : `${buttonLabel} (${filters.length - displayCount})`}
        </Button>
      )}
    </AccordionItem>
  );
};

FilterSubcategory.propTypes = {
  /** @type {string} Label for truncated filters list to expand */
  filtersExpandLabel: PropTypes.string,

  /** @type {string} Label for expanded filters list to collapse */
  filtersCollapseLabel: PropTypes.string,

  /** @type {(filter: Filter) => {}} Callback function when any filter is toggled */
  onChange: PropTypes.func,

  /** @type {FilterSubcategory} Subcategory to render */
  subcategory: filterSubcategoryPropTypes.isRequired,

  /** @type {FilterData}  Filter data to used to render panel */
  filterData: filterDataPropTypes.isRequired,

  /** @type {object} Labels for filter panel and search */
  labels: defaultLabels.propType,
};

FilterSubcategory.defaultProps = {
  onChange: () => {},
  filtersExpandLabel: '',
  filtersCollapseLabel: '',
  labels: {},
};

export default FilterSubcategory;
