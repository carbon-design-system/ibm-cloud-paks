/**
 * @file Description list module.
 * @copyright IBM Security 2020
 */

import { node } from 'prop-types';
import React from 'react';

import LayoutModule from '../LayoutModule';

/**
 * Description list modules provide a means to orderly layout terms and definitions.
 */
const DescriptionListModule = ({ children, ...other }) => (
  <LayoutModule namespace="description-list" {...other}>
    {children}
  </LayoutModule>
);

DescriptionListModule.propTypes = {
  /** Provide the `TypeLayout`, and optionally `TitleBar`, for the `DescriptionListModule` */
  children: node.isRequired,
};

export default DescriptionListModule;
