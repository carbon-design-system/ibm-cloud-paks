/**
 * @file Header popover header.
 * @copyright IBM Security 2019 - 2020
 */

import classnames from 'classnames';
import { element, string } from 'prop-types';
import React from 'react';

import { appendComponentNamespace } from '../../../globals/namespace';
import { namespace as headerNamespace } from '../constants';

const namespace = appendComponentNamespace(headerNamespace, 'popover__header');

/**
 * Header popover header component.
 * @param {object.<string, *>} props Header popover header props.
 * @returns {HeaderPopoverHeader} Header popover header instance.
 */
const HeaderPopoverHeader = ({ children, className, id, title }) => (
  <section className={classnames(namespace, className)}>
    {title && (
      <span id={id} className={`${namespace}__title`}>
        {title}
      </span>
    )}
    {children}
  </section>
);

HeaderPopoverHeader.defaultProps = {
  children: null,
  className: '',
  id: null,
  title: '',
};

HeaderPopoverHeader.propTypes = {
  /** @type {HTMLElement} Children. */
  children: element,

  /** @type {string} Extra classes. */
  className: string,

  /** The ID to pass the title */
  id: string,

  /** @type {string} Title. */
  title: string,
};

export default HeaderPopoverHeader;
