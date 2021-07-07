/**
 * @file Small tearsheet stories.
 * @copyright IBM Security 2019 - 2020
 */

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React, { Fragment } from 'react';
import { compose, getDisplayName, lifecycle } from 'recompose';

import { info, patterns } from '../../../../.storybook';

import getGuidance from '../stories';

import {
  Button,
  CodeSnippet,
  CodeSnippetSkeleton,
  TearsheetSmall,
} from '../../..';

import {
  buttons,
  description,
  body,
  heading,
  isDisabled,
  labels,
} from './_mocks_';

const { closeButton, primaryButton, secondaryButton } = buttons;

const focusTrap = boolean('focusTrap', false);

storiesOf(patterns('TearsheetSmall'), module)
  .add(
    'Default',
    () => (
      <TearsheetSmall
        focusTrap={focusTrap}
        heading={heading}
        description={description}
        closeButton={{
          isDisabled: boolean('buttons.closeButton.isDisabled', isDisabled),
          label: text('buttons.closeButton.label', closeButton.label),
          onClick: action('buttons.closeButton.onClick'),
        }}
        primaryButton={{
          isDisabled: boolean('buttons.primaryButton.isDisabled', isDisabled),
          label: text('buttons.primaryButton.label', primaryButton.label),
          onClick: action('buttons.primaryButton.onClick'),
        }}
        secondaryButton={{
          isDisabled: boolean('buttons.secondaryButton.isDisabled', isDisabled),
          label: text('buttons.secondaryButton.label', secondaryButton.label),
          onClick: action('buttons.secondaryButton.onClick'),
        }}
        isOpen
        labels={labels}
      />
    ),
    info(getGuidance(TearsheetSmall))
  )
  .add(
    'Hidden button',
    () => (
      <TearsheetSmall
        focusTrap={focusTrap}
        heading={heading}
        description={description}
        closeButton={{
          isDisabled: boolean('buttons.closeButton.isDisabled', isDisabled),
          label: text('buttons.closeButton.label', closeButton.label),
          onClick: action('buttons.closeButton.onClick'),
        }}
        primaryButton={{
          isDisabled: boolean('buttons.primaryButton.isDisabled', isDisabled),
          label: text('buttons.primaryButton.label', primaryButton.label),
          onClick: action('buttons.primaryButton.onClick'),
        }}
        secondaryButton={{
          isDisabled: boolean('buttons.secondaryButton.isDisabled', isDisabled),
          label: text('buttons.secondaryButton.label', secondaryButton.label),
          onClick: action('buttons.secondaryButton.onClick'),
          hide: true,
        }}
        isOpen
        labels={labels}
      />
    ),
    info(getGuidance(TearsheetSmall))
  )
  .add(
    'with body',
    () =>
      boolean('isOpen', true) && (
        <TearsheetSmall
          flush={boolean('Flush (flush)', TearsheetSmall.defaultProps.flush)}
          focusTrap={focusTrap}
          heading={heading}
          description={description}
          body={<section className="tearsheet--small__body">{body}</section>}
          closeButton={{
            isDisabled: boolean('buttons.closeButton.isDisabled', isDisabled),
            label: text('buttons.closeButton.label', closeButton.label),
            onClick: action('buttons.closeButton.onClick'),
          }}
          primaryButton={{
            isDisabled: boolean('buttons.primaryButton.isDisabled', isDisabled),
            label: text('buttons.primaryButton.label', primaryButton.label),
            onClick: action('buttons.primaryButton.onClick'),
          }}
          secondaryButton={{
            isDisabled: boolean(
              'buttons.secondaryButton.isDisabled',
              isDisabled
            ),
            label: text('buttons.secondaryButton.label', secondaryButton.label),
            onClick: action('buttons.secondaryButton.onClick'),
          }}
          isOpen
          labels={labels}
        />
      ),
    info(getGuidance(TearsheetSmall))
  )
  .add(
    'with loading',
    () => {
      const loading = true;
      const loadingMessage = 'Sending request...';

      const TearsheetSmallLoadingStory = compose(
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
      )(TearsheetSmall);

      TearsheetSmallLoadingStory.displayName = getDisplayName(TearsheetSmall);
      TearsheetSmallLoadingStory.__docgenInfo = TearsheetSmall.__docgenInfo;

      return (
        <TearsheetSmallLoadingStory
          focusTrap={focusTrap}
          heading={heading}
          loadingMessage={loadingMessage}
          description={description}
          closeButton={{
            isDisabled: boolean('buttons.closeButton.isDisabled', isDisabled),
            label: text('buttons.closeButton.label', closeButton.label),
            onClick: action('buttons.closeButton.onClick'),
          }}
          primaryButton={{
            isDisabled: boolean('buttons.primaryButton.isDisabled', isDisabled),
            label: text('buttons.primaryButton.label', primaryButton.label),
            onClick: action('buttons.primaryButton.onClick'),
          }}
          secondaryButton={{
            isDisabled: boolean(
              'buttons.secondaryButton.isDisabled',
              isDisabled
            ),
            label: text('buttons.secondaryButton.label', secondaryButton.label),
            onClick: action('buttons.secondaryButton.onClick'),
          }}
          isOpen
          loading={loading}
          labels={labels}
          body={({ isLoading }) => (
            <>
              <p>
                Whenever the TearsheetSmall is loading, please use{' '}
                <CodeSnippet type="inline" light tabIndex={isLoading ? -1 : 0}>
                  isLoading
                </CodeSnippet>{' '}
                via the{' '}
                <CodeSnippet type="inline" light tabIndex={isLoading ? -1 : 0}>
                  renderMain
                </CodeSnippet>{' '}
                render prop to prevent users from tabbing through focussable
                content (such as form inputs, buttons, and links) while the
                TearsheetSmall is loading. For example, you can selectively load
                skeleton components, or you can set
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
            <TearSheetSmall
              body={(isLoading) => (
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
                For more examples, please review the &quot;Story&quot; tab in
                the Storybook panel below to the see this demo&apos; source
                code.
              </p>
            </>
          )}
        />
      );
    },
    info(getGuidance(TearsheetSmall))
  )
  .add(
    'With open/close',
    () => {
      class TearsheetSmallStory extends React.Component {
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
              <TearsheetSmall
                focusTrap={focusTrap}
                heading={heading}
                description={description}
                closeButton={{
                  isDisabled: boolean(
                    'buttons.closeButton.isDisabled',
                    isDisabled
                  ),
                  label: text('buttons.closeButton.label', closeButton.label),
                  onClick: this.close,
                }}
                primaryButton={{
                  isDisabled: boolean(
                    'buttons.primaryButton.isDisabled',
                    isDisabled
                  ),
                  label: text(
                    'buttons.primaryButton.label',
                    primaryButton.label
                  ),
                  onClick: action('buttons.primaryButton.onClick'),
                }}
                secondaryButton={{
                  isDisabled: boolean(
                    'buttons.secondaryButton.isDisabled',
                    isDisabled
                  ),
                  label: text(
                    'buttons.secondaryButton.label',
                    secondaryButton.label
                  ),
                  onClick: this.close,
                }}
                isOpen={this.state.open}
                labels={labels}
              />
            </Fragment>
          );
        }
      }
      return <TearsheetSmallStory />;
    },
    info(getGuidance(TearsheetSmall))
  );
