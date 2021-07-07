/**
 * @file Scroll gradient tests.
 * @copyright IBM Security 2019 - 2020
 */

import React from 'react';
import { mount } from 'enzyme';

// JSDOM hasn't implemented `ResizeObserver` yet, so the mock needs to be moved into a separate file and included before the tested file - https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import { disconnectMock, observeMock } from '../__mocks__';
import ScrollGradient, { namespace } from '../ScrollGradient';

import { className, children } from '../_mocks_';

describe('ScrollGradient', () => {
  let scrollGradient;

  beforeEach(() => {
    scrollGradient = mount(
      <ScrollGradient
        className={className}
        color="blue"
        scrollElementClassName={className}>
        {children}
      </ScrollGradient>
    );
  });

  describe('Rendering', () => {
    it('renders gradient in y-direction by default', () =>
      expect(scrollGradient).toMatchSnapshot());

    it('renders gradient in x-direction', () => {
      scrollGradient.setProps({ direction: ScrollGradient.ScrollDirection.X });
      expect(scrollGradient).toMatchSnapshot();
    });

    it('passes scroll element reference via prop function', () => {
      const getScrollElementRef = jest.fn();

      // Refs are gotten when component is first mounted.
      scrollGradient = mount(
        <ScrollGradient
          className={className}
          color="blue"
          getScrollElementRef={getScrollElementRef}>
          {children}
        </ScrollGradient>
      );
      expect(getScrollElementRef).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });

  describe('Events', () => {
    it('invokes `onScroll`', () => {
      const onScroll = jest.fn();
      scrollGradient.setProps({ onScroll });
      scrollGradient.find(`.${namespace}__content`).simulate('scroll');
      expect(onScroll).toHaveBeenCalledTimes(1);
    });

    describe('`ResizeObserver`', () => {
      beforeEach(() => {
        disconnectMock.mockClear();
        observeMock.mockClear();
      });

      afterAll(() => {
        window.ResizeObserver = undefined;
      });

      it('adds `ResizeObserver` when mounted', () => {
        scrollGradient = mount(
          <ScrollGradient className={className} color="blue">
            {children}
          </ScrollGradient>
        );

        expect(observeMock).toBeCalledTimes(1);
      });

      it('removes `ResizeObserver` when unmounted', () => {
        scrollGradient.unmount();

        expect(disconnectMock).toBeCalledTimes(1);
      });
    });
  });

  describe('getScrollState()', () => {
    it('returns `NONE` for non-scrollable x-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientWidth: 1, scrollWidth: 1 },
          ScrollGradient.ScrollDirection.X
        )
      ).toBe(ScrollGradient.ScrollStates.NONE));

    it('returns `INITIAL` when scrolling position is 0 for scrollable x-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientWidth: 1, scrollWidth: 3, scrollLeft: 0 },
          ScrollGradient.ScrollDirection.X
        )
      ).toBe(ScrollGradient.ScrollStates.INITIAL));

    it('returns `STARTED` when scrolling has started but has not reached end for scrollable x-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientWidth: 1, scrollWidth: 3, scrollLeft: 1 },
          ScrollGradient.ScrollDirection.X
        )
      ).toBe(ScrollGradient.ScrollStates.STARTED));

    it('returns `END` scrolled as far as possible in x-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientWidth: 1, scrollWidth: 3, scrollLeft: 2 },
          ScrollGradient.ScrollDirection.X
        )
      ).toBe(ScrollGradient.ScrollStates.END));

    it('returns `NONE` for non-scrollable y-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientHeight: 1, scrollHeight: 1 },
          ScrollGradient.ScrollDirection.Y
        )
      ).toBe(ScrollGradient.ScrollStates.NONE));

    it('returns `INITIAL` when scrolling position is 0 for scrollable y-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientHeight: 1, scrollHeight: 3, scrollTop: 0 },
          ScrollGradient.ScrollDirection.Y
        )
      ).toBe(ScrollGradient.ScrollStates.INITIAL));

    it('returns `STARTED` when scrolling has started but has not reached end for scrollable y-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientHeight: 1, scrollHeight: 3, scrollTop: 1 },
          ScrollGradient.ScrollDirection.Y
        )
      ).toBe(ScrollGradient.ScrollStates.STARTED));

    it('returns `END` scrolled as far as possible in y-direction', () =>
      expect(
        ScrollGradient.getScrollState(
          { clientHeight: 1, scrollHeight: 3, scrollTop: 2 },
          ScrollGradient.ScrollDirection.Y
        )
      ).toBe(ScrollGradient.ScrollStates.END));
  });
});
