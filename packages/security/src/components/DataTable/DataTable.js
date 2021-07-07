/**
 * @file Data table.
 * @copyright IBM Security 2019 - 2021
 */

import { DataTable as CarbonDataTable } from 'carbon-components-react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { namespace } from './constants';

import Table from './Table';
import TableOverflowCell from './TableOverflowCell';
import TableToolbarDownload from './TableToolbarDownload';

const { defaultProps: carbonDefaultProps, propTypes: carbonPropTypes } =
  CarbonDataTable;

const {
  TableActionList,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
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
} = CarbonDataTable;

const DataTable = ({
  filterRows,
  headers,
  isSortable,
  isSelectable,
  missingDataCharacter,
  render,
  rows,
  sortRow,
  useZebraStyles,
  ...other
}) => (
  <div className={namespace}>
    {render ? (
      <CarbonDataTable
        filterRows={filterRows}
        headers={headers}
        isSortable={isSortable}
        render={render}
        rows={rows}
        sortRow={sortRow}
        useZebraStyles={useZebraStyles}
        {...other}
      />
    ) : (
      <CarbonDataTable
        headers={headers}
        isSortable={isSortable}
        rows={rows}
        filterRows={filterRows}
        sortRow={sortRow}
        useZebraStyles={useZebraStyles}
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer {...getTableContainerProps()}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {isSelectable && <TableSelectAll {...getSelectionProps()} />}
                  {headers.map((header) => (
                    <TableHeader
                      {...getHeaderProps({ header, isSortable })}
                      key={header.key}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    {...getRowProps({ row })}
                    className={classnames({
                      [`${namespace}__row--selectable`]: isSelectable,
                    })}
                    key={row.id}>
                    {isSelectable && (
                      <TableSelectRow {...getSelectionProps({ row })} />
                    )}
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
        {...other}
      />
    )}
  </div>
);

DataTable.defaultProps = {
  ...carbonDefaultProps,
  isSelectable: true,
  isSortable: true,
  missingDataCharacter: '–',
};

DataTable.propTypes = {
  ...carbonPropTypes,

  /** @type {bool} Defines whether the table is selectable. */
  isSelectable: PropTypes.bool,

  /** @type {string} Defines missing data in a cell replaced with a character. */
  missingDataCharacter: PropTypes.string,
};

export const { defaultProps, propTypes } = DataTable;

DataTable.Table = Table;
DataTable.TableActionList = TableActionList;
DataTable.TableBatchAction = TableBatchAction;
DataTable.TableBatchActions = TableBatchActions;
DataTable.TableBody = TableBody;
DataTable.TableCell = TableCell;
DataTable.TableContainer = TableContainer;
DataTable.TableExpandHeader = TableExpandHeader;
DataTable.TableExpandRow = TableExpandRow;
DataTable.TableExpandedRow = TableExpandedRow;
DataTable.TableHead = TableHead;
DataTable.TableHeader = TableHeader;
DataTable.TableOverflowCell = TableOverflowCell;
DataTable.TableRow = TableRow;
DataTable.TableSelectAll = TableSelectAll;
DataTable.TableSelectRow = TableSelectRow;
DataTable.TableToolbar = TableToolbar;
DataTable.TableToolbarAction = TableToolbarAction;
DataTable.TableToolbarContent = TableToolbarContent;
DataTable.TableToolbarSearch = TableToolbarSearch;
DataTable.TableToolbarMenu = TableToolbarMenu;
DataTable.TableToolbarDownload = TableToolbarDownload;

export {
  DataTable,
  Table,
  TableActionList,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableOverflowCell,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarDownload,
};
