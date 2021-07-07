// eslint-disable-next-line no-restricted-globals
const maybeSelf = typeof self !== 'undefined' ? self : undefined;
const maybeGlobal = typeof global !== 'undefined' ? global : undefined;
const maybeWindow = typeof window !== 'undefined' ? window : undefined;

const root = maybeWindow || maybeGlobal || maybeSelf || {};

export default root;
