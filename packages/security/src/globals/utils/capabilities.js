/**
 * @file Helper methods for checking environment's capabilities.
 * @copyright IBM Security 2018
 */

// Verify that document exists in global namespace.
const isClient = () => typeof document !== 'undefined';

// Verify that Node exists in global namespace.
const isNode = () => typeof Node !== 'undefined';

export { isClient, isNode };
