/**
 * @file Panel v2.
 * @copyright IBM Security 2019 - 2021
 */

/* eslint-disable no-useless-computed-key, react/require-default-props */

import { Close20 } from '@carbon/icons-react';

import deprecate from 'carbon-components-react/es/prop-types/deprecate';
import requiredIfGivenPropIsTruthy from 'carbon-components-react/es/prop-types/requiredIfGivenPropIsTruthy';
import setupGetInstanceId from 'carbon-components-react/es/tools/setupGetInstanceId';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { createRef, useEffect, useState } from 'react';

import { getComponentNamespace } from '../../globals/namespace';
import * as defaultLabels from '../../globals/nls';
import { isClient, isNode } from '../../globals/utils/capabilities';

import Button from '../Button';
import IconButton from '../IconButton';
import Portal, { PORTAL_EVENTS } from '../Portal';
import Transition from '../Transition';

export const namespace = getComponentNamespace('panel--v2');
const getInstanceId = setupGetInstanceId();

/**
 * Panel v2 container component.
 * @param {object.<string, *>} props Panel v2 container props.
 * @returns {PanelV2} Panel v2 container instance.
 */
function PanelV2({
  children,
  className,
  closeButton,
  focusTrap,
  focusTrapOptions,
  hasScrollingContent,
  isOpen,
  labels,
  onClose,
  primaryButton,
  renderFooter,
  rootNode,
  secondaryButton,
  stopPropagation,
  stopPropagationEvents,
  subtitle,
  title,
  ...other
}) {
  const [bodyMargin, setBodyMargin] = useState(0);

  const panelInstanceId = `panel-${getInstanceId()}`;
  const panelTitleId = `${namespace}__title--${panelInstanceId}`;
  const panelSubtitleId = `${namespace}__subtitle--${panelInstanceId}`;

  const footerRef = createRef();
  const headerRef = createRef();

  /**
   * Sets the body margin to match the height of the header for fixed scrolling.
   */
  const handleBodyMargin = () => {
    const footerElement = footerRef.current;
    const headerElement = headerRef.current;

    setBodyMargin({
      top: headerElement.clientHeight,
      bottom: footerElement && footerElement.clientHeight,
    });
  };

  const handleKeyDown = (event) => {
    if (isOpen && event.which === 27) {
      onClose();
    }
  };

  useEffect(() => {
    if (isClient() && isOpen) {
      handleBodyMargin();
    }
  }, [isOpen]);

  const renderPanel = ({
    labels: {
      PANEL_CONTAINER_PRIMARY_BUTTON,
      PANEL_CONTAINER_SECONDARY_BUTTON,
      PANEL_CONTAINER_CLOSE_BUTTON,
    },
  }) => {
    const hasFooter = renderFooter || primaryButton;

    const ariaLabel = other['aria-label'] || title || subtitle;

    const getAriaLabelledBy =
      title || subtitle
        ? {
            'aria-labelledby': title ? panelTitleId : panelSubtitleId,
          }
        : {};

    const hasScrollingContentProps = hasScrollingContent
      ? {
          tabIndex: 0,
          role: 'region',
          'aria-label': ariaLabel,
        }
      : {};

    return (
      <Transition className={namespace}>
        {isOpen && (
          <Portal
            focusTrap={focusTrap}
            focusTrapOptions={focusTrapOptions}
            overlayOptions={{ onClick: onClose }}
            rootNode={rootNode}
            stopPropagation={stopPropagation}
            stopPropagationEvents={stopPropagationEvents}>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <section
              className={classnames(namespace, className)}
              role="dialog"
              aria-label={ariaLabel}
              aria-modal="true"
              onKeyDown={handleKeyDown}
              tabIndex={-1}>
              <header ref={headerRef} className={`${namespace}__header`}>
                <IconButton
                  id={closeButton.id}
                  className={`${namespace}__button--close`}
                  label={PANEL_CONTAINER_CLOSE_BUTTON}
                  onClick={closeButton.onClick || onClose}
                  renderIcon={closeButton.icon || Close20}
                  tooltip={false}
                />
                {title && (
                  <div className={`${namespace}__header__container--title`}>
                    {typeof title === 'string' ? (
                      <h2
                        id={panelTitleId}
                        className={`${namespace}__header--title`}>
                        {title}
                      </h2>
                    ) : (
                      <div
                        id={panelTitleId}
                        className={`${namespace}__header--title`}>
                        {title}
                      </div>
                    )}
                    {subtitle && (
                      <div
                        id={panelSubtitleId}
                        className={`${namespace}__header--subtitle`}>
                        {subtitle}
                      </div>
                    )}
                  </div>
                )}
              </header>
              <section
                className={classnames(`${namespace}__body`, {
                  [`${namespace}__body--footer`]: renderFooter,
                })}
                style={{
                  marginTop: `${bodyMargin.top}px`,
                  marginBottom: `${bodyMargin.bottom}px`,
                }}
                {...hasScrollingContentProps}
                {...getAriaLabelledBy}>
                {children}
              </section>

              {hasFooter && (
                <footer ref={footerRef} className={`${namespace}__footer`}>
                  {renderFooter ? (
                    renderFooter()
                  ) : (
                    <>
                      {secondaryButton && (
                        <Button
                          id={secondaryButton.id}
                          className={`${namespace}__footer__button ${namespace}__footer__button--secondary`}
                          disabled={secondaryButton.isDisabled}
                          iconDescription={secondaryButton.iconDescription}
                          kind="secondary"
                          onClick={secondaryButton.onClick}
                          renderIcon={secondaryButton.icon}>
                          {PANEL_CONTAINER_SECONDARY_BUTTON}
                        </Button>
                      )}
                      <Button
                        id={primaryButton.id}
                        className={`${namespace}__footer__button`}
                        disabled={primaryButton.isDisabled}
                        iconDescription={primaryButton.iconDescription}
                        onClick={primaryButton.onClick}
                        renderIcon={primaryButton.icon}>
                        {PANEL_CONTAINER_PRIMARY_BUTTON}
                      </Button>
                    </>
                  )}
                </footer>
              )}
            </section>
          </Portal>
        )}
      </Transition>
    );
  };

  const componentLabels = {
    ...defaultLabels.labels,
    ...labels,
    ...defaultLabels.filterFalsey({
      PANEL_CONTAINER_PRIMARY_BUTTON:
        (primaryButton && primaryButton.label) || '',
      PANEL_CONTAINER_SECONDARY_BUTTON:
        (secondaryButton && secondaryButton.label) || '',
      PANEL_CONTAINER_CLOSE_BUTTON: (closeButton && closeButton.label) || '',
    }),
  };

  return renderPanel({ labels: componentLabels });
}

const buttonType = PropTypes.shape({
  id: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  icon: PropTypes.object,
  iconDescription: PropTypes.string,
});

PanelV2.propTypes = {
  /** @type {ReactNode} The children of the panel container. */
  children: PropTypes.node,

  /** @type {string} Class name. */
  className: PropTypes.string,

  /** @type {object<object>} An object list of close button props. */
  closeButton: PropTypes.shape({
    id: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    icon: PropTypes.object,
    iconDescription: PropTypes.string,
  }),

  /** @type {boolean} Focus trap. */
  focusTrap: PropTypes.bool,

  /** Pass any of the options available in https://github.com/focus-trap/focus-trap#createfocustrapelement-createoptions */
  focusTrapOptions: Portal.propTypes.focusTrapOptions,

  /** @type {boolean} The open state. */
  isOpen: PropTypes.bool,

  /** @type {object} Labels for Panel and children */
  labels: defaultLabels.propType,

  /** @type {object<object>} An object list of primary button props. */
  primaryButton: deprecate(
    buttonType,
    `\nThe prop \`primaryButton\` for PanelV2 has been deprecated in favor of \`renderFooter\`.`
  ),

  /** @type {Function} Footer render prop. */
  renderFooter: PropTypes.func,

  /** @type {ReactNode|any} The root node for rendering the panel */
  rootNode: isNode() ? PropTypes.instanceOf(Node) : PropTypes.any,

  /** @type {object<object>} An object list of secondary button props. */
  secondaryButton: deprecate(
    buttonType,
    `\nThe prop \`secondaryButton\` for PanelV2 has been deprecated in favor of \`renderFooter\`.`
  ),

  /** @type {boolean} Stop event propagation for events that can bubble. */
  stopPropagation: PropTypes.bool,

  /** @type {Array} Array of event types to stop propagation. */
  stopPropagationEvents: PropTypes.arrayOf(PropTypes.oneOf(PORTAL_EVENTS)),

  /** @type {ReactNode} Subtitle child elements. */
  subtitle: PropTypes.node,

  /** @type {ReactNode} Title child elements. */
  title: PropTypes.node,

  /**
   * Specify whether the panel contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,

  /**
   * Required props for the accessibility label of the header
   */
  ['aria-label']: requiredIfGivenPropIsTruthy(
    'hasScrollingContent',
    PropTypes.string
  ),

  /**
   * Handler for all close actions such as clicking on the close button,
   * pressing the "Escape" key, or clicking outside of the panel area.
   */
  onClose: PropTypes.func,
};

PanelV2.defaultProps = {
  children: null,
  className: null,
  closeButton: undefined,
  focusTrap: true,
  focusTrapOptions: Portal.defaultProps.focusTrapOptions,
  isOpen: true,
  labels: {},
  primaryButton: undefined,
  renderFooter: null,
  rootNode: undefined,
  secondaryButton: undefined,
  stopPropagation: false,
  stopPropagationEvents: undefined,
  subtitle: undefined,
  title: undefined,
  hasScrollingContent: false,
  onClose: () => {},
};
/* eslint-enable */

export default PanelV2;
