/**
 * @file Loading message.
 * @copyright IBM Security 2019 - 2021
 */

import classnames from 'classnames';
import { bool, node, string } from 'prop-types';
import React from 'react';

import Loading from '..';

import {
  carbonPrefix,
  getComponentNamespace,
} from '../../../globals/namespace';

const namespace = getComponentNamespace('loading-message');
const overlayNamespace = `${carbonPrefix}--loading-overlay`;

const LoadingMessage = ({
  active,
  children,
  className,
  small,
  withOverlay,
  ...other
}) => (
  <div
    className={classnames(namespace, className, {
      [overlayNamespace]: withOverlay,
      [`${overlayNamespace}--stop`]: withOverlay && !active,
    })}>
    <Loading
      className={`${namespace}__loading`}
      active={active}
      small={small}
      withOverlay={false}
      {...other}
    />
    {children}
  </div>
);

LoadingMessage.defaultProps = {
  children: null,
  active: true,
  withOverlay: true,
  small: false,
  className: null,
};

LoadingMessage.propTypes = {
  /** Provide the contents of the `LoadingMessage` */
  children: node,

  /** Specify whether the `Loading` is active */
  active: bool,

  /** Specify whether to use an overlay */
  withOverlay: bool,

  /** Specify whether to use the small variation  */
  small: bool,

  /** Provide an optional class to be applied to the containing node */
  className: string,
};

export default LoadingMessage;
