/**
 * @file Button.
 * @copyright IBM Security 2019 - 2021
 */

import { Button as CarbonButton } from 'carbon-components-react';
import { ButtonKinds } from 'carbon-components-react/es/prop-types/types';

import classnames from 'classnames';
import { bool, func, object, oneOf, oneOfType } from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../globals/namespace';
import deprecatedProp from '../../globals/prop-types';

import InlineLoading from '../InlineLoading';

export const namespace = getComponentNamespace('button');

ButtonKinds.push('ghost-danger'); // Add `ghost-danger` kind to the existing `kind`s.

// TODO: `2.x` - Remove deprecated props `largeText`.

const Button = ({
  className,
  largeText,
  loading,
  kind,
  renderIcon,
  size: sizeProp,
  ...other
}) => {
  const isSize = (value) => sizeProp === value;
  const size = isSize('large') || largeText || isSize('xlg') ? 'lg' : sizeProp;

  const isGhostDanger = kind === 'ghost-danger';

  const buttonClasses = classnames(className, {
    [`${namespace}--ghost-danger`]: isGhostDanger,
    [`${namespace}--loading`]: loading,
  });

  return (
    <CarbonButton
      className={buttonClasses}
      kind={isGhostDanger || loading ? 'ghost' : kind}
      renderIcon={loading ? InlineLoading : renderIcon}
      size={size}
      {...other}
    />
  );
};

const { defaultProps, propTypes } = CarbonButton;

Button.defaultProps = {
  ...defaultProps,

  loading: false,
  largeText: null,
};

Button.propTypes = {
  ...propTypes,

  /** Specify the [kind of `Button`](https://react.carbondesignsystem.com/?path=/docs/components-button--default#button-kind) you want to create */
  kind: oneOf(ButtonKinds),

  /** Optional prop to allow overriding the icon rendering. Can be a React component class */
  renderIcon: oneOfType([func, object]),

  /** Specify the [size of the button](https://react.carbondesignsystem.com/?path=/docs/button--default#button-size), from a list of available sizes. For `default` buttons, this prop can remain unspecified */
  size: oneOf(['default', 'field', 'small', 'sm', 'large', 'lg', 'xl']),

  /** Specify whether or not the `Button` is in a loading state. While active, the `renderIcon` prop is disabled */
  loading: bool,

  /** Deprecated in favor of `size` */
  largeText: deprecatedProp('size="large"', bool),
};

export default Button;
