/**
 * @file Step indicator.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';

// TODO: `2.x` - Remove in favor of `ProgressIndicator`.
const StepIndicator = ({ ...other }) => (
  <ProgressIndicator vertical {...other} />
);

const Step = ({ ...other }) => <ProgressStep {...other} />;

export { StepIndicator, Step };
