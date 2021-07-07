/**
 * @file Themes.
 * @copyright IBM Security 2019 - 2021
 */

import { formatTokenName, g100 } from '@carbon/themes';

const theme = {};

// Rewrites the theme using CSS custom properties.
Object.keys(g100).forEach((token) => {
  theme[token] = `var(--cds-${formatTokenName(token)}, ${g100[token]})`;
});

export default theme;
