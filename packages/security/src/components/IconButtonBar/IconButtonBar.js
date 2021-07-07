/**
 * @file Icon button bar.
 * @copyright IBM Security 2019 - 2021
 */

import {
  OverflowMenuVertical16,
  OverflowMenuVertical20,
  OverflowMenuVertical24,
  OverflowMenuVertical32,
} from '@carbon/icons-react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { OverflowMenu, OverflowMenuItem } from '../..';
import IconButton from '../IconButton';
import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('icon-button-bar');
const { propTypes } = IconButton;

const IconButtonBar = ({
  actions,
  className,
  iconTooltipDirection,
  length,
  overflowMenuDirection,
  size,
  tooltip,
}) => {
  const isMaxLength = actions.length > length;
  const iconButtonPrimaryFocus = `${namespace}--primary-focus`;
  const iconButtonBarClasses = classnames(namespace, className, {
    [`${namespace}--${size}`]: size,
  });

  const menuOptionsNamespace = `${namespace}__overflow-menu-options`;

  const iconButtonBarMenuOptionsClasses = classnames(
    menuOptionsNamespace,
    `${menuOptionsNamespace}--${overflowMenuDirection}`,
    {
      [`${menuOptionsNamespace}--${size}`]: size,
    }
  );

  const renderIconButton = (action, index) => (
    <Fragment key={action.label || `${namespace}__button--icon--${index}`}>
      {(action.divider === 'left' || action.divider === 'sides') && (
        <span className={`${namespace}__divider`} aria-hidden>
          <span className={`${namespace}__divider__inner`} />
        </span>
      )}
      <IconButton
        {...action}
        size={size}
        tooltip={tooltip}
        tooltipDirection={iconTooltipDirection}
      />
      {(action.divider === 'right' || action.divider === 'sides') && (
        <span className={`${namespace}__divider`} aria-hidden>
          <span className={`${namespace}__divider__inner`} />
        </span>
      )}
    </Fragment>
  );

  const renderMenuItems = () => {
    const items = actions.slice(length - 1);
    if (overflowMenuDirection === IconButton.TooltipDirection.TOP) {
      items.reverse();
    }
    return items.map((action) => (
      <OverflowMenuItem
        itemText={action.label}
        key={action.label}
        onClick={action.onClick}
        disabled={action.disabled}
        className={classnames(action.className, {
          [`${iconButtonPrimaryFocus}`]: action.setFocus,
        })}
      />
    ));
  };

  const getOverflowMenuIcon = () => {
    switch (size) {
      case 'sm':
        return OverflowMenuVertical16;
      case 'md':
        return OverflowMenuVertical20;
      case 'xl':
        return OverflowMenuVertical32;
      case 'lg':
      default:
        return OverflowMenuVertical24;
    }
  };

  return (
    <div className={iconButtonBarClasses}>
      {!isMaxLength && actions.map((action) => renderIconButton(action))}
      {isMaxLength && (
        <Fragment>
          {actions
            .slice(0, length - 1)
            .map((action) => renderIconButton(action))}
          <OverflowMenu
            className={`${namespace}__overflow-menu`}
            direction={overflowMenuDirection}
            flipped
            menuOptionsClass={iconButtonBarMenuOptionsClasses}
            renderIcon={getOverflowMenuIcon()}
            selectorPrimaryFocus={`.${iconButtonPrimaryFocus}`}>
            {renderMenuItems()}
          </OverflowMenu>
        </Fragment>
      )}
    </div>
  );
};

IconButtonBar.propTypes = {
  /** @type {array<IconButton props>} array of IconButton props to render in the component. */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      ...propTypes,
      divider: PropTypes.oneOf(['left', 'right', 'sides']),

      /**
       * Whether or not the icon button should receive focus when the menu is first opened.
       * By default, the first button in the menu will receive focus.
       */
      setFocus: PropTypes.bool,
    })
  ),

  /** @type {string} Extra classes to add. */
  className: PropTypes.string,

  /** @type {string} Icon tooltip direction. */
  iconTooltipDirection: PropTypes.oneOf([
    IconButton.TooltipDirection.TOP,
    IconButton.TooltipDirection.BOTTOM,
  ]),

  /** @type {string} Maximum number of IconButtons to display in the bar. */
  length: (props, propName, componentName) => {
    if (typeof props[propName] !== 'number' || props[propName] <= 0) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      );
    }
    return null;
  },

  /** @type {string} Icon tooltip direction. */
  overflowMenuDirection: PropTypes.oneOf([
    IconButton.TooltipDirection.TOP,
    IconButton.TooltipDirection.BOTTOM,
  ]),

  /** @type {string} Icon button size. */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),

  /** @type {boolean} Specify tooltip. */
  tooltip: PropTypes.bool,
};

IconButtonBar.defaultProps = {
  actions: [],
  className: null,
  iconTooltipDirection: IconButton.TooltipDirection.TOP,
  length: 3,
  overflowMenuDirection: IconButton.TooltipDirection.TOP,
  size: 'lg',
  tooltip: true,
};

export default IconButtonBar;
