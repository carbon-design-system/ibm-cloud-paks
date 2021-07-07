/**
 * @file Filter panel label component.
 * @copyright IBM Security 2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getComponentNamespace } from '../../../globals/namespace';

const namespace = getComponentNamespace('filter-panel-label');

const FilterPanelLabel = ({
  children,
  count,
  countLabel,
  className,
  countClassName,
  title,
  ...other
}) => (
  <span className={classnames(namespace, className)} {...other}>
    <span className={`${namespace}__text`} title={title}>
      {children}
    </span>
    {!Number.isNaN(parseInt(count, 10)) && (
      <span
        className={classnames(`${namespace}__count`, countClassName)}
        aria-label={`(${countLabel(count)})`}>
        {count}
      </span>
    )}
  </span>
);

FilterPanelLabel.propTypes = {
  /**
   * Label text.
   */
  children: PropTypes.node,

  /**
   * Label count.
   */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Function returning a translated text labeling the count for accessibility.
   */
  countLabel: PropTypes.func,

  /**
   * Optional class name.
   */
  className: PropTypes.string,

  /**
   * Optional class name for the count.
   */
  countClassName: PropTypes.string,

  /**
   * The `title` attribute that is applied to the label node.
   */
  title: PropTypes.string,
};

FilterPanelLabel.defaultProps = {
  children: undefined,
  count: undefined,
  countLabel: (count) => `${count} items`,
  className: undefined,
  countClassName: undefined,
  title: undefined,
};

export default FilterPanelLabel;
