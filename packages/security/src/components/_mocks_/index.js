/**
 * @file Global mocks.
 * @copyright IBM Security 2018
 */

import React from 'react';

import random from '../../globals/random';

const label = 'Label';

const lorem =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet rerum aliquid perferendis, nulla nam ad excepturi, iure earum dolorum ipsa quae cum voluptatibus nemo quis debitis, aperiam repudiandae dolore deleniti.';

const icon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+ICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTYgMThINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMmgxMGEyIDIgMCAwIDEgMiAydjEwYTIgMiAwIDAgMS0yIDJ6TTYgNnYxMGgxMFY2em0yMCA2djRoLTR2LTRoNG0wLTJoLTRhMiAyIDAgMCAwLTIgMnY0YTIgMiAwIDAgMCAyIDJoNGEyIDIgMCAwIDAgMi0ydi00YTIgMiAwIDAgMC0yLTJ6bTAgMTJ2NGgtNHYtNGg0bTAtMmgtNGEyIDIgMCAwIDAtMiAydjRhMiAyIDAgMCAwIDIgMmg0YTIgMiAwIDAgMCAyLTJ2LTRhMiAyIDAgMCAwLTItMnptLTEwIDJ2NGgtNHYtNGg0bTAtMmgtNGEyIDIgMCAwIDAtMiAydjRhMiAyIDAgMCAwIDIgMmg0YTIgMiAwIDAgMCAyLTJ2LTRhMiAyIDAgMCAwLTItMnoiLz48L3N2Zz4=';

const id = '0';

const disabled = true;

const invalid = true;

const invalidText = 'Invalid text';

/**
 * Returns a child component.
 */
const children = <span>{label}</span>;

const className = 'class';

/**
 * Creates a URL for mock data.
 * @param {string} [hash=] - A hash to pass to the URL method.
 * @returns {string} The mock data URL.
 */
const url = (hash = '') => `#${hash}`;

/**
 * Creates a `href` for mock data.
 * @returns {string} The `href` to return.
 */
const href = () => url();

export {
  children,
  className,
  disabled,
  href,
  icon,
  id,
  invalid,
  invalidText,
  label,
  lorem,
  random,
  url,
};
