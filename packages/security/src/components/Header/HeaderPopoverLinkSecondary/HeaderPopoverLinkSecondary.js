/**
 * @file Header popover secondary link.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import { node, string } from 'prop-types';
import React from 'react';

import { appendComponentNamespace } from '../../../globals/namespace';

import { namespace } from '../constants';

import Link from '../../Link';

/**
 * Header popover secondary link component.
 */
const HeaderPopoverLinkSecondary = ({ children, className, href }) => (
  <Link
    className={classnames(
      `${namespace}__popover__link`,
      appendComponentNamespace(namespace, 'popover__link--secondary'),
      className
    )}
    href={href}>
    {children}
  </Link>
);

HeaderPopoverLinkSecondary.defaultProps = { className: '' };

HeaderPopoverLinkSecondary.propTypes = {
  /** @type {string|HTMLElement} Children. */
  children: node.isRequired,

  /** @type {string} Extra classes. */
  className: string,

  /** @type {string} Link URL. */
  href: string.isRequired,
};

export default HeaderPopoverLinkSecondary;
