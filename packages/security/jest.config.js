/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  ...require('deepmerge')(require('jest-config-ibm-cloud-cognitive'), {
    setupFilesAfterEnv: ['./setup/setupFilesAfterEnv'],
  }),
  transformIgnorePatterns: ['node_modules/(?!carbon-components-react)'],
};
