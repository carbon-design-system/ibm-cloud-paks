/**
 * @file Header list item.
 * @copyright IBM Security 2018
 */

import classnames from 'classnames';
import React from 'react';

import { defaultProps, namespace, propTypes } from './constants';

/**
 * Header list item component.
 * @param {object.<string, *>} props Header list item props.
 * @returns {HeaderListItem} Header list item instance.
 */
const HeaderListItem = ({ children, className, hasPopup, isExpanded }) => (
  <li
    className={classnames(namespace, className)}
    aria-expanded={isExpanded}
    aria-haspopup={hasPopup}>
    {children}
  </li>
);

HeaderListItem.propTypes = propTypes;
HeaderListItem.defaultProps = defaultProps;

export default HeaderListItem;
