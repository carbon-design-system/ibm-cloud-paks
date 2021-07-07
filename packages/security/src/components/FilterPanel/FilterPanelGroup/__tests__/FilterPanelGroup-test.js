/**
 * @file Filter panel group tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import FilterPanelGroup from '../FilterPanelGroup';

describe('FilterPanelGroup', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <FilterPanelGroup heading="test filter group" title="test title" />
    );

    await expect(container).toBeAccessible('FilterPanelGroup');
    await expect(container).toHaveNoAxeViolations();
  });

  test('renders with a title attribute', () => {
    const { getByTitle } = render(<FilterPanelGroup title="custom title" />);
    expect(getByTitle(/custom title/i)).toBeVisible();
  });

  test('renders a title inside the label as a node if a heading node is not provided', () => {
    const { queryByText } = render(<FilterPanelGroup title="title" />);
    expect(queryByText(/title/)).toBeVisible();
  });

  test('renders with a heading node', () => {
    const { getByTestId } = render(
      <FilterPanelGroup heading={<span data-testid="node-title" />} />
    );
    expect(getByTestId('node-title')).toBeVisible();
  });

  test('renders with content', () => {
    const { getByTestId } = render(
      <FilterPanelGroup>
        <div data-testid="content" />
      </FilterPanelGroup>
    );
    expect(getByTestId('content')).toBeVisible();
  });

  test('does not render the count if the heading or title are not provided', () => {
    const { queryByText } = render(<FilterPanelGroup count={200} />);
    expect(queryByText(/200/)).not.toBeInTheDocument();
  });

  test('renders the count if the title is also provided', () => {
    const { queryByText } = render(
      <FilterPanelGroup title="title" count={200} />
    );
    expect(queryByText(/200/)).toBeVisible();
  });

  test('renders the count if the heading is also provided', () => {
    const { queryByText } = render(
      <FilterPanelGroup heading="title" count={200} />
    );
    expect(queryByText(/200/)).toBeVisible();
  });

  test('adds custom class name', () => {
    const { container } = render(<FilterPanelGroup className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
