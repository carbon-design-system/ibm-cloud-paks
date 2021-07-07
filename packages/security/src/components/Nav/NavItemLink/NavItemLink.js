/**
 * @file Nav item link.
 * @copyright IBM Security 2019
 */

import PropTypes from 'prop-types';
import React from 'react';

const NavItemLink = React.forwardRef(function NavItemLink(props, ref) {
  const { element, ...rest } = props;
  return React.createElement(element, { ...rest, ref });
});

NavItemLink.displayName = 'NavItemLink';

NavItemLink.propTypes = {
  /** @type {elementType} The base element to use to build the link. Defaults to `a`, can also accept alternative tag names or custom components like `Link` from `react-router`. */
  element: PropTypes.elementType,
};

NavItemLink.defaultProps = {
  element: 'a',
};

export default NavItemLink;
