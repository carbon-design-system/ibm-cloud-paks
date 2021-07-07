/**
 * @file Accordion stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { boolean, text, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { carbon, info } from '../../../.storybook';

import { Accordion, AccordionItem, AccordionSkeleton, Button } from '../..';

const props = {
  onClick: action('onClick'),
  onHeadingClick: action('onHeadingClick'),
  style: { width: '100vw' },
};

const align = {
  Start: 'start',
  End: 'end',
};

const documentation = info(
  'Accordions allow users to expand and collapse sections of content.',
  {
    story: 'accordion',
  }
);

storiesOf(carbon('Accordion'), module)
  .add(
    'Default',
    () => (
      <Accordion
        align={select('Accordion heading alignment (align)', align, 'start')}>
        <AccordionItem
          title={text('The title (title)', 'Section 1 title')}
          open={boolean('Open the section (open)', false)}
          {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title" {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title" {...props}>
          <Button>This is a button.</Button>
        </AccordionItem>
        <AccordionItem
          title={
            <span>
              Section 4 title (<em>the title can be a node</em>)
            </span>
          }
          {...props}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
      </Accordion>
    ),
    documentation
  )
  .add(
    'with skeleton',
    () => (
      <div style={{ width: '500px' }}>
        <AccordionSkeleton
          align={select('Accordion heading alignment (align)', align, 'start')}
          open={boolean('Show first item opened (open)', true)}
          count={number('Set number of items (count)', 4)}
        />
      </div>
    ),
    documentation
  );
