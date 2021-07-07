/**
 * @file Card skeleton.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../../globals/namespace/index';

import Card from '../Card';
import SkeletonText from '../../SkeletonText';

const namespace = getComponentNamespace('card--skeleton');

/**
 * Card skeleton component.
 */
function CardSkeleton({ className, ...other }) {
  const classes = classnames(namespace, className);

  const widths = {
    sm: '25%',
    md: '50%',
    lg: '75%',
  };

  const { sm, md, lg } = widths;

  return (
    <Card className={classes} {...other}>
      <SkeletonText width={sm} />
      <SkeletonText width={sm} heading />
      <SkeletonText width={md} />
      <SkeletonText width={md} />
      <SkeletonText width={lg} />

      <div className={`${namespace}__wrapper`}>
        <SkeletonText className={`${namespace}__text--inline`} width={sm} />
        <SkeletonText width={sm} />
      </div>
    </Card>
  );
}

CardSkeleton.propTypes = {
  /** Extra classes to add. */
  className: PropTypes.string,
};

CardSkeleton.defaultProps = {
  className: null,
};

export default CardSkeleton;
