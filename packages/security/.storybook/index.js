/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sectionTitle } from '../config';

const getCategory = (title) => `${sectionTitle}/${title}`;

const carbon = (title) => getCategory(`Carbon/${title}`);
const deprecated = (title) => getCategory(`Deprecated/${title}`);
const security = (title) => getCategory(`Components/${title}`);
const layoutModules = (title) => getCategory(`Layout modules/${title}`);
const pageLayouts = (title) => getCategory(`Page layouts (canary)/${title}`);
const patterns = (title) => getCategory(`Patterns/${title}`);

let getDocsParameters, info;
getDocsParameters = info = () => ({});

const disableCentered = () => ({
  layout: 'fullscreen',
});

const disableCenteredStories = (stories) =>
  stories.addParameters(disableCentered());

export {
  carbon,
  deprecated,
  disableCentered,
  disableCenteredStories,
  getDocsParameters,
  info,
  layoutModules,
  pageLayouts,
  patterns,
  security,
};
