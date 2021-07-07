/**
 * @file Tearsheet.
 * @copyright IBM Security 2019 - 2021
 */

import { Close20, TrashCan20 } from '@carbon/icons-react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from '../Button';
import IconButton from '../IconButton';
import { LoadingMessage } from '../Loading';
import Portal, { PORTAL_EVENTS } from '../Portal';
import ScrollGradient from '../ScrollGradient';
import Transition from '../Transition';

import * as defaultLabels from '../../globals/nls';
import theme from '../../globals/theme';

import { getComponentNamespace } from '../../globals/namespace';

const namespace = getComponentNamespace('tearsheet');

/**
 * Tearsheet component.
 */
class Tearsheet extends Component {
  state = {
    isOpen: this.props.isOpen,
    loading: this.props.loading,
    loadingMessage: this.props.loadingMessage,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isOpen !== nextProps.isOpen) {
      return {
        isOpen: nextProps.isOpen,
      };
    }
    if (
      prevState.loading !== nextProps.loading ||
      prevState.loadingMessage !== nextProps.loadingMessage
    ) {
      return {
        loading: nextProps.loading,
        loadingMessage: nextProps.loadingMessage,
      };
    }
    return null;
  }

  containerSection = React.createRef();

  render() {
    const {
      className,
      focusTrap,
      selectorPrimaryFocus,
      renderSidebar,
      renderMain,
      primaryButton,
      secondaryButton,
      tertiaryButton,
      closeButton,
      sidebarTitle,
      sidebarSubtitle,
      mainTitle,
      rootNode,
      stopPropagation,
      stopPropagationEvents,

      deleteButton: {
        icon = TrashCan20,
        label = '',
        hide: hideDeleteButton = false,
        isDisabled = false,
        onClick: onDeleteButtonClick,
      },
      labels,
      loading,
      loadingMessage,
      isOpen,
      ...other
    } = this.props;

    const componentLabels = {
      ...defaultLabels.labels,
      ...labels,
      ...defaultLabels.filterFalsey({
        TEARSHEET_PRIMARY_BUTTON: (primaryButton && primaryButton.label) || '',
        TEARSHEET_SECONDARY_BUTTON:
          (secondaryButton && secondaryButton.label) || '',
        TEARSHEET_DELETE_BUTTON: label,
        TEARSHEET_TERTIARY_BUTTON: label,
        TEARSHEET_CLOSE_BUTTON: (closeButton && closeButton.label) || '',
      }),
    };

    return (
      <Transition className={namespace} component="span" timeout={300}>
        {this.state.isOpen && (
          <Portal
            focusTrap={focusTrap}
            initialFocus={selectorPrimaryFocus}
            stopPropagation={stopPropagation}
            stopPropagationEvents={stopPropagationEvents}
            rootNode={rootNode}>
            <section
              ref={this.containerSection}
              className={classnames(namespace, className)}
              aria-hidden={false}
              {...other}>
              {this.state.loading && (
                <LoadingMessage className={`${namespace}__loading`}>
                  <div className={`${namespace}__loading__message`}>
                    {this.state.loadingMessage}
                  </div>
                </LoadingMessage>
              )}

              {renderSidebar && (
                <section
                  aria-hidden={this.state.loading}
                  className={`${namespace}__sidebar`}>
                  {sidebarTitle && (
                    <h1 className={`${namespace}__sidebar__title`}>
                      {sidebarTitle}
                    </h1>
                  )}
                  {sidebarSubtitle && (
                    <p className={`${namespace}__sidebar__subtitle`}>
                      {sidebarSubtitle}
                    </p>
                  )}
                  <div className={`${namespace}__sidebar__content`}>
                    {renderSidebar()}
                  </div>

                  <footer className={`${namespace}__sidebar__footer`}>
                    {!hideDeleteButton && (
                      <Button
                        disabled={isDisabled || this.state.loading}
                        iconDescription={
                          componentLabels.TEARSHEET_DELETE_BUTTON
                        }
                        kind="ghost-danger"
                        onClick={onDeleteButtonClick}
                        renderIcon={icon}>
                        {componentLabels.TEARSHEET_DELETE_BUTTON}
                      </Button>
                    )}
                  </footer>
                </section>
              )}

              <section
                aria-hidden={this.state.loading}
                className={`${namespace}__main`}>
                {!closeButton.isDisabled && (
                  <IconButton
                    className={`${namespace}__button--close`}
                    label={componentLabels.TEARSHEET_CLOSE_BUTTON}
                    onClick={closeButton.onClick}
                    renderIcon={Close20}
                    size="lg"
                    tooltip={false}
                    disabled={this.state.loading}
                  />
                )}
                {mainTitle && (
                  <h1 className={`${namespace}__main__title`}>{mainTitle}</h1>
                )}
                <section className={`${namespace}__main__content`}>
                  <ScrollGradient
                    className={`${namespace}__main__scroll-gradient`}
                    color={theme.ui01}>
                    <div
                      className={`${namespace}__main__scroll-gradient__content`}>
                      {renderMain({ isLoading: loading })}
                    </div>
                  </ScrollGradient>
                </section>
                <div className={`${namespace}__container`}>
                  {!tertiaryButton.isDisabled && (
                    <div className={`${namespace}__container__start`}>
                      <Button
                        className={`${namespace}__button--tertiary`}
                        disabled={isDisabled || this.state.loading}
                        kind="ghost"
                        onClick={tertiaryButton.onClick}
                        size="xl">
                        {componentLabels.TEARSHEET_TERTIARY_BUTTON}
                        {tertiaryButton.secondaryText.length > 0 && (
                          <span
                            className={`${namespace}__button--tertiary__text`}>
                            {componentLabels.TEARSHEET_TERTIARY_SECONDARY_TEXT}
                          </span>
                        )}
                      </Button>
                    </div>
                  )}
                  <div className={`${namespace}__container__end`}>
                    {!secondaryButton.isDisabled && (
                      <Button
                        className={`${namespace}__button ${namespace}__button--secondary`}
                        disabled={
                          secondaryButton.isDisabled || this.state.loading
                        }
                        kind="secondary"
                        onClick={secondaryButton.onClick}
                        size="xl">
                        {componentLabels.TEARSHEET_SECONDARY_BUTTON}
                      </Button>
                    )}
                    <Button
                      className={`${namespace}__button`}
                      disabled={primaryButton.isDisabled || this.state.loading}
                      onClick={primaryButton.onClick}
                      size="xl">
                      {componentLabels.TEARSHEET_PRIMARY_BUTTON}
                    </Button>
                  </div>
                </div>
              </section>
            </section>
          </Portal>
        )}
      </Transition>
    );
  }
}

const buttonPropTypeMap = {
  /** @type {func} onClick callback */
  onClick: PropTypes.func,

  /** @type {string} The button label. */
  label: PropTypes.string,

  /** @type {bool} Whether the button is disabled. */
  isDisabled: PropTypes.bool,
};

Tearsheet.propTypes = {
  /** @type {boolean} Focus trap. */
  focusTrap: PropTypes.bool,

  /** @type {string|func} The html element to have the inital focus in the tearsheet. */
  selectorPrimaryFocus: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /** @type {string} The sidebar title. */
  sidebarTitle: PropTypes.string,

  /** @type {string} The sidebar subtitle. */
  sidebarSubtitle: PropTypes.string,

  /** @type {func} The function to render the sidebar content. */
  renderSidebar: PropTypes.func,

  /** @type {string} The main view title. */
  mainTitle: PropTypes.string,

  /** @type {func} The function to render the main content. */
  renderMain: PropTypes.func,

  /** @type {Node} The root node for rendering the modal */
  rootNode:
    typeof Node !== 'undefined' ? PropTypes.instanceOf(Node) : PropTypes.any,

  /** @type {object<object>} An object list of primary button props. */
  primaryButton: PropTypes.shape(buttonPropTypeMap).isRequired,

  /** @type {object<object>} An object list of secondary button props. */
  secondaryButton: PropTypes.shape(buttonPropTypeMap).isRequired,

  /** @type {object<object>} An object list of tertiary ghost button props. */
  tertiaryButton: PropTypes.shape({
    ...buttonPropTypeMap,
    secondaryText: PropTypes.string,
  }),

  /** @type {object<object>} An object list of close button props. */
  closeButton: PropTypes.shape(buttonPropTypeMap).isRequired,

  /** @type {object<object>} An object list of delete button props. */
  deleteButton: PropTypes.shape({
    ...buttonPropTypeMap,
    icon: PropTypes.string,
  }),

  /** @type {bool} The toggle to determine whether or not to show the loading overlay. */
  loading: PropTypes.bool,

  /** @type {string} The message to be displayed during loading. */
  loadingMessage: PropTypes.string,

  /** @type {boolean} The open state. */
  isOpen: PropTypes.bool,

  /** @type {object} Labels for the Tearsheet buttons */
  labels: defaultLabels.propType,

  /** @type {boolean} Stop event propagation for events that can bubble. */
  stopPropagation: PropTypes.bool,

  /** @type {Array} Array of event types to stop propagation. */
  stopPropagationEvents: PropTypes.arrayOf(PropTypes.oneOf(PORTAL_EVENTS)),

  /** Optional class name for the tearsheet wrapper node. */
  className: PropTypes.string,
};

Tearsheet.defaultProps = {
  className: '',
  focusTrap: true,
  selectorPrimaryFocus: '[tearsheet-primary-focus]',
  renderMain: () => null,
  renderSidebar: null,
  rootNode: undefined,
  sidebarTitle: '',
  sidebarSubtitle: '',
  mainTitle: '',
  tertiaryButton: { onClick: () => {}, isDisabled: true, secondaryText: '' },
  deleteButton: { onClick: () => {}, hide: true },
  loading: false,
  loadingMessage: '',
  isOpen: true,
  labels: {},
  stopPropagation: false,
  stopPropagationEvents: undefined,
};

export default Tearsheet;
