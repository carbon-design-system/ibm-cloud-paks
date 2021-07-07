/**
 * @file Button cluster module.
 * @copyright IBM Security 2020
 */

import { node } from 'prop-types';
import React, { Children } from 'react';

import LayoutModule from '../LayoutModule';

const namespace = 'button-cluster';

/**
 * The button cluster module group secondary actions that can be taken on a whole page or component.
 */
const ButtonClusterModule = ({ children, ...other }) => (
  <LayoutModule namespace={namespace} {...other}>
    {Children.map(children, (child) => (
      <LayoutModule namespace={`${namespace}__button`}>{child}</LayoutModule>
    ))}
  </LayoutModule>
);

ButtonClusterModule.propTypes = {
  /** Provide the `Button`s for the `ButtonClusterModule` */
  children: node.isRequired,
};

export default ButtonClusterModule;
