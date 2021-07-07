/**
 * @file Accordion tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import { carbonPrefix } from '../../../globals/namespace';
import { Accordion, AccordionItem } from '../../..';

describe('Accordion', () => {
  test('has icon aligned at start by default', () => {
    expect(render(<Accordion />).container.firstChild).toHaveClass(
      `${carbonPrefix}--accordion--start`
    );
  });

  test('should pass custom class through spread attribute', () => {
    const { getByText } = render(
      <Accordion className="custom-class">
        <AccordionItem title="test title">test content</AccordionItem>
      </Accordion>
    );
    expect(getByText(/test title/i).closest('ul')).toHaveClass('custom-class');
  });
});
