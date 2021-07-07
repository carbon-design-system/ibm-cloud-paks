/**
 * @file Data table with batch actions story.
 * @copyright IBM Security 2019 - 2021
 */

import { Delete16, Download16, Save16 } from '@carbon/icons-react';

import { action } from '@storybook/addon-actions';
import React from 'react';

import {
  Button,
  DataTable,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '../../..';

import { headers, missingDataCharacter, rows } from '../_mocks_';

const batchActionsStory = (props) => (
  <DataTable
    rows={rows}
    headers={headers}
    {...props}
    render={({
      rows,
      headers,
      getBatchActionProps,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      onInputChange,
    }) => (
      <TableContainer {...getTableContainerProps()}>
        <TableToolbar>
          <TableBatchActions {...getBatchActionProps()}>
            <TableBatchAction
              renderIcon={Delete16}
              iconDescription="Delete the selected rows"
              onClick={(selectedRows) => () =>
                action('Delete batch action click')(selectedRows)}>
              Delete
            </TableBatchAction>
            <TableBatchAction
              renderIcon={Save16}
              iconDescription="Save the selected rows"
              onClick={(selectedRows) => () =>
                action('Save batch action click')(selectedRows)}>
              Save
            </TableBatchAction>
            <TableBatchAction
              renderIcon={Download16}
              iconDescription="Download the selected rows"
              onClick={(selectedRows) => () =>
                action('Download batch action click')(selectedRows)}>
              Download
            </TableBatchAction>
          </TableBatchActions>
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} />
            <TableToolbarMenu>
              <TableToolbarAction onClick={() => action('batch action click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={() => action('batch action click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={() => action('batch action click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button kind="primary" onClick={action('Add new row')} size="small">
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableSelectAll {...getSelectionProps()} />
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
    )}
  />
);

export default batchActionsStory;
