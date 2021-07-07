/**
 * @file Data table with expansion story.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
} from '../../..';
import { headers, missingDataCharacter, rows } from '../_mocks_';

const expansionStory = (props) => (
  <DataTable
    rows={rows}
    headers={headers}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer {...getTableContainerProps()}>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableExpandHeader />
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })} key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.value ? cell.value : missingDataCharacter}
                    </TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow colSpan={headers.length + 1}>
                  <h1>Expandable row content</h1>
                  <p>Description here</p>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);

export default expansionStory;
