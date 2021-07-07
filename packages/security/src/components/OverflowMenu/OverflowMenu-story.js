/**
 * @file Overflow menu stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';

import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { carbon } from '../../../.storybook';

import { OverflowMenu, OverflowMenuItem } from '../../';

const directions = {
  'Bottom of the trigger button (bottom)': 'bottom',
  'Top of the trigger button (top)': 'top',
};

const props = {
  menu: () => ({
    direction: select('Menu direction (direction)', directions, 'bottom'),
    ariaLabel: text('ARIA label (ariaLabel)', ''),
    iconDescription: text('Icon description (iconDescription)', ''),
    flipped: boolean('Flipped (flipped)', false),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onKeyDown: action('onKeyDown'),
    onClose: action('onClose'),
    onOpen: action('onOpen'),
  }),
  menuItem: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled)', false),
    requireTitle: boolean(
      'Use hover over text for menu item (requireTitle)',
      false
    ),
    onClick: action('onClick'),
  }),
};

const OverflowMenuExample = ({ overflowMenuProps, overflowMenuItemProps }) => (
  <>
    <OverflowMenu {...overflowMenuProps}>
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 1" />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 2 is an example of a really long string and how we recommend handling this"
        requireTitle
      />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 3" />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 4" />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Danger option"
        hasDivider
        isDelete
      />
    </OverflowMenu>
    <OverflowMenu {...overflowMenuProps}>
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 1" />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 2 is an example of a really long string and how we recommend handling this"
      />
    </OverflowMenu>
  </>
);

storiesOf(carbon('OverflowMenu'), module)
  .add(
    'basic',
    () => (
      <OverflowMenuExample
        overflowMenuProps={props.menu()}
        overflowMenuItemProps={props.menuItem()}
      />
    ),
    {
      info: {
        text: `
            Overflow Menu is used when additional options are available to the user and there is a space constraint.
            Create Overflow Menu Item components for each option on the menu.
          `,
      },
    }
  )
  .add(
    'with links',
    () => (
      <OverflowMenuExample
        overflowMenuProps={props.menu()}
        overflowMenuItemProps={{
          ...props.menuItem(),
          href: 'https://www.ibm.com',
        }}
      />
    ),
    {
      info: {
        text: `
            Overflow Menu is used when additional options are available to the user and there is a space constraint.
            Create Overflow Menu Item components for each option on the menu.
            When given \`href\` props, menu items render as <a> tags to facilitate usability.
          `,
      },
    }
  )
  .add(
    'custom trigger',
    () => (
      <OverflowMenuExample
        overflowMenuProps={{
          ...props.menu(),
          style: { width: 'auto' },
          renderIcon: () => (
            <div style={{ padding: '0 1rem' }}>Custom trigger</div>
          ),
        }}
        overflowMenuItemProps={props.menuItem()}
      />
    ),
    {
      info: {
        text: `
            Sometimes you just want to render something other than an icon
          `,
      },
    }
  );
