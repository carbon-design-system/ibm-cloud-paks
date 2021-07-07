/**
 * @file Navigation tests.
 * @copyright IBM Security 2019
 */

import { mount } from 'enzyme';
import React from 'react';

import { className, label, url } from '../../_mocks_';

import { Nav, NavItem, NavList } from '../../..';

import { namespace as navigationListItemNamespace } from '../NavItem/NavItem';

describe('Nav', () => {
  const activeHref = url();
  const navigationLabel = label;

  const navItem = (key) => <NavItem href={url(key)}>{navigationLabel}</NavItem>;
  const navList = (key) => <NavList>{navItem(key)}</NavList>;

  const nav = () =>
    mount(
      <Nav
        className={className}
        heading={navigationLabel}
        label={navigationLabel}>
        {navList(0)}
        {navList(1)}
        {navItem(2)}
      </Nav>
    );

  const navigation = nav();

  describe('Rendering', () => {
    it('renders correctly', () => {
      expect(navigation).toMatchSnapshot();
    });

    it("renders the HTML of the node's subtree", () => {
      expect(navigation.render()).toMatchSnapshot();
    });

    it('uses the window location when no `activeHref` is passed', () => {
      expect(nav().state('activeHref')).toEqual(window.location.pathname);
    });

    it('uses no `activeHref` when window location is unavailable', () => {
      delete window.location;

      expect(nav().state('activeHref')).toEqual(undefined);
    });
  });

  describe('Actions', () => {
    const navigationList = navigation.find(NavList).first();
    const isNavigationListOpen = () => navigationList.instance().state.open;

    const navigationListItem = navigation.find(NavItem).first();

    it('updates `activeHref` when selected', () => {
      navigationListItem.simulate('click');

      expect(navigation.state('activeHref')).toEqual(
        navigationListItem.prop('href')
      );
    });

    it('does not update the props when a null `activeHref` is passed', () => {
      navigation.setProps({ activeHref: null });

      expect(navigation.state('activeHref')).toEqual(
        navigationListItem.prop('href')
      );
    });

    it('updates `activeHref` with the enter key', () => {
      navigation.setProps({ activeHref });

      navigationListItem.simulate('keypress', { which: 13 });
      expect(navigation.state('activeHref')).toEqual(
        navigationListItem.prop('href')
      );
    });

    it('updates `activeHref` with the space key', () => {
      navigation.setProps({ activeHref });

      navigationListItem.simulate('keypress', { which: 32 });
      expect(navigation.state('activeHref')).toEqual(
        navigationListItem.prop('href')
      );
    });

    it('will not update the `activeHref` with another key', () => {
      navigationListItem.simulate('keypress', { which: 0 });
      expect(navigation.state('activeHref')).toEqual(
        navigationListItem.prop('href')
      );
    });

    it('closes the list', () => {
      expect(
        navigationList.hasClass(`${navigationListItemNamespace}--expanded`)
      ).toEqual(false);

      navigationList.simulate('click');

      expect(isNavigationListOpen()).toEqual(true);

      navigationList.simulate('click');

      expect(isNavigationListOpen()).toEqual(false);
    });

    it('closes the navigation list when another is selected', () => {
      navigationList.simulate('keypress', { which: 13 });

      expect(isNavigationListOpen()).toEqual(true);

      navigation.find(NavList).last().simulate('click');

      expect(isNavigationListOpen()).toEqual(false);
    });
  });
});
