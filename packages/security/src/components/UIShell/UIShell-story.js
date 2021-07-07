/**
 * @file UI shell stories.
 * @copyright IBM Security 2019 - 2021
 */

import { storiesOf } from '@storybook/react';
import React from 'react';

import { carbon, disableCenteredStories, info } from '../../../.storybook';

import {
  CarbonHeader,
  HeaderContainer,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from '../..';

const documentation = info("Carbon's `UIShell` component.", {
  story: 'ui-shell',
});

disableCenteredStories(
  storiesOf(carbon('UIShell (Carbon)'), module)
    .add(
      'Header Base',
      () => (
        <CarbonHeader aria-label="IBM Platform Name">
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
        </CarbonHeader>
      ),
      documentation
    )
    .add(
      'Header Base w/ Navigation',
      () => (
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <CarbonHeader aria-label="IBM Platform Name">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="IBM">
                [Platform]
              </HeaderName>
              <HeaderNavigation aria-label="IBM [Platform]">
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderNavigation>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}>
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                    <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                      <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                      <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                      <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                    </HeaderMenu>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
            </CarbonHeader>
          )}
        />
      ),
      documentation
    )
);
