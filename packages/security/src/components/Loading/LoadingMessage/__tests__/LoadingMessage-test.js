/**
 * @file Loading message tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { LoadingMessage } from '../../../..';

import { carbonPrefix } from '../../../../globals/namespace';

describe('LoadingMessage', () => {
  test('has no accessibility violations with overlay', async () => {
    const { container } = render(
      <LoadingMessage active withOverlay>
        test message
      </LoadingMessage>
    );

    await expect(container).toBeAccessible('LoadingMessage with overlay');
    await expect(container).toHaveNoAxeViolations();
  });

  test('has no accessibility violations without overlay', async () => {
    const { container } = render(
      <LoadingMessage active withOverlay={false}>
        test message
      </LoadingMessage>
    );

    await expect(container).toBeAccessible('LoadingMessage without overlay');
    await expect(container).toHaveNoAxeViolations();
  });

  test('has no accessibility violations when inactive', async () => {
    const { container } = render(
      <LoadingMessage active={false}>test message</LoadingMessage>
    );

    await expect(container).toBeAccessible('LoadingMessage when inactive');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should pass extra props through spread attribute', () => {
    const { queryByLabelText } = render(
      // `description` provides a custom label element
      // to the inner `Loading` component:
      <LoadingMessage description="test description" />
    );
    expect(queryByLabelText('test description')).toBeInTheDocument();
  });

  test('should show a custom loading message via `children`', () => {
    const { queryByText } = render(
      <LoadingMessage>test message</LoadingMessage>
    );
    expect(queryByText(/test message/i)).toBeVisible();
  });

  test('should apply a custom class', () => {
    const { getByText } = render(
      <LoadingMessage className="custom-class">test message</LoadingMessage>
    );
    expect(getByText(/test message/i)).toHaveClass('custom-class');
  });

  test('should render a small loading icon when `small` is `true`', () => {
    render(<LoadingMessage small>test message</LoadingMessage>);
    expect(document.querySelector(`.${carbonPrefix}--loading`)).toHaveClass(
      `${carbonPrefix}--loading--small`
    );
  });

  test('should render an animated icon without any "stop" classes when `active` is `true`', () => {
    render(<LoadingMessage active>test message</LoadingMessage>);
    // The "stop" class should NOT be applied to the inner loading component:
    expect(document.querySelector(`.${carbonPrefix}--loading`)).not.toHaveClass(
      `${carbonPrefix}--loading--stop`
    );
    // The "stop" class should NOT applied to the overlay:
    expect(
      document.querySelector(`.${carbonPrefix}--loading-overlay`)
    ).not.toHaveClass(`${carbonPrefix}--loading-overlay--stop`);
  });

  test('should add the correct "stop" classes when `active` is `false`', () => {
    render(<LoadingMessage active={false}>test message</LoadingMessage>);
    // The "stop" class applied to the inner loading component:
    expect(document.querySelector(`.${carbonPrefix}--loading`)).toHaveClass(
      `${carbonPrefix}--loading--stop`
    );
    // The "stop" class applied to the overlay:
    expect(
      document.querySelector(`.${carbonPrefix}--loading-overlay`)
    ).toHaveClass(`${carbonPrefix}--loading-overlay--stop`);
  });
});
