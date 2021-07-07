/**
 * @file Summary card container mocks.
 * @copyright IBM Security 2019
 */

export default {
  summaryCards: new Array(5)
    .fill()
    .map((title = 'summary-card', id) => ({ id: `${title}__${id}` })),
};
