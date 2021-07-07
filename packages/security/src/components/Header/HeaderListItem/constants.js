/**
 * @file Header list item constants.
 * @copyright IBM Security 2018
 */

import PropTypes from 'prop-types';

import { appendComponentNamespace } from '../../../globals/namespace';
import { namespace as headerNamespace } from '../constants';

const defaultProps = {
  className: '',
  hasPopup: false,
  isExpanded: false,
};

const namespace = appendComponentNamespace(headerNamespace, 'list__item');

const propTypes = {
  /** @type {boolean|HTMLElement} List item children. */
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]).isRequired,

  /** @type {string} Extra classes. */
  className: PropTypes.string,

  /** @type {boolean} Whether it has a popover or not. */
  hasPopup: PropTypes.bool,

  /** @type {boolean} Whether it is expanded or not. */
  isExpanded: PropTypes.bool,
};

export { defaultProps, namespace, propTypes };
