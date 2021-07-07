/**
 * @file Delimited list stories.
 * @copyright IBM Security 2019 - 2021
 */

import { breakpoints } from '@carbon/layout';

import { array, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { info, security } from '../../../.storybook';

import { DelimitedList } from '../..';

import mocks from './_mocks_';

const { delimiter, truncate } = DelimitedList.defaultProps;

const props = () => ({
  items: array('Items (items)', mocks.items),
  truncate: boolean('Truncate (truncate)', truncate),
  delimiter: text('Delimiter (delimiter)', delimiter),
  style: { width: breakpoints.sm.width },
});

storiesOf(security('DelimitedList'), module).add(
  'Default',
  () => <DelimitedList {...props()} />,

  info(
    'Delimited lists truncates an array of items, separated by a delimited, and include the total number of items when hovering.'
  )
);
