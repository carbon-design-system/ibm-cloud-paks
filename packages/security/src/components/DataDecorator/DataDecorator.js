/**
 * @file Data decorator
 * @copyright IBM Security 2019 - 2021
 */

import deprecate from 'carbon-components-react/es/prop-types/deprecate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as defaultLabels from '../../globals/nls';
import { isNode } from '../../globals/utils/capabilities';

import Decorator from './Decorator';
import PanelV2 from '../PanelV2';
import Portal, { PORTAL_EVENTS } from '../Portal';

const { defaultProps, propTypes } = Decorator;

/**
 * DataDecorator component.
 * @param {object.<string, *>} props DataDecorator props.
 * @returns {DataDecorator} DataDecorator instance.
 */
class DataDecorator extends Component {
  state = { isOpen: false };

  toggleOpen = () => (this.state.isOpen ? this.close() : this.open());

  open = () => {
    this.setState({ isOpen: true });
    this.props.onOpen();
  };

  close = () => {
    this.setState({ isOpen: false });
    this.props.onClose();
  };

  render() {
    const {
      children,
      className,
      closeButton,
      focusTrap,
      focusTrapOptions,
      inline,
      labels,
      noIcon,
      primaryButton,
      renderFooter,
      rootNode,
      score,
      secondaryButton,
      stopPropagation,
      stopPropagationEvents,
      subtitle,
      type,
      value,
      title,
      scoreThresholds,
      scoreDescription,
      onContextMenu: propOnContextMenu,
      midLineTruncation,
    } = this.props;

    const onContextMenu = propOnContextMenu
      ? (event) => {
          event.preventDefault();
          propOnContextMenu(event);
        }
      : undefined;

    const decoratorProps = {
      className,
      inline,
      noIcon,
      score,
      type,
      value,
      title,
      scoreThresholds,
      scoreDescription,
      onContextMenu,
      midLineTruncation,
    };

    const componentLabels = {
      ...defaultLabels.labels,
      ...labels,
      ...defaultLabels.filterFalsey({
        DATA_DECORATOR_PRIMARY_BUTTON:
          (primaryButton && primaryButton.label) || '',
        DATA_DECORATOR_SECONDARY_BUTTON:
          (secondaryButton && secondaryButton.label) || '',
        DATA_DECORATOR_CLOSE_BUTTON: (closeButton && closeButton.label) || '',
      }),
    };

    return (
      <>
        <Decorator
          {...decoratorProps}
          active={this.state.isOpen}
          onClick={(event) => {
            event.stopPropagation();
            this.toggleOpen();
          }}
        />

        <PanelV2
          closeButton={{
            onClick: (event) => {
              this.close(event, type, value);
              if (closeButton && closeButton.onClick) {
                closeButton.onClick(event, type, value);
              }
            },
          }}
          focusTrap={focusTrap}
          focusTrapOptions={focusTrapOptions}
          isOpen={this.state.isOpen}
          labels={{
            ...componentLabels,
            ...defaultLabels.filterFalsey({
              PANEL_CONTAINER_PRIMARY_BUTTON:
                componentLabels.DATA_DECORATOR_PRIMARY_BUTTON,
              PANEL_CONTAINER_SECONDARY_BUTTON:
                componentLabels.DATA_DECORATOR_SECONDARY_BUTTON,
              PANEL_CONTAINER_CLOSE_BUTTON:
                componentLabels.DATA_DECORATOR_CLOSE_BUTTON,
            }),
          }}
          onClose={this.close}
          primaryButton={
            primaryButton && {
              ...primaryButton,
              onClick: (event) => {
                if (
                  primaryButton.closePanel === undefined ||
                  primaryButton.closePanel
                ) {
                  this.close(event, type, value);
                }
                if (primaryButton.onClick) {
                  primaryButton.onClick(event, type, value);
                }
              },
            }
          }
          renderFooter={renderFooter}
          rootNode={rootNode}
          secondaryButton={
            secondaryButton && {
              ...secondaryButton,
              onClick: (event) => {
                if (
                  secondaryButton.closePanel === undefined ||
                  secondaryButton.closePanel
                ) {
                  this.close(event, type, value);
                }
                if (secondaryButton.onClick) {
                  secondaryButton.onClick(event, type, value);
                }
              },
            }
          }
          stopPropagation={stopPropagation}
          stopPropagationEvents={stopPropagationEvents}
          subtitle={subtitle}
          title={value}>
          {children}
        </PanelV2>
      </>
    );
  }
}

const buttonType = PropTypes.shape({
  closePanel: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  icon: PropTypes.object,
  iconDescription: PropTypes.string,
});

DataDecorator.propTypes = {
  /** @type {ReactNode} The children of the DataDecorator. */
  children: PropTypes.node,

  /** @type {string} class name for rendered content. */
  className: PropTypes.string,

  /** @type {object<object>} An object list of close button props. */
  closeButton: buttonType,

  /** @type {boolean} Focus trap. */
  focusTrap: PropTypes.bool,

  focusTrapOptions: Portal.propTypes.focusTrapOptions,

  /** @type {boolean} Determines if this is inline or not. */
  inline: propTypes.inline,

  /** @type {object} Labels for DataDecorator and children */
  labels: defaultLabels.propType,

  /** @type {boolean} Whether the rendered Decorator includes an icon */
  noIcon: PropTypes.bool,

  /** @type {Function} The function to call when the DataDecorator is secondary-clicked */
  onContextMenu: PropTypes.func,

  /** @type {Function} The function to call when the DataDecorator Panel closes. */
  onClose: PropTypes.func,

  /** @type {Function} The function to call when the DataDecorator Panel opens. */
  onOpen: PropTypes.func,

  /** @type {object<object>} An object list of primary button props. */
  primaryButton: deprecate(
    buttonType,
    `\nThe prop \`primaryButton\` for DataDecorator has been deprecated in favor of \`renderFooter\`.`
  ),

  /** @type {Function} Panel footer render prop. */
  renderFooter: PropTypes.func,

  /** @type {ReactNode|any} The root node for rendering the panel */
  rootNode: isNode() ? PropTypes.instanceOf(Node) : PropTypes.any,

  /** @type {number} The score of the data. */
  score: PropTypes.number,

  /** @type {number} The external URL. */
  scoreThresholds: (props, propName) => {
    if (
      !Array.isArray(props.scoreThresholds) ||
      props.scoreThresholds.length !== 4 ||
      !props.scoreThresholds.every((number) => typeof number === 'number')
    ) {
      return new Error(
        `${propName} is required to be an array of four numbers.`
      );
    }
    return null;
  },

  /** @type {object<object>} An object list of secondary button props. */
  secondaryButton: deprecate(
    buttonType,
    `\nThe prop \`secondaryButton\` for DataDecorator has been deprecated in favor of \`renderFooter\`.`
  ),

  /** @type {ReactNode} Child elements for the panel's subtitle. */
  subtitle: PropTypes.node,

  /** @type {string} decorator's title. */
  title: PropTypes.string,

  /** @type {string} The type of data. */
  type: PropTypes.string.isRequired,

  /** @type {string} The value of the data. */
  value: PropTypes.string.isRequired,

  /** @type {boolean} Stop event propagation for events that can bubble. */
  stopPropagation: PropTypes.bool,

  /** @type {Array} Array of event types to stop propagation. */
  stopPropagationEvents: PropTypes.arrayOf(PropTypes.oneOf(PORTAL_EVENTS)),

  /** @type {func} Descriptive text for screen readers that details the severity of a score. */
  scoreDescription: PropTypes.func,

  /** @type {object} Mid-line truncation options applied to value of decorator if applicable. */
  midLineTruncation: PropTypes.shape({
    enabled: PropTypes.bool,
    maxLength: PropTypes.number,
    front: PropTypes.number,
    back: PropTypes.number,
  }),
};

DataDecorator.defaultProps = {
  children: undefined,
  className: undefined,
  closeButton: undefined,
  focusTrap: true,
  focusTrapOptions: Portal.defaultProps.focusTrapOptions,
  inline: defaultProps.inline,
  labels: {},
  noIcon: false,
  onContextMenu: undefined,
  onClose: () => {},
  onOpen: () => {},
  primaryButton: undefined,
  renderFooter: null,
  rootNode: undefined,
  score: undefined,
  scoreThresholds: [0, 4, 7, 10],
  secondaryButton: undefined,
  subtitle: undefined,
  title: undefined,
  stopPropagation: false,
  stopPropagationEvents: undefined,
  scoreDescription: (score, scoreThresholds) =>
    `Score ${score} out of ${scoreThresholds.slice(-1)[0]}`,
  midLineTruncation: {
    enabled: false,
    maxLength: 20,
    front: 12,
    back: 4,
  },
};

export default DataDecorator;
