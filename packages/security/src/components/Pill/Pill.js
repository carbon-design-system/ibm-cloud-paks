/**
 * @file Pill.
 * @copyright IBM Security 2019
 */

import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';

import { Decorator } from '../DataDecorator';

import { getComponentNamespace } from '../../globals/namespace/index';

export const namespace = getComponentNamespace('pill');

/**
 * Pill component.
 */
const Pill = ({ className, inline, type, value }) => {
  const classes = classnames(className, namespace, {
    [`${namespace}--inline`]: inline,
  });

  return (
    <Decorator
      className={classes}
      inline={inline}
      noIcon
      type={type}
      value={value}
    />
  );
};

Pill.propTypes = {
  /** @type {string} Extra classes to add. */
  className: PropTypes.string,

  /** @type {boolean} Whether the Pill should be treated and styled as an inline element. */
  inline: PropTypes.bool,

  /** @type {string} The type of data. */
  type: PropTypes.string.isRequired,

  /** @type {string} The value of the data. */
  value: PropTypes.string.isRequired,
};

Pill.defaultProps = {
  className: '',
  inline: false,
};

export default Pill;
