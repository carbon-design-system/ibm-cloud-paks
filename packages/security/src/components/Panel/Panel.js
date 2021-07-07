/**
 * @file Panel.
 * @copyright IBM Security 2019
 */

import PropTypes from 'prop-types';
import { Component } from 'react';

/**
 * Panel component.
 * @param {object.<string, *>} props Panel props.
 * @returns {Panel} Panel instance.
 */
export default class Panel extends Component {
  static propTypes = {
    /** @type {Node} Child elements. */
    children: PropTypes.node,

    /** @type {function(...args)} Function to call when the panel closes. */
    onClose: PropTypes.func,

    /** @type {function(...args)} Function to call when the panel opens. */
    onOpen: PropTypes.func,

    /** @type {function(...props)} Render function for the contents of the table. */
    render: PropTypes.func,

    /** @type {bool} specifies whether the Panel should open or not */
    shouldPanelOpen: PropTypes.bool,
  };

  static defaultProps = {
    children: undefined,
    onClose: () => {},
    onOpen: () => {},
    render: undefined,
    shouldPanelOpen: true,
  };

  state = { active: false };

  /**
   * Handles when the panel has been requested to close.
   * @param {Event} event Event object generated from close request.
   * @param {...any} args The arguments passed via render props.
   */
  handleClose = (event, ...args) => {
    event.stopPropagation();
    if (this.state.active) {
      this.props.onClose(event, ...args);
      this.setState({ active: false });
    }
  };

  /**
   * Handles when the panel has been requested to open.
   * @param {Event} event Event object generated from open request.
   * @param {...any} args The arguments passed via render props.
   */
  handleOpen = (event, ...args) => {
    event.stopPropagation();
    if (!this.state.active) {
      this.props.onOpen(event, ...args);
      this.setState({ active: true });
    }
  };

  /**
   * Handles when the panel has been requested to toggle.
   * @param {Event} event Event object generated from toggle request.
   * @param {...any} args The arguments passed via render props.
   */
  toggleActive = (event, ...args) => {
    if (this.state.active) {
      this.props.onClose(event, ...args);
      this.setState({ active: !this.state.active });
    } else if (this.props.shouldPanelOpen) {
      this.props.onOpen(event, ...args);
      this.setState({ active: !this.state.active });
    }
  };

  render() {
    const { children, render } = this.props;
    const renderProps = {
      active: this.state.active,
      handleClose: this.handleClose,
      handleOpen: this.handleOpen,
      toggleActive: this.toggleActive,
    };

    if (render !== undefined) {
      return render(renderProps);
    }
    if (children !== undefined) {
      return children(renderProps);
    }
    return null;
  }
}
