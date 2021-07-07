/**
 * @file Deprecation warning.
 * @copyright IBM Security 2019 - 2021
 */

import isDevelopment from '../env';

/**
 * Filters, compares, and logs the appropriate properties with a description.
 * @param {string} description The description to use when logging.
 * @param {string} type The property type to log.
 * @param {Array.<string>} componentKeys The component keys to filter.
 * @param {Function} condition The condition to filter the component keys.
 * @returns {string} The description and appropriate properties.
 */
const logDeviations = (description, type, componentKeys, filterCondition) =>
  console.log(`${description} ${type}`, componentKeys.filter(filterCondition));

/**
 * Helper for comparing and logging deviations between multiple components.
 * @param {string} carbonComponent The Carbon component to compare.
 * @param {string} securityComponent The Security-specific component to compare.
 */
const compareDeviations = (carbonComponent, securityComponent) => {
  ['defaultProps', 'propTypes'].forEach((type) => {
    const carbonComponentKeys = Object.keys(carbonComponent[type]);
    const securityComponentKeys = Object.keys(securityComponent[type]);

    logDeviations(
      'Common',
      type,
      carbonComponentKeys,
      (key) => securityComponentKeys.indexOf(key) !== -1
    );

    logDeviations(
      'Carbon',
      type,
      carbonComponentKeys,
      (key) => securityComponentKeys.indexOf(key) === -1
    );

    logDeviations(
      'Security',
      type,
      securityComponentKeys,
      (key) => carbonComponentKeys.indexOf(key) === -1
    );
  });
};

/**
 * Returns a standardized deprecation warning for development.
 * @param {string} warning - The warning value supplied.
 * @returns {console.trace} A stack trace containing the created deprecation details.
 */
function deprecationWarning(warning) {
  if (isDevelopment()) {
    try {
      throw new Error(
        `Warning: ${warning} and will be removed in an upcoming major release`
      );
    } catch (error) {
      console.warn(error);
    }
  }
}

/**
 * Returns a standardized deprecation warning.
 * @param {string} actual - The actual value supplied.
 * @param {string} expected - The expected value to be supplied.
 * @returns {console.trace} A stack trace containing the created deprecation details.
 */
const deprecate = (actual, expected) =>
  deprecationWarning(
    `'${actual}' has been deprecated in favor of '${expected}'`
  );

/**
 * Returns a standardized component deprecation warning.
 * @param {object.<string, string>} deprecationWarning - An object containing properties that construct the deprecation warning.
 * @param {string} deprecationWarning.actual - The actual value supplied.
 * @param {string} deprecationWarning.componentName - The component name it was supplied to.
 * @param {string} deprecationWarning.description - The description of the deprecation warning.
 * @param {string} deprecationWarning.expected - The expected value to be supplied.
 * @returns {console.trace} A stack trace containing the created deprecation details.
 */
export default ({ actual, componentName, description, expected }) =>
  deprecationWarning(
    `Deprecated ${description} '${actual}' supplied to '${componentName}', expected '${expected}'`
  );

export { compareDeviations, deprecate };
