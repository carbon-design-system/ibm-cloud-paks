/**
 * @file Wizard stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { object, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { settings } from 'carbon-components';
import React from 'react';

import 'prismjs';
import 'prismjs/components/prism-jsx';

import { withReducer } from 'recompose';

import { patterns } from '../../../.storybook';

import Button from '../Button';
import Checkbox from '../Checkbox';
import FormGroup from '../FormGroup';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import TextInput from '../TextInput';
import WizardComponent from './Wizard';
import WizardStep from './WizardStep';

const { prefix } = settings;

const focusTrap = boolean('focusTrap', false);

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const labels = {
  WIZARD_MODAL_HEADING: 'Unsaved Changes',
  WIZARD_MODAL_BODY: 'Discard unsaved changes?',
  WIZARD_MODAL_PRIMARY_BUTTON: 'Discard',
  WIZARD_MODAL_SECONDARY_BUTTON: 'Cancel',
  WIZARD_FINISH_BUTTON: 'Finish',
  WIZARD_NEXT_BUTTON: 'Next',
  WIZARD_SAVE_BUTTON: 'Save',
  WIZARD_CANCEL_BUTTON: 'Cancel',
  WIZARD_BACK_BUTTON: 'Back',
  WIZARD_REVERT_BUTTON: 'Revert',
  WIZARD_CLOSE_BUTTON: 'Close',
  WIZARD_TEARSHEET_DELETE_BUTTON: 'Delete connection',
};

const steps = [
  {
    title:
      'First Step that is very long will be truncated at 3 lines if the viewport size is small enough.',
    renderMain: (state, setState) => (
      <div>
        <p style={{ fontSize: 'normal' }}>Please fill out the form.</p>
        <section>
          <TextInput
            id="input1"
            labelText="Name"
            value={state.input1Value}
            onChange={({ target }) => setState({ input1Value: target.value })}
          />
        </section>
      </div>
    ),
    next: async (state) => sleep(1000).then(() => action('next')(state)),
    validate: ({ input1Value = '' }) => input1Value.trim().length >= 3,
  },
  {
    title: 'Second Step',
    renderMain: ({ input1Value, checkboxValue = false }, setState) => (
      <div>
        <p style={{ fontWeight: 200, fontSize: 'normal' }}>Hi {input1Value}.</p>
        <section>
          <p style={{ fontWeight: 200, fontSize: 'normal', color: 'grey' }}>
            Is your name correct?{' '}
          </p>

          <Checkbox
            id="name-checkbox"
            labelText="My name is correct."
            checked={checkboxValue}
            onChange={(checked) => setState({ checkboxValue: checked })}
          />
        </section>
      </div>
    ),
    next: async (state) => sleep(1000).then(() => action('next_done')(state)),
    validate: ({ checkboxValue = false }) => checkboxValue,
  },
];

const editableSteps = [
  {
    title: 'Configure connection',
    renderMain: (state, setState) => (
      <div>
        <p style={{ fontSize: 'normal' }}>Please fill out the form.</p>
        <section>
          <TextInput
            id="input1"
            labelText="Name"
            value={state.input1Value}
            onChange={({ target }) => setState({ input1Value: target.value })}
          />
        </section>
      </div>
    ),
    next: async (state) => sleep(1000).then(() => action('Save')(state)),
    validate: ({ input1Value = '' }) => input1Value.trim().length >= 3,
  },
  {
    title: 'Attribute mapping',
    renderMain: ({ input1Value, checkboxValue = false }, setState) => (
      <div>
        <p style={{ fontWeight: 200, fontSize: 'normal' }}>Hi {input1Value}.</p>
        <section>
          <p style={{ fontWeight: 200, fontSize: 'normal', color: 'grey' }}>
            Is your name correct?{' '}
          </p>

          <Checkbox
            id="name-checkbox"
            labelText="My name is correct."
            checked={checkboxValue}
            onChange={(checked) => setState({ checkboxValue: checked })}
          />
        </section>
      </div>
    ),
    validate: ({ checkboxValue = false }) => checkboxValue,
    next: async (state) => sleep(10000).then(() => action('Save')(state)),
  },
];

const reducers = {
  TOGGLE_OPEN: (state) => ({ ...state, isOpen: !state.isOpen }),
  UPDATE_INIT_STATE: (state, { initState = {} } = {}) => ({
    ...state,
    initState,
  }),
  DEFAULT: (state = {}) => state,
};

const reduceState =
  (reducers = { DEFAULT: (state = {}) => state }) =>
  (state = {}, { type, ...otherState } = {}) =>
    (reducers[type] || reducers.DEFAULT)(state, { type, ...otherState });

const enhanceWithState = (initState = {}) =>
  withReducer('state', 'dispatch', reduceState(reducers), {
    isOpen: false,
    initState,
  });

function WizardWrapper({ state, dispatch, ...otherProps }) {
  return (
    <div>
      <Button
        onClick={() =>
          dispatch({ type: 'TOGGLE_OPEN' }, ({ isOpen }) =>
            action('isOpen')(isOpen)
          )
        }
        kind={state.isOpen ? 'secondary' : 'primary'}>
        {state.isOpen ? 'Close' : 'Open'}
      </Button>
      <WizardComponent
        {...otherProps}
        focusTrap={focusTrap}
        initState={state.initState}
        isOpen={state.isOpen}
        onClose={(componentState) => {
          dispatch(
            { type: 'UPDATE_INIT_STATE', initState: componentState },
            ({ initState }) => action('onClose')(initState)
          );
          dispatch({ type: 'TOGGLE_OPEN' });
        }}
        loadingMessage="Saving..."
      />
    </div>
  );
}

const markdown = (useDefault = true) =>
  `
  ~~~jsx
  /// ...
  /// Example use:
  render() {
    const {isOpen, wizardState = {}} = this.state;
    return (
      <div>
        <Button
          onClick={(_)=>this.setState(
            ({isOpen}) => ({isOpen: !isOpen})
          )}
        >
          {this.state.isOpen ? 'Close' : 'Open'}
        </Button>

          <Wizard
            title="Example"
            subTitle="Example Wizard"
            isOpen={(wizardState) => this.setState({isOpen: true})}
            onClose={(wizardState) => this.setState({wizardState, isOpen: false})}
            initState={wizardState} ${
              useDefault
                ? `
            isOpen={isOpen}`
                : ''
            }
            onDelete={/*passing a onDelete handler will enable edit mode*/}
          >
            <WizardStep
              title="First Step"
              renderMain={(state, setState) => (<div><p>....</p>...</div>)}
              next={async state => state}
              validate={({ input1Value = '' }) => input1Value.trim().length >= 3}
            />
            <WizardStep
              title="2nd Step"
              renderMain={(state, setState) => (<div><p>....</p>...</div>)}
              validate={({ checkboxValue = false }) => checkboxValue}
              next={async state => state}
            />
          </Wizard>
      </div>
    );
  }
  ///...
  ~~~
  `;

storiesOf(patterns('Wizard'), module)
  .add(
    'default',
    () => {
      WizardComponent.displayName = 'Wizard';
      WizardComponent.__docgenInfo = {
        ...WizardComponent.__docgenInfo,
        props: {
          ...WizardComponent.__docgenInfo.props,
          rootNode: {
            ...WizardComponent.__docgenInfo.props.rootNode,
            defaultValue: { value: 'document.body', computed: true },
          },
          steps: {
            ...WizardComponent.__docgenInfo.props.steps,
            type: { name: 'array' },
          },
        },
      };
      return (
        <div style={{ zIndex: 'unset', position: 'relative' }}>
          <h1
            style={{
              fontWeight: 'lighter',
              marginTop: '1rem',
              marginLeft: '1.5rem',
            }}>
            See Knobs
          </h1>
          <WizardComponent
            focusTrap={focusTrap}
            title="Example"
            subTitle="5 mins setup"
            initState={object('initState', {})}
            isOpen={boolean('isOpen', true)}
            onClose={action('onClose')}
            onDelete={
              boolean('editMode', false)
                ? (componentState) =>
                    new Promise((resolve) => {
                      action('onDelete')(componentState);
                      setTimeout(() => {
                        resolve();
                      }, 3000);
                    })
                : undefined
            }
            labels={labels}>
            <WizardStep {...steps[0]} />
            <WizardStep {...steps[1]} />
          </WizardComponent>
        </div>
      );
    },
    {
      info: {
        text: `## Default use of the Wizard Component
        ${markdown(true)}
        `,
      },
    }
  )
  .add(
    'dynamic',
    () => {
      WizardComponent.displayName = 'Wizard';
      WizardComponent.__docgenInfo = {
        ...WizardComponent.__docgenInfo,
        props: {
          ...WizardComponent.__docgenInfo.props,
          rootNode: {
            ...WizardComponent.__docgenInfo.props.rootNode,
            defaultValue: { value: 'document.body', computed: true },
          },
          steps: {
            ...WizardComponent.__docgenInfo.props.steps,
            type: { name: 'array' },
          },
        },
      };
      return (
        <div>
          <h1
            style={{
              fontWeight: 'lighter',
              marginTop: '1rem',
              marginLeft: '1.5rem',
            }}>
            See Knobs
          </h1>
          <WizardComponent
            focusTrap={focusTrap}
            title="Example"
            subTitle="5 mins setup"
            initState={object('initState', {
              eggs: false,
              oats: false,
              salad: false,
              soup: false,
            })}
            isOpen={boolean('isOpen', true)}
            onClose={action('onClose')}
            labels={labels}
            loadingMessage="Loading...">
            <WizardStep
              title="First Step"
              renderMain={(state, setState) => (
                <FormGroup legendText="Select type of meal">
                  <RadioButtonGroup
                    onChange={(value) => {
                      setState({ mealType: value });
                    }}
                    defaultSelected={state.mealType}
                    name="radio-button-group"
                    legend="Group Legend">
                    <RadioButton
                      value="breakfast"
                      labelText="Breakfast"
                      id="option-breakfast"
                    />
                    <RadioButton
                      value="lunch"
                      labelText="Lunch"
                      id="option-lunch"
                    />
                    <RadioButton
                      value="disabled"
                      labelText="Dinner"
                      id="option-dinner"
                      disabled
                    />
                  </RadioButtonGroup>
                </FormGroup>
              )}
              next={async (state) =>
                sleep(1000).then(() => action('next')(state))
              }
              validate={({ mealType }) => mealType !== undefined}
            />
            <WizardStep
              title="Second Step"
              renderMain={(state, setState) => {
                const MEAL_MENU = {
                  breakfast: (
                    <fieldset className={`${prefix}--fieldset`}>
                      <legend className={`${prefix}--label`}>
                        Select breakfast options
                      </legend>
                      <Checkbox
                        id="checkbox-eggs"
                        labelText="Eggs"
                        checked={state.eggs}
                        onChange={(eggs) => setState({ eggs })}
                      />
                      <Checkbox
                        id="checkbox-oats"
                        labelText="Oats"
                        checked={state.oats}
                        onChange={(oats) => setState({ oats })}
                      />
                    </fieldset>
                  ),
                  lunch: (
                    <fieldset className={`${prefix}--fieldset`}>
                      <legend className={`${prefix}--label`}>
                        Select lunch options
                      </legend>
                      <Checkbox
                        id="checkbox-soup"
                        labelText="Soup"
                        checked={state.soup}
                        onChange={(soup) => setState({ soup })}
                      />
                      <Checkbox
                        id="checkbox-salad"
                        labelText="Salad"
                        checked={state.salad}
                        onChange={(salad) => setState({ salad })}
                      />
                    </fieldset>
                  ),
                };

                return MEAL_MENU[state.mealType];
              }}
              next={async (state) =>
                sleep(1000).then(() => action('next_done')(state))
              }
            />
          </WizardComponent>
        </div>
      );
    },
    {
      info: {
        text: `
          Dynamic content.
        `,
      },
    }
  )
  .add(
    'With open/close button',
    () => {
      const Wizard = enhanceWithState(object('initState', {}))(WizardWrapper);
      Wizard.displayName = 'Wizard';
      Wizard.__docgenInfo = {
        ...WizardComponent.__docgenInfo,
        props: {
          ...WizardComponent.__docgenInfo.props,
          steps: {
            ...WizardComponent.__docgenInfo.props.steps,
            type: { name: 'array' },
          },
        },
      };
      Wizard.defaultProps = WizardComponent.defaultProps;
      return (
        <Wizard title="Title of setup" subTitle="5 mins setup" labels={labels}>
          {steps.map((step) => (
            <WizardStep key={step.title} {...step} />
          ))}
        </Wizard>
      );
    },
    {
      info: {
        text: `## Wizard with open/close button
        ${markdown(false)}
        `,
      },
    }
  )
  .add(
    'With editable wizard',
    () => {
      const Wizard = ({ initState, ...props }) => {
        const [state] = React.useState(initState);
        return <WizardComponent {...props} initState={state} />;
      };
      Wizard.displayName = 'Wizard';
      Wizard.__docgenInfo = {
        ...WizardComponent.__docgenInfo,
        props: {
          ...WizardComponent.__docgenInfo.props,
          steps: {
            ...WizardComponent.__docgenInfo.props.steps,
            type: { name: 'array' },
          },
        },
      };
      Wizard.defaultProps = WizardComponent.defaultProps;

      const selectFn = (value) => {
        switch (value) {
          case 'true': {
            return true;
          }
          case 'false': {
            return false;
          }
          default: {
            return undefined;
          }
        }
      };

      return (
        <div style={{ zIndex: 'unset', position: 'relative' }}>
          <Wizard
            initState={object('initState', {
              input1Value: 'Placeholder text',
              checkboxValue: false,
            })}
            title="Title of setup"
            subTitle="5 mins setup"
            isSequential={selectFn(
              select('isSequential', ['true', 'false', 'unset'], 'unset')
            )}
            onDelete={
              boolean('deleteMode', true)
                ? (componentState) =>
                    new Promise((resolve) => {
                      action('onDelete')(componentState);
                      setTimeout(() => {
                        resolve();
                      }, 3000);
                    })
                : undefined
            }
            labels={labels}>
            {editableSteps.map((step) => (
              <WizardStep key={step.title} {...step} />
            ))}
          </Wizard>
        </div>
      );
    },
    {
      info: {
        text: `## Editable Wizard
        ${markdown(false)}
        `,
      },
    }
  );
