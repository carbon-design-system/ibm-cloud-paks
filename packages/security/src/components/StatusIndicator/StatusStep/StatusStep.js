/**
 * @file Status step.
 * @copyright IBM Security 2019 - 2021
 */

import { Error20, RadioButton20 } from '@carbon/icons-react';

import classnames from 'classnames';
import { string, oneOf } from 'prop-types';
import React, { Component } from 'react';

import { appendComponentNamespace } from '../../../globals/namespace';
import { namespace as indicatorNamespace } from '../StatusIndicator';

import Icon from '../../Icon';
import InlineLoading from '../../InlineLoading';

const namespace = appendComponentNamespace(indicatorNamespace, 'step');

const STATUS = {
  COMPLETE: 'complete',
  CURRENT: 'current',
  FAILED: 'failed',
  DEFAULT: 'incomplete',
};

const getStatusIcon = (status, description) => {
  switch (status) {
    case STATUS.CURRENT:
      return (
        <InlineLoading
          className={`${namespace}-wrapper`}
          description={description}
        />
      );
    case STATUS.COMPLETE:
      return (
        <InlineLoading
          className={`${namespace}-wrapper`}
          description={description}
          status="finished"
        />
      );
    case STATUS.FAILED:
      return (
        <div className={`${namespace}-wrapper`}>
          <div className={`${namespace}__icon-wrapper`}>
            <Icon
              className={classnames(
                `${namespace}__icon ${namespace}--${status}__icon`
              )}
              renderIcon={Error20}
              title={description}
            />
          </div>
          {description && (
            <p className={`${namespace}__label`}>{description}</p>
          )}
        </div>
      );
    default:
      return (
        <div className={`${namespace}-wrapper`}>
          <div className={`${namespace}__icon-wrapper`}>
            <Icon
              className={classnames(
                `${namespace}__icon ${namespace}--${status}__icon`
              )}
              renderIcon={RadioButton20}
              title={description}
            />
          </div>
          <p className={`${namespace}__label`}>{description}</p>
        </div>
      );
  }
};

/**
 * Status Step component.
 */
class StatusStep extends Component {
  static propTypes = {
    /** @type {string} Used to create a custom key for a step. */
    label: string.isRequired,

    /** @type {string} A description for a step. */
    description: string.isRequired,

    /** @type {string} Extra classes to add. */
    className: string,

    /** @type {enum} A status for a step. */
    status: oneOf([
      STATUS.COMPLETE,
      STATUS.CURRENT,
      STATUS.DEFAULT,
      STATUS.FAILED,
    ]),

    /** @type {string} An error message to explain why the step failed. */
    errorMsg: string,
  };

  static defaultProps = {
    className: '',
    status: STATUS.DEFAULT,
    errorMsg: null,
  };

  state = {
    status: this.props.status,
  };

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.status && prevProps.status !== nextProps.status) {
      return {
        status: nextProps.status,
      };
    }
    return null;
  }

  render() {
    const { label, description, className, errorMsg } = this.props;

    const stepClasses = classnames(
      namespace,
      `${namespace}--${this.state.status}`,
      className
    );

    return (
      <li className={stepClasses} key={`${namespace}--${label}`}>
        {getStatusIcon(this.state.status, description)}
        {this.state.status === STATUS.FAILED && errorMsg && (
          <p className={`${namespace}__error-message`}>{errorMsg}</p>
        )}
      </li>
    );
  }
}

export default StatusStep;

export { namespace, STATUS };
