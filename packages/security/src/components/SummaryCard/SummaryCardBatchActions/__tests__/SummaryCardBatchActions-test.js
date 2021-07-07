/**
 * @file Summary card batch actions tests.
 * @copyright IBM Security 2020
 */

import { render } from '@testing-library/react';
import React from 'react';

import { SummaryCardBatchActions } from '../../../..';

describe('SummaryCardBatchActions', () => {
  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <SummaryCardBatchActions
        data-testid="test-id"
        onCancel={() => {}}
        totalSelected={0}
      />
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
