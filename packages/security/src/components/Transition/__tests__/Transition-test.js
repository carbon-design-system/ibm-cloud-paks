/**
 * @file Transition tests.
 * @copyright IBM Security 2018
 */

import { shallow } from 'enzyme';
import React from 'react';

import { className, children } from '../../_mocks_';

import Transition from '../';

describe('Transition', () => {
  it('renders correctly', () => {
    expect(
      shallow(<Transition className={className}>{children}</Transition>)
    ).toMatchSnapshot();
  });
});
