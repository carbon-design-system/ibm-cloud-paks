/**
 * @file Status icon tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import StatusIcon, { namespace, STATUS, SIZE } from '../StatusIcon';

import { carbonPrefix } from '../../../globals/namespace';

describe('StatusIcon', () => {
  STATUS.forEach((status) =>
    test(`has no accessibility violations when \`status\` is  '${status}'`, async () => {
      const { container } = render(
        <StatusIcon status={status} message="test message" />
      );

      await expect(container).toBeAccessible(
        `StatusIcon with ${status} status`
      );

      await expect(container).toHaveNoAxeViolations();
    })
  );

  test('has no accessibility violations when `status` is  `undefined`', async () => {
    const { container } = render(<StatusIcon message="test message" />);

    await expect(container).toBeAccessible(
      'StatusIcon with `undefined` status'
    );

    await expect(container).toHaveNoAxeViolations();
  });

  SIZE.forEach((size) =>
    test(`should apply correct class when \`size\` is  '${size}'`, () => {
      render(<StatusIcon size={size} />);
      expect(document.querySelector(`.${namespace}`)).toHaveClass(
        `${namespace}--${size}`
      );
    })
  );

  STATUS.forEach((status) => {
    if (status === 'complete') {
      test('should render with correct class and an icon when `status` is `complete`', () => {
        render(<StatusIcon status={status} />);
        expect(document.querySelector(`.${namespace}__icon`)).toHaveClass(
          `${namespace}__icon--success`
        );
      });
    } else {
      test(`should apply correct class when \`status\` is  '${status}'`, () => {
        render(<StatusIcon status={status} />);
        expect(
          document.querySelector(`.${namespace}__icon--color`)
        ).toHaveClass(`${namespace}__icon--color--${status}`);
      });
    }
  });

  test('should render a loading icon when `status` is `undefined`', () => {
    render(<StatusIcon />);
    expect(document.querySelector(`.${carbonPrefix}--loading`)).toBeVisible();
  });

  test('should add a custom class', () => {
    render(<StatusIcon className="custom-class" />);
    expect(document.querySelector(`.${namespace}`)).toHaveClass('custom-class');
  });

  test('should add a message', () => {
    const { queryByText } = render(<StatusIcon message="test message" />);
    expect(queryByText(/test message/i)).toBeVisible();
  });

  test('should add an aria label', () => {
    const { queryByLabelText } = render(
      <StatusIcon iconDescription="has aria" message="test message" />
    );
    expect(queryByLabelText(/has aria/i)).toBeVisible();
  });
});
