/**
 * @file Icon tests.
 * @copyright IBM Security 2019
 */
import { shallow } from 'enzyme';
import React from 'react';

import { className } from '../../_mocks_';
import { path, renderIcon } from '../_mocks_';

import { Icon } from '../../..';

describe('Icon', () => {
  let icon;

  beforeEach(() => {
    icon = shallow(<Icon className={className} renderIcon={renderIcon} />);
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      expect(icon).toMatchSnapshot();
    });

    it("renders the HTML of the node's subtree", () => {
      expect(icon.render()).toMatchSnapshot();
    });

    it('renders correctly', () => {
      expect(icon).toMatchSnapshot();
    });

    it('renders the path variation correctly', () => {
      icon.setProps({ path });

      expect(icon).toMatchSnapshot();
    });
  });
});
