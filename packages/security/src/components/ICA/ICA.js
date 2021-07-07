/**
 * @file Important content area (ICA).
 * @copyright IBM Security 2019 - 2020
 */

import classnames from 'classnames';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import 'numeral/locales';

import { ArrowUp16, ArrowUp20, ArrowUp24 } from '@carbon/icons-react';
import Icon from '../Icon/Icon';

import isDevelopment from '../../globals/env';
import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('ica');

/**
 * @type {string[]} Array of accepted locales by Numeral.js.
 */
export const Locales = Object.keys(numeral.locales);

/**
 * Ensure that the format string includes a decimal space only for values that
 * are 1000 and above.
 * @param {number} value The value to evaluate.
 * @returns {string} Format string for numeral.
 */
const getFormat = (value) => (Math.round(value) > 999 ? '0.0a' : '0a');

/**
 * Ensure that the value is formatted correctly based on whether it should be truncated or not.
 * @param {number} value The value to format.
 * @param {boolean} truncate Whether or not the value should be truncated.
 * @returns {string} The formatted value.
 */
const formatValue = (value, truncate) => {
  const localeValue = numeral(value);

  return truncate ? localeValue.format(getFormat(value)) : localeValue.value();
};

/**
 * Ensure that the value includes a percentage if specified by prop,
 * or otherwise the value is properly formatted.
 * @param {boolean} percentage Whether a percent sign should be included.
 * @param {number|null} value The value to be formatted.
 * @param {boolean} truncate Whether or not the value should be truncated.
 * @returns {string} Formatted string.
 */
const truncateValue = (percentage, value, truncate) => {
  if (percentage) {
    return (
      <div className={`${namespace}__percentage`}>
        {value}
        <span className={`${namespace}__percentage-mark`}>%</span>
      </div>
    );
  }

  return value === null ? '–' : formatValue(value, truncate);
};

const ICA = ({
  className,
  forceShowTotal,
  label,
  locale,
  percentage,
  size,
  trending,
  truncate,
  total,
  value,
  ...other
}) => {
  const isSize = (sizeValue) => size === sizeValue;
  const isLarge = isSize('lg');
  const isXLarge = isSize('xl');

  let renderIcon = ArrowUp16;
  if (isLarge) {
    renderIcon = ArrowUp20;
  } else if (isXLarge) {
    renderIcon = ArrowUp24;
  }

  const ICAClasses = classnames(className, {
    [`${namespace}--lg`]: isLarge,
    [`${namespace}--xl`]: isXLarge,
  });

  if (Locales.includes(locale)) {
    numeral.locale(locale);
  } else {
    if (isDevelopment()) {
      console.warn(
        `Locale "${locale}" for ICA component is not recognized. Using fallback locale "${ICA.defaultProps.locale}. For list of supported locales go to: https://github.com/carbon-design-system/ibm-security/tree/master/src/components/ICA`
      );
    }
    numeral.locale(ICA.defaultProps.locale);
  }

  const truncatedValue = truncateValue(percentage, value, truncate);
  const truncatedTotal = formatValue(total, truncate);

  const shouldDisplayof =
    (!percentage && total > value && truncatedValue !== truncatedTotal) ||
    (forceShowTotal && truncatedTotal > 0);

  return (
    <div className={`${ICAClasses}`} {...other}>
      <h4 className={`${namespace}__label`}>{label} </h4>
      <span className={`${namespace}__row`}>
        {trending && (
          <Icon className={`${namespace}__trend`} renderIcon={renderIcon} />
        )}
        <span className={`${namespace}__value`}>{truncatedValue}</span>
        {shouldDisplayof ? (
          <span className={`${namespace}__total`}>
            {' '}
            <span>/{truncatedTotal}</span>
          </span>
        ) : null}
      </span>
    </div>
  );
};

ICA.propTypes = {
  /**
   * Text label for ICA.
   * @type string
   */
  label: PropTypes.string.isRequired,

  /**
   * The main ICA value to display
   * @type number
   */
  value: PropTypes.number,

  /**
   * Total value that the main ICA value is a subset of.
   * @type number
   */
  total: PropTypes.number,

  /**
   * Optional class name.
   * @type number
   */
  className: PropTypes.string,

  /**
   * Locale value to determine approach to formatting numbers.
   * @type string
   */
  locale: PropTypes.oneOf(Locales),

  /**
   * Format number to percentage when `percentage` prop is true.
   * @type bool
   */
  percentage: PropTypes.bool,

  /**
   * Display the `total` even when the `value` is equal to
   * the `total` when `forceShowTotal` prop is true on the
   * condition that the `total` is greater than 0.
   * @type bool
   */
  forceShowTotal: PropTypes.bool,

  /** Specify whether or not the values should be truncated. */
  truncate: PropTypes.bool,

  /** The size of the ICA. */
  size: PropTypes.oneOf(['default', 'lg', 'xl']),

  /** Display trending icon. */
  trending: PropTypes.bool,
};

ICA.defaultProps = {
  total: 0,
  className: '',
  locale: 'en',
  percentage: false,
  size: 'default',
  value: null,
  forceShowTotal: false,
  trending: false,
  truncate: true,
};

export default ICA;
