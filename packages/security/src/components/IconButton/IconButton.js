/**
 * @file Icon button.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import { bool, func, oneOf, string } from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../globals/namespace';

import Icon, {
  renderIconDefaultProp,
  renderIconPropType,
  sizeDefaultProp,
  sizePropType,
} from '../Icon/Icon';

const defaultTooltipDirection = 'bottom';
const tooltipDirections = ['top', 'right', defaultTooltipDirection, 'left'];

export const namespace = getComponentNamespace('button--icon');

/** @enum Allowed tooltip directions. */
export const TooltipDirection = tooltipDirections.reduce(
  (accumulator, tooltipDirection) => {
    accumulator[tooltipDirection.toUpperCase()] = tooltipDirection;

    return accumulator;
  },
  {}
);

/**
 * Icon button component.
 */
const IconButton = ({
  className,
  iconClassName,
  iconSize,
  label,
  onClick,
  path,
  renderIcon,
  size,
  state,
  tooltip,
  tooltipDirection,
  ...other
}) => {
  const hasTooltip = label && tooltip;

  return (
    <button
      className={classnames(namespace, className, {
        [`${namespace}--active`]: state,
        [`${namespace}--${size}`]: size,
        [`${namespace}--tooltip`]: hasTooltip,
        [`${namespace}--tooltip--${tooltipDirection}`]: hasTooltip,
      })}
      aria-label={label}
      onClick={onClick}
      {...other}>
      <Icon
        className={iconClassName}
        path={path}
        renderIcon={renderIcon}
        size={iconSize}
      />
    </button>
  );
};

IconButton.defaultProps = {
  className: null,
  iconClassName: '',
  iconSize: sizeDefaultProp,
  label: null,
  onClick: null,
  path: null,
  renderIcon: renderIconDefaultProp,
  size: null,
  state: false,
  tooltip: true,
  tooltipDirection: defaultTooltipDirection,
};

IconButton.propTypes = {
  /** @type {string} Extra classes to add. */
  className: string,

  /** @type {string} Icon classes to add. */
  iconClassName: string,

  /** @type {number|string} Icon dimensions. */
  iconSize: sizePropType,

  /** @type {string} Label. */
  label: string,

  /** @type {Function} Click handler. */
  onClick: func,

  /** @type {string} Path for icon. */
  path: string,

  /** @type {Function|object} Icon to render. */
  renderIcon: renderIconPropType,

  /** @type {string} Icon button size. */
  size: sizePropType,

  /** @type {boolean} The state of the icon button. */
  state: bool,

  /** @type {boolean} Specify tooltip. */
  tooltip: bool,

  /** @type {string} Tooltip direction. */
  tooltipDirection: oneOf(tooltipDirections),
};

IconButton.TooltipDirection = TooltipDirection;

export default IconButton;
