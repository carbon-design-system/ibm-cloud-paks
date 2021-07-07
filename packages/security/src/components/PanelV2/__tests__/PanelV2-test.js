/**
 * @file Panel v2 tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';

import { Button, PanelV2, PanelContent } from '../../..';

describe('PanelV2', () => {
  test('has no accessibility violations with custom footer via `renderFooter`', async () => {
    const { container } = render(
      <PanelV2
        title="test title"
        subtitle="test subtitle"
        closeButton={{
          label: 'test close',
        }}
        renderFooter={() => <Button>test footer button</Button>}>
        <PanelContent>test content</PanelContent>
      </PanelV2>
    );

    await expect(container).toBeAccessible('PanelV2 with renderFooter');
    await expect(container).toHaveNoAxeViolations();
  });

  test('has no accessibility violations with `title` or `subtitle` as a `node`', async () => {
    const { container } = render(
      <PanelV2
        title={<span>test title</span>}
        subtitle={<span>test subtitle</span>}
        closeButton={{
          label: 'test close',
        }}>
        <PanelContent>test content</PanelContent>
      </PanelV2>
    );

    await expect(container).toBeAccessible(
      'PanelV2 with title or subtitle as node'
    );

    await expect(container).toHaveNoAxeViolations();
  });

  test('has no accessibility violations when there is scrolling content', async () => {
    const { container } = render(
      <PanelV2
        // Note that title (or subtitle) should be provided here
        // to generate a valid `aria-labelledBy` for tabbable scrolling content:
        title="test title"
        closeButton={{
          label: 'test close',
        }}
        // Note that `hasScrollingContent={true}` so the `PanelContent` wrapper is tabbable:
        hasScrollingContent
        // `aria-label` provided because there is scrolling content:
        aria-label="test aria-label">
        <PanelContent>
          test content text
          <Button>test content button</Button>
        </PanelContent>
      </PanelV2>
    );

    await expect(container).toBeAccessible('PanelV2 with hasScrollingContent');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should invoke close mock when close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByLabelText } = render(
      <PanelV2
        closeButton={{
          label: 'test close',
          onClick: onCloseMock,
        }}
        isOpen
      />
    );

    userEvent.click(getByLabelText(/test close/i));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should invoke close mock when Escape key is pressed', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <PanelV2
        title="test title"
        onClose={onCloseMock}
        closeButton={{
          label: 'test close',
        }}
        isOpen
      />
    );

    fireEvent.keyDown(getByText(/test title/i), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should not render panel when `isOpen` is set to `false`', () => {
    const { queryByText } = render(
      <PanelV2
        title="test title"
        isOpen={false}
        closeButton={{
          label: 'test close',
        }}
      />
    );

    expect(queryByText(/test title/i)).not.toBeInTheDocument();
  });

  test('should cycle panel elements in tab order', () => {
    const { getByLabelText, getByText } = render(
      <PanelV2
        closeButton={{
          label: 'test close',
        }}
        renderFooter={() => <Button>test footer button</Button>}>
        <PanelContent>
          test content text
          <Button>test content button</Button>
        </PanelContent>
      </PanelV2>
    );

    userEvent.tab();

    // The close button:
    expect(getByLabelText(/test close/i)).toHaveFocus();

    userEvent.tab();

    // The button inside the `PanelContent` wrapper:
    expect(getByText(/test content button/i)).toHaveFocus();

    userEvent.tab();

    // The footer button:
    expect(getByText(/test footer button/i)).toHaveFocus();

    userEvent.tab();

    // Loop complete.
    // The close button:
    expect(getByLabelText(/test close/i)).toHaveFocus();
  });

  test('should cycle panel elements in tab order when there is scrolling content', () => {
    const { getByLabelText, getByText } = render(
      <PanelV2
        closeButton={{
          label: 'test close',
        }}
        renderFooter={() => <Button>test footer button</Button>}
        // Note that `hasScrollingContent={true}` so the `PanelContent` wrapper is tabbable:
        hasScrollingContent
        // `aria-label` provided because there is scrolling content:
        aria-label="test aria-label">
        <PanelContent>
          test content text
          <Button>test content button</Button>
        </PanelContent>
      </PanelV2>
    );

    userEvent.tab();

    // The close button:
    expect(getByLabelText(/test close/i)).toHaveFocus();

    userEvent.tab();

    // The tabbable `PanelContent` wrapper.
    // Need to use query selector that targets the accessible role
    // of the scrolling content due to divs wrapping inner text:
    expect(document.querySelector('section[role="region"]')).toHaveFocus();

    userEvent.tab();

    // The button inside the `PanelContent` wrapper:
    expect(getByText(/test content button/i)).toHaveFocus();

    userEvent.tab();

    // The footer button:
    expect(getByText(/test footer button/i)).toHaveFocus();

    userEvent.tab();

    // Loop complete.
    // The close button:
    expect(getByLabelText(/test close/i)).toHaveFocus();
  });
});
