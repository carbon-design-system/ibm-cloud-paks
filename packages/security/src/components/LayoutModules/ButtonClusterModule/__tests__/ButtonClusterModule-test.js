/**
 * @file Button cluster module tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { ButtonClusterModule } from '../../../..';

const { name } = ButtonClusterModule;

describe(name, () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <ButtonClusterModule>{name}</ButtonClusterModule>
    );

    await expect(container).toBeAccessible(name);
    await expect(container).toHaveNoAxeViolations();
  });

  test(`adds content for the '${name}'`, () => {
    expect(
      render(<ButtonClusterModule>{name}</ButtonClusterModule>).getByText(name)
    ).toBeInTheDocument();
  });

  test('adds additional props to the containing node', () => {
    const dataTestId = 'dataTestId';

    expect(
      render(
        <ButtonClusterModule data-testid={dataTestId}>
          {name}
        </ButtonClusterModule>
      ).getByTestId(dataTestId)
    ).toBeInTheDocument();
  });
});
