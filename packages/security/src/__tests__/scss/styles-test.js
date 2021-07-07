/**
 * @file Style tests.
 * @copyright IBM Security 2020 - 2021
 */

import { renderSync } from 'node-sass';
import { resolve } from 'path';

import { root } from '../../../config';

describe('Styles', () => {
  test('Bundle', () => {
    expect(
      renderSync({
        file: resolve(__dirname, '../../index.scss'),
        includePaths: [resolve(root, 'node_modules')],
        outputStyle: 'expanded',
      }).css.toString()
    ).toMatchSnapshot();
  });
});
