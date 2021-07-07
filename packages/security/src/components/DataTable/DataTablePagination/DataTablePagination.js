/**
 * @file Data table pagination.
 * @copyright IBM Security 2019
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  DataTable,
  defaultProps as dataTableDefaultProps,
  propTypes as dataTablePropTypes,
} from '../DataTable';

import Pagination from '../../Pagination';

import { getComponentNamespace } from '../../../globals/namespace';

const namespace = getComponentNamespace('data-table-pagination');

class DataTablePagination extends Component {
  static propTypes = {
    ...dataTablePropTypes,

    /** @type {string} Additional classes applied to the wrapper. */
    className: PropTypes.string,

    /** @type {boolean} Indicates whether the component relies on a backend to paginate. */
    useBackendPagination: PropTypes.bool,

    /**
     * @type {string} The description for the backward icon.
     */
    backwardText: PropTypes.string,

    /**
     * @type {Function} The function returning a translatable text showing where the current page is,
     * in a manner of the range of items.
     */
    itemRangeText: PropTypes.func,

    /**
     * @type {string} The description for the forward icon.
     */
    forwardText: PropTypes.string,

    /**
     * @type {string|number} The unique ID of this component instance.
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * @type {string} The translatable text indicating the number of items per page.
     */
    itemsPerPageText: PropTypes.string,

    /**
     * @type {Function} A variant of `itemRangeText`, used if the total number of items is unknown.
     */
    itemText: PropTypes.func,

    /**
     * @type {string} The callback function called when the current page changes.
     */
    onChange: PropTypes.func,

    /**
     * @type {string}
     */
    pageNumberText: PropTypes.string,

    /**
     * @type {Function} A function returning PII showing where the current page is.
     */
    pageRangeText: PropTypes.func,

    /**
     * @type {Function} The translatable text showing the current page.
     */
    pageText: PropTypes.func,

    /**
     * @type {Array<number>} The choices for `pageSize`.
     */
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * @type {number} The total number of items.
     */
    totalItems: PropTypes.number,

    /**
     * @type {boolean} `true` if the backward/forward buttons should be disabled.
     */
    disabled: PropTypes.bool,

    /**
     * @type {number} The current page.
     */
    page: PropTypes.number,

    /**
     * @type {number} The number dictating how many items a page contains.
     */
    pageSize: PropTypes.number,

    /**
     * @type {boolean} `true` if the total number of items is unknown.
     */
    pagesUnknown: PropTypes.bool,

    /**
     * @type {boolean} `true` if the current page should be the last page.
     */
    isLastPage: PropTypes.bool,

    /**
     * @type {boolean} `true` if the select box to change the page should be disabled.
     */
    pageInputDisabled: PropTypes.bool,
  };

  static defaultProps = {
    ...dataTableDefaultProps,

    useBackendPagination: false,
    className: '',
    backwardText: 'Backward',
    disabled: false,
    forwardText: 'Forward',
    isLastPage: false,
    itemsPerPageText: 'Items per page',
    itemText: (min, max) => `${min}-${max} items`,
    itemRangeText: (min, max, total) => `${min}-${max} of ${total} items`,
    page: 1,
    pageInputDisabled: false,
    pageNumberText: 'Page Number',
    pageRangeText: (current, total) => `${current} of ${total} pages`,
    pagesUnknown: false,
    pageText: (page) => `page ${page}`,
  };

  state = {
    page: this.props.page,
    pageSize: this.props.pageSize,
  };

  componentDidMount = () => {
    const { totalItems, useBackendPagination } = this.props;
    if (useBackendPagination && !totalItems) {
      console.warn(
        'Please provide `totalItems` if `useBackendPagination` is `true`.'
      );
    }
  };

  /**
   * Update the state with the newest view values, `page` and `pageSize`.
   * @param {object.<string, number>} configuration The current page and page size.
   */
  paginationChange = (configuration) => {
    const { page, pageSize } = configuration;

    this.setState({ page, pageSize });

    if (this.props.onChange) {
      this.props.onChange({ page, pageSize });
    }
  };

  /**
   * Slice the data to only show between the range.
   * @param {Array.<object.<string, *>>} rows The rows to update.
   * @returns {Array.<object.<string, *>>} The data between the range values.
   */
  paginateRows = (rows) => {
    const start = this.state.pageSize * (this.state.page - 1);
    const end = start + this.state.pageSize;
    return rows.slice(start, end);
  };

  render() {
    const {
      className,
      useBackendPagination,
      rows,
      backwardText,
      disabled,
      forwardText,
      id,
      isLastPage,
      itemsPerPageText,
      itemRangeText,
      itemText,
      onChange,
      page,
      pageInputDisabled,
      pageNumberText,
      pageRangeText,
      pageSize,
      pageSizes,
      pageText,
      pagesUnknown,
      totalItems,
      ...other
    } = this.props;

    return (
      <div className={classnames(className, namespace)}>
        <DataTable
          rows={useBackendPagination ? rows : this.paginateRows(rows)}
          {...other}
        />
        <Pagination
          backwardText={backwardText}
          disabled={disabled}
          forwardText={forwardText}
          id={id}
          isLastPage={isLastPage}
          itemsPerPageText={itemsPerPageText}
          itemRangeText={itemRangeText}
          itemText={itemText}
          onChange={this.paginationChange}
          page={page}
          pageInputDisabled={pageInputDisabled}
          pageNumberText={pageNumberText}
          pageRangeText={pageRangeText}
          pageSize={pageSize}
          pageSizes={pageSizes}
          pageText={pageText}
          pagesUnknown={pagesUnknown}
          totalItems={useBackendPagination ? totalItems : rows.length}
        />
      </div>
    );
  }
}

export default DataTablePagination;
