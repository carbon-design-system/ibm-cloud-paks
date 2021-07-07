/**
 * @file Summary card body.
 * @copyright IBM Security 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ScrollGradient from '../../ScrollGradient';

import { getComponentNamespace } from '../../../globals/namespace/index';
import theme from '../../../globals/theme';

const namespace = getComponentNamespace('summary-card__body');

const SummaryCardBody = ({ children, className, ...other }) => (
  <div className={classnames(namespace, className)} {...other}>
    <ScrollGradient color={theme.uiBackground}>{children}</ScrollGradient>
  </div>
);

SummaryCardBody.propTypes = {
  /** @type {node} The children rendered in body area of the card. */
  children: PropTypes.node.isRequired,

  /** @type {string} Extra class names to add.. */
  className: PropTypes.string,
};

SummaryCardBody.defaultProps = {
  className: null,
};

export default SummaryCardBody;
