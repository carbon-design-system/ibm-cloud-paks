/**
 * @file Wizard.
 * @copyright IBM Security 2019 - 2021
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';

import { getComponentNamespace } from '../../globals/namespace';
import * as defaultLabels from '../../globals/nls';
import { isClient, isNode } from '../../globals/utils/capabilities';

import Nav from '../Nav';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import NavItem from '../Nav/NavItem';
import { Tearsheet } from '../Tearsheet';
import WizardStep from './WizardStep';

const namespace = getComponentNamespace('wizard');

class Wizard extends Component {
  state = {
    steps: this.steps,
    componentState: this.props.initState,
    stepInitState: this.props.initState,
    currentStep: 0,
    isOpen: true,
    loading: false,
    controlledOpen: this.props.isOpen != null,
    deleteIsLoading: false,
  };

  static getDerivedStateFromProps(props, state) {
    let nextState = state;
    if (state.controlledOpen && props.isOpen && !state.isOpen) {
      nextState = {
        ...nextState,
        currentStep: 0,
        componentState: props.initState,
      };
    }
    nextState = {
      ...nextState,
      isOpen: state.controlledOpen ? props.isOpen : state.isOpen,
    };
    return nextState;
  }

  setNextState = async (cb) => {
    this.setState({ loading: true });
    try {
      const changes = await this.currentStep.next(this.state.componentState);
      const isLastStep = this.isLastStep();

      this.setState(
        ({ currentStep, componentState }) => ({
          currentStep: currentStep + (isLastStep ? 0 : 1),
          componentState: {
            ...componentState,
            ...changes,
            error: undefined,
          },
          loading: false,
          valid: undefined,
        }),
        () => {
          this.setState(({ componentState }) => ({
            stepInitState: componentState,
          }));
          if (isLastStep) {
            if (cb) {
              cb();
            }

            this.props.onClose(this.state.componentState);
            this.setState({ isOpen: false });
          }
        }
      );
    } catch (err) {
      this.setState(({ componentState }) => ({
        loading: false,
        componentState: { ...componentState, error: err },
      }));
    }
  };

  get editMode() {
    return this.props.onDelete !== Wizard.defaultProps.onDelete;
  }

  get sequentialMode() {
    if (typeof this.props.isSequential !== 'undefined') {
      return this.props.isSequential;
    }
    return !this.editMode;
  }

  get currentStep() {
    if (this.state.steps[this.state.currentStep]) {
      return {
        ...WizardStep.defaultProps,
        ...this.state.steps[this.state.currentStep],
      };
    }
    return undefined;
  }

  get steps() {
    if (Children.count(this.props.children)) {
      return Children.map(
        this.props.children,
        WizardStep.getPropsFromElement
      ).filter((props) => props != null);
    } else if (Array.isArray(this.props.steps)) {
      return this.props.steps;
    }
    return [];
  }

  get isValid() {
    if (this.state.valid == null) {
      const valid = this.currentStep.validate(this.state.componentState);
      this.setState({ valid });

      return valid;
    }

    return this.state.valid;
  }

  setComponentState = (changes, cb) => {
    if (typeof changes === 'function') {
      this.setState(({ componentState }) => {
        const newComponentState = {
          ...componentState,
          ...changes(componentState),
        };
        return {
          componentState: newComponentState,

          valid: this.currentStep.validate(newComponentState),
        };
      }, cb);
    } else {
      const newComponentState = { ...this.state.componentState, ...changes };
      this.setState(
        {
          componentState: newComponentState,
          valid: this.currentStep.validate(newComponentState),
        },
        cb
      );
    }
  };

  isLastStep = () => this.state.currentStep === this.steps.length - 1;

  /**
   * Keeps the state in sync with the current props.
   * @param {Props} nextProps The current props passed to the component.
   * @returns {object.<object, *>} The updated state for the component.
   * @static
   */

  secondaryAction = () => {
    this.setState(({ componentState, currentStep, steps }) => {
      const previousStep = currentStep - 1;

      return {
        currentStep: previousStep,
        valid: steps[previousStep].validate(componentState),
      };
    });
  };

  closeAction = () => {
    this.props.onClose(this.state.componentState);
    if (!this.state.controlledOpen) {
      this.setState({ isOpen: false });
    }
  };

  deleteAction = async () => {
    this.setState({ deleteIsLoading: true });
    try {
      await this.props.onDelete(this.state.componentState);
      this.setState(({ controlledOpen }) => ({
        deleteIsLoading: false,
        isOpen: !controlledOpen,
      }));
    } catch (e) {
      this.setState({ deleteIsLoading: false, deleteButtonText: 'Failed' });
      setTimeout(() => this.setState({ deleteButtonText: undefined }), 5000);
    }
  };

  handleItemSelect = (event) => {
    const { id } = event.target;

    this.setState(({ componentState, steps }) => ({
      currentStep: Number(id),
      valid: steps[id].validate(componentState),
    }));
  };

  renderSidebar = () => {
    const { currentStep, valid } = this.state;

    return !this.sequentialMode ? (
      <Nav label={this.props.navLabel}>
        {this.steps.map(({ title }, index) => (
          <NavItem
            key={title}
            id={String(index)}
            className={`${namespace}__navItem`}
            current={String(currentStep)}
            disabled={!valid}
            handleItemSelect={this.handleItemSelect}
            link={false}>
            {title}
          </NavItem>
        ))}
      </Nav>
    ) : (
      <ProgressIndicator currentIndex={currentStep} vertical>
        {this.steps.map(({ title }, index) => (
          <ProgressStep
            key={title}
            disabled={index > currentStep}
            label={title}
          />
        ))}
      </ProgressIndicator>
    );
  };

  /**
   * Renders the component.
   */
  render() {
    const {
      labels,
      focusTrap,
      title,
      subTitle,
      className,
      navLabel, // avoid spreading with rest of props.
      ...other
    } = this.props;
    const componentLabels = {
      ...defaultLabels.labels,
      ...labels,
    };
    const { isOpen = true } = this.state;

    if (!this.currentStep) {
      return null;
    }

    const buttons = {
      primary: {
        onClick: () => this.setNextState(),
        isDisabled: !this.isValid || this.state.loading,
      },
      secondary:
        this.state.currentStep === 0
          ? {
              onClick: this.closeAction,
              isDisabled: true,
            }
          : {
              onClick: () =>
                this.setState(({ componentState, currentStep, steps }) => {
                  const previousStep = currentStep - 1;

                  return {
                    currentStep: previousStep,
                    valid: steps[previousStep].validate(componentState),
                  };
                }),
              isDisabled: false,
            },

      cancelSetup: {
        onClick: this.closeAction,
        isDisabled: false,
        secondaryText: componentLabels.WIZARD_TERTIARY_SECONDARY_TEXT,
      },

      // Wizard should not have a close button in the top right.
      close: {
        isDisabled: true,
      },
      delete: this.editMode
        ? {
            onClick: this.deleteAction,
            isDisabled: this.state.deleteIsLoading,
          }
        : undefined,
    };
    const buttonLabels = {
      TEARSHEET_PRIMARY_BUTTON: this.isLastStep()
        ? componentLabels.WIZARD_FINISH_BUTTON
        : componentLabels.WIZARD_NEXT_BUTTON,
      TEARSHEET_SECONDARY_BUTTON:
        this.state.currentStep === 0
          ? componentLabels.WIZARD_CANCEL_BUTTON
          : componentLabels.WIZARD_BACK_BUTTON,
      TEARSHEET_DELETE_BUTTON: this.editMode
        ? this.state.deleteButtonText ||
          componentLabels.WIZARD_TEARSHEET_DELETE_BUTTON
        : undefined,
      TEARSHEET_TERTIARY_BUTTON: componentLabels.WIZARD_TERTIARY_BUTTON,
    };

    const renderMain = () =>
      this.currentStep.renderMain(
        this.state.componentState,
        this.setComponentState
      );

    return (
      <Tearsheet
        focusTrap={focusTrap}
        sidebarTitle={title}
        sidebarSubtitle={subTitle}
        mainTitle={this.currentStep.title}
        renderSidebar={this.renderSidebar}
        renderMain={renderMain}
        rootNode={this.props.rootNode}
        primaryButton={buttons.primary}
        secondaryButton={buttons.secondary}
        tertiaryButton={buttons.cancelSetup}
        closeButton={buttons.close}
        deleteButton={buttons.delete}
        isOpen={isOpen}
        labels={{
          ...componentLabels,
          ...defaultLabels.filterFalsey(buttonLabels),
        }}
        loading={this.state.loading}
        loadingMessage={this.props.loadingMessage}
        className={classnames(namespace, className)}
        {...other}
      />
    );
  }
}

Wizard.propTypes = {
  /** @type {boolean} Focus trap. */
  focusTrap: PropTypes.bool,

  /** @type {string} The title of the Wizard. */
  title: PropTypes.string.isRequired,

  /** @type {string} The subtitle of the Wizard. */
  subTitle: PropTypes.string,

  /** @type {Array<object>} An object list of step props. __(deprecated)__ */
  steps: PropTypes.arrayOf(PropTypes.shape(WizardStep.propTypes)),

  /** @type {boolean} The open state.
   * Leave this property undefined, to give control over the open state to the Wizard component.
   * When defined at component creation time, the open state is controlled only by this property.
   */
  isOpen: PropTypes.bool,

  /** @type {function(wizardState: Object): any} This is called whenever the wizard closes (or wants to close) */
  onClose: PropTypes.func,

  /** @type {object} The initial state object of the wizard
   * (useful to prefill some values in your forms). */
  initState: PropTypes.instanceOf(Object),

  /** @type {DOM Node} Target to render the wizard. */
  rootNode: isNode() ? PropTypes.instanceOf(Node) : PropTypes.any,

  /** @type {...React.Element(WizardStep)} Provide one element of the WizardStep component for each step of your wizard (see the WizardStep docs).
   */
  children: PropTypes.node,

  /** @type {function(wizardState: Object): Promise} onDelete handler, enables edit mode */
  onDelete: PropTypes.func,

  /** @type {boolean} Defines whether the wizard is sequential or not. */
  isSequential: PropTypes.bool,

  /** @type {object} The labels to be used with the wizard
   * (useful to override default labels)
   */
  labels: defaultLabels.propType,

  /** Optional class name for the wrapper node. */
  className: PropTypes.string,

  /** Provide an accessible label that describes the Wizard sidebar navigation. */
  navLabel: PropTypes.string,
};

Wizard.defaultProps = {
  className: '',
  focusTrap: true,
  rootNode: isClient() ? document.body : undefined,
  subTitle: '',
  isOpen: undefined,
  initState: {},
  onClose: () => {},
  steps: [],
  children: undefined,
  onDelete: () => Promise.resolve(),
  isSequential: undefined,
  labels: {},
  navLabel: 'Steps navigation',
};

export default Wizard;
