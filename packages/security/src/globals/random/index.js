/**
 * @file Helper methods for randomly generating values.
 * @copyright IBM Security 2018
 */

/**
 * Creates a random floating point number.
 * @param {number} [multiplier=1] The number to multiply by.
 * @returns {float} Random floating point number.
 */
export default (multiplier = 1) => Math.floor(Math.random() * multiplier);
