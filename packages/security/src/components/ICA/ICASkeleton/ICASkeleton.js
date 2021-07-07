/**
 * @file Important Content Area (ICA) skeleton.
 * @copyright IBM Security 2019
 */

import React from 'react';
import SkeletonText from '../../SkeletonText';
import { getComponentNamespace } from '../../../globals/namespace';

export const namespace = getComponentNamespace('ica-skeleton');

const ICASkeleton = () => (
  <div className={namespace}>
    <SkeletonText className={`${namespace}__label`} />
    <SkeletonText heading className={`${namespace}__value`} width="80%" />
  </div>
);

export default ICASkeleton;
