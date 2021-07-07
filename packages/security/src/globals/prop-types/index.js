/**
 * @file Custom `prop-types` validation.
 * @copyright IBM Security 2018
 */

import { checkPropTypes } from 'prop-types';
import deprecate from '../deprecate';

/**
 * Throws a warning for deprecated props and validates that prop.
 * @param {string} replacementPropName The suggested replacement prop name.
 * @param {PropTypes.<*>} propValidation The prop validation to check against.
 */
const deprecatedProp =
  (replacementPropName, propValidation) =>
  (props, deprecatedPropName, componentName) => {
    /**
     * Creates a prop object to validate against.
     * @param {string|PropTypes.<*>} propValue The prop value to add to the object.
     * @returns {object.<string, *>} The prop object to validate against.
     */
    const createPropObject = (propValue) => ({
      [`${deprecatedPropName}`]: propValue,
    });

    const prop = props[deprecatedPropName];

    if (prop) {
      deprecate({
        actual: deprecatedPropName,
        componentName,
        description: 'prop type',
        expected: replacementPropName,
      });
    }

    checkPropTypes(
      createPropObject(propValidation),
      createPropObject(prop),
      deprecatedPropName,
      componentName
    );
  };

export default deprecatedProp;
