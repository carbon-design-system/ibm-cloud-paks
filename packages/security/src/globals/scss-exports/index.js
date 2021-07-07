/**
 * @file SCSS exports.
 * @copyright IBM Security 2019
 */

import { deprecate } from '../deprecate';

deprecate('spacing.module.scss', '`@carbon/colors` and `@carbon/layout`');

export { colors } from '@carbon/colors';

export spacing from './spacing.module.scss';
