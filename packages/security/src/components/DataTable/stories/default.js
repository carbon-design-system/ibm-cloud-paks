/**
 * @file Data table default story.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';

import { DataTable } from '../../..';
import { headers, missingDataCharacter, rows } from '../_mocks_';

const defaultStory = ({ ...other }) => (
  <DataTable
    rows={rows}
    headers={headers}
    missingDataCharacter={missingDataCharacter}
    isSelectable={false}
    isSortable={false}
    {...other}
  />
);

export default defaultStory;
