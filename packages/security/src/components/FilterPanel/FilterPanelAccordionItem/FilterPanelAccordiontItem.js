/**
 * @file Filter panel accordion item component.
 * @copyright IBM Security 2020
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { AccordionItem } from '../../Accordion';
import { getComponentNamespace } from '../../../globals/namespace';
import FilterPanelLabel from '../FilterPanelLabel';
import theme from '../../../globals/theme';
import TruncatedList from '../../TruncatedList';

const namespace = getComponentNamespace('filter-panel-accordion-item');

const FilterPanelAccordionItem = ({
  children,
  title,
  expandLabel,
  collapseLabel,
  scrollGradientColor,
  count,
  countLabel,
  className,
  heading,
  ...other
}) => {
  return (
    <AccordionItem
      title={
        <FilterPanelLabel
          count={count}
          countLabel={countLabel}
          className={`${namespace}__label`}
          countClassName={`${namespace}__count`}
          title={title}>
          {heading || title}
        </FilterPanelLabel>
      }
      className={classnames(namespace, className)}
      {...other}>
      <TruncatedList
        className={`${namespace}__list`}
        expandButtonClassName={`${namespace}__list-expand-button`}
        getExpandButtonLabel={(expanded, shown, hidden) =>
          expanded ? collapseLabel : `${expandLabel} (${hidden})`
        }
        scrollGradientColor={scrollGradientColor}>
        {Children.map(children, (child) => (
          <li className={`${namespace}__filter`} key={child.key}>
            {child}
          </li>
        ))}
      </TruncatedList>
    </AccordionItem>
  );
};

FilterPanelAccordionItem.propTypes = {
  /**
   * Accordion item `title` attribute.
   */
  title: PropTypes.string,

  /**
   * Accordion item heading node.
   * If no `heading` is provided, then the `title` prop will be used instead.
   */
  heading: PropTypes.node,

  /**
   * View more label for truncated content.
   */
  expandLabel: PropTypes.string,

  /**
   * View less label for expanded content.
   */
  collapseLabel: PropTypes.string,

  /**
   * Accordion item content.
   */
  children: PropTypes.node,

  /**
   * Optional color for the scroll gradient.
   */
  scrollGradientColor: PropTypes.string,

  /**
   * Optional count of unique values.
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
};

FilterPanelAccordionItem.defaultProps = {
  title: undefined,
  heading: undefined,
  expandLabel: 'expandLabel',
  collapseLabel: 'collapseLabel',
  children: undefined,
  scrollGradientColor: theme.uiBackground,
  count: undefined,
  countLabel: (count) => `${count} items`,
  className: undefined,
};

export default FilterPanelAccordionItem;
