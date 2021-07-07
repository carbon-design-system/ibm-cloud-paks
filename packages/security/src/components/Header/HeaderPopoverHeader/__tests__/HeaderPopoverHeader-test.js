/**
 * @file Header popover header tests.
 * @copyright IBM Security 2019
 */

import { shallow } from 'enzyme';
import React from 'react';

import { className, children } from '../../../_mocks_';

import HeaderPopoverHeader from '..';

describe('HeaderPopoverHeader', () => {
  describe('Rendering', () => {
    const headerPopoverHeader = shallow(
      <HeaderPopoverHeader className={className}>
        {children}
      </HeaderPopoverHeader>
    );

    it('renders children', () => {
      expect(headerPopoverHeader.children().exists()).toEqual(true);
    });

    it('renders extra classes', () => {
      expect(headerPopoverHeader.hasClass(className)).toEqual(true);
    });
  });
});
