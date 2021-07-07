/**
 * @file Component helpers.
 * @copyright IBM Security 2018
 */

/**
 * Toggles between active items.
 * @param {string} type The type of item to toggle.
 * @param {Function} callback An optional callback.
 */
export default function toggle(type, callback = () => {}) {
  const { isActive } = this.state;

  Object.keys(this.state.isActive).forEach((state) => {
    isActive[state] = state === type ? !this.state.isActive[type] : false;
  });

  this.setState({ isActive }, () => callback(this.state.isActive));
}
