/**
 * @file Header notification constants.
 * @copyright IBM Security 2018
 */

import PropTypes from 'prop-types';

import { appendComponentNamespace } from '../../../globals/namespace';
import { namespace as headerNamespace } from '../constants';

const namespace = appendComponentNamespace(headerNamespace, 'notification');

const propTypes = {
  /** @type {string} Clear button label. */
  clearButtonLabel: PropTypes.string.isRequired,

  /** @type {string} Date. */
  dateTime: PropTypes.string.isRequired,

  /** @type {string} Description. */
  description: PropTypes.string.isRequired,

  /** @type {Function} Clear button callback. */
  onClearButtonClick: PropTypes.func.isRequired,

  /** @type {string} Product name. */
  product: PropTypes.string.isRequired,

  /** @type {string} Time label. */
  timeLabel: PropTypes.string.isRequired,

  /** @type {string} 'Via' label. */
  viaLabel: PropTypes.string.isRequired,

  /** @type {boolean} Has the notification been acknowledged. */
  acknowledged: PropTypes.bool,
};

export { namespace, propTypes };
