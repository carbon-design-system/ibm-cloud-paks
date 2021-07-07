/**
 * @file Delimited list mocks.
 * @copyright IBM Security 2019
 */

export default {
  items: new Array(10)
    .fill()
    .map((value = 'Item', index) => `${value} ${index + 1}`),
};
