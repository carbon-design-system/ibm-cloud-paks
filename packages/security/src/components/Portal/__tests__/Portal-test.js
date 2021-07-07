/**
 * @file Portal tests.
 * @copyright IBM Security 2018 - 2021
 */

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Portal } from '../../..';

const { name } = Portal;

describe(name, () => {
  test('has no accessibility violations with overlay', async () => {
    const { container } = render(
      <div>
        <section>
          <button>test button outside portal</button>
        </section>
        <Portal>
          <section>
            <button>test button inside portal</button>
          </section>
        </Portal>
      </div>
    );

    await expect(container).toBeAccessible('Portal with overlay');
    await expect(container).toHaveNoAxeViolations();
  });

  test('has no accessibility violations without overlay', async () => {
    const { container } = render(
      <div>
        <section>
          <button>test button outside portal</button>
        </section>
        <Portal hasOverlay={false}>
          <section>
            <button>test button inside portal</button>
          </section>
        </Portal>
      </div>
    );

    await expect(container).toBeAccessible('Portal without overlay');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should remove node from DOM when it is unmounted', () => {
    const { queryByText, unmount } = render(
      <Portal>
        <section>
          <button>test button</button>
        </section>
      </Portal>
    );
    expect(queryByText(/test button/i)).toBeVisible();
    unmount();
    expect(queryByText(/test button/i)).not.toBeInTheDocument();
  });

  test('should not stop events bubbling up by default', () => {
    const copyHandler = jest.fn();
    const inPortalCopy = jest.fn();

    const { getByTestId } = render(
      <div onCopy={copyHandler}>
        <Portal>
          <section>
            <button data-testid="in-portal" onCopy={inPortalCopy}>
              I should call copyHandler
            </button>
          </section>
        </Portal>
      </div>
    );

    fireEvent.copy(getByTestId('in-portal'));
    expect(copyHandler).toHaveBeenCalledTimes(1);
  });

  test('should stop events bubbling up when `stopPropagation` is `true`', () => {
    const mouseOverHandler = jest.fn();
    const inPortalMouseOver = jest.fn();
    const outPortalMouseOver = jest.fn();

    const { getByTestId } = render(
      /* eslint-disable jsx-a11y/mouse-events-have-key-events */
      <div onMouseOver={mouseOverHandler}>
        <button data-testid="out-portal" onMouseOver={outPortalMouseOver}>
          I should call mouseOverHandler
        </button>
        <Portal stopPropagation>
          <section>
            <button data-testid="in-portal" onMouseOver={inPortalMouseOver}>
              I should NOT call mouseOverHandler
            </button>
          </section>
        </Portal>
      </div>
      /* eslint-enable */
    );

    // Inside the portal, events cannot bubble:
    fireEvent.mouseOver(getByTestId('in-portal'));
    expect(mouseOverHandler).toHaveBeenCalledTimes(0);

    // Outside the portal, events can bubble:
    fireEvent.mouseOver(getByTestId('out-portal'));
    expect(mouseOverHandler).toHaveBeenCalledTimes(1);
  });

  test('should stop a specific event from bubbling when provided in array via `stopPropagationEvents`', () => {
    const mouseUpHandler = jest.fn();
    const mouseDownHandler = jest.fn();
    const onMouseUpMock = jest.fn();
    const onMouseDownMock = jest.fn();

    const { getByTestId } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseUp={mouseUpHandler} onMouseDown={mouseDownHandler}>
        <Portal stopPropagationEvents={['onMouseUp']}>
          <section>
            <button
              data-testid="in-portal"
              onMouseDown={onMouseDownMock}
              onMouseUp={onMouseUpMock}>
              I should call mouseDownHandler, but I should NOT call
              mouseUpHandler.
            </button>
          </section>
        </Portal>
      </div>
    );

    // `onMouseUp` event is blocked:
    fireEvent.mouseUp(getByTestId('in-portal'));
    expect(mouseUpHandler).toHaveBeenCalledTimes(0);

    // `onMouseDown` event is NOT blocked:
    fireEvent.mouseDown(getByTestId('in-portal'));
    expect(mouseDownHandler).toHaveBeenCalledTimes(1);
  });

  test('adds a class to the overlay', () => {
    const className = 'className';

    render(
      <Portal overlayOptions={{ className }}>
        <span>{name}</span>
      </Portal>
    );
    expect(document.querySelector(`.${className}`)).toBeInTheDocument();
  });
});
