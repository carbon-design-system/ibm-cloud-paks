/**
 * @file Summary card skeleton tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { SummaryCardSkeleton } from '../../../..';

describe('SummaryCardSkeleton', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<SummaryCardSkeleton />);

    await expect(container).toBeAccessible('SummaryCardSkeleton');
    await expect(container).toHaveNoAxeViolations();
  });

  test('adds a class to the containing node', () => {
    const className = 'className';

    expect(
      render(
        <SummaryCardSkeleton className={className} />
      ).container.querySelector(`.${className}`)
    ).toBeInTheDocument();
  });

  test('adds additional props to the containing node', () => {
    const dataTestId = 'dataTestId';

    expect(
      render(<SummaryCardSkeleton data-testid={dataTestId} />).getByTestId(
        dataTestId
      )
    ).toBeInTheDocument();
  });
});
