/**
 * @file Truncated list tests.
 * @copyright IBM Security 2020 - 2021
 */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import TruncatedList from '..';
import OrderedList from '../../OrderedList';
import { createChildrenArray } from '../_mocks_';

const getExpandButtonLabel = (expanded, shown, hidden) =>
  expanded ? 'View less' : `View more (${hidden})`;

describe(TruncatedList.name, () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <TruncatedList>{createChildrenArray(6)}</TruncatedList>
        <TruncatedList>{createChildrenArray(11)}</TruncatedList>
      </>
    );

    await expect(container).toBeAccessible(TruncatedList.name);
    await expect(container).toHaveNoAxeViolations();
  });

  test('adds custom class name', () => {
    const { container } = render(<TruncatedList className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  test('adds custom class name to the expand button', () => {
    const { getByRole } = render(
      <TruncatedList expandButtonClassName="custom-class">
        {createChildrenArray(100)}
      </TruncatedList>
    );
    expect(getByRole('button')).toHaveClass('custom-class');
  });

  test('passes additional props down to the list', () => {
    const { getByTestId } = render(<TruncatedList data-testid="test-list" />);
    expect(getByTestId('test-list')).toBeInTheDocument();
  });

  test('applies provided expand button label', () => {
    const getExpandButtonLabelMock = jest.fn().mockReturnValue('test label');
    const { getByText } = render(
      <TruncatedList getExpandButtonLabel={getExpandButtonLabelMock}>
        {createChildrenArray(15)}
      </TruncatedList>
    );
    expect(getByText(/test label/i)).toBeEnabled();
  });

  test('invokes function to get the expand button label', () => {
    const getExpandButtonLabelMock = jest.fn().mockReturnValue('test label');
    const { getByText } = render(
      <TruncatedList getExpandButtonLabel={getExpandButtonLabelMock}>
        {createChildrenArray(15)}
      </TruncatedList>
    );
    expect(getExpandButtonLabelMock).toHaveBeenLastCalledWith(false, 5, 10);
    expect(getByText(/test label/i)).toBeEnabled();
  });

  test('invokes function to get the collapse button label', () => {
    const getExpandButtonLabelMock = jest.fn().mockReturnValue('test label');
    const { getByText } = render(
      <TruncatedList getExpandButtonLabel={getExpandButtonLabelMock}>
        {createChildrenArray(15)}
      </TruncatedList>
    );
    userEvent.click(getByText(/test label/i));
    expect(getExpandButtonLabelMock).toHaveBeenLastCalledWith(true, 15, 0);
  });

  test('truncates more than 10 list items to 5 items by default', () => {
    const { getByText, getAllByText } = render(
      <TruncatedList getExpandButtonLabel={getExpandButtonLabel}>
        {createChildrenArray(11)}
      </TruncatedList>
    );
    expect(getAllByText(/child \d+/i)).toHaveLength(5);
    expect(getByText(/view more \(6\)/i)).toBeEnabled();
  });

  test('truncates list items based on the provided threshold', () => {
    const { getByText, getAllByText } = render(
      <TruncatedList
        truncateThreshold={15}
        getExpandButtonLabel={getExpandButtonLabel}>
        {createChildrenArray(20)}
      </TruncatedList>
    );
    expect(getAllByText(/child \d+/i)).toHaveLength(5);
    expect(getByText(/view more \(15\)/i)).toBeEnabled();
  });

  test('does not truncate items if the truncate threshold was not met', () => {
    const { queryByText, getAllByText } = render(
      <TruncatedList
        truncateThreshold={30}
        getExpandButtonLabel={getExpandButtonLabel}>
        {createChildrenArray(30)}
      </TruncatedList>
    );
    expect(getAllByText(/child \d+/i)).toHaveLength(30);
    expect(queryByText(/view more/i)).not.toBeInTheDocument();
  });

  test('renders items up to the collapsed item limit when truncated', () => {
    const { getByText, getAllByText } = render(
      <TruncatedList
        truncateThreshold={5}
        collapsedItemLimit={2}
        getExpandButtonLabel={getExpandButtonLabel}>
        {createChildrenArray(20)}
      </TruncatedList>
    );
    expect(getAllByText(/child \d+/i)).toHaveLength(2);
    expect(getByText(/view more \(18\)/i)).toBeEnabled();
  });

  test('renders items up to collapsed item limit or the truncate threshold when truncated', () => {
    const { getByText, getAllByText } = render(
      <TruncatedList
        truncateThreshold={2}
        collapsedItemLimit={10}
        getExpandButtonLabel={getExpandButtonLabel}>
        {createChildrenArray(4)}
      </TruncatedList>
    );
    expect(getAllByText(/child \d+/i)).toHaveLength(2);
    expect(getByText(/view more \(2\)/i)).toBeEnabled();
  });

  test('renders all items when truncated and expanded', () => {
    const { getByText, getAllByTestId } = render(
      <TruncatedList getExpandButtonLabel={getExpandButtonLabel}>
        {createChildrenArray(20)}
      </TruncatedList>
    );
    userEvent.click(getByText(/view more/i));
    expect(getAllByTestId(/child-\d+/i)).toHaveLength(20);
  });

  test('renders as an unordered list by default', () => {
    const { container } = render(<TruncatedList />);
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  test('renders as a different type of list', () => {
    const { container } = render(<TruncatedList as="ol" />);
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  test('renders as a different type of list component', () => {
    const { container } = render(<TruncatedList as={OrderedList} />);
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  test('renders as a single list when collapsed', () => {
    const { container } = render(
      <TruncatedList>{createChildrenArray(15)}</TruncatedList>
    );
    expect(container.querySelectorAll('ul')).toHaveLength(1);
  });

  test('renders as a single list when expanded', () => {
    const { container, getByText } = render(
      <TruncatedList getExpandButtonLabel={getExpandButtonLabel}>
        {createChildrenArray(15)}
      </TruncatedList>
    );
    userEvent.click(getByText(/view more/i));
    expect(container.querySelectorAll('ul')).toHaveLength(1);
  });
});
