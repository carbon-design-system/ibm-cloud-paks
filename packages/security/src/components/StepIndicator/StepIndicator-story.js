/**
 * @file Step indicator stories.
 * @copyright IBM Security 2019 - 2021
 */

import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { deprecated, info } from '../../../.storybook';
import { Step, StepIndicator } from '../..';

storiesOf(deprecated('StepIndicator'), module).add(
  'default',
  () => (
    <StepIndicator currentIndex={number('Current progress (currentIndex)', 1)}>
      <Step
        label="First step"
        description="Step 1: Getting started with Carbon Design System"
      />
      <Step
        label="Second step"
        description="Step 2: Getting started with Carbon Design System"
      />
      <Step
        label="Second step with tooltip"
        description="Step 3: Getting started with Carbon Design System"
      />
      <Step
        label="Fourth step"
        description="Step 4: Getting started with Carbon Design System"
        invalid
      />
      <Step
        label="Fifth step"
        description="Step 5: Getting started with Carbon Design System"
        disabled
      />
    </StepIndicator>
  ),

  info(
    '`StepIndicator` and `Step` have been deprecated - please use the vertical `ProgressIndicator` and `ProgressStep` instead.',
    {
      story: 'progressindicator',
    }
  )
);
