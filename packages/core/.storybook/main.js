/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const { merge } = require('webpack-merge');

module.exports = {
  core: {
    builder: 'webpack5',
  },

  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@carbon/storybook-addon-theme/register',
  ],
  stories: ['../../**/src/**/*+(-story|.stories).*'],
  webpackFinal: async (configuration) =>
    merge(configuration, {
      module: {
        rules: [
          {
            test: /\.stories\.js$/,
            loader: 'babel-loader',
            options: require('babel-preset-ibm-cloud-cognitive')(),
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  // https://webpack.js.org/loaders/style-loader/#lazystyletag
                  injectType: 'lazyStyleTag',
                },
              },
              'css-loader',
              {
                loader: 'fast-sass-loader',
                options: {
                  includePaths: [
                    resolve(__dirname, '..', '..', '..', 'node_modules'),
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
};
