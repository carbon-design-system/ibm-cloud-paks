/**
 * @file Important Content Area (ICA) skeleton tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import ICASkeleton from '../ICASkeleton';

describe('ICASkeleton', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<ICASkeleton />);

    await expect(container).toBeAccessible('ICASkeleton');
    await expect(container).toHaveNoAxeViolations();
  });
});
