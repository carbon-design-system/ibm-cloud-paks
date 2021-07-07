/**
 * @file Filter Panel utilities.
 * @copyright IBM Security 2019
 */

import PropTypes from 'prop-types';

/**
 * Filter category object.
 * @typedef {object} FilterCategory
 * @property {string} id Unique ID of object.
 * @property {string} name Display name of object.
 * @property {string[]} subcategories IDs of subcategories that belong to this object.
 * @property {number} count Total count of results that are represented in this object.
 */
/** @type {FilterCategory} Type definition for filter categories */
export const filterCategoryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number.isRequired,
});

/**
 * Filter subcategory object.
 * @typedef {object} FilterSubcategory
 * @property {string} id Unique ID of object.
 * @property {string} name Display name of object.
 * @property {string[]} filters IDs of filters that belong to this object.
 * @property {string} parent ID of parent of this object.
 * @property {number} count Total count of results that are represented in this object.
 */
/** @type {FilterSubcategory} Type definition for filter subcategories */
export const filterSubcategoryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
  parent: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

/**
 * Filter object.
 * @typedef {object} Filter
 * @property {string} id Unique ID of object.
 * @property {string} name Display name of object.
 * @property {string} parent ID of parent of this object.
 * @property {number} count Total count of results that are represented in this object.
 */
/** @type {Filter} Type definition for filters */
export const filterFiltersPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

/**
 * Filter data object.
 * @typedef {object} FilterData
 * @property {object<string, FilterCategory>} categories Object containing filter category objects.
 * @property {object<string, FilterSubcategory>} subcategories Object containing filter subcategory objects.
 * @property {object<string, Filter>} filters Object containing filters objects.
 */
/** @type {FilterData} Type defition for filter data */
export const filterDataPropTypes = PropTypes.shape({
  categories: PropTypes.objectOf(filterCategoryPropTypes).isRequired,
  subcategories: PropTypes.objectOf(filterSubcategoryPropTypes).isRequired,
  filters: PropTypes.objectOf(filterFiltersPropTypes).isRequired,
});

/** @type {FilterData} Default empty object for filter data. */
export const filterDataDefaultProps = {
  categories: {},
  subcategories: {},
  filters: {},
};

/**
 * Gets array of categories from filter data.
 * @param {FilterData} filterData Filter data object containing categories to extract.
 * @returns {FilterCategory[]} Array of categories objects.
 */
export const getFilterCategoriesArray = (filterData) =>
  Object.keys(filterData.categories).map(
    (category) => filterData.categories[category]
  );

/**
 * Gets array of subcategories from filter data.
 * @param {FilterData} filterData Filter data object containing subcategories to extract.
 * @returns {FilterSubcategory[]} Array of subcategories objects.
 */
export const getFilterSubcategoriesArray = (filterData) =>
  Object.keys(filterData.subcategories).map(
    (subcategory) => filterData.subcategories[subcategory]
  );

/**
 * Gets array of filters from filter data.
 * @param {FilterData} filterData Filter data object containing filters to extract.
 * @returns {Filter[]} Array of filters objects.
 */
export const getFiltersArray = (filterData) =>
  Object.keys(filterData.filters).map((filter) => filterData.filters[filter]);

/**
 * Gets array of selected filters from filter data.
 * @param {FilterData} filterData Filter data object containing selected filters to extract.
 * @returns {(Filter[]|null)} Array of selected filters objects.
 */
export const getSelectedFiltersArray = (filterData) =>
  getFiltersArray(filterData).filter((filter) => filter.enabled);
