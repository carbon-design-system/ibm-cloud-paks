/**
 * @file Non Entitled Section tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { icon } from '../../_mocks_';
import { NonEntitledSection } from '../../..';

describe('NonEntitledSection', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <NonEntitledSection
        title="test title"
        subTitle="test subtitle"
        description="test description"
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
            icon,
          },
        ]}
      />
    );

    await expect(container).toBeAccessible('NonEntitledSection');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should apply a title via `title`', () => {
    const { queryByText } = render(
      <NonEntitledSection title="test title" subTitle="test subtitle" />
    );
    expect(queryByText(/test title/i)).toBeVisible();
  });

  test('should apply a subTitle via `subTitle`', () => {
    const { queryByText } = render(
      <NonEntitledSection title="test title" subTitle="test subtitle" />
    );
    expect(queryByText(/test subtitle/i)).toBeVisible();
  });

  test('should apply a description via `description`', () => {
    const { queryByText } = render(
      <NonEntitledSection
        title="test title"
        subTitle="test subtitle"
        description="test description"
      />
    );
    expect(queryByText(/test description/i)).toBeVisible();
  });

  test('should apply a link via `links` array of objects', () => {
    const { queryByText } = render(
      <NonEntitledSection
        title="test title"
        subTitle="test subtitle"
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

  test('should apply a custom background image to style attribute via `backgroundImage`', () => {
    const { container } = render(
      <NonEntitledSection
        title="test title"
        subTitle="test subtitle"
        backgroundImage="TEST-IMAGE"
      />
    );
    expect(container.firstElementChild).toHaveAttribute(
      'style',
      `background-image: url(TEST-IMAGE);`
    );
  });

  test('should apply a custom class name', () => {
    const { container } = render(
      <NonEntitledSection
        title="test title"
        subTitle="test subtitle"
        className="custom-class"
      />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  test('should add extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <NonEntitledSection
        title="test title"
        subTitle="test subtitle"
        data-testid="test-id"
      />
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });
});
