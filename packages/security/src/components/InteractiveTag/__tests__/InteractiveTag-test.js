/**
 * @file Interactive tag tests.
 * @copyright IBM Security 2019 - 2021
 */

import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import React from 'react';

import { InteractiveTag } from '../../..';
import { namespace } from '../InteractiveTag';

describe('InteractiveTag', () => {
  const dataTestId = 'dataTestId';

  test('has no accessibility violations', async () => {
    const { container } = render(
      <InteractiveTag removable>test tag</InteractiveTag>
    );

    await expect(container).toBeAccessible('InteractiveTag');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should add close button with `aria-label` when `removable` is `true`', () => {
    const { queryByLabelText } = render(
      <InteractiveTag removeBtnLabel="test label" removable>
        test tag
      </InteractiveTag>
    );
    expect(queryByLabelText(/test label/i)).toBeVisible();
  });

  test('should add children as tag content', () => {
    const { queryByText } = render(<InteractiveTag>test tag</InteractiveTag>);
    expect(queryByText(/test tag/i)).toBeVisible();
  });

  test('should add a custom class', () => {
    const { queryByTestId } = render(
      <InteractiveTag className="custom-class" data-testid={dataTestId}>
        test tag
      </InteractiveTag>
    );

    expect(queryByTestId(dataTestId)).toHaveClass('custom-class');
  });

  test('should add selected class when `isSelected` is `true`', () => {
    const { queryByTestId } = render(
      <InteractiveTag data-testid={dataTestId} isSelected>
        test tag
      </InteractiveTag>
    );

    expect(queryByTestId(dataTestId)).toHaveClass(`${namespace}--selected`);
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <InteractiveTag data-testid={dataTestId}>test tag</InteractiveTag>
    );

    expect(queryByTestId(dataTestId)).toBeInTheDocument();
  });

  test('should invoke remove mock when remove button is clicked', () => {
    const onRemoveMock = jest.fn();

    const { getByTitle } = render(
      <InteractiveTag
        onRemove={onRemoveMock}
        removable
        removeBtnLabel="test remove button">
        test tag
      </InteractiveTag>
    );

    userEvent.click(getByTitle('test remove button'));
    expect(onRemoveMock).toHaveBeenCalledTimes(1);
  });
});
