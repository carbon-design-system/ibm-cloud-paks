/**
 * @file Time indicator.
 * @copyright IBM Security 2019 - 2021
 */

import { Time16 } from '@carbon/icons-react';

import classnames from 'classnames';
import { node, string } from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../globals/namespace';

const namespace = getComponentNamespace('time-indicator');

/**
 * Time indicators display an estimated amount of time it takes to complete a flow. If there is unavailable space to accommodate the text, `minute` should be abbreviated to `min`.
 */
const TimeIndicator = ({ children, className, ...other }) => (
  <span className={classnames(namespace, className)} {...other}>
    <Time16 className={`${namespace}__icon`} />
    {children}
  </span>
);

TimeIndicator.defaultProps = {
  className: null,
};

TimeIndicator.propTypes = {
  /** Provide the contents of the `TimeIndicator` */
  children: node.isRequired,

  /** Provide an optional class to be applied to the containing node */
  className: string,
};

export default TimeIndicator;
