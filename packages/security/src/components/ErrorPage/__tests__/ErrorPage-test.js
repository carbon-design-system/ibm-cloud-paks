/**
 * @file ErrorPage Section tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { ErrorPage } from '../../..';

describe('ErrorPage', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <ErrorPage
        statusCode={404}
        title="test title"
        errorName="test error name"
        errorMessage="test error mesage"
        links={[
          {
            id: 'test-link-1',
            text: 'test link 1',
            href: '#',
          },
          {
            id: 'test-link-2',
            text: 'test link 2',
            href: '#',
          },
        ]}
      />
    );

    await expect(container).toBeAccessible('ErrorPage');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should apply a title via `title`', () => {
    const { queryByText } = render(<ErrorPage title="test title" />);
    expect(queryByText(/test title/i)).toBeVisible();
  });

  test('should apply an error name via `errorName`', () => {
    const { queryByText } = render(<ErrorPage errorName="test error name" />);
    expect(queryByText(/test error name/i)).toBeVisible();
  });

  test('should apply an error message via `errorMessage`', () => {
    const { queryByText } = render(<ErrorPage errorMessage="test title" />);
    expect(queryByText(/test title/i)).toBeVisible();
  });

  test('should apply a custom background image to style attribute via `backgroundImage`', () => {
    const { container } = render(
      <ErrorPage statusCode={401} backgroundImage="url(TEST-IMAGE)" />
    );
    expect(container.firstElementChild).toHaveAttribute(
      'style',
      `background-image: url(TEST-IMAGE);`
    );
  });

  test('should apply an accepted status code via `statusCode` and include it in the title', () => {
    const { queryByText } = render(<ErrorPage statusCode={404} />);
    expect(queryByText('404')).toBeVisible();
  });

  test('should apply a link via `links` array of objects', () => {
    const { queryByText } = render(
      <ErrorPage
        links={[
          {
            id: 'test-link',
            text: 'test link',
            href: '#',
          },
        ]}
      />
    );
    expect(queryByText(/test link/i)).toBeVisible();
  });

  test('should accept a custom class', () => {
    const { container } = render(<ErrorPage className="custom-class" />);
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  test('should accept extra props via spread attribute', () => {
    const { queryByTestId } = render(<ErrorPage data-testid="test-id" />);
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
