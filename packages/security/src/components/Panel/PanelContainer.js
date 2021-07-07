/**
 * @file Panel container.
 * @copyright IBM Security 2019 - 2021
 */

/* eslint-disable no-useless-computed-key, react/require-default-props */

import { Close20 } from '@carbon/icons-react';

import requiredIfGivenPropIsTruthy from 'carbon-components-react/es/prop-types/requiredIfGivenPropIsTruthy';
import setupGetInstanceId from 'carbon-components-react/es/tools/setupGetInstanceId';

import classnames from 'classnames';
import PropTypes, { func } from 'prop-types';
import React, { Component, createRef, Fragment } from 'react';
import { createPortal } from 'react-dom';

import { getComponentNamespace } from '../../globals/namespace';
import * as defaultLabels from '../../globals/nls';

import { isClient, isNode } from '../../globals/utils/capabilities';
import { focusFirstElement, trapTabFocus } from '../../globals/utils/focus';

import Button from '../Button';
import IconButton from '../IconButton';

export const namespace = getComponentNamespace('panel');
const getInstanceId = setupGetInstanceId();

/**
 * Panel container component.
 * @param {object.<string, *>} props Panel container props.
 * @returns {PanelContainer} Panel container instance.
 */
export default class PanelContainer extends Component {
  constructor(props) {
    super(props);
    if (isClient()) {
      this.container = this.getContainer();
      this.containerClass = `${namespace}__container`;
      this.element = document.createElement('section');

      this.element.classList.add(namespace);

      this.previousFocus = document.activeElement;
      this.rootNode = this.props.rootNode;

      const { className } = this.props;

      if (className) {
        this.element.classList.add(className);
      }
    }
  }

  state = { bodyMargin: 0 };

  componentDidMount() {
    if (isClient()) {
      if (!this.container) {
        this.container = document.createElement('div');
        this.rootNode.appendChild(this.container);
      }

      this.container.appendChild(this.element);
      if (this.container.childElementCount === 1) {
        this.rootNode.classList.toggle(this.containerClass);
      }

      focusFirstElement(this.element);
      this.element.addEventListener('keydown', this.handleKeyPress);

      this.setBodyMargin();
    }
  }

  componentWillUnmount() {
    if (isClient()) {
      this.container.removeChild(this.element);

      if (this.container.childElementCount === 0) {
        this.rootNode.classList.toggle(this.containerClass);
        this.rootNode.removeChild(this.container);
      }

      this.element.removeEventListener('keydown', this.handleKeyPress);
      this.previousFocus.focus();
    }
  }

  /**
   * Retrieves the element to render the panel container in to via a portal.
   * @returns {HTMLElement} The element to render the panel container in to via a portal.
   */
  getContainer = () => {
    if (isClient()) {
      const panels = document.getElementsByClassName(namespace);

      if (panels.length > 0) {
        return panels[0].parentNode;
      }
    }

    return null;
  };

  /**
   * Sets the body margin to match the height of the header for fixed scrolling.
   */
  setBodyMargin() {
    const { current: footer } = this.footer;

    this.setState({
      bodyMargin: {
        top: this.header.current.clientHeight,
        bottom: footer && footer.clientHeight,
      },
    });
  }

  panelInstanceId = `panel-${getInstanceId()}`;
  panelTitleId = `${namespace}__title--${this.panelInstanceId}`;
  panelSubtitleId = `${namespace}__subtitle--${this.panelInstanceId}`;

  footer = createRef();
  header = createRef();

  /**
   * Handles the key press focus trap.
   * @param {SyntheticEvent} event The event fired when a key has been pressed while the panel container is in focus.
   */
  handleKeyPress = (event) => {
    if (event.key === 'Tab') {
      trapTabFocus(this.element, event);
    } else if (!this.props.disableEscape && event.key === 'Escape') {
      this.props.closeButton.onClick();
    }
  };

  renderPanelContainer = ({
    labels: {
      PANEL_CONTAINER_PRIMARY_BUTTON,
      PANEL_CONTAINER_SECONDARY_BUTTON,
      PANEL_CONTAINER_CLOSE_BUTTON,
    },
  }) => {
    const {
      children,
      closeButton,
      primaryButton,
      renderFooter,
      secondaryButton,
      subtitle,
      title,
      hasScrollingContent,
    } = this.props;

    const hasFooter = renderFooter || primaryButton;

    const ariaLabel = this.props['aria-label'] || title || subtitle;

    const getAriaLabelledBy =
      title || subtitle
        ? {
            'aria-labelledby': title ? this.panelTitleId : this.panelSubtitleId,
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
      <div role="dialog" aria-label={ariaLabel} aria-modal="true">
        <header ref={this.header} className={`${namespace}__header`}>
          {title && (
            <div className={`${namespace}__header__container--title`}>
              <div
                id={this.panelTitleId}
                className={`${namespace}__header--title`}>
                {title}
              </div>
              {subtitle && (
                <div
                  id={this.panelSubtitleId}
                  className={`${namespace}__header--subtitle`}>
                  {subtitle}
                </div>
              )}
            </div>
          )}
          <IconButton
            id={closeButton.id}
            className={`${namespace}__button--close`}
            label={PANEL_CONTAINER_CLOSE_BUTTON}
            onClick={closeButton.onClick}
            renderIcon={closeButton.icon || Close20}
            tooltip={false}
          />
        </header>
        <section
          className={classnames(`${namespace}__body`, {
            [`${namespace}__body--footer`]: hasFooter,
          })}
          style={{
            marginTop: `${this.state.bodyMargin.top}px`,
            marginBottom: `${this.state.bodyMargin.bottom}px`,
          }}
          {...hasScrollingContentProps}
          {...getAriaLabelledBy}>
          {children}
        </section>
        {hasFooter && (
          <div ref={this.footer} className={`${namespace}__footer`}>
            {renderFooter ? (
              renderFooter()
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { closeButton, primaryButton, secondaryButton, labels } = this.props;

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
    return (
      isClient() &&
      createPortal(
        this.renderPanelContainer({ labels: componentLabels }),
        this.element
      )
    );
  }
}

const buttonType = PropTypes.shape({
  id: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  icon: PropTypes.object,
  iconDescription: PropTypes.string,
});

PanelContainer.propTypes = {
  /** @type {ReactNode} The children of the panel container. */
  children: PropTypes.node,

  /** @type {string} Class name. */
  className: PropTypes.string,

  /** @type {object<object>} An object list of close button props. */
  closeButton: buttonType.isRequired,

  /** @type {boolean} Set to true to disable the 'Escape' key from closing the panel. */
  disableEscape: PropTypes.bool,

  /** @type {object<object>} An object list of primary button props. */
  primaryButton: buttonType,

  /** @type {object<object>} An object list of secondary button props. */
  secondaryButton: buttonType,

  /** @type {string} Child elements. */
  subtitle: PropTypes.node,

  /** @type {string} Child elements. */
  title: PropTypes.node,

  /** @type {Function} Footer render prop. */
  renderFooter: func,

  /** @type {string} Root node to attach the panel to. */
  rootNode: isNode() ? PropTypes.instanceOf(Node) : PropTypes.any,

  labels: defaultLabels.propType,

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
};

PanelContainer.defaultProps = {
  children: null,
  className: null,
  disableEscape: false,
  primaryButton: null,
  secondaryButton: undefined,
  subtitle: undefined,
  title: undefined,
  renderFooter: null,
  rootNode: isNode() ? document.body : undefined,
  labels: {},
  hasScrollingContent: false,
};

/* eslint-enable */
