/**
 * @file Item helpers.
 * @copyright IBM Security 2019
 */

/**
 * Handles converting an item to a string.
 * @param {object<string, *>} item The object containing a label to convert.
 * @returns {string} The converted label of the object passed.
 */
const convertItemToString = (item) =>
  typeof (item || {}).label === 'string'
    ? (item || {}).label
    : (item || {}).toString();

/**
 * Handles returning a label for an object.
 * @param {object<string, *>} item The object containing a label.
 * @returns {string} The label of the object passed.
 */
export default (item) =>
  Array.isArray(item)
    ? item.map(convertItemToString)
    : convertItemToString(item);
