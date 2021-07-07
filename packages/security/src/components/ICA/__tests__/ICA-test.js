/**
 * @file Important content area tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { ICA } from '../../..';
import { Locales } from '../ICA';

describe('ICA', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<ICA label="test ICA" total={10} value={5} />);

    await expect(container).toBeAccessible('ICA');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should render en dash when `value` is `null`', () => {
    const { queryByText } = render(<ICA label="test ICA" value={null} />);
    expect(queryByText('–')).toBeVisible();
  });

  test('should render a large value', () => {
    const { queryByText } = render(<ICA label="test ICA" value={1000000} />);
    expect(queryByText('1.0m')).toBeVisible();
  });

  test('should render a subset of values when `value` and `total` are provided', () => {
    const { queryByText } = render(
      <ICA label="test ICA" value={5} total={10} />
    );
    expect(queryByText('5')).toBeVisible();
    expect(queryByText(/10/i)).toBeVisible();
  });

  test('should not render subset of values when `total` is close to `value`', () => {
    const { queryByText } = render(
      <ICA label="test ICA" value={1000000} total={999995} />
    );
    expect(queryByText('999995')).not.toBeInTheDocument();
    expect(queryByText('1.0m')).toBeVisible();
  });

  test('should not render `total` if it is the same as `value`', () => {
    const { queryAllByText } = render(
      <ICA label="test ICA" value={10} total={10} />
    );
    // Should display 1 occurance of `10` (the value):
    expect(queryAllByText(/10/i).length).toBe(1);
  });

  test('should render `total` when forced', () => {
    const { queryAllByText } = render(
      <ICA label="test ICA" value={10} total={10} forceShowTotal />
    );
    // Should display 2 occurances of `10` (the value & the total):
    expect(queryAllByText(/10/i).length).toBe(2);
  });

  test('should not truncate when forced', () => {
    const value = 1000;

    expect(
      render(<ICA label="ICA" truncate={false} value={value} />).getByText(
        `${value}`
      )
    ).toBeInTheDocument();
  });

  test('should render a percentage', () => {
    const { queryByText } = render(
      <ICA label="test ICA" value={10} percentage />
    );
    expect(queryByText('%')).toBeVisible();
  });

  Locales.forEach((locale) =>
    test(`should accept '${locale}' locale`, () => {
      const { container } = render(
        <ICA label="test ICA" value={10} locale={locale} />
      );
      expect(() => container).not.toThrow();
    })
  );
});
