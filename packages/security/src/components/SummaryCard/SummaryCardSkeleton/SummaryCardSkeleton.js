/**
 * @file Summary card skeleton.
 * @copyright IBM Security 2019 - 2020
 */

import classnames from 'classnames';
import { string } from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../../globals/namespace/index';

import SkeletonText from '../../SkeletonText';
import Card from '..';

const namespace = getComponentNamespace('summary-card--skeleton');

const WIDTHS = {
  sm: '25%',
  md: '50%',
  lg: '75%',
};

const { sm, md, lg } = WIDTHS;

const SummaryCardSkeleton = ({ className, ...other }) => (
  <Card className={classnames(namespace, className)} {...other}>
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

SummaryCardSkeleton.propTypes = {
  /** Provide an optional class to be applied to the containing node */
  className: string,
};

SummaryCardSkeleton.defaultProps = {
  className: null,
};

export default SummaryCardSkeleton;
