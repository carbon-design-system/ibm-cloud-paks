/**
 * @file Summary card tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';

import { SummaryCardAction } from '../../../..';

import { carbonPrefix } from '../../../../globals/namespace';

describe('SummaryCardAction', () => {
  test('should not be interactive when loading', () => {
    const { getByText } = render(
      <div>
        {/* This button is NOT interactive: */}
        <SummaryCardAction loading>test loading button</SummaryCardAction>
        {/* This button is interactive: */}
        <button>test example button</button>
      </div>
    );

    // Expect button to have `disabled` attribute:
    expect(getByText(/test loading button/i).closest('button')).toHaveAttribute(
      'disabled'
    );

    userEvent.tab();

    // Expect the loading button, listed first, not to be focussed:
    expect(getByText(/test loading button/i)).not.toHaveFocus();

    // Expect the example button, listed second, to be focussed:
    expect(getByText(/test example button/i)).toHaveFocus();

    userEvent.tab();
    userEvent.tab();

    // Expect the example button to still be focussed:
    expect(getByText(/test example button/i)).toHaveFocus();
  });

  test('should accept `expandedContent` and only show when activated', () => {
    const { getByText, queryByText, getByTestId } = render(
      <SummaryCardAction
        closeButtonIconDescription="test close button"
        expandedContent="test expanded action content"
        data-testid="test-button-id">
        test button
      </SummaryCardAction>
    );

    // Expect expanded content to NOT be in the document:
    expect(
      queryByText(/test expanded action content/i)
    ).not.toBeInTheDocument();

    // Expect `aria-expanded` attribute to be `false`:
    expect(getByTestId('test-button-id')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    // Click on the action button to show expanded content:
    userEvent.click(getByText('test button'));

    // Expect expanded content to be visible:
    expect(queryByText(/test expanded action content/i)).toBeVisible();

    // Expect `aria-expanded` attribute to be `true`:
    expect(getByTestId('test-button-id')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  test('should accept a custom class name', () => {
    const { container } = render(
      <SummaryCardAction className="custom-class" />
    );
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  test("should add a description to the expanded content's close button via `closeButtonIconDescription`", () => {
    const { getByText, getAllByLabelText } = render(
      <SummaryCardAction
        expandedContent="test content"
        closeButtonIconDescription="test icon label">
        test button
      </SummaryCardAction>
    );
    // Must open the expanded content to see the close button:
    userEvent.click(getByText('test button'));
    // Use `getAll*` & check for 2 occurances because the icon button
    // applies the label to its `title` and `aria-label` attributes:
    expect(getAllByLabelText(/test icon label/i).length).toBe(2);
  });

  test('should accept children', () => {
    const { queryByText } = render(
      <SummaryCardAction>test content</SummaryCardAction>
    );
    expect(queryByText(/test content/i)).toBeVisible();
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <SummaryCardAction data-testid="test-id" />
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });

  test('should apply assistive text and icon-only class name when `hasIconOnly` is `true`', () => {
    const { queryByText } = render(
      <SummaryCardAction iconDescription="test icon" hasIconOnly />
    );
    // Expect icon description to be applied as assistive text:
    expect(queryByText(/test icon/i)).toBeVisible();
    // Expect button to have Carbon's icon-only class:
    expect(queryByText(/test icon/i).closest('button')).toHaveClass(
      `${carbonPrefix}--btn--icon-only`
    );
  });

  test('should invoke click mock when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <SummaryCardAction onClick={onClickMock}>test content</SummaryCardAction>
    );
    userEvent.click(getByText(/test content/i));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
