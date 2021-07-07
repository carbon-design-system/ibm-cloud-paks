/**
 * @file Card skeleton tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { CardSkeleton } from '../../../..';

describe('CardSkeleton', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<CardSkeleton />);

    await expect(container).toBeAccessible('CardSkeleton');
    await expect(container).toHaveNoAxeViolations();
  });
});
