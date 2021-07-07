/**
 * @file Trending card tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { TrendingCard } from '../../..';

describe('TrendingCard', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <TrendingCard
        // Use an empty `href` to avoid misdirected Axe "skip-link" violation:
        href="#"
        title="test title"
        subtitle={<span>test subtitle</span>}
      />
    );

    await expect(container).toBeAccessible('TrendingCard');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should accept a custom element', () => {
    const { getByText } = render(
      <TrendingCard
        title="test title"
        className="test-trending-card-class"
        element="button"
      />
    );

    // Expect trending card to be rendered with a `button` instead of the default `a`:
    expect(getByText(/test title/i).closest('button')).toBeVisible();
  });

  test('should apply a title via `title`', () => {
    const { queryByText } = render(<TrendingCard title="test title" />);
    expect(queryByText(/test title/i)).toBeVisible();
  });

  test('should apply a subtitle via `subtitle`', () => {
    const { queryByText } = render(
      <TrendingCard title="test title" subtitle="test subtitle" />
    );
    expect(queryByText(/test subtitle/i)).toBeVisible();
  });

  test('should apply a custom class name', () => {
    const { queryByText } = render(
      <TrendingCard title="test title" className="custom-class" />
    );
    expect(queryByText(/test title/i).closest('a')).toHaveClass('custom-class');
  });

  test('should add extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <TrendingCard title="test title" data-testid="test-id" />
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
