/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = require('deepmerge')(
  require('babel-preset-ibm-cloud-cognitive')(),
  {
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      'babel-plugin-macros',
    ],
  }
);
