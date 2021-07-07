/**
 * @file Action bar module.
 * @copyright IBM Security 2020
 */

import { node } from 'prop-types';
import React from 'react';

import LayoutModule from '../LayoutModule';

const namespace = 'action-bar';

/**
 * Action bars allow users to take multiple actions on the subsequent section.
 */
const ActionBarModule = ({ children, ...other }) => (
  <LayoutModule namespace={namespace} {...other}>
    {children}
  </LayoutModule>
);

ActionBarModule.propTypes = {
  /** Provide the `ActionBarModuleItems`, and optionally supplementary details, for the `ActionBarModule` */
  children: node.isRequired,
};

const ActionBarModuleItems = ({ children, ...other }) => (
  <LayoutModule namespace={`${namespace}__items`} {...other}>
    {children}
  </LayoutModule>
);

ActionBarModuleItems.propTypes = {
  /** Provide the contents of the `ActionBarModuleItems` */
  children: node.isRequired,
};

export default ActionBarModule;

export { ActionBarModuleItems };
