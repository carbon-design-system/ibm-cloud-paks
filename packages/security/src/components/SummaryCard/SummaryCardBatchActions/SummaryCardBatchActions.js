/**
 * @file Summary card batch actions.
 * @copyright IBM Security 2019
 */

import React from 'react';

import { appendComponentNamespace } from '../../../globals/namespace';

import { TableBatchActions } from '../../DataTable';

import { namespace as summaryCardNamespace } from '../SummaryCard';

const namespace = appendComponentNamespace(
  summaryCardNamespace,
  'batch-actions'
);

const {
  defaultProps: { translateWithId },
  propTypes,
  translationKeys: carbonTranslationKeys,
} = TableBatchActions;

const translationKeys = [
  'security.summary-card.batch.cancel',
  'security.summary-card.batch.items.selected',
  'security.summary-card.batch.item.selected',
];

const SummaryCardBatchActions = ({ translateWithId: t, ...other }) => (
  <TableBatchActions
    className={namespace}
    translateWithId={(id, state) =>
      t
        ? t(translationKeys[carbonTranslationKeys.indexOf(id)], state)
        : translateWithId(id, state)
    }
    {...other}
  />
);

SummaryCardBatchActions.propTypes = propTypes;
SummaryCardBatchActions.translationKeys = translationKeys;

export default SummaryCardBatchActions;
