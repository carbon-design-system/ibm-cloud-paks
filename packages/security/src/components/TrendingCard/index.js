/**
 * @file Trending card.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import { elementType, node, string } from 'prop-types';
import React, { Fragment } from 'react';

import { getComponentNamespace } from '../../globals/namespace';

const namespace = getComponentNamespace('trending-card');

/**
 * Trending cards provide summary information of trending items with the ability to navigate to the details.
 */
const TrendingCard = ({ className, element, title, subtitle, ...other }) =>
  React.createElement(
    element,
    { className: classnames(namespace, className), ...other },
    <Fragment>
      <h3 className={`${namespace}__title`}>{title}</h3>
      {subtitle && <span className={`${namespace}__subtitle`}>{subtitle}</span>}
    </Fragment>
  );

TrendingCard.defaultProps = {
  subtitle: null,
  element: 'a',
  className: null,
};

TrendingCard.propTypes = {
  /** Specify the text of the title */
  title: string.isRequired,

  /** Specify the content of the subtitle */
  subtitle: node,

  /** Specify the base element to use to build the link. This can also accept custom components like `Link` from `react-router` */
  element: elementType,

  /** Provide an optional class to be applied to the containing node */
  className: string,
};

export default TrendingCard;
