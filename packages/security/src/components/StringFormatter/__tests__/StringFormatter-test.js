/**
 * @file String formatter tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { StringFormatter } from '../../..';
import { namespace } from '../StringFormatter';

describe('StringFormatter', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <StringFormatter
        value="This is a long test string that would normally be truncated."
        truncate
        lines={2}
        width="50px"
      />
    );

    await expect(container).toBeAccessible('StringFormatter');
    await expect(container).toHaveNoAxeViolations();
  });

  test('should add a custom class', () => {
    const { getByText } = render(
      <StringFormatter value="test content" className="custom-class" />
    );
    expect(getByText(/test content/i)).toHaveClass('custom-class');
  });

  test('should truncate text via the `truncate` prop', () => {
    const { container } = render(
      <StringFormatter value="test content" truncate />
    );
    expect(
      container.querySelector(`.${namespace}--truncate`)
    ).toHaveTextContent(/test content/i);
  });

  // Does not work:
  // test('should apply correct style attribute when `lines` provided', () => {
  //   const { getAllByText } = render(
  //     <StringFormatter value="test content" lines={4} />
  //   );
  //   expect(getAllByText(/test content/i)[0]).toHaveStyle('-webkit-link-clamp: 4');
  // });

  test('should apply correct style attribute when `width` provided', () => {
    const { getAllByText } = render(
      <StringFormatter value="test content" width="200px" />
    );
    expect(getAllByText(/test content/i)[0]).toHaveStyle('max-width: 200px;');
  });
});
