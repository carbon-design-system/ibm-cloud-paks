/**
 * @file Environment helpers.
 * @copyright IBM Security 2018
 */

const { NODE_ENV } = process.env;

/**
 * Tests for the current environment.
 * @param {string} [env=development] - The environment to test against.
 * @returns {boolean} Returns true if it is the expected environment.
 */
export default (env = 'development') => NODE_ENV === env;
