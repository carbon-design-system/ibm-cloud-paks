/**
 * @file Table toolbar button for downloading table data as CSV
 * @copyright IBM Security 2019 - 2021
 */

import { Download16 } from '@carbon/icons-react';

import { ExportToCsv } from 'export-to-csv';
import PropTypes from 'prop-types';
import React from 'react';

import IconButton from '../IconButton';

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useTextFile: false,
  useBom: true,
};

const TableToolbarDownload = ({ headers, rows, title, filename, label }) => {
  const csvRows = rows.map((row) => {
    const newRow = {};
    headers.forEach(({ key }) => {
      newRow[key] = row[key] ? row[key] : '';
    });
    return newRow;
  });

  if (title) {
    options.showTitle = true;
    options.title = title;
  }
  options.filename = filename;

  options.headers = headers.map(({ header }) => header);

  const csvExporter = new ExportToCsv(options);

  return (
    <IconButton
      size="lg"
      renderIcon={Download16}
      label={label}
      onClick={() => {
        if (rows.length > 0 && headers.length > 0) {
          csvExporter.generateCsv(csvRows);
        }
      }}
    />
  );
};

TableToolbarDownload.propTypes = {
  /**
   * @type {object.<object, *>}
   * The `rows` prop is where you provide us with a list of all the rows that
   * you want to render in the table. The only hard requirement is that this
   * is an array of objects, and that each object has a unique `id` field
   * available on it.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,

  /**
   * @type {object.<object, *>}
   * The `headers` prop represents the order in which the headers should
   * appear in the table. We expect an array of objects to be passed in, where
   * `key` is the name of the key in a row object, and `header` is the name of
   * the header.
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,

  /** @type {string} the title used for the generated CSV table */
  title: PropTypes.string,

  /** @type {string} the filename used for the generated CSV file */
  filename: PropTypes.string,

  /** @type {string} the aria-label for the button */
  label: PropTypes.string,
};

TableToolbarDownload.defaultProps = {
  title: '',
  filename: 'DataTable',
  label: 'Download',
};

export default TableToolbarDownload;
