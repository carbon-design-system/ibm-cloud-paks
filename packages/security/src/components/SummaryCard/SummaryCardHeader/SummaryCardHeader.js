/**
 * @file Summary card header.
 * @copyright IBM Security 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StringFormatter from '../../StringFormatter';

import { getComponentNamespace } from '../../../globals/namespace/index';

export const namespace = getComponentNamespace('summary-card__header');

const SummaryCardHeader = ({
  className,
  status,
  title,
  titleTooltipDirection,
  truncate,
  ...other
}) => (
  <div className={classnames(namespace, className)} {...other}>
    <h2 className={`${namespace}__title`}>
      <StringFormatter
        truncate={truncate}
        value={title}
        tooltipDirection={titleTooltipDirection}
      />
    </h2>
    {status}
  </div>
);

SummaryCardHeader.propTypes = {
  /** Extra class names to add. */
  className: PropTypes.string,

  /** The status of the Card. */
  status: PropTypes.node,

  /** The title of the summary card. */
  title: PropTypes.string.isRequired,

  /** Specify the direction of the title's tooltip. Can be either top or bottom. */
  titleTooltipDirection: PropTypes.oneOf(['top', 'bottom']),

  /** Whether or not the value should be truncated. */
  truncate: PropTypes.bool,
};

SummaryCardHeader.defaultProps = {
  className: null,
  status: undefined,
  titleTooltipDirection: 'bottom',
  truncate: false,
};

export default SummaryCardHeader;
