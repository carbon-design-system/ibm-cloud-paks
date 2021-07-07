/* eslint-disable react/prop-types */
/**
 * @file Data table mocks.
 * @copyright IBM Security 2019
 */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
} from '../../..';

const headers = [
  {
    key: 'lastSighted',
    header: 'Last sighted',
  },
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'type',
    header: 'Type',
  },
  {
    key: 'attackPhase',
    header: 'Attack phase',
  },
  {
    key: 'method',
    header: 'Method',
  },
  {
    key: 'missing',
    header: 'Missing',
  },
];

const isSelectable = false;
const isSortable = false;
const missingDataCharacter = '–';

const rows = [
  {
    id: '7c34f4507156b35',
    lastSighted: '11/28/2018',
    name: 'IBM X-Force',
    type: 'IPv6',
    attackPhase: 'Initial Compromise',
    method: 'Phishing',
  },
  {
    id: '38347816a51b0c5a8',
    lastSighted: '06/28/2017',
    name: 'AppX',
    type: 'Hash',
    attackPhase: 'Establish Foothold',
    method: 'Deploy backdoor',
  },
  {
    id: '1d6116a2d1d03b4',
    lastSighted: '05/30/2018',
    name: 'Bigfix',
    type: 'URL',
    attackPhase: 'Escalate Privileges',
    method: 'Credential dumping',
  },
  {
    id: 'c52b0419981221765',
    lastSighted: '12/12/2018',
    name: 'Am I Affected',
    type: 'Hash',
    attackPhase: 'Cross-Site Scripting',
    method: 'Malicious Code',
  },
  {
    id: '697626e6f703131d',
    lastSighted: '11/11/2018',
    name: 'QRadar',
    type: 'Hash',
    attackPhase: 'SQL Injection Attack',
    method: 'SQL Vulnerabilities',
  },
  {
    id: 'd568f12fa7b7cac1',
    lastSighted: '12/09/2018',
    name: 'iris',
    type: 'Hash',
    attackPhase: 'Volume Based Attacks',
    method: 'ICMP floods',
  },
  {
    id: '697626e6f70313554',
    lastSighted: '12/10/2018',
    name: 'TISP',
    type: 'Hash',
    attackPhase: 'Application Layer Attacks',
    method: 'GET/POST floods',
  },
  {
    id: '1dd568f12fa7b7cac2',
    lastSighted: '12/11/2018',
    name: 'CLX',
    type: 'Hash',
    attackPhase: 'Protocol Attacks',
    method: 'SYN Floods',
  },
  {
    id: '697626e6f703131',
    lastSighted: '10/12/2018',
    name: 'X-Force Plus',
    type: 'Hash',
    attackPhase: 'Malicious Links',
    method: 'Social Engineering',
  },
  {
    id: 'dd568f12fa7b7cac0',
    lastSighted: '12/16/2018',
    name: 'BigFix & iris',
    type: 'Hash',
    attackPhase: 'Exploit Kits',
    method: 'Scripts',
  },
  {
    id: '697626e6f70313',
    lastSighted: '01/12/2018',
    name: 'Cases',
    type: 'Hash',
    attackPhase: 'Malicious Email',
    method: 'Social Engineering',
  },
];

const page = 1;
const pageSize = 5;
const pageSizes = [5, 10, 20];

/**
 * Render method.
 * @returns {string} The string to render.
 */
const render = ({
  rows,
  headers,
  getHeaderProps,
  getRowProps,
  getTableProps,
  getSelectionProps,
}) => (
  <TableContainer>
    <Table {...getTableProps()}>
      {headers && (
        <TableHead>
          <TableRow>
            <TableSelectAll {...getSelectionProps()} />
            {headers.map((header) => (
              <TableHeader
                key={header.id}
                {...getHeaderProps({ header, isSortable })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {rows.map((row) => (
          <TableRow {...getRowProps({ row })} key={row.id}>
            <TableSelectRow {...getSelectionProps({ row })} />
            {row.cells.map((cell) => (
              <TableCell key={cell.id}>
                {cell.value ? cell.value : missingDataCharacter}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export {
  headers,
  isSelectable,
  isSortable,
  missingDataCharacter,
  page,
  pageSize,
  pageSizes,
  render,
  rows,
};
