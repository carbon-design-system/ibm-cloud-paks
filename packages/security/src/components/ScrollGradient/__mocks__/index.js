/**
 * @file `ResizeObserver` mock.
 * @copyright IBM Security 2020
 */

const { fn } = jest;

const disconnectMock = fn();
const observeMock = fn();

window.ResizeObserver = fn(() => ({
  disconnect: disconnectMock,
  observe: observeMock,
}));

export { disconnectMock, observeMock };
