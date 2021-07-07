/**
 * @file Panel v2 mocks.
 * @copyright IBM Security 2019
 */

import { className, label } from '../../_mocks_';

const active = true;

const labels = {
  /** @type {string} The panel container's close button `aria-label` */
  PANEL_CONTAINER_CLOSE_BUTTON: 'Close - labels',
};

/**
 * Empty click handler.
 * @returns {object} An empty object.
 */
const onClick = () => ({});

export { active, className, label, labels, onClick };
