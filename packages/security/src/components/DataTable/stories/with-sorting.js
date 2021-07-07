/**
 * @file Data table with sorting story.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';
import { DataTable } from '../../..';
import { headers, missingDataCharacter, rows } from '../_mocks_';

const sortingStory = ({ ...other }) => (
  <DataTable
    rows={rows}
    headers={headers}
    missingDataCharacter={missingDataCharacter}
    isSelectable={false}
    isSortable
    {...other}
  />
);

export default sortingStory;
