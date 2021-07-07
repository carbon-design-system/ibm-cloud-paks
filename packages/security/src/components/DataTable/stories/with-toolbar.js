/**
 * @file Data table with toolbar story.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  Button,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarDownload,
} from '../../..';
import {
  headers as mockHeaders,
  missingDataCharacter,
  rows as mockRows,
} from '../_mocks_';

const toolbarStory = (props) => (
  <DataTable
    rows={mockRows}
    headers={mockHeaders}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getTableContainerProps,
      onInputChange,
    }) => (
      <TableContainer {...getTableContainerProps()}>
        <TableToolbar>
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} />
            <TableToolbarDownload
              rows={mockRows}
              headers={mockHeaders}
              title="My CSV"
              filename="my_exports"
            />
            <TableToolbarMenu>
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('ButtonCLick')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })} key={row.id}>
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
    )}
  />
);

export default toolbarStory;
