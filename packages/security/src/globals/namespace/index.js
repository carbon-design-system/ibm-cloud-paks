/**
 * @file Namespace.
 * @copyright IBM Security 2018 - 2021
 */

import { settings } from 'carbon-components';

const { prefix: carbonPrefix } = settings;

const namespace = 'security--';

/**
 * Appends the namespace for a component to another namespace.
 * @param {string} componentNamespace The component namespace to append to.
 * @param {string} componentName The component namespace to append.
 * @returns {string} The appended component namespace to return.
 */
const appendComponentNamespace = (componentNamespace, componentName) =>
  `${componentNamespace}__${componentName}`;

/**
 * Creates the namespace for a component using the global namespace.
 * @param {string} componentName The component namespace to create.
 * @returns {string} The component namespace to return.
 */
const getComponentNamespace = (componentName) => `${namespace}${componentName}`;

export { appendComponentNamespace, carbonPrefix, getComponentNamespace };
