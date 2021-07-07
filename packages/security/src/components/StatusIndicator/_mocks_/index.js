/**
 * @file Status indicator mocks.
 * @copyright IBM Security 2019
 */

import { STATUS } from '../StatusStep/StatusStep';

const statuses = Object.keys(STATUS);

const label = 'Retry';

export default {
  statusIndicator: {
    title: 'Status indicator title',
    retry: {
      label,
      description: label,
    },
  },
  statusSteps: statuses.map((statusStep, index) => {
    const description = `Status step ${index + 1}`;

    return {
      key: index,
      label: description,
      status: STATUS[statusStep],
      description,
    };
  }),
};
