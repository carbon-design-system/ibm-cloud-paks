/**
 * @file Link stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { carbon } from '../../../.storybook';

import Link from './';

storiesOf(carbon('Link'), module).add(
  `default`,
  () => (
    <Link href="#example" onClick={action('onClick')}>
      Link
    </Link>
  ),
  {
    info: {
      text: `
          Basic implementation of a Link component.
        `,
    },
  }
);
