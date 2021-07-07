/**
 * @file Step indicator tests.
 * @copyright IBM Security 2020 - 2021
 */

import React from 'react';
import { render } from '@testing-library/react';

import { Step } from '../../..';

import { carbonPrefix } from '../../../globals/namespace';

describe('Step', () => {
  test('should add a custom class', () => {
    render(<Step label="test label" className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeVisible();
  });

  test('should apply a label', () => {
    const { getByText } = render(<Step label="test label" />);
    expect(getByText(/test label/i)).toBeVisible();
  });

  test('should apply a description as a `title` to the inner svg', () => {
    const { getByTitle } = render(
      <Step label="test label" description="test description" />
    );
    // Titles aren't visible, so we must check if it's in the document:
    expect(getByTitle(/test description/i)).toBeInTheDocument();
  });

  test('should apply correct class when `disabled` is `true`', () => {
    const { getByText } = render(<Step label="test label" disabled />);
    // "disabled" steps are marked with an "incomplete" class on the `li`
    // and `unclickable` class on the inner `button`:
    expect(getByText(/test label/i).closest('li')).toHaveClass(
      `${carbonPrefix}--progress-step--disabled`
    );
    expect(getByText(/test label/i).closest('button')).toHaveClass(
      `${carbonPrefix}--progress-step-button--unclickable`
    );
  });

  test('should apply correct class when `current` is `true`', () => {
    const { getByText } = render(<Step label="test label" current />);
    expect(getByText(/test label/i).closest('li')).toHaveClass(
      `${carbonPrefix}--progress-step--current`
    );
  });

  test('should apply correct class when `complete` is `true`', () => {
    const { getByText } = render(<Step label="test label" complete />);
    expect(getByText(/test label/i).closest('li')).toHaveClass(
      `${carbonPrefix}--progress-step--complete`
    );
  });

  test('should apply correct class when `invalid` is `true`', () => {
    const { getByText } = render(<Step label="test label" invalid />);
    // "invalid" steps are marked with an "incomplete" class on the `li`
    // and `unclickable` class on the inner `button`:
    expect(getByText(/test label/i).closest('li')).toHaveClass(
      `${carbonPrefix}--progress-step--incomplete`
    );
    expect(getByText(/test label/i).closest('button')).toHaveClass(
      `${carbonPrefix}--progress-step-button--unclickable`
    );
  });
});
