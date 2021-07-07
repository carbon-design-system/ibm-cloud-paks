/**
 * @file Card area module.
 * @copyright IBM Security 2020 - 2021
 */

import classnames from 'classnames';
import { func } from 'prop-types';
import React from 'react';

import LayoutModule, { layoutModuleNamespace } from '../LayoutModule';

const namespace = 'card-area';

/**
 * The card area module provides a means to orderly present related content and information using summary, navigational, or widget cards as the basis.
 */
const CardAreaModule = ({ children, ...other }) => (
  <LayoutModule namespace={namespace} {...other}>
    {children({
      getLayoutProps: ({ className, ...rest } = {}) => ({
        className: classnames(
          `${layoutModuleNamespace}--${namespace}__component`,
          className
        ),
        ...rest,
      }),
    })}
  </LayoutModule>
);

CardAreaModule.propTypes = {
  /** Provide the content for the `CardAreaModule` */
  children: func.isRequired,
};

export default CardAreaModule;
