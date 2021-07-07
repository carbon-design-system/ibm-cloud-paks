/**
 * @file External link.
 * @copyright IBM Security 2019 - 2021
 */

import { Launch16 } from '@carbon/icons-react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon';
import Link from '../Link';

import { getComponentNamespace } from '../../globals/namespace';

const namespace = getComponentNamespace('link--external');

/**
 * External link component.
 */
const ExternalLink = ({ children, className, href, ...other }) => (
  <Link
    className={classnames(className, namespace)}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    {...other}>
    <span className={`${namespace}__title`}>{children}</span>
    <span className={`${namespace}__icon-wrapper`}>
      <Icon className={`${namespace}__icon`} renderIcon={Launch16} />
    </span>
  </Link>
);

ExternalLink.propTypes = {
  /** @type {string} The link content. */
  children: PropTypes.node.isRequired,

  /** @type {string} Additional classes. */
  className: PropTypes.string,

  /** @type {string} The external URL. */
  href: PropTypes.string.isRequired,
};

ExternalLink.defaultProps = {
  className: '',
};

export default ExternalLink;
