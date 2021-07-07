/**
 * @file Button tests.
 * @copyright IBM Security 2020 - 2021
 */

import { Add16 } from '@carbon/icons-react';
import { render } from '@testing-library/react';

import { ButtonKinds } from 'carbon-components-react/es/prop-types/types';
import React from 'react';

import { Button } from '../../..';
import { carbonPrefix } from '../../../globals/namespace';
import { namespace } from '../Button';

describe('Button', () => {
  test('has no accessibility violations when `loading`', async () => {
    const { container } = render(
      <Button loading iconDescription="test button icon description">
        test loading button
      </Button>
    );

    await expect(container).toBeAccessible('Button that is loading');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should add custom class', () => {
    const { getByText } = render(
      <Button className="custom-class">test button</Button>
    );
    expect(getByText(/test button/i)).toHaveClass('custom-class');
  });

  test('should pass custom icon description to inner `InlineLoading` when button is `loading`', () => {
    const { queryByLabelText } = render(
      <Button loading iconDescription="test button icon description">
        test loading button
      </Button>
    );
    expect(
      queryByLabelText(/test button icon description/i)
    ).toBeInTheDocument();
  });

  test('should apply `disabled` state', () => {
    const { getByText } = render(<Button disabled>test loading button</Button>);
    expect(getByText(/test loading button/i)).toHaveAttribute('disabled');
    expect(getByText(/test loading button/i)).toHaveClass(
      `${carbonPrefix}--btn--disabled`
    );
  });

  test('should set button to `ghost` kind when it is `loading`', () => {
    const { getByText } = render(<Button loading>test loading button</Button>);
    expect(getByText(/test loading button/i)).toHaveClass(
      `${carbonPrefix}--btn--ghost`
    );
  });

  ButtonKinds.forEach((kind) => {
    if (kind !== 'ghost-danger') {
      test(`should add correct class when \`kind\` is ${kind}`, () => {
        const { getByText } = render(<Button kind={kind}>test button</Button>);
        expect(getByText(/test button/i)).toHaveClass(
          `${carbonPrefix}--btn--${kind}`
        );
      });
    }
  });

  test('should add correct classes when `kind` set to `ghost-danger`', () => {
    const { getByText } = render(
      <Button kind="ghost-danger">test button</Button>
    );
    expect(getByText(/test button/i)).toHaveClass(
      `${carbonPrefix}--btn--ghost ${namespace}--ghost-danger`
    );
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <Button data-testid="test-id">test button</Button>
    );
    expect(queryByTestId('test-id')).toBeVisible();
  });

  test('should add a custom icon via `renderIcon` prop', () => {
    const { container } = render(
      <Button renderIcon={Add16}>test button</Button>
    );
    expect(container.querySelector('svg')).toBeVisible();
  });

  test('should apply correct class when `size` is `small`', () => {
    const { getByText } = render(<Button size="small">test button</Button>);
    expect(getByText(/test button/i)).toHaveClass(`${carbonPrefix}--btn--sm`);
  });

  test('should apply correct class when `size` is `large`', () => {
    const { getByText } = render(<Button size="large">test button</Button>);
    expect(getByText(/test button/i)).toHaveClass(`${carbonPrefix}--btn--lg`);
  });

  // TODO: `2.x` - Remove test for deprecated prop `largeText`.
  test('should apply correct large class when `largeText` is `true`', () => {
    const { getByText } = render(<Button largeText>test button</Button>);
    expect(getByText(/test button/i)).toHaveClass(`${carbonPrefix}--btn--lg`);
  });
});
