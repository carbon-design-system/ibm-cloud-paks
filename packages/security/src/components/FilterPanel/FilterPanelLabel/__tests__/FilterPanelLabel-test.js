/**
 * @file Filter panel label tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import FilterPanelLabel from '../FilterPanelLabel';

describe('FilterPanelLabel', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <FilterPanelLabel count={100}>custom label</FilterPanelLabel>
    );

    await expect(container).toBeAccessible('FilterPanelGroup');
    await expect(container).toHaveNoAxeViolations();
  });

  test('renders with children', () => {
    const { getByText } = render(
      <FilterPanelLabel>custom label</FilterPanelLabel>
    );
    expect(getByText(/custom label/i)).toBeVisible();
  });

  test('renders with a heading node', () => {
    const { getByTestId } = render(
      <FilterPanelLabel>
        <span data-testid="node-label" />
      </FilterPanelLabel>
    );
    expect(getByTestId('node-label')).toBeVisible();
  });

  test('renders with count', () => {
    const { container } = render(<FilterPanelLabel count={10} />);
    expect(container).toHaveTextContent('10');
  });

  test('renders with a 0 count', () => {
    const { container } = render(<FilterPanelLabel count={0} />);
    expect(container).toHaveTextContent('0');
  });

  test('adds custom count label', () => {
    const { getByLabelText } = render(
      <FilterPanelLabel
        count={100}
        countLabel={(count) => `${count} chickens`}
      />
    );
    expect(getByLabelText(/\(100 chickens\)/i)).toHaveTextContent('100');
  });

  test('adds custom class name', () => {
    const { container } = render(<FilterPanelLabel className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  test('adds custom count class name', () => {
    const { container } = render(
      <FilterPanelLabel countClassName="custom-class" count={10} />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
