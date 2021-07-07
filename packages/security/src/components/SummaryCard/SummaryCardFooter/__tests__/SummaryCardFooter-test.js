/**
 * @file Summary card footer tests.
 * @copyright IBM Security 2020
 */

import { render } from '@testing-library/react';
import React from 'react';

import { SummaryCardFooter } from '../../../..';

describe('SummaryCardFooter', () => {
  test('should accept a custom class name', () => {
    const { container } = render(
      <SummaryCardFooter className="custom-class">
        test content
      </SummaryCardFooter>
    );
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  test('should accept children', () => {
    const { getByText } = render(
      <SummaryCardFooter>test content</SummaryCardFooter>
    );
    expect(getByText('test content')).toBeVisible();
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <SummaryCardFooter data-testid="test-id">test content</SummaryCardFooter>
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
