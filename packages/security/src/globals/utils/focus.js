/**
 * @file Helper methods for element focusing.
 * @copyright IBM Security 2018 - 2021
 */

import React from 'react';

export const focusableElements =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

export const keyableElements = 'li:not([disabled])';

export const focusFirstElement = (element) => {
  const focusable = element.querySelector(focusableElements);
  if (focusable) {
    focusable.focus();
  }
};

export const trapTabFocus = (element, event) => {
  const focusable = element.querySelectorAll(focusableElements);
  if (focusable.length > 0) {
    if (event.target === focusable[0] && event.shiftKey) {
      event.preventDefault();
      focusable[focusable.length - 1].focus();
    } else if (
      event.target === focusable[focusable.length - 1] &&
      !event.shiftKey
    ) {
      event.preventDefault();
      focusable[0].focus();
    }
  }
};

/**
 * Manage the focus and blur event of an element that contains multiple focusable elements. This
 * hook is useful when you want to allow users to shift keyboard focus inside component and only
 * apply blur effects when the keyboard focus has completely left this component.
 *
 * @param {number} [timeoutDelay=10] Millisecond delay for the blur effect to take place. This
 * should not be less than 10 to give the browser time to register the subsequent focus event first.
 *
 * @returns {{createFocusHandler: Function, createBlurHandler: Function}} Utility functions to
 * create the focus and blur handlers that apply the necessary effects or state changes.
 */
export const useComponentFocus = (timeoutDelay = 10) => {
  const [blurTimer, setBlurTimer] = React.useState(undefined);

  // Clear any timeouts before unmounting.
  React.useEffect(() => () => clearTimeout(blurTimer), [blurTimer]);

  // Clears out the current timeout and sets the new one.
  const setNewBlurTimer = (newTimeout) => {
    setBlurTimer((currentTimeout) => {
      clearTimeout(currentTimeout);
      return newTimeout;
    });
  };

  // Clear out any existing timer because this focus handler call indicates that the keyboard focus
  // did not leave the component invoking this hook. Then apply the provided focus side effect.
  const createFocusHandler = (callback) => (event) => {
    setNewBlurTimer(undefined);
    callback(event);
  };

  // Set a short delay to allow the browser to detect the subsequent focus event which should
  // determine if the keyboard focus has completely left the component invoking this hook. If the
  // timeout is allowed to execute, the provided side effect is applied.
  const createBlurHandler = (callback) => (event) => {
    const newTimeout = setTimeout(() => callback(event), timeoutDelay);
    setNewBlurTimer(newTimeout);
  };

  // Return the two functions for the consumer to implement the necessary side effects.
  return { createFocusHandler, createBlurHandler };
};
