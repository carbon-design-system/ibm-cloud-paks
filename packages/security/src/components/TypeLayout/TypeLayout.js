/**
 * @file Type layout.
 * @copyright IBM Security 2019 - 2021
 */

import classnames from 'classnames';
import { bool, node, oneOf, string } from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../globals/namespace';
import deprecatedProp from '../../globals/prop-types';

import {
  StructuredListBody,
  StructuredListCell,
  StructuredListRow,
  StructuredListWrapper,
} from '../StructuredList';

export const namespace = getComponentNamespace('type-layout__container');

// TODO: `2.x` - Remove deprecated prop `bordered`.

/**
 * Type layouts provide an orderly layout of terms and definitions.
 */
const TypeLayout = ({
  border,
  bordered,
  children,
  className,
  size,
  ...other
}) => (
  <StructuredListWrapper
    className={classnames(
      namespace,
      {
        [`${namespace}--bordered`]: border || bordered,
        [`${namespace}--${size}`]: size,
      },
      className
    )}
    {...other}>
    {children}
  </StructuredListWrapper>
);

const TypeLayoutBody = ({ children, className, ...other }) => (
  <StructuredListBody
    className={classnames(`${namespace}__body`, className)}
    {...other}>
    {children}
  </StructuredListBody>
);

const TypeLayoutCell = ({ children, className, ...other }) => (
  <StructuredListCell
    className={classnames(`${namespace}__cell`, className)}
    tabIndex="-1"
    {...other}>
    {children}
  </StructuredListCell>
);

const TypeLayoutRow = ({ children, className, ...other }) => (
  <StructuredListRow
    className={classnames(`${namespace}__row`, className)}
    role="row"
    {...other}>
    {children}
  </StructuredListRow>
);

const propTypes = {
  /** Provide the contents of the node */
  children: node,

  /** Provide an optional class to be applied to the containing node */
  className: string,
};

TypeLayout.propTypes = {
  ...propTypes,

  /** Specify the size of the type layout, from a list of available sizes */
  size: oneOf(['xs', 'sm', 'md', 'lg']),

  /** Specify if the type layout has a border */
  border: bool,

  /** Deprecated in favor of `border` */
  bordered: deprecatedProp('border', bool),
};

const defaultProps = {
  children: null,
  className: null,
};

TypeLayout.defaultProps = {
  ...defaultProps,

  size: 'md',
  border: false,
  bordered: null,
};

TypeLayoutBody.propTypes = propTypes;
TypeLayoutBody.defaultProps = defaultProps;

TypeLayoutCell.propTypes = propTypes;
TypeLayoutCell.defaultProps = defaultProps;

TypeLayoutRow.propTypes = propTypes;
TypeLayoutRow.defaultProps = defaultProps;

export { TypeLayout, TypeLayoutBody, TypeLayoutCell, TypeLayoutRow };
