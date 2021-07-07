/**
 * @file Combo button item.
 * @copyright IBM Security 2019 - 2021
 */

import deprecate from 'carbon-components-react/es/prop-types/deprecate';

import React from 'react';
import PropTypes from 'prop-types';

import { namespace } from '../ComboButton';

const ComboButtonItem = (props) => {
  const { ...rest } = props;
  return <span {...rest} className={`${namespace}-item`} />;
};

ComboButtonItem.propTypes = {
  /** @type {string} Text content. */
  children: PropTypes.string.isRequired,

  /** @type {string} Extra classes to add. */
  className: PropTypes.string,

  /** @type {boolean} Whether or not an item is disabled. */
  disabled: PropTypes.bool,

  /** @type {boolean} URL for an <a> element inside the combo button item. */
  href: PropTypes.string,

  /** @type {string} Descriptive text for icon rendered inside a button. */
  iconDescription: PropTypes.string,

  /** @type {func} Click handler. */
  onClick: PropTypes.func,

  /**
   * @deprecated This prop has been deprecated.
   * Please use `selectorPrimaryFocus` in ComboButton instead.
   */
  // eslint-disable-next-line react/require-default-props
  primaryFocus: deprecate(
    PropTypes.bool,
    `\nThe prop \`primaryFocus\` for ComboButtonItem has been deprecated. Please use the \`selectorPrimaryFocus\` in ComboButton instead.`
  ),

  /** @type {Function|object} Icon to render. */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ComboButtonItem.defaultProps = {
  className: '',
  disabled: false,
  href: undefined,
  iconDescription: '',
  onClick: () => {},
  renderIcon: null,
};

export default ComboButtonItem;
