/**
 * @file Set of constant values used in Data Table related components.
 * @copyright IBM Security 2019
 */
import { getComponentNamespace } from '../../globals/namespace';

/** @type {string} Namespace string for class naming of data tables */
export const namespace = getComponentNamespace('data-table');

/** @type {string} Class name given to table wrapper element. */
export const tableWrapperNamespace = `${namespace}__table-wrapper`;

/** @type {string} Class name given to the overflow menu table cell. */
export const overflowCellNamespace = `${namespace}__overflow-cell`;
