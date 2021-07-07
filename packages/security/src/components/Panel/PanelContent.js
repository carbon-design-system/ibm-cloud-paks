/**
 * @file Panel content.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../globals/namespace';

const namespace = getComponentNamespace('panel');

/**
 * Panel content component.
 * @param {object.<string, *>} props Panel content props.
 * @returns {PanelContent} Panel content instance.
 */
const PanelContent = (props) => {
  const classes = classnames(`${namespace}__body--content`, props.className);
  return <div className={classes}>{props.children}</div>;
};

PanelContent.defaultProps = {
  children: undefined,
  className: undefined,
};

PanelContent.propTypes = {
  /** @type {ReactNode} Child elements. */
  children: PropTypes.node,

  /** @type {string} Extra classes to add. */
  className: PropTypes.string,
};

export default PanelContent;
