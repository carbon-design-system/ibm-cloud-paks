/**
 * @file Icon.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import { func, number, object, oneOfType, string } from 'prop-types';
import React, { cloneElement } from 'react';

import deprecatedProp from '../../globals/prop-types';
import { getComponentNamespace } from '../../globals/namespace';

const sizeDefaultProp = 20;
const sizePropType = oneOfType([number, string]);

const renderIconDefaultProp = null;
const renderIconPropType = oneOfType([func, object]);

// TODO: `2.x` - Remove deprecated props `height` and `width`.

/**
 * Icon component.
 */
const Icon = ({
  className,
  height,
  path,
  renderIcon: RenderIcon,
  size,
  title,
  viewBox,
  width,
  ...other
}) => {
  const iconProps = {
    'aria-hidden': 'true',
    className: classnames(getComponentNamespace('icon'), className),
    focusable: false,
    preserveAspectRatio: 'xMidYMid meet',
    style: {
      willChange: 'transform',
    },
    ...other,
  };

  const iconSize = size || height || width;

  if (path) {
    return (
      <svg {...iconProps} height={iconSize} width={iconSize} viewBox={viewBox}>
        {title && <title>{title}</title>}
        <path d={path} />
      </svg>
    );
  }

  return RenderIcon ? cloneElement(<RenderIcon />, iconProps) : RenderIcon;
};

Icon.defaultProps = {
  className: '',
  height: null,
  path: null,
  renderIcon: renderIconDefaultProp,
  size: sizeDefaultProp,
  title: undefined,
  viewBox: '0 0 32 32',
  width: null,
};

const deprecatedSizeProp = deprecatedProp('size', sizePropType);

Icon.propTypes = {
  /** @type {string} Extra classes to add. */
  className: string,

  height: deprecatedSizeProp,

  /** @type {string} Path. */
  path: string,

  /** @type {Function|object} Icon to render. */
  renderIcon: renderIconPropType,

  /** @type {number|string} Size. */
  size: sizePropType,

  /** @type {string} Title. */
  title: string,

  /** @type {string} The SVG viewBox property. */
  viewBox: string,

  width: deprecatedSizeProp,
};

export default Icon;

export {
  renderIconDefaultProp,
  renderIconPropType,
  sizeDefaultProp,
  sizePropType,
};
