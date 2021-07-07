/**
 * @file Time indicator tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { TimeIndicator } from '../../..';

describe('TimeIndicator', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<TimeIndicator>test content</TimeIndicator>);

    await expect(container).toBeAccessible('TimeIndicator');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should add custom class', () => {
    const { getByText } = render(
      <TimeIndicator className="custom-class">test content</TimeIndicator>
    );
    expect(getByText(/test content/i)).toHaveClass('custom-class');
  });

  test('should pass extra props through spread attribute', () => {
    const { queryByTestId } = render(
      <TimeIndicator data-testid="test-id">test content</TimeIndicator>
    );
    expect(queryByTestId('test-id')).toBeInTheDocument();
  });
});
