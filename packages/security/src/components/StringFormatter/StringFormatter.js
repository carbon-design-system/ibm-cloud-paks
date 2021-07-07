/**
 * @file String formatter.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import { bool, string, number, oneOf } from 'prop-types';
import React from 'react';

import TooltipDefinition from '../TooltipDefinition';

import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('string-formatter');

const StringFormatter = ({
  className,
  lines,
  tooltipDirection,
  truncate,
  value,
  width,
  ...other
}) => {
  const content = (
    <span
      className={classnames(namespace, className, {
        [`${namespace}--truncate`]: truncate,
      })}
      style={{
        maxWidth: width,
        WebkitLineClamp: lines,
      }}
      {...other}>
      {value}
    </span>
  );

  return truncate ? (
    <TooltipDefinition
      className={`${namespace}__tooltip`}
      align="start"
      direction={tooltipDirection}
      tooltipText={value}>
      {content}
    </TooltipDefinition>
  ) : (
    content
  );
};

StringFormatter.propTypes = {
  /** @type {string} Optional class name. */
  className: string,

  /** @type {number} Number of lines to clamp value. */
  lines: number,

  /** Specify the direction of the tooltip. Can be either top or bottom. */
  tooltipDirection: oneOf(['top', 'bottom']),

  /** Whether or not the value should be truncated. */
  truncate: bool,

  /** Value to format. */
  value: string.isRequired,

  /** Maximum width of value. */
  width: string,
};

StringFormatter.defaultProps = {
  className: null,
  lines: 1,
  tooltipDirection: 'bottom',
  truncate: false,
  width: null,
};

export default StringFormatter;
