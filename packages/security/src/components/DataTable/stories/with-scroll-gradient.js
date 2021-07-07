/**
 * @file Data table with scroll gradient story.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';

import { DataTable } from '../../..';
import { headers, missingDataCharacter, rows } from '../_mocks_';

const scrollGradientStory = ({ ...other }) => (
  <div style={{ maxWidth: '30rem' }}>
    <DataTable
      rows={rows}
      headers={headers}
      missingDataCharacter={missingDataCharacter}
      isSelectable={false}
      isSortable={false}
      {...other}
    />
  </div>
);

export default scrollGradientStory;
