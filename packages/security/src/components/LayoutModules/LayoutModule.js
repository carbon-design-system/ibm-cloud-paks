/**
 * @file Layout module.
 * @copyright IBM Security 2020 - 2021
 */

import classnames from 'classnames';
import { elementType, node, string } from 'prop-types';
import { createElement } from 'react';

import { getComponentNamespace } from '../../globals/namespace';

const layoutModuleNamespace = getComponentNamespace('layout-module');

const getLayoutModuleProps = ({ className, namespace }) => ({
  className: classnames(
    layoutModuleNamespace,
    `${layoutModuleNamespace}--${namespace}`,
    className
  ),
});

const LayoutModule = ({ as, className, children, namespace, ...other }) =>
  createElement(
    as,
    {
      ...getLayoutModuleProps({ className, namespace }),
      ...other,
    },
    children
  );

LayoutModule.propTypes = {
  /** Provide the content for the `LayoutModule` */
  children: node.isRequired,

  /** Provide the style namespace for the `LayoutModule` */
  namespace: string.isRequired,

  /** Provide a custom element to be rendered instead of the default */
  as: elementType,

  /** Provide an optional class to be applied to the containing node */
  className: string,
};

LayoutModule.defaultProps = {
  as: 'div',
  className: null,
};

export default LayoutModule;

export { getLayoutModuleProps, layoutModuleNamespace };
