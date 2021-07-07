/**
 * @file Data table with selection story.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';
import { DataTable } from '../../..';
import { headers, missingDataCharacter, rows } from '../_mocks_';

const selectionStory = ({ ...other }) => (
  <DataTable
    rows={rows}
    headers={headers}
    missingDataCharacter={missingDataCharacter}
    isSelectable
    isSortable={false}
    {...other}
  />
);

export default selectionStory;
