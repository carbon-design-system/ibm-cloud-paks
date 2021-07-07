/**
 * @file Filter panel group component.
 * @copyright IBM Security 2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getComponentNamespace } from '../../../globals/namespace';
import FilterPanelLabel from '../FilterPanelLabel';

const namespace = getComponentNamespace('filter-panel-group');

const FilterPanelGroup = ({
  title,
  count,
  countLabel,
  className,
  titleClassName,
  children,
  heading,
  ...other
}) => (
  <div className={classnames(namespace, className)} {...other}>
    {(heading || title) && (
      <h2 className={classnames(`${namespace}__title`, titleClassName)}>
        <FilterPanelLabel count={count} countLabel={countLabel} title={title}>
          {heading || title}
        </FilterPanelLabel>
      </h2>
    )}
    <div className={`${namespace}__content`}>{children}</div>
  </div>
);

FilterPanelGroup.propTypes = {
  /**
   * Group `title` attribute.
   */
  title: PropTypes.string,

  /**
   * Group heading node.
   * If no `heading` is provided, then the `title` prop value will be used instead.
   */
  heading: PropTypes.node,

  /**
   * Optional group count.
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
   * Optional class name for the title.
   */
  titleClassName: PropTypes.string,

  /**
   * Group content.
   */
  children: PropTypes.node,
};

FilterPanelGroup.defaultProps = {
  title: undefined,
  count: undefined,
  countLabel: (count) => `${count} items`,
  className: undefined,
  titleClassName: undefined,
  children: undefined,
  heading: undefined,
};

export default FilterPanelGroup;
