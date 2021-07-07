/**
 * @file Summary card action.
 * @copyright IBM Security 2019 - 2021
 */

import { Close20 } from '@carbon/icons-react';
import { g100 } from '@carbon/themes';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Button from '../../Button';
import ScrollGradient from '../../ScrollGradient';
import Transition from '../../Transition';

import { getComponentNamespace } from '../../../globals/namespace/index';

const namespace = getComponentNamespace('summary-card__action');

const transitionSegment = 150; // duration--moderate-01

class SummaryCardAction extends Component {
  state = { isOpen: false };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      children,
      className,
      closeButtonIconDescription,
      disabled,
      expandedContent,
      hasIconOnly,
      loading,
      onClick,
      ...rest
    } = this.props;

    const { isOpen } = this.state;

    return (
      <Fragment>
        <Button
          {...rest}
          aria-expanded={expandedContent ? isOpen : undefined}
          className={classnames(namespace, className, {
            [`${namespace}--icon-only`]: hasIconOnly,
          })}
          disabled={disabled || loading}
          hasIconOnly={hasIconOnly}
          loading={loading}
          kind="ghost"
          onClick={
            expandedContent
              ? (event) => {
                  onClick(event);
                  this.toggleOpen();
                }
              : onClick
          }>
          <span className={`${namespace}__text`}>{children}</span>
        </Button>
        {expandedContent && (
          <Transition
            appearTimeout={transitionSegment * 3}
            className={`${namespace}-overlay`}
            enterTimeout={transitionSegment * 3}
            leaveTimeout={transitionSegment * 3}>
            {isOpen && (
              <>
                <div className={`${namespace}-overlay`}>
                  <div className={`${namespace}-overlay__header`}>
                    {typeof children === 'string' && (
                      <h3 className={`${namespace}-overlay__title`}>
                        {children}
                      </h3>
                    )}
                    <Button
                      className={`${namespace}-overlay__close-button`}
                      renderIcon={Close20}
                      iconDescription={closeButtonIconDescription}
                      onClick={this.toggleOpen}
                      kind="ghost"
                      title={closeButtonIconDescription}
                      aria-label={closeButtonIconDescription}
                    />
                  </div>
                  <div className={`${namespace}-overlay__content`}>
                    <ScrollGradient color={g100.ui01}>
                      {expandedContent}
                    </ScrollGradient>
                  </div>
                </div>

                <div className={`${namespace}-overlay--transparent`} />
              </>
            )}
          </Transition>
        )}
      </Fragment>
    );
  }
}

SummaryCardAction.propTypes = {
  /** @type {object} Children of the actions list. */
  children: PropTypes.node,

  /** @type {string} Extra class names to add. */
  className: PropTypes.string,

  /** @type {string} Provide the close button with an icon description for assistive tech. */
  closeButtonIconDescription: (props) => {
    if (props.expandedContent && !props.closeButtonIconDescription) {
      return new Error(
        'A `closeButtonIconDescription` should be provided if using `expandedContent`.'
      );
    }
    return undefined;
  },

  /** @type {boolean} Specify whether or not the action is disabled. */
  disabled: PropTypes.bool,

  /** @type {node} Provide content to show if action is clicked. */
  expandedContent: PropTypes.node,

  /** @type {bool} Whether or not the action has an icon only. */
  hasIconOnly: PropTypes.bool,

  /** @type {boolean} Specify whether or not the action is in a loading state. While loading, the action is disabled and icons provided via the `renderIcon` prop will not be shown. */
  loading: PropTypes.bool,

  /** @type {Function} Click handler for the action button. */
  onClick: PropTypes.func,
};

SummaryCardAction.defaultProps = {
  children: null,
  className: null,
  closeButtonIconDescription: 'close',
  disabled: false,
  expandedContent: undefined,
  hasIconOnly: false,
  loading: false,
  onClick: () => {},
};

export default SummaryCardAction;
