/**
 * @file Summary card select tests.
 * @copyright IBM Security 2019
 */

import { render } from '@testing-library/react';
import React from 'react';

import { SummaryCardSelect } from '../../../..';

describe('SummaryCardSelect', () => {
  test('should accept a custom class', () => {
    render(
      <SummaryCardSelect
        id="test-summary-select"
        labelText="test select"
        className="custom-class"
      />
    );
    expect(document.querySelector('label')).toHaveClass('custom-class');
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <SummaryCardSelect
        id="test-summary-select"
        labelText="test select"
        data-testid="test-id"
      />
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
