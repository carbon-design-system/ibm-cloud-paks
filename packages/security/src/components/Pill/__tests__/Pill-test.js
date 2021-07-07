/**
 * @file Pill tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Pill } from '../../..';
import { namespace } from '../Pill';

describe('Pill', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<Pill value="127.0.0.1" type="IP" />);

    await expect(container).toBeAccessible('Pill');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should add a custom class', () => {
    const { getByText } = render(
      <Pill value="127.0.0.1" type="IP" className="custom-class" />
    );
    expect(getByText(/127.0.0.1/i).parentNode).toHaveClass('custom-class');
  });

  test('should apply `value`', () => {
    const { getByText } = render(<Pill value="127.0.0.1" type="IP" />);
    expect(getByText(/127.0.0.1/i)).toBeVisible();
  });

  test('should apply `type`', () => {
    const { getByText } = render(
      <Pill value="127.0.0.1" type="IP" className="custom-class" />
    );
    expect(getByText(/IP/i)).toBeVisible();
  });

  test('should be inline when `inline` is set to `true`', () => {
    const { container } = render(<Pill value="127.0.0.1" type="IP" inline />);
    expect(container.firstElementChild).toHaveClass(`${namespace}--inline`);
  });

  test('should not have an icon', () => {
    const { container } = render(<Pill value="127.0.0.1" type="IP" />);
    expect(container.querySelector('svg')).toBe(null);
  });

  test('should be inert and non-interactive', () => {
    const { getByText } = render(
      <div>
        <Pill value="127.0.0.1" type="IP" />
        <button>test button</button>
      </div>
    );
    userEvent.tab();
    // Expect only the extra test button to be interactive:
    expect(getByText(/127.0.0.1/i).parentNode).not.toHaveFocus();
    expect(getByText(/test button/i)).toHaveFocus();
  });
});
