/**
 * @file Header popover secondary link tests.
 * @copyright IBM Security 2018
 */

import { shallow } from 'enzyme';
import React from 'react';

import { className, label, url } from '../../../_mocks_';

import HeaderPopoverLinkSecondary from '../';

describe('HeaderPopoverLinkSecondary', () => {
  describe('Rendering', () => {
    const href = url();
    const elementLabel = label;

    const headerPopoverLinkSecondary = shallow(
      <HeaderPopoverLinkSecondary className={className} href={href}>
        {elementLabel}
      </HeaderPopoverLinkSecondary>
    );

    it('renders children', () => {
      expect(headerPopoverLinkSecondary.prop('children')).toEqual(elementLabel);
    });

    it('renders extra classes', () => {
      expect(headerPopoverLinkSecondary.hasClass(className)).toEqual(true);
    });

    it('renders a link', () => {
      expect(headerPopoverLinkSecondary.prop('href')).toEqual(href);
    });
  });
});
