/**
 * @file Status step tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { StatusStep } from '../../../..';

import { STATUS } from '../StatusStep';

describe('StatusStep', () => {
  Object.values(STATUS).forEach((status) =>
    test(`has no accessibility violations when \`status\` is  '${status}'`, async () => {
      const { container } = render(
        <ul>
          <StatusStep
            label="test-label"
            status={status}
            errorMsg="test error"
            description="test description"
          />
        </ul>
      );

      await expect(container).toBeAccessible(
        `StatusStep with ${status} status`
      );

      await expect(container).toHaveNoAxeViolations();
    })
  );

  test('should add a custom class', () => {
    render(
      <StatusStep
        className="custom-class"
        label="test-label"
        description="test description"
      />
    );
    expect(document.querySelector('.custom-class')).toBeVisible();
  });

  test('should add an error message when `status` is `FAILED`', () => {
    const { queryByText } = render(
      <StatusStep
        status={STATUS.FAILED}
        errorMsg="test error"
        label="test-label"
        description="test description"
      />
    );
    expect(queryByText(/test error/i)).toBeVisible();
  });

  test('should not add an error message when `status` is not `FAILED`', () => {
    const { queryByText } = render(
      <StatusStep
        errorMsg="test error"
        label="test-label"
        description="test description"
      />
    );
    expect(queryByText(/test error/i)).not.toBeInTheDocument();
  });

  test('should add a description', () => {
    const { getByText } = render(
      <StatusStep label="test-label" description="test description" />
    );
    expect(getByText(/test description/i)).toBeVisible();
  });
});
