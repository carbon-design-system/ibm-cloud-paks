/**
 * @file Filter panel accordion item tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import React from 'react';

import FilterPanelAccordionItem from '../FilterPanelAccordiontItem';

/**
 * Creates an array of basic children for testing truncation of component.
 * @param {number} length Amount of children to create.
 * @returns {React.Component[]} Array of created children.
 */
const createChildChildren = (length) =>
  new Array(length).fill(null).map((value, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index} data-testid={`child-${index + 1}`}>
      child {index + 1}
    </div>
  ));

describe('FilterPanelAccordionItem', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      // `FilterPanelAccordionItem` would be
      // wrapped by `FilterPanelAccordion`, which
      // renders as an unordered list:
      <ul>
        <FilterPanelAccordionItem heading="test-item-1" title="test-item-1">
          {createChildChildren(11)}
        </FilterPanelAccordionItem>
        <FilterPanelAccordionItem heading="test-item-2" title="test-item-2">
          {createChildChildren(11)}
        </FilterPanelAccordionItem>
      </ul>
    );

    await expect(container).toBeAccessible('FilterPanelAccordionItem');
    await expect(container).toHaveNoAxeViolations();
  });

  test('renders with a title attribute', () => {
    const { getByTitle } = render(
      <FilterPanelAccordionItem title="custom title" />
    );
    expect(getByTitle(/custom title/i)).toBeVisible();
  });

  test('renders with a heading node', () => {
    const { getByTestId } = render(
      <FilterPanelAccordionItem heading={<span data-testid="node-title" />} />
    );
    expect(getByTestId('node-title')).toBeVisible();
  });

  test('renders with content', () => {
    const { getByTestId } = render(
      <FilterPanelAccordionItem>
        <div data-testid="content" />
      </FilterPanelAccordionItem>
    );
    expect(getByTestId('content')).toBeVisible();
  });

  test('adds custom class name', () => {
    const { container } = render(
      <FilterPanelAccordionItem className="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
