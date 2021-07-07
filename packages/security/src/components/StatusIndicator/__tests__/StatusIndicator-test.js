/**
 * @file Status step tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { StatusIndicator, StatusStep } from '../../..';

import { STATUS } from '../StatusStep/StatusStep';

describe('StatusIndicator', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <StatusIndicator
        title="test title"
        retry={{
          label: 'test retry label',
          action: () => {},
        }}>
        <StatusStep label="test-label-1" description="test description 1" />
        <StatusStep
          status={STATUS.current}
          label="test-label-2"
          description="test description 2"
        />
        <StatusStep
          status={STATUS.complete}
          label="test-label-3"
          description="test description 3"
        />
        <StatusStep
          status={STATUS.error}
          errorMsg="test error"
          label="test-label-4"
          description="test description 4"
        />
      </StatusIndicator>
    );

    await expect(container).toBeAccessible(`StatusIndicator`);
    await expect(container).toHaveNoAxeViolations();
  });

  test('should add a custom class', () => {
    render(<StatusIndicator className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeVisible();
  });

  test('should add a title', () => {
    const { queryByText } = render(<StatusIndicator title="test title" />);
    expect(queryByText(/test title/i)).toBeVisible();
  });

  test('should add children', () => {
    const { getByText } = render(
      <StatusIndicator>
        <span>test text</span>
      </StatusIndicator>
    );
    expect(getByText(/test text/i)).toBeVisible();
  });

  test('should add a `retry` object with a `label`', () => {
    const { queryByText } = render(
      <StatusIndicator
        retry={{
          label: 'test retry label',
          action: () => {},
        }}
      />
    );
    expect(queryByText(/test retry label/i)).toBeVisible();
  });

  test('should invoke onClick mock when `retry.action` is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <StatusIndicator
        retry={{
          label: 'test retry label',
          action: onClickMock,
        }}
      />
    );
    userEvent.click(getByText(/test retry label/i));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
