/**
 * @file Skeleton text stories.
 * @copyright IBM Security 2018 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { carbon } from '../../../.storybook';

import { SkeletonText } from '../..';

const widths = {
  '100%': '100%',
  '250px': '250px',
};

const props = () => ({
  heading: boolean('Skeleton text at a larger size (heading)'),
  paragraph: boolean('Use multiple lines of text (paragraph)'),
  lineCount: number('The number of lines in a paragraph (lineCount)', 3),
  width: select(
    'Width (in px or %) of single line of text or max-width of paragraph lines (width)',
    widths,
    '100%'
  ),
});

storiesOf(carbon('SkeletonText'), module).add(
  'Default',
  () => (
    <div style={{ width: '300px' }}>
      <SkeletonText {...props()} />
    </div>
  ),
  {
    info: {
      text: `
            Skeleton states are used as a progressive loading state while the user waits for content to load.
          `,
    },
  }
);
