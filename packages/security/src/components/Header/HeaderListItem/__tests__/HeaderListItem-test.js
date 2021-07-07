/**
 * @file Header list item tests.
 * @copyright IBM Security 2018
 */

import { shallow } from 'enzyme';
import React from 'react';

import { children, className } from '../../../_mocks_';

import HeaderListItem from '../';

describe('HeaderListItem', () => {
  describe('Rendering', () => {
    const hasPopup = false;
    const isExpanded = false;

    const headerListItem = shallow(
      <HeaderListItem
        className={className}
        hasPopup={hasPopup}
        isExpanded={isExpanded}>
        {children}
      </HeaderListItem>
    );

    it('renders children', () => {
      expect(headerListItem.children().exists()).toEqual(true);
    });

    it('renders extra classes', () => {
      expect(headerListItem.hasClass(className)).toEqual(true);
    });

    it('renders the `aria-expanded` attribute', () => {
      expect(headerListItem.prop('aria-expanded')).toEqual(isExpanded);
      headerListItem.setProps({ isExpanded: !isExpanded });
      expect(headerListItem.prop('aria-expanded')).toEqual(!isExpanded);
    });

    it('renders the `aria-haspopup` attribute', () => {
      expect(headerListItem.prop('aria-haspopup')).toEqual(hasPopup);
      headerListItem.setProps({ hasPopup: !hasPopup });
      expect(headerListItem.prop('aria-haspopup')).toEqual(!hasPopup);
    });
  });
});
