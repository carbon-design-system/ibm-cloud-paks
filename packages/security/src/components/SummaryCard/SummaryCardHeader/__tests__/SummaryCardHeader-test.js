/**
 * @file Summary card header tests.
 * @copyright IBM Security 2020
 */

import { render } from '@testing-library/react';
import React from 'react';

import { SummaryCardHeader } from '../../../..';

describe('SummaryCardHeader', () => {
  test('should accept a custom class name', () => {
    const { container } = render(
      <SummaryCardHeader title="test title" className="custom-class" />
    );
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  test('should accept a title', () => {
    const { getByText } = render(<SummaryCardHeader title="test title" />);
    expect(getByText('test title')).toBeVisible();
  });

  test('should accept a status as a `node`', () => {
    const { getByText } = render(
      <SummaryCardHeader title="test title" status={<span>test status</span>} />
    );
    expect(getByText('test status')).toBeVisible();
  });

  test('should truncate `title` content when `truncate` is `true`', () => {
    const { getAllByText } = render(
      <SummaryCardHeader title="test title" truncate />
    );
    expect(getAllByText('test title').length).toBe(2);
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <SummaryCardHeader data-testid="test-id" title="test title" />
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
