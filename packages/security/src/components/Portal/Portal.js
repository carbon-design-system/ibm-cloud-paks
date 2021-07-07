/**
 * @file Portal.
 * @copyright IBM Security 2019 - 2021
 */

import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import { createPortal } from 'react-dom';

import { getComponentNamespace } from '../../globals/namespace';
import deprecatedProp from '../../globals/prop-types';

import { isClient, isNode } from '../../globals/utils/capabilities';
import composeEventHandlers from '../../globals/utils/events';

const namespace = getComponentNamespace('portal');

export const PORTAL_EVENTS = [
  'onAbort',
  'onAnimationEnd',
  'onAnimationIteration',
  'onAnimationStart',
  /* 'onBlur', // Does not Bubble */
  /* 'onCanPlay', // Does not Bubble */
  /* 'onCanPlayThrough', // Does not Bubble */
  'onChange',
  'onClick',
  'onContextMenu',
  'onCopy',
  'onCut',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  /* 'onDurationChange', // Does not Bubble */
  'onEmptied',
  'onEncrypted',
  /* 'onEnded', // Does not Bubble */
  /* 'onError', // Does not Bubble */
  /* 'onFocus', // Does not Bubble */
  /* 'onGotPointerCapture', // Does not Bubble */
  'onInput',
  /* 'onInvalid', // Does not Bubble */
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  /* 'onLoad', // Does not Bubble */
  /* 'onLoadedData', // Does not Bubble */
  /* 'onLoadedMetadata', // Does not Bubble */
  /* 'onLoadStart', // Does not Bubble */
  /* 'onLostPointerCapture', // Does not Bubble */
  'onMouseDown',
  /* 'onMouseEnter', // Does not Bubble */
  /* 'onMouseLeave', // Does not Bubble */
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onPaste',
  /* 'onPause', // Does not Bubble */
  /* 'onPlay', // Does not Bubble */
  /* 'onPlaying', // Does not Bubble */
  'onPointerCancel',
  'onPointerDown',
  /* 'onPointerEnter', // Does not Bubble */
  /* 'onPointerLeave', // Does not Bubble */
  'onPointerMove',
  'onPointerOut',
  'onPointerOver',
  'onPointerUp',
  /* 'onProgress', // Does not Bubble */
  'onRateChange',
  'onScroll',
  'onSeeked',
  'onSeeking',
  'onSelect',
  'onStalled',
  'onSubmit',
  'onSuspend',
  'onTimeUpdate',
  'onToggle',
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
  'onTransitionEnd',
  'onVolumeChange',
  'onWaiting',
  'onWheel',
];

class Portal extends Component {
  componentDidMount() {
    if (isClient()) {
      const {
        rootNode,
        hasOverlay,
        onOverlayClick,
        overlayOptions: { className, onClick },
      } = this.props;

      this.onOverlayClick = onClick || onOverlayClick;

      rootNode.classList.toggle(this.containerClass);

      if (
        hasOverlay &&
        document.getElementsByClassName(namespace).length === 0
      ) {
        this.overlay = document.createElement('div');

        this.overlay.setAttribute('tabIndex', '-1');

        this.overlay.classList.add(
          ...[`${namespace}__overlay`, className].filter(Boolean)
        );

        rootNode.appendChild(this.overlay);

        if (this.onOverlayClick) {
          this.overlay.addEventListener('mousedown', this.handleOverlayClick);
        }
      }
    }
  }

  componentWillUnmount() {
    if (isClient()) {
      const { rootNode, hasOverlay } = this.props;

      rootNode.classList.toggle(this.containerClass);

      if (hasOverlay && this.overlay) {
        rootNode.removeChild(this.overlay);
      }

      if (this.onOverlayClick) {
        this.overlay.removeEventListener('mousedown', this.handleOverlayClick);
      }
    }
  }

  handleOverlayClick = () => {
    this.onOverlayClick();
  };

  createPropagationTrap = () => {
    const { children, stopPropagationEvents } = this.props;
    const childProps = {};

    const child = React.Children.only(children);
    const events = stopPropagationEvents || PORTAL_EVENTS;

    events.forEach((event) => {
      if (child.props[event]) {
        childProps[event] = composeEventHandlers([
          this.handleBubble,
          child.props[event],
        ]);
      } else {
        childProps[event] = this.handleBubble;
      }
    });

    return React.cloneElement(child, { ...childProps });
  };

  handleBubble = (event) => {
    event.stopPropagation();
  };

  containerClass = `${namespace}__container`;
  panelContainerClass = `${getComponentNamespace('panel')}__container`;

  render() {
    const {
      children,
      focusTrap,
      focusTrapOptions,
      initialFocus,
      rootNode,
      stopPropagation,
      stopPropagationEvents,
    } = this.props;

    return (
      isClient() &&
      createPortal(
        <FocusTrap
          active={focusTrap}
          focusTrapOptions={{
            fallbackFocus:
              focusTrapOptions.fallbackFocus ||
              (isClient() ? rootNode : Children.toArray(children)[0].type),
            initialFocus,
            ...focusTrapOptions,
          }}>
          {stopPropagation || stopPropagationEvents
            ? this.createPropagationTrap()
            : children}
        </FocusTrap>,
        rootNode
      )
    );
  }
}

// TODO: `2.x` - Remove deprecated prop `onOverlayClick`.

Portal.propTypes = {
  /** @type {element} The children of the panel. */
  children: PropTypes.element,

  /** @type {boolean} Focus trap. */
  focusTrap: PropTypes.bool,

  /** Pass any of the options available in https://github.com/focus-trap/focus-trap#createfocustrapelement-createoptions */
  focusTrapOptions: FocusTrap.propTypes.focusTrapOptions,

  /** @type {boolean} Include an overlay. */
  hasOverlay: PropTypes.bool,

  /** @type {node} Initially focused element. */
  initialFocus: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** Deprecated in favor of `overlayOptions.onClick` */
  onOverlayClick: deprecatedProp('overlayOptions.onClick', PropTypes.func),

  /** Specify the options for the overlay */
  overlayOptions: PropTypes.shape({
    /** Provide an optional class to be applied to the overlay */
    className: PropTypes.string,

    /** Specify the click event handler for the overlay */
    onClick: PropTypes.func,
  }),

  /** @type {ReactNode|any} The root node for rendering the panel */
  rootNode: isNode() ? PropTypes.instanceOf(Node) : PropTypes.any,

  /** @type {boolean} Stop event propagation for events that can bubble. */
  stopPropagation: PropTypes.bool,

  /** @type {Array} Array of event types to stop propagation. */
  stopPropagationEvents: PropTypes.arrayOf(PropTypes.oneOf(PORTAL_EVENTS)),
};

Portal.defaultProps = {
  children: null,
  focusTrap: true,
  focusTrapOptions: FocusTrap.defaultProps.focusTrapOptions,
  hasOverlay: true,
  initialFocus: null,
  onOverlayClick: undefined,
  overlayOptions: {},
  rootNode: isClient() && document.body,
  stopPropagation: false,
  stopPropagationEvents: undefined,
};

export default Portal;
