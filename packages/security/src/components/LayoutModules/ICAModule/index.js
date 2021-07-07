/**
 * @file ICA module.
 * @copyright IBM Security 2020 - 2021
 */

import classnames from 'classnames';
import { bool, func } from 'prop-types';
import React from 'react';

import LayoutModule, { layoutModuleNamespace } from '../LayoutModule';

const namespace = 'ica';
/**
 * The ICA module provides a means to orderly layout at-a-glance statistics.
 */
const ICAModule = ({ children, hover, ...other }) => (
  <LayoutModule namespace={namespace} {...other}>
    {children({
      getLayoutProps: ({ className, ...rest } = {}) => ({
        className: classnames(
          `${layoutModuleNamespace}--${namespace}__component`,
          className,
          {
            [`${layoutModuleNamespace}--${namespace}--hover`]: hover,
          }
        ),
        ...rest,
      }),
    })}
  </LayoutModule>
);

ICAModule.propTypes = {
  /** Provide the content for the `ICAModule` */
  children: func.isRequired,

  /** Specify whether to use the hover variant */
  hover: bool,
};

ICAModule.defaultProps = {
  hover: false,
};

export default ICAModule;
