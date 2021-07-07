/**
 * @file Status icon.
 * @copyright IBM Security 2019 - 2021
 */

import { Checkmark20 } from '@carbon/icons-react';

import classnames from 'classnames';
import { oneOf, string } from 'prop-types';
import React, { Component } from 'react';

import { getComponentNamespace } from '../../globals/namespace';

import Icon from '../Icon';
import Loading from '../Loading';

export const namespace = getComponentNamespace('status-icon');

const defaultSize = 'md';
const SIZE = ['lg', defaultSize, 'sm'];

const STATUS = ['complete', 'error', 'info', 'success', 'unknown', 'warning'];

/**
 * Status icon component.
 */
export default class StatusIcon extends Component {
  static propTypes = {
    /** @type {string} Class name. */
    className: string,

    /** @type {string} Message. */
    message: string,

    /** @type {string} Size. */
    size: oneOf(SIZE),

    /** @type {string} Status. */
    status: oneOf(STATUS),

    /** @type {string} icon aria label. */
    iconDescription: string,
  };

  static defaultProps = {
    className: null,
    message: null,
    size: defaultSize,
    status: undefined,
    iconDescription: null,
  };

  static getDerivedStateFromProps({ status }, state) {
    return status && state.status !== status
      ? {
          status,
        }
      : null;
  }

  state = {
    status: this.props.status,
  };

  render() {
    const { className, message, size, iconDescription } = this.props;
    const { status } = this.state;

    let statusIcon;

    switch (status) {
      case STATUS[0]:
        statusIcon = (
          <Icon
            aria-label={
              iconDescription && iconDescription.length ? iconDescription : null
            }
            className={`${namespace}__icon ${namespace}__icon--success`}
            renderIcon={Checkmark20}
          />
        );
        break;

      case undefined:
        statusIcon = (
          <Loading
            aria-label={
              iconDescription && iconDescription.length ? iconDescription : null
            }
            className={`${namespace}__icon`}
            withOverlay={false}
          />
        );
        break;

      default:
        statusIcon = (
          <span
            aria-label={
              iconDescription && iconDescription.length ? iconDescription : null
            }
            className={`${namespace}__icon--color ${namespace}__icon--color--${status}`}
          />
        );
    }

    return (
      <div
        className={classnames(namespace, className, {
          [`${namespace}--${size}`]: size,
        })}>
        {statusIcon}
        {message && <span className={` ${namespace}__message`}>{message}</span>}
      </div>
    );
  }
}

export { SIZE, STATUS };
