/**
 * @file WizardStep.
 * @copyright IBM Security 2019
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WizardStep extends Component {
  static getPropsFromElement = (stepElem) => {
    if (!React.isValidElement(stepElem) && stepElem.type !== WizardStep) {
      return null;
    }
    return stepElem.props;
  };

  render() {
    const { title, renderMain, next, validate } = this.props;
    return (
      null && {
        title,
        renderMain,
        next,
        validate,
      }
    );
  }
}

WizardStep.propTypes = {
  /** @type {string} The title of the step. */
  title: PropTypes.string.isRequired,
  /** @type {function(state: Object, setState: function(changes: Object)): boolean} render function for the contents of the step.
   * use setState to shallow merge the state with the changes object supplied to setState (just like in react) */
  renderMain: PropTypes.func,
  /** @type {function(state: Object): Promise} this is called after each step. You can do async work here or save your changes
   * depending on whether you are using a sequential wizard or not. */
  next: PropTypes.func,

  /** @type {function(state: Object): boolean} Pure and synchronous predicate function to validate the wizard's state against the current step, occuring after every state change (for example, every user keystroke). This should not be used as a hook to trigger any side effects, nor allow the return value to depend on anything else other than the argument. When it returns `true`, parts of the wizard (buttons, navigation, etc.) become active. */
  validate: PropTypes.func,
};

WizardStep.defaultProps = {
  // eslint-disable-next-line no-unused-vars
  renderMain: (state, setState) => <div />,
  // eslint-disable-next-line no-unused-vars
  validate: (state) => true,
  next: async (state) => state,
};

export default WizardStep;
