/**
 * @file Summary card body tests.
 * @copyright IBM Security 2020
 */

import { render } from '@testing-library/react';
import React from 'react';

import { SummaryCardBody } from '../../../..';

describe('SummaryCardBody', () => {
  test('should accept a custom class name', () => {
    const { container } = render(
      <SummaryCardBody className="custom-class">test content</SummaryCardBody>
    );
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  test('should accept children', () => {
    const { getByText } = render(
      <SummaryCardBody>test content</SummaryCardBody>
    );
    expect(getByText('test content')).toBeVisible();
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <SummaryCardBody data-testid="test-id">test content</SummaryCardBody>
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
