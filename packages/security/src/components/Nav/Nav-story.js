/**
 * @file Navigation stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { security } from '../../../.storybook';
import { Nav, NavItem, NavList } from '../..';

const { name } = Nav;

storiesOf(security(name), module).add(
  'Default',
  () => (
    <div style={{ width: '300px' }}>
      <Nav heading="Nav example" label={Nav}>
        <NavList title="Nav list 1">
          <NavItem key="navitem_1-1" element="span" customprop="uniqueValue">
            Nav item 1-1 (with a custom element)
          </NavItem>
          <NavItem key="navitem_1-2" onClick={action('onClick')}>
            Nav item 1-2
          </NavItem>
        </NavList>
        <NavList title="Nav list 2 expanded on page load" isExpandedOnPageload>
          <NavItem key="navitem_2-1" href="#navitem_2-1">
            Nav item 2-1
          </NavItem>
          <NavItem key="navitem_2-2" href="#navitem_2-2">
            Nav item 2-2
          </NavItem>
        </NavList>
        <NavList title="Nav list 3">
          <NavItem key="navitem_3-1" href="#navitem_3-1">
            Nav item 3-1
          </NavItem>
          <NavItem key="navitem_3-2" href="https://www.ibm.com/">
            Nav item that is an external link and wraps to a new line
          </NavItem>
        </NavList>
      </Nav>
    </div>
  ),
  {
    info: {
      text: `Basic implementation of the '${name}' component.`,
    },
  }
);
