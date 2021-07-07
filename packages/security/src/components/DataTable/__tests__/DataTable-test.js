/**
 * @file Data table tests.
 * @copyright IBM Security 2019
 */

import { mount } from 'enzyme';
import React from 'react';

import { DataTable } from '../DataTable';

import { headers, isSelectable, isSortable, render, rows } from '../_mocks_';

describe('DataTable', () => {
  let table;

  beforeEach(() => {
    table = mount(
      <DataTable
        rows={rows}
        headers={headers}
        isSelectable={isSelectable}
        isSortable={isSortable}
        render={render}
      />
    );
  });

  describe('Rendering', () => {
    it('renders', () => {
      expect(table).toMatchSnapshot();
    });

    it('renders a selectable table', () => {
      table.setProps({ isSelectable: !isSelectable });
      expect(table).toMatchSnapshot();
    });

    it('renders a sortable table', () => {
      table.setProps({ isSortable: !isSortable });
      expect(table).toMatchSnapshot();
    });

    it('renders a custom table', () => {
      table.setProps({ render });
      expect(table).toMatchSnapshot();
    });

    it('removes window event listener', () => {
      const spy = jest.spyOn(window, 'removeEventListener');
      const resizeHandler = table
        .find(DataTable.Table)
        .instance().handleWindowResize;
      table.unmount();
      expect(window.removeEventListener).toHaveBeenCalledWith(
        'resize',
        resizeHandler
      );
      spy.mockRestore();
    });
  });

  describe('Interactions', () => {
    it('updates overflow menus position on scroll', () => {
      const scrollLeft = 10;
      const scrollWidth = 100;
      const clientWidth = 20;

      const TestOverflowMenu = {
        style: {},
      };

      table.find('ScrollGradient').prop('onScroll')({
        target: {
          scrollLeft,
          scrollWidth,
          clientWidth,
          querySelectorAll: () => [TestOverflowMenu],
        },
      });

      expect(TestOverflowMenu).toMatchSnapshot();
    });
  });
});
