/**
 * @file Summary card.
 * @copyright IBM Security 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('summary-card');

const SummaryCard = ({ children, className, ...other }) => (
  <section className={classnames(namespace, className)} {...other}>
    {children}
  </section>
);

SummaryCard.defaultProps = {
  className: '',
};

SummaryCard.propTypes = {
  /** @type {node} The children are rendered in the main content area of the card. */
  children: PropTypes.node.isRequired,

  /** @type {string} Extra classes to add. */
  className: PropTypes.string,
};

export default SummaryCard;
