/**
 * @file Tearsheet stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React, { Fragment } from 'react';
import { compose, getDisplayName, lifecycle } from 'recompose';

import { patterns } from '../../../.storybook';

import getGuidance from './stories';

import {
  Button,
  CodeSnippet,
  CodeSnippetSkeleton,
  Dropdown,
  Form,
  FormGroup,
  NumberInput,
  Search,
  Tearsheet,
  TextArea,
  TextInput,
} from '../..';

import labels from './_mocks_';

const { __docgenInfo, defaultProps } = Tearsheet;

const renderSidebar = () =>
  boolean('Sidebar (renderSidebar)', true)
    ? () => 'Sidebar'
    : defaultProps.renderSidebar;

const searchLabel = 'What are you looking for today?';

const labelText = 'Label';
const placeholder = 'Placeholder text';

const namespace = 'wizard__form';
const className = `${namespace}__input`;

const id = 'search';
const selector = `#${id}`;
const selectorPrimaryFocus = () => document.querySelector(selector);

const renderMain = ({ isLoading }) => (
  <Form className={namespace} tabIndex={isLoading ? -1 : 0}>
    <p>
      Whenever the Tearsheet is loading, please use{' '}
      <CodeSnippet type="inline" light tabIndex={isLoading ? -1 : 0}>
        isLoading
      </CodeSnippet>{' '}
      via the{' '}
      <CodeSnippet type="inline" light tabIndex={isLoading ? -1 : 0}>
        renderMain
      </CodeSnippet>{' '}
      render prop to prevent users from tabbing through focussable content (such
      as form inputs, buttons, and links) while the Tearsheet is loading. For
      example, you can selectively load skeleton components, or you can set
      <CodeSnippet type="inline" light tabIndex={isLoading ? -1 : 0}>
        disabled
      </CodeSnippet>
      or{' '}
      <CodeSnippet type="inline" light tabIndex={isLoading ? -1 : 0}>
        tabIndex={-1}
      </CodeSnippet>{' '}
      on interactive elements.
    </p>
    <p>Here are some examples:</p>
    {isLoading ? (
      <CodeSnippetSkeleton type="multi" />
    ) : (
      <CodeSnippet light type="multi">
        {/* eslint-disable-next-line react/jsx-indent */}
        {`
<TearSheet
  renderMain={({ isLoading }) => (
    <Button disabled={isLoading}>
      Example button.
    </Button>
    <CodeSnippet tabIndex={isLoading ? -1 : 0}>
      Example snippet with no copy button.
    </CodeSnippet>
    {isLoading ? (
      <CodeSnippetSkeleton type="multi" />
    ) : (
      <CodeSnippet type="multi">
        Exampe snippet with a copy button.
      </CodeSnippet>
    )}
  )}
/>
`}
      </CodeSnippet>
    )}
    <br />
    <p>
      For more examples, please review the &quot;Story&quot; tab in the
      Storybook panel below to the see this demo&apos; source code.
    </p>
    <br />
    <Search
      id={id}
      className={className}
      disabled={isLoading}
      labelText={searchLabel}
      placeholder={searchLabel}
    />

    <TextInput
      className={className}
      id="test-input-id"
      labelText={labelText}
      placeholder={placeholder}
      disabled={isLoading}
    />

    <FormGroup legendText={labelText}>
      <Dropdown
        id="dropdown"
        label="Dropdown label"
        items={[
          {
            id: 'option-1',
            text: 'Option 1',
          },
          {
            id: 'option-2',
            text: 'Option 2',
          },
        ]}
        itemToString={(item) => (item ? item.text : '')}
        disabled={isLoading}
      />
    </FormGroup>

    <NumberInput
      id="numberInput"
      className={className}
      label={labelText}
      value={1000}
      disabled={isLoading}
    />

    <TextArea
      className={className}
      labelText={labelText}
      placeholder={placeholder}
      disabled={isLoading}
    />
  </Form>
);

const buttons = () => ({
  primaryButton: {
    onClick: action('primary-click'),
    label: text('primaryButton.label', 'Next'),
    isDisabled: boolean('primaryButton.isDisabled', false),
  },
  secondaryButton: {
    onClick: action('secondary-click'),
    label: text('secondaryButton.label', 'Previous'),
    isDisabled: boolean('secondaryButton.isDisabled', false),
  },
  closeButton: {
    onClick: action('close-click'),
    label: text('closeButton.label', 'Close'),
    isDisabled: boolean('closeButton.isDisabled', false),
  },
  deleteButton: {
    onClick: action('delete-click'),
    label: text('deleteButton.label', 'Delete'),
    isDisabled: boolean('deleteButton.isDisabled', false),
  },
});

storiesOf(patterns('Tearsheet'), module)
  .add(
    'Basic',
    () => (
      <Tearsheet
        {...buttons()}
        focusTrap={boolean('focusTrap', false)}
        selectorPrimaryFocus={selectorPrimaryFocus}
        renderMain={renderMain}
        renderSidebar={renderSidebar()}
        sidebarTitle="Title of setup"
        sidebarSubtitle="5 mins setup"
        mainTitle="Step title"
        labels={labels}
      />
    ),
    {
      info: `
      Basic implementation of the Tearsheet. Using the \`label\` property in a button object will override the value set in \`labels\` prop
      ## Important note about \`focusTrap\`:
      The \`focusTrap\` prop is set to \`false\` in the Storybook so that you can navigate the Storybook UI. This prop is set to \`true\` by default. In most cases, you should not have to change this prop.

      ${getGuidance(Tearsheet)}
      `,
    }
  )
  .add(
    'with loading',
    () => {
      const loading = true;
      const loadingMessage = 'Sending request...';

      const TearsheetLoadingStory = compose(
        lifecycle({
          state: { loading, loadingMessage },

          componentDidMount() {
            this.startRequest = setTimeout(
              () => this.setState({ loadingMessage }),
              1000
            );

            this.processResponse = setTimeout(
              () =>
                this.setState({
                  loadingMessage: 'Processing request...',
                }),
              3000
            );

            this.complete = setTimeout(
              () => this.setState({ loading: !loading }),
              5000
            );
          },
          componentWillUnmount() {
            clearTimeout(this.startRequest);
            clearTimeout(this.processResponse);
            clearTimeout(this.complete);
          },
        })
      )(Tearsheet);

      TearsheetLoadingStory.displayName = getDisplayName(Tearsheet);
      TearsheetLoadingStory.__docgenInfo = __docgenInfo;

      return (
        <TearsheetLoadingStory
          {...buttons()}
          focusTrap={boolean('focusTrap', false)}
          selectorPrimaryFocus={selectorPrimaryFocus}
          renderMain={renderMain}
          renderSidebar={renderSidebar()}
          sidebarTitle="Title of setup"
          sidebarSubtitle="5 mins setup"
          mainTitle="Step title"
          labels={labels}
          isOpen
          loading={loading}
          loadingMessage={loadingMessage}
        />
      );
    },
    {
      info: `
      Tearsheet with loading and dynamic messages. Using the \`label\` property in a button object will override the value set in \`labels\` prop
      ## Important note about \`focusTrap\`:
      The \`focusTrap\` prop is set to \`false\` in the Storybook so that you can navigate the Storybook UI. This prop is set to \`true\` by default. In most cases, you should not have to change this prop.
    
      ${getGuidance(Tearsheet)}
      `,
    }
  )
  .add(
    'With open/close',
    () => {
      class TearsheetStory extends React.Component {
        state = { open: false };
        close = () => {
          this.setState({ open: false });
        };
        open = () => {
          this.setState({ open: true });
        };

        render() {
          return (
            <Fragment>
              <Button onClick={this.open} kind="primary">
                Open
              </Button>
              <Tearsheet
                {...buttons()}
                focusTrap={boolean('focusTrap', false)}
                selectorPrimaryFocus={selectorPrimaryFocus}
                renderMain={renderMain}
                renderSidebar={renderSidebar()}
                closeButton={{
                  onClick: this.close,
                  label: text('closeButton.label', 'Close'),
                  isDisabled: boolean('closeButton.isDisabled', false),
                }}
                sidebarTitle="Title of setup"
                sidebarSubtitle="5 mins setup"
                mainTitle="Step title"
                isOpen={this.state.open}
                labels={labels}
              />
            </Fragment>
          );
        }
      }
      return <TearsheetStory />;
    },
    {
      info: `
      Basic implementation of a tearsheet. Using the \`label\` property in a button object will override the value set in \`labels\` prop
      ## Important note about \`focusTrap\` & \`selectoPrimaryFocus\`:
      The \`focusTrap\` prop is set to \`false\` in the Storybook so that you can navigate the Storybook UI. This prop is set to \`true\` by default. In most cases, you should not have to change this prop.

      The \`selectorPrimaryFocus\` prop only works when \`focusTrap\` is set to \`true\`. However, in this Storybook environment, \`focusTrap = false\` so that you can navigate the UI. To demonstrate \`selectorPrimaryFocus\` functionality, please open the "Knobs" tab in the Storybook addon's frame and toggle the \`focusTrap\` checkbox. When you are ready to view this component's prop table or navigate to a different component, you will need to click on the \`focusTrap\` checkbox again to disable focus trapping.
    
      ${getGuidance(Tearsheet)}
      `,
    }
  )
  .add(
    'With supplied selectorPrimaryFocus',
    () => (
      <Tearsheet
        {...buttons()}
        focusTrap={boolean('focusTrap', false)}
        selectorPrimaryFocus={selector}
        renderMain={renderMain}
        renderSidebar={renderSidebar()}
        sidebarTitle="Title of setup"
        sidebarSubtitle="5 mins setup"
        mainTitle="Step title"
        labels={labels}
        isOpen
      />
    ),
    {
      info: `
      Basic implementation of the Tearsheet including supplied selectorPrimaryFocus.
      ## Important note about \`focusTrap\` & \`selectoPrimaryFocus\`:
      The \`focusTrap\` prop is set to \`false\` in the Storybook so that you can navigate the Storybook UI. This prop is set to \`true\` by default. In most cases, you should not have to change this prop.

      The \`selectorPrimaryFocus\` prop only works when \`focusTrap\` is set to \`true\`. However, in this Storybook environment, \`focusTrap = false\` so that you can navigate the UI. To demonstrate \`selectorPrimaryFocus\` functionality, please open the "Knobs" tab in the Storybook addon's frame and toggle the \`focusTrap\` checkbox. When you are ready to view this component's prop table or navigate to a different component, you will need to click on the \`focusTrap\` checkbox again to disable focus trapping.
    
      ${getGuidance(Tearsheet)}
      `,
    }
  );
