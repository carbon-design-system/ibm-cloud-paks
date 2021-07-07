/**
 * @file Filter panel component.
 * @copyright IBM Security 2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LegacyFilterPanel from './LEGACY_FilterPanel';
import { getComponentNamespace } from '../../globals/namespace';
import deprecatedProp from '../../globals/prop-types';

export const namespace = getComponentNamespace('filter-panel');

const FilterPanel = (props) => {
  const { title, children, className, filterData, ...other } = props;

  if (filterData) {
    return <LegacyFilterPanel {...props} />;
  }

  return (
    <section className={classnames(namespace, className)} {...other}>
      {title && <h1 className={`${namespace}__title`}>{title}</h1>}
      {children}
    </section>
  );
};

FilterPanel.propTypes = {
  /**
   * Optional title for the filter panel.
   */
  title: PropTypes.node,

  /**
   * Filter panel content.
   */
  children: PropTypes.node,

  /**
   * Optional class name.
   */
  className: PropTypes.string,

  /**
   * (Deprecated) filter data object.
   */
  filterData: deprecatedProp('children', PropTypes.object),
};

FilterPanel.defaultProps = {
  title: undefined,
  children: undefined,
  className: undefined,
  filterData: undefined,
};

export default FilterPanel;
