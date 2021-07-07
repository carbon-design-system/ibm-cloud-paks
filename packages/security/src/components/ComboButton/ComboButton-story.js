/**
 * @file Combo button stories.
 * @copyright IBM Security 2019 - 2021
 */

import { ArrowRight20, Filter20 } from '@carbon/icons-react';

import React from 'react';

import { action } from '@storybook/addon-actions';
import { radios } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { patterns } from '../../../.storybook';

import { TooltipDirection } from '../IconButton/IconButton';
import { ComboButton, ComboButtonItem } from '../..';

const props = () => ({
  direction: radios(
    'Menu direction (direction)',
    {
      top: TooltipDirection.TOP,
      bottom: TooltipDirection.BOTTOM,
    },
    TooltipDirection.TOP
  ),
});

storiesOf(patterns('ComboButton'), module).add(
  'default',
  () => (
    <div style={{ width: 300 }}>
      <ComboButton {...props()}>
        <ComboButtonItem
          href="#"
          onClick={action(`onClick (Item 1)`)}
          renderIcon={ArrowRight20}
          target="_blank">
          Item 1 -- becomes primary button and text will be truncated
        </ComboButtonItem>
        <ComboButtonItem
          href="#"
          onClick={action(`onClick (Item 2)`)}
          renderIcon={Filter20}>
          Item 2
        </ComboButtonItem>
        <ComboButtonItem
          href="#"
          renderIcon={Filter20}
          onClick={action(`onClick (Item 3)`)}
          data-overflow-menu-primary-focus>
          Item 3 -- will be selected when menu opens
        </ComboButtonItem>
        <ComboButtonItem
          href="#"
          renderIcon={Filter20}
          onClick={action(`onClick (Item 3)`)}
          target="_blank">
          Item 4 -- will open link in new tab when clicked
        </ComboButtonItem>
      </ComboButton>
    </div>
  ),
  {
    info: {
      text: `
          The \`ComboButton\` accepts \`ComboButtonItem\` components as children.

          The first child of the \`ComboButton\` will be marked as the "primary" action, and will appear as a \`Button\` next to the \`OverflowMenu\` of additional actions.

          If there is only one child of \`ComboButton\`, then an \`OverflowMenu\` will not be rendered.
        `,
    },
  }
);
