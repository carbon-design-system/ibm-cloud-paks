/**
 * @file Summary card footer.
 * @copyright IBM Security 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getComponentNamespace } from '../../../globals/namespace/index';

const namespace = getComponentNamespace('summary-card__footer');

const SummaryCardFooter = ({ className, children, ...other }) => (
  <div className={classnames(namespace, className)} {...other}>
    {children}
  </div>
);

SummaryCardFooter.propTypes = {
  /** @type {node} The children are rendered in the main content area of the card. */
  children: PropTypes.node.isRequired,

  /** @type {string} The class. */
  className: PropTypes.string,
};

SummaryCardFooter.defaultProps = {
  className: null,
};

export default SummaryCardFooter;
