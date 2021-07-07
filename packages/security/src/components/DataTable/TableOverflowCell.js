/**
 * @file Table overflow cell that holds an Overflow Menu inside a Data Table.
 * @copyright IBM Security 2019 - 2021
 */

import { TableCell as CarbonTableCell } from 'carbon-components-react';
import classnames from 'classnames';
import React from 'react';

import { overflowCellNamespace } from './constants';

/**
 * Proxies TableCell component with extra classname for positioning.
 */
const TableOverflowCell = ({ className, ...props }) => (
  <CarbonTableCell
    className={classnames(overflowCellNamespace, className)}
    {...props}
  />
);

TableOverflowCell.propTypes = CarbonTableCell.propTypes;
TableOverflowCell.defaultProps = CarbonTableCell.defaultProps;

export default TableOverflowCell;
