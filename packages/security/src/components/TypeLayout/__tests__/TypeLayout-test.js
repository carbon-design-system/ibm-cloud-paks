/**
 * @file Type layout tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import {
  TypeLayout,
  TypeLayoutBody,
  TypeLayoutRow,
  TypeLayoutCell,
} from '../../..';

import { namespace } from '../TypeLayout';

const sizes = ['xs', 'sm', 'md', 'lg'];

describe('TypeLayout', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <TypeLayout>
        <TypeLayoutBody>
          <TypeLayoutRow>
            <TypeLayoutCell>test cell title 1</TypeLayoutCell>
            <TypeLayoutCell>test cell content 1</TypeLayoutCell>
          </TypeLayoutRow>
          <TypeLayoutRow>
            <TypeLayoutCell>test cell title 2</TypeLayoutCell>
            <TypeLayoutCell>test cell content 2</TypeLayoutCell>
          </TypeLayoutRow>
        </TypeLayoutBody>
      </TypeLayout>
    );

    await expect(container).toBeAccessible('TypeLayout');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should add a custom class to each component', () => {
    const { getByText } = render(
      <TypeLayout className="custom-layout-class">
        <TypeLayoutBody className="custom-body-class">
          <TypeLayoutRow className="custom-row-class">
            <TypeLayoutCell className="custom-cell-class">
              test cell
            </TypeLayoutCell>
          </TypeLayoutRow>
        </TypeLayoutBody>
      </TypeLayout>
    );
    const cell = getByText(/test cell/i);
    expect(cell).toHaveClass('custom-cell-class');
    // Row class:
    expect(cell.parentNode).toHaveClass('custom-row-class');
    // Body class:
    expect(cell.parentNode.parentNode).toHaveClass('custom-body-class');
    // Layout wrapper class:
    expect(cell.parentNode.parentNode.parentNode).toHaveClass(
      'custom-layout-class'
    );
  });

  test('should pass through extra props via spread attribute', () => {
    const { queryByTestId } = render(
      <TypeLayout data-testid="layout-test-id">
        <TypeLayoutBody data-testid="body-test-id">
          <TypeLayoutRow data-testid="row-test-id">
            <TypeLayoutCell data-testid="cell-test-id">
              test cell
            </TypeLayoutCell>
          </TypeLayoutRow>
        </TypeLayoutBody>
      </TypeLayout>
    );
    expect(queryByTestId('layout-test-id')).toBeInTheDocument();
    expect(queryByTestId('body-test-id')).toBeInTheDocument();
    expect(queryByTestId('row-test-id')).toBeInTheDocument();
    expect(queryByTestId('cell-test-id')).toBeInTheDocument();
  });

  test('should apply `children` for each component', () => {
    const { queryByTestId } = render(
      <TypeLayout data-testid="layout-test-id">
        <TypeLayoutBody data-testid="body-test-id">
          <TypeLayoutRow data-testid="row-test-id">
            <TypeLayoutCell data-testid="cell-test-id">
              test cell
            </TypeLayoutCell>
          </TypeLayoutRow>
        </TypeLayoutBody>
      </TypeLayout>
    );
    expect(queryByTestId('layout-test-id').hasChildNodes).toBeTruthy();
    expect(queryByTestId('body-test-id').hasChildNodes).toBeTruthy();
    expect(queryByTestId('row-test-id').hasChildNodes).toBeTruthy();
    expect(queryByTestId('cell-test-id').hasChildNodes).toBeTruthy();
  });

  test('should apply correct class when `border` is `true`', () => {
    const { container } = render(<TypeLayout data-testid="test-id" border />);
    expect(container.firstElementChild).toHaveClass(`${namespace}--bordered`);
  });

  sizes.forEach((size) =>
    test(`should apply correct class when \`size\` is set to '${size}'`, () => {
      const { container } = render(<TypeLayout size={size} />);
      expect(container.firstElementChild).toHaveClass(`${namespace}--${size}`);
    })
  );
});
