/**
 * @file Status indicator.
 * @copyright IBM Security 2019 - 2021
 */

import { Restart20 } from '@carbon/icons-react';

import deprecate from 'carbon-components-react/es/prop-types/deprecate';
import classnames from 'classnames';

import {
  array,
  element,
  func,
  oneOfType,
  number,
  shape,
  string,
} from 'prop-types';

import React, { Component } from 'react';

import Button from '../Button';

import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('status-indicator');

class StatusIndicator extends Component {
  static propTypes = {
    /** @type {string} A title for the component. */
    title: string,

    /** @type {string} Extra classes to add. */
    className: string,

    /** @type {number} The index of the current step. */
    currentIndex: number,

    /** @type {Array} The array of child elements of the application. */
    children: oneOfType([array, element]),

    /** @type {object.<object, *>} An object list of retry button props. */
    retry: shape({
      /** @type {func} An action to be re-run in the event of failure. */
      action: func,

      /** @type {string} The label to be displayed for the retry button. */
      label: string,

      /** @type {string} The description for the retry button. */
      description: deprecate(
        string,
        `\nThe prop \`retry.description\` for StatusIndicator has been deprecated. Please provide a valid \`retry.label\` instead.`
      ),
    }),
  };

  static defaultProps = {
    title: null,
    className: '',
    currentIndex: 0,
    children: null,
    retry: null,
  };

  state = {
    retry: this.props.retry,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.retry !== nextProps.retry) {
      return {
        retry: nextProps.retry,
      };
    }
    return null;
  }

  render() {
    const { title, className, currentIndex, children } = this.props;

    return (
      <div className={classnames(namespace, className)}>
        {title && <h1 className={`${namespace}__title`}>{title}</h1>}
        <ul className={`${namespace}__list`} {...currentIndex}>
          {children}
          {this.state.retry && (
            <li>
              <Button
                className={`${namespace}__button--retry`}
                kind="ghost"
                onClick={this.state.retry.action}
                onKeyPress={this.state.retry.action}
                renderIcon={Restart20}>
                {this.state.retry.label}
              </Button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
export default StatusIndicator;
