/**
 * @file Summary card container tests.
 * @copyright IBM Security 2019 - 2021
 */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React, { Fragment } from 'react';

import {
  SummaryCard,
  SummaryCardBatchAction,
  SummaryCardBatchActions,
  SummaryCardContainer,
  SummaryCardFooter,
  SummaryCardSelect,
} from '../../../..';

const summaryCards = [
  {
    id: '0',
  },
  {
    id: '1',
  },
];

describe('SummaryCardContainer', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <SummaryCardContainer
        render={({ getBatchActionProps, getSelectionProps, summaryCards }) => (
          <Fragment>
            <SummaryCardBatchActions {...getBatchActionProps()}>
              <SummaryCardBatchAction
                tabIndex={
                  getBatchActionProps().shouldShowBatchActions ? 0 : -1
                }>
                test batch action
              </SummaryCardBatchAction>
            </SummaryCardBatchActions>
            {summaryCards.map(({ id }) => (
              <SummaryCard key={id}>
                <SummaryCardFooter>
                  <SummaryCardSelect
                    {...getSelectionProps({ id })}
                    id={`summary-select-${id}`}
                    labelText={`test select ${id}`}
                  />
                </SummaryCardFooter>
              </SummaryCard>
            ))}
          </Fragment>
        )}
        summaryCards={summaryCards}
      />
    );

    await expect(container).toBeAccessible('SummaryCardContainer');
    await expect(container).toHaveNoAxeViolations();
  });

  test('has no accessibility violations when cards are selected', async () => {
    const { container, getByText } = render(
      <SummaryCardContainer
        render={({ getBatchActionProps, getSelectionProps, summaryCards }) => (
          <Fragment>
            <SummaryCardBatchActions {...getBatchActionProps()}>
              <SummaryCardBatchAction
                tabIndex={
                  getBatchActionProps().shouldShowBatchActions ? 0 : -1
                }>
                test batch action
              </SummaryCardBatchAction>
            </SummaryCardBatchActions>
            {summaryCards.map(({ id }) => (
              <SummaryCard key={id}>
                <SummaryCardFooter>
                  <SummaryCardSelect
                    {...getSelectionProps({ id })}
                    id={`summary-select--${id}`}
                    labelText={`test select ${id}`}
                  />
                </SummaryCardFooter>
              </SummaryCard>
            ))}
          </Fragment>
        )}
        summaryCards={summaryCards}
      />
    );

    // Currently there's no way to load the page
    // with summary cards pre-checked AND batch action toolbar updated.
    // Therefore, we have to select both cards first:
    userEvent.click(getByText(/test select 0/i));
    userEvent.click(getByText(/test select 1/i));

    await expect(container).toBeAccessible(
      'SummaryCardContainer with selected cards'
    );
    await expect(container).toHaveNoAxeViolations();
  });

  test('should cycle elements in tab order', () => {
    const { getByLabelText } = render(
      <SummaryCardContainer
        render={({ getBatchActionProps, getSelectionProps, summaryCards }) => (
          <Fragment>
            <SummaryCardBatchActions {...getBatchActionProps()}>
              <SummaryCardBatchAction
                tabIndex={
                  getBatchActionProps().shouldShowBatchActions ? 0 : -1
                }>
                test batch action
              </SummaryCardBatchAction>
            </SummaryCardBatchActions>
            {summaryCards.map(({ id }) => (
              <SummaryCard key={id}>
                <SummaryCardFooter>
                  <SummaryCardSelect
                    {...getSelectionProps({ id })}
                    id={`summary-select--${id}`}
                    labelText={`test select ${id}`}
                  />
                </SummaryCardFooter>
              </SummaryCard>
            ))}
          </Fragment>
        )}
        summaryCards={summaryCards}
      />
    );

    userEvent.tab();

    // The first summary card select:
    expect(getByLabelText(/test select 0/i)).toHaveFocus();

    userEvent.tab();

    // Loop complete.
    // The first summary card select:
    expect(getByLabelText(/test select 1/i)).toHaveFocus();
  });

  test('should cycle elements in tab order when the batch actions toolbar is activated', () => {
    const { getByLabelText, getByText } = render(
      <SummaryCardContainer
        render={({ getBatchActionProps, getSelectionProps, summaryCards }) => (
          <Fragment>
            <SummaryCardBatchActions {...getBatchActionProps()}>
              <SummaryCardBatchAction
                tabIndex={
                  getBatchActionProps().shouldShowBatchActions ? 0 : -1
                }>
                test batch action
              </SummaryCardBatchAction>
            </SummaryCardBatchActions>
            {summaryCards.map(({ id }) => (
              <SummaryCard key={id}>
                <SummaryCardFooter>
                  <SummaryCardSelect
                    {...getSelectionProps({ id })}
                    id={`summary-select--${id}`}
                    labelText={`test select ${id}`}
                  />
                </SummaryCardFooter>
              </SummaryCard>
            ))}
          </Fragment>
        )}
        summaryCards={summaryCards}
      />
    );

    // Currently there's no way to load the page
    // with summary cards pre-checked AND batch action toolbar updated.
    // Therefore, we have to select both cards first:
    userEvent.click(getByText(/test select 0/i));
    userEvent.click(getByText(/test select 1/i));

    userEvent.tab();
    userEvent.tab();

    // The batch action button:
    expect(getByText(/test batch action/i)).toHaveFocus();

    userEvent.tab();

    // The batch actions cancel button:
    expect(getByText(/Cancel/i)).toHaveFocus();

    userEvent.tab();

    // The first summary card select:
    expect(getByLabelText(/test select 0/i)).toHaveFocus();

    userEvent.tab();

    // The first summary card select:
    expect(getByLabelText(/test select 1/i)).toHaveFocus();

    userEvent.tab();
    userEvent.tab();

    // Loop complete.
    // The batch action button:
    expect(getByText(/test batch action/i)).toHaveFocus();
  });

  test('should update batch actions when a summary card is selected', () => {
    const { getByLabelText, queryByText } = render(
      <SummaryCardContainer
        render={({ getBatchActionProps, getSelectionProps, summaryCards }) => (
          <Fragment>
            <SummaryCardBatchActions {...getBatchActionProps()}>
              <SummaryCardBatchAction
                tabIndex={
                  getBatchActionProps().shouldShowBatchActions ? 0 : -1
                }>
                test batch action
              </SummaryCardBatchAction>
            </SummaryCardBatchActions>
            {summaryCards.map(({ id }) => (
              <SummaryCard key={id}>
                <SummaryCardFooter>
                  <SummaryCardSelect
                    {...getSelectionProps({ id })}
                    id={`summary-select--${id}`}
                    labelText={`test select ${id}`}
                  />
                </SummaryCardFooter>
              </SummaryCard>
            ))}
          </Fragment>
        )}
        summaryCards={summaryCards}
      />
    );

    // We can't check `not.toBeVisible` because the batch actions
    // are absolutely positioned & not hidden/removed from the DOM.
    // So instead, we query the default batch actions text with 0 selected:
    expect(queryByText(/0 items selected/i)).toBeInTheDocument();

    userEvent.click(getByLabelText(/test select 0/i));

    // Expect first summary card to be selected:
    expect(getByLabelText(/test select 0/i)).toBeChecked();

    // Expect the batch actions text to be updated:
    expect(queryByText(/1 item selected/i)).toBeInTheDocument();
  });

  test('should clear batch selections when the cancel button is clicked', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <SummaryCardContainer
        render={({ getBatchActionProps, getSelectionProps, summaryCards }) => (
          <Fragment>
            <SummaryCardBatchActions {...getBatchActionProps()}>
              <SummaryCardBatchAction
                tabIndex={
                  getBatchActionProps().shouldShowBatchActions ? 0 : -1
                }>
                test batch action
              </SummaryCardBatchAction>
            </SummaryCardBatchActions>
            {summaryCards.map(({ id }) => (
              <SummaryCard key={id}>
                <SummaryCardFooter>
                  <SummaryCardSelect
                    {...getSelectionProps({ id })}
                    id={`summary-select--${id}`}
                    labelText={`test select ${id}`}
                  />
                </SummaryCardFooter>
              </SummaryCard>
            ))}
          </Fragment>
        )}
        summaryCards={summaryCards}
      />
    );

    // Currently there's no way to load the page
    // with summary cards pre-checked AND batch action toolbar updated.
    // Therefore, we have to select both cards first:
    userEvent.click(getByText(/test select 0/i));
    userEvent.click(getByText(/test select 1/i));

    // Expect both summary cards to be selected at first:
    expect(queryByText(/2 items selected/i)).toBeInTheDocument();

    // Clear batch actions selections:
    userEvent.click(getByText(/Cancel/i));

    // Expect the batch actions text to be updated:
    expect(queryByText(/0 items selected/i)).toBeInTheDocument();

    // Expect both summary cards to not be selected:
    expect(getByLabelText(/test select 0/i)).not.toBeChecked();
    expect(getByLabelText(/test select 1/i)).not.toBeChecked();
  });
});
