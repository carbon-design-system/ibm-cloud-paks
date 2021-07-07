/**
 * @file Data table and pagination tests.
 * @copyright IBM Security 2019, 2021
 */

import { render } from '@testing-library/react';
import React from 'react';
import { DataTablePagination } from '../../';

import {
  headers,
  isSelectable,
  isSortable,
  missingDataCharacter,
  page,
  pageSize,
  pageSizes,
  rows,
} from '../../_mocks_';

describe('DataTablePagination', () => {
  const dataTablePaginationRef = React.createRef();
  const onChangeHandler = jest.fn();

  const DataTablePaginationElement = (
    <DataTablePagination
      ref={dataTablePaginationRef}
      rows={rows}
      headers={headers}
      isSelectable={isSelectable}
      isSortable={isSortable}
      missingDataCharacter={missingDataCharacter}
      page={page}
      pageSize={pageSize}
      pageSizes={pageSizes}
      onChange={onChangeHandler}
    />
  );

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(DataTablePaginationElement);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("renders the HTML of the node's subtree", () => {
      render(DataTablePaginationElement);
      expect(dataTablePaginationRef.current.render()).toMatchSnapshot();
    });
  });

  describe('Events', () => {
    it('validates the state change for `paginationChange`', () => {
      render(DataTablePaginationElement);

      const desiredPage = 2;
      const desiredPageSize = 10;

      dataTablePaginationRef.current.paginationChange({
        page: desiredPage,
        pageSize: desiredPageSize,
      });

      expect(onChangeHandler).toHaveBeenCalledWith({
        page: desiredPage,
        pageSize: desiredPageSize,
      });
    });

    it('validates data range for `paginateData`', () => {
      render(DataTablePaginationElement);
      expect(dataTablePaginationRef.current.paginateRows(rows).length).toEqual(
        pageSize
      );
    });
  });
});
