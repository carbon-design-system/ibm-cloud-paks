/**
 * Replacement for Feature flags in carbon-components-react:
 * https://github.com/carbon-design-system/carbon-components-react/blob/master/src/internal/FeatureFlags.js
 */

/**
 * Breaking changes for next release.
 */
export const breakingChangesX = true;

/**
 * Enables Carbon X component features
 */
export const componentsX = true;

/**
 * Support for prop -> state sync of `<Slider>` value.
 */
export const sliderValuePropSync = breakingChangesX;
