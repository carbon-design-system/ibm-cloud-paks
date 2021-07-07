/**
 * @file Filter panel checkbox component.
 * @copyright IBM Security 2020
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { getComponentNamespace } from '../../../globals/namespace';

import Checkbox from '../../Checkbox';
import FilterPanelLabel from '../FilterPanelLabel';

export const namespace = getComponentNamespace('filter-panel-checkbox');

const FilterPanelCheckbox = ({
  className,
  wrapperClassName,
  labelText,
  count,
  countLabel,
  title,
  ...other
}) => (
  <Checkbox
    className={classnames(namespace, className)}
    wrapperClassName={classnames(`${namespace}__wrapper`, wrapperClassName)}
    labelText={
      <FilterPanelLabel
        count={count}
        countLabel={countLabel}
        countClassName={`${namespace}__count`}
        title={title}>
        {labelText}
      </FilterPanelLabel>
    }
    {...other}
  />
);

FilterPanelCheckbox.propTypes = {
  ...Checkbox.propTypes,

  /**
   * Optional count.
   */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Function returning a translated text labeling the count for accessibility.
   */
  countLabel: PropTypes.func,

  /**
   * The `title` attribute of the checkbox label.
   */
  title: PropTypes.string,
};

FilterPanelCheckbox.defaultProps = {
  ...Checkbox.defaultProps,
  count: undefined,
  countLabel: (count) => `${count} items`,
  title: undefined,
};

export default FilterPanelCheckbox;
