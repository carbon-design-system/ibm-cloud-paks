/**
 * @file Important content area skeleton stories.
 * @copyright IBM Security 2019 - 2021
 */

import { storiesOf } from '@storybook/react';

import React from 'react';

import { security } from '../../../../.storybook';

import { ICASkeleton } from '../../..';

storiesOf(security('ICA'), module).add('Skeleton', () => <ICASkeleton />);
