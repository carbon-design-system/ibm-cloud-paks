/**
 * @file Description module.
 * @copyright IBM Security 2020
 */

import classnames from 'classnames';
import { func } from 'prop-types';
import React from 'react';

import LayoutModule, { layoutModuleNamespace } from '../LayoutModule';

const namespace = 'description';

/**
 * Description modules provide a means to orderly layout short-form content.
 */
const DescriptionModule = ({ children, ...other }) => (
  <LayoutModule namespace={namespace} {...other}>
    {children({
      getLayoutProps: ({ className, ...rest } = {}) => ({
        className: classnames(
          `${layoutModuleNamespace}--${namespace}__content`,
          className
        ),
        ...rest,
      }),
    })}
  </LayoutModule>
);

DescriptionModule.propTypes = {
  /** Provide the content for the `DescriptionModule` */
  children: func.isRequired,
};

export default DescriptionModule;
