/**
 * @file Card tests.
 * @copyright IBM Security 2020 - 2021
 */

import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import React from 'react';

import { Card } from '../../..';

import { icon } from '../../_mocks_';

describe('Card2', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <Card
        header={{
          image: icon,
          tag: 'test tag',
          title: 'test title',
        }}
        label="test label"
        body={{
          text: 'test content',
        }}
        footer={{
          children: <span>test footer</span>,
        }}
      />
    );

    await expect(container).toBeAccessible('Card');
    await expect(container).toHaveNoAxeViolations();
  });

  test('has no accessibility violations when rendered as a link', async () => {
    const { container } = render(
      <Card
        header={{
          title: 'test title',
        }}
        link="#"
      />
    );

    await expect(container).toBeAccessible('Card as a link');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should invoke click mock when card is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Card
        header={{
          title: 'test title',
        }}
        link="#"
        onClick={onClickMock}
      />
    );

    userEvent.click(getByText(/test title/i));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('should add custom class', () => {
    const { getByText } = render(
      <Card
        header={{
          title: 'test title',
        }}
        className="custom-class"
      />
    );
    expect(getByText(/test title/i).parentNode.parentNode).toHaveClass(
      'custom-class'
    );
  });

  test('should apply a header with an image, tag, and title', () => {
    const { container, queryByText } = render(
      <Card
        header={{
          image: 'test-image',
          tag: 'test tag',
          title: 'test title',
        }}
      />
    );
    expect(container.querySelector('img')).toHaveAttribute('src', 'test-image');
    expect(queryByText('test title')).toBeVisible();
    expect(queryByText('test tag')).toBeVisible();
  });

  test('should apply alt text to the header image via the `label` prop', () => {
    const { queryByAltText } = render(
      <Card
        header={{
          image: 'test-image',
          title: 'test title',
        }}
        label="test label"
      />
    );
    expect(queryByAltText('test label')).toBeVisible();
  });

  test('should apply aria-label via the `label` prop if `link` is `true`', () => {
    const { queryByLabelText } = render(
      <Card
        header={{
          title: 'test title',
        }}
        label="test label"
        link="#"
      />
    );
    expect(queryByLabelText('test label')).toBeVisible();
  });

  test('should apply a footer', () => {
    const { queryByText } = render(
      <Card
        header={{
          title: 'test title',
        }}
        footer={{
          children: <span>test footer</span>,
        }}
      />
    );
    expect(queryByText('test footer')).toBeVisible();
  });

  test('should apply a body', () => {
    const { queryByText } = render(
      <Card
        header={{
          title: 'test title',
        }}
        body={{
          text: 'test content',
        }}
      />
    );
    expect(queryByText('test content')).toBeVisible();
  });

  test('should render as a `div` by default if no `link` prop is provided', () => {
    const { container } = render(
      <Card
        header={{
          title: 'test title',
        }}
      />
    );
    expect(container.firstElementChild.nodeName).toBe('DIV');
  });

  test('should render as an `a` element when a `link` is provided', () => {
    const { container } = render(
      <Card
        header={{
          title: 'test title',
        }}
        link="#"
      />
    );
    expect(container.firstElementChild.nodeName).toBe('A');
  });

  test('should render children', () => {
    const { getByText } = render(
      <Card
        header={{
          title: 'test title',
        }}
        link="#">
        <span>test content</span>
      </Card>
    );

    expect(getByText('test content')).toBeVisible();
  });
});
