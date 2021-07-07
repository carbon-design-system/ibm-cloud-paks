/**
 * @file Delimited list tests.
 * @copyright IBM Security 2019
 */

import { shallow } from 'enzyme';
import React from 'react';

import { DelimitedList } from '../../..';

import props from '../_mocks_';

describe('DelimitedList', () => {
  it('renders correctly', () => {
    expect(shallow(<DelimitedList items={props.items} />)).toMatchSnapshot();
  });
});
