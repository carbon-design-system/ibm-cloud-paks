/**
 * @file Panel controller.
 * @copyright IBM Security 2019
 */

import PropTypes from 'prop-types';

/**
 * Panel controller component.
 * @param {object.<string, *>} props Panel controller props.
 * @returns {PanelController} Panel controller instance.
 */
const PanelController = (props) => (props.active ? props.children : null);

PanelController.defaultProps = {
  active: false,
  children: undefined,
};

PanelController.propTypes = {
  /** @type {boolean} Set to true to render the children. */
  active: PropTypes.bool,

  /** @type {ReactNode} Child elements. */
  children: PropTypes.node,
};

export default PanelController;
