import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  selectedItemsReducer,
  availableItemsReducer,
  withItemReducer,
  FilterTagFragment,
  noop,
  TagWallFilter,
  itemToString,
} from '../TagWallFilter';
import TagWall from '../../TagWall';
import Filter from '../Filter';

describe('TagWallFilter tests', () => {
  const tearsheetProps = {
    heading: 'TagWallFilter Heading',
    description:
      'What’s the secret to minced and ground doughnut? Always use small garlic.',
    closeButton: {
      onClick: jest.fn(),
    },
    secondaryButton: {
      onClick: jest.fn(),
    },
    primaryButton: {
      onClick: jest.fn(),
    },
  };

  it('should do nothing on noop', () => {
    expect(noop()).toBeUndefined();
  });
  describe('selectedItemsReducer', () => {
    let initState;
    beforeEach(() => {
      initState = { items: [] };
    });
    it('should handle SELECT_ITEM', () => {
      const state1 = selectedItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'x', label: 'hallo' },
      });
      const state2 = selectedItemsReducer(state1, {
        type: 'SELECT_ITEM',
        item: { id: 'y', label: '!!!' },
      });
      expect(state1.items.length).toEqual(1);
      expect(state2.items.length).toEqual(2);
      expect(state1).toMatchSnapshot();
      expect(state2).toMatchSnapshot();
    });
    it('should handle UNSELECT_ITEM', () => {
      initState = selectedItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'x', label: 'hallo' },
      });
      initState = selectedItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'y', label: '!!!' },
      });
      initState = selectedItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'z', label: '???' },
      });
      const finalState = selectedItemsReducer(initState, {
        type: 'UNSELECT_ITEM',
        item: { id: 'y' },
      });
      expect(finalState.items.length).toEqual(2);
      expect(initState.items.length).toEqual(3);
      expect(finalState).toMatchSnapshot();
    });
    it('should handle CLEAR_SELECTED_ITEMS', () => {
      initState = selectedItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'x', label: 'hallo' },
      });
      initState = selectedItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'y', label: '!!!' },
      });
      initState = selectedItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'z', label: '???' },
      });
      const finalState = selectedItemsReducer(initState, {
        type: 'CLEAR_SELECTED_ITEMS',
      });
      expect(initState.items.length).toEqual(3);
      expect(finalState.items.length).toEqual(0);
      expect(finalState).toMatchSnapshot();
    });
  });
  describe('availableItemsReducer', () => {
    let initState;
    beforeEach(() => {
      initState = {
        allItems: [
          { id: 'x', label: 'Coordinataes ortum!' },
          { id: 'Ecce', label: "With spinach drink emeril's essence!" },
          { id: 'Nix', label: 'Advenas ortum in amivadum!' },
          {
            id: 'Uria',
            label: 'Occur and you will be absorbed authoratively.',
          },
          {
            id: 'Revalia',
            label: 'Dosi of a human plasma, eat the starlight travel!',
          },
        ],
      };
      initState.items = initState.allItems;
    });
    it('should handle SELECT_ITEM', () => {
      const state = availableItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'x' },
      });
      expect(state.items.length).toEqual(initState.items.length - 1);
      expect(state).toMatchSnapshot();
    });
    it('should handle UNSELECT_ITEM', () => {
      initState = availableItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'x' },
      });
      initState = availableItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'Ecce' },
      });
      initState = availableItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'Revalia' },
      });
      const finalState = availableItemsReducer(initState, {
        type: 'UNSELECT_ITEM',
        item: { id: 'Ecce', label: 'The son robs with grace.' },
      });
      expect(finalState.items.length).toEqual(initState.items.length + 1);
      expect(finalState).toMatchSnapshot();
    });
    it('should handle CLEAR_SELECTED_ITEMS', () => {
      initState = availableItemsReducer(initState, {
        type: 'SELECT_ITEM',
        item: { id: 'Revalia' },
      });
      const finalState = availableItemsReducer(initState, {
        type: 'CLEAR_SELECTED_ITEMS',
      });
      expect(finalState.items).toBe(finalState.allItems);
      expect(finalState.items).toBe(initState.allItems);
      expect(finalState).toMatchSnapshot();
    });
  });
  describe('withItemReducer', () => {
    it('should infer allItems', () => {
      const wrappedComponent = jest.fn(() => null);
      const ComponentMock = withItemReducer(wrappedComponent);
      const wrapper = shallow(
        <ComponentMock
          selectedItems={[{ id: 'x' }]}
          availableItems={[{ id: 'y' }, { id: 'z' }]}
        />
      );
      wrapper.render();
      const { available: { allItems } = { allItems: [] } } =
        wrappedComponent.mock.calls[0][0].itemState;
      expect(allItems.length).toEqual(3);
      expect(allItems).toContainEqual({ id: 'x' });
      expect(allItems).toContainEqual({ id: 'y' });
      expect(allItems).toContainEqual({ id: 'z' });
    });
  });
  describe('FilterTagFragment', () => {
    it('should render the fragment', () => {
      const onChangeMock = jest.fn();
      const wrapper = mount(
        <FilterTagFragment
          id="test-id"
          onChange={onChangeMock}
          selectedItems={[{ id: 'y', label: 'Y' }]}
          availableItems={[{ id: 'x', label: 'X' }]}
          placeholder="placeholder"
          itemToString={itemToString}
          tearsheetProps={tearsheetProps}
        />
      );

      const tagWallWrapper = wrapper.find(TagWall);

      expect(wrapper).toMatchSnapshot();
      expect(tagWallWrapper).toMatchSnapshot();
    });
    it('should call the on change callback with the latest item state on change', () => {
      const onChangeMock = jest.fn();
      const wrapper = shallow(
        <FilterTagFragment
          id="test-id"
          onChange={onChangeMock}
          selectedItems={[{ id: 'y', label: 'Y' }]}
          availableItems={[{ id: 'x', label: 'X' }]}
          placeholder="placeholder"
          itemToString={itemToString}
          tearsheetProps={tearsheetProps}
        />
      );

      const filterWrapper = wrapper
        .first()
        .shallow()
        .first()
        .shallow()
        .find(Filter)
        .first();
      filterWrapper.prop('onChange')({
        type: 'SELECT_ITEM',
        item: { id: 'x' },
      });
      expect(wrapper.props()).toMatchSnapshot();
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toMatchSnapshot();
      onChangeMock.mockClear();
      filterWrapper.prop('onChange')({
        type: 'UNSELECT_ITEM',
        item: { id: 'x' },
      });

      expect(wrapper.props()).toMatchSnapshot();
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toMatchSnapshot();
    });
  });
  describe('TagWallFilter', () => {
    it('should mount the TagWallFilter component', () => {
      const wrapper = mount(
        <TagWallFilter
          id="test-id"
          selectedItems={[{ id: 'x', label: 'X' }]}
          availableItems={[{ id: 'y', label: 'Y' }]}
          {...tearsheetProps}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
