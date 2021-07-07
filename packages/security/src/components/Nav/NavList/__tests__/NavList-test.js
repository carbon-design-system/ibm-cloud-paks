/**
 * @file Navigation list tests.
 * @copyright IBM Security 2019
 */

import React from 'react';
import { mount } from 'enzyme';

import { className, href, label } from '../../../_mocks_';

import { NavItem, NavList } from '../../../..';

describe('Nav', () => {
  let navigationList;

  beforeEach(() => {
    navigationList = mount(
      <NavList className={className} isExpandedOnPageload>
        <NavItem href={href()}>{label}</NavItem>
      </NavList>
    );
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      expect(navigationList).toMatchSnapshot();
    });

    it("renders the HTML of the node's subtree", () => {
      expect(navigationList.render()).toMatchSnapshot();
    });
  });

  describe('Actions', () => {
    it('toggles the navigation list when clicked', () => {
      navigationList.simulate('click');
      expect(navigationList.state('open')).toEqual(false);

      navigationList.simulate('click');
      expect(navigationList.state('open')).toEqual(true);
    });

    it('toggles navigation list with the enter key', () => {
      const which = 13;

      navigationList.simulate('keypress', {
        which,
      });

      expect(navigationList.state('open')).toEqual(false);

      navigationList.simulate('keypress', {
        which,
      });
      expect(navigationList.state('open')).toEqual(true);
    });

    it('toggles navigation list with space key', () => {
      const which = 32;

      navigationList.simulate('keypress', { which });
      expect(navigationList.state('open')).toEqual(false);

      navigationList.simulate('keypress', { which });

      expect(navigationList.state('open')).toEqual(true);
    });

    it('toggles nothing with other keys', () => {
      const which = 0;

      navigationList.simulate('keypress', { which });
      expect(navigationList.state('open')).toEqual(true);

      navigationList.simulate('keypress', { which });

      expect(navigationList.state('open')).toEqual(true);
    });
  });
});
