/**
 * @file Filter tests.
 * @copyright IBM Security 2018
 */

import { shallow } from 'enzyme';
import React from 'react';

import { label, className } from '../../../_mocks_';
import { items, itemToString } from '../_mocks_';

import FilterRaw from '../Filter';

const { fn } = jest;

describe('Filter', () => {
  let filter;
  let onChange;

  beforeEach(() => {
    onChange = fn();

    filter = shallow(
      <FilterRaw
        className={className}
        id="test-id"
        items={items}
        itemToString={itemToString}
        onChange={onChange}
        placeholder={label}
      />
    );
  });

  describe('render', () => {
    it('renders correctly', () => {
      expect(filter).toMatchSnapshot();
    });

    it("renders the HTML of the node's subtree", () => {
      expect(filter.render()).toMatchSnapshot();
    });
  });

  describe('events', () => {
    it('should invoke `onChange` when the filter is changed', () => {
      filter.simulate('change');
      expect(onChange).toBeCalled();
    });
  });
});
