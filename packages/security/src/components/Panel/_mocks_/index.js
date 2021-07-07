/**
 * @file Panel mocks.
 * @copyright IBM Security 2019
 */

import { className, disabled, label } from '../../_mocks_';

const active = true;

const labels = {
  PANEL_CONTAINER_PRIMARY_BUTTON: 'Add - labels',

  /** @type {string} The panel container's secondary button label */
  PANEL_CONTAINER_SECONDARY_BUTTON: 'Cancel - labels',

  /** @type {string} The panel container's close button `aria-label` */
  PANEL_CONTAINER_CLOSE_BUTTON: 'Close - labels',
};

export { active, className, disabled, label, labels };
