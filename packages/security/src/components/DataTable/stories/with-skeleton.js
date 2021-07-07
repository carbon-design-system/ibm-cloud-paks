/**
 * @file Data table skeleton story.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';

import { DataTableSkeleton } from '../../..';
import { headers } from '../_mocks_';

export default ({ ...other }) => (
  <DataTableSkeleton headers={headers} {...other} />
);
