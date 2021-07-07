/**
 * @file Loading stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { number, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React, { PureComponent } from 'react';

import { carbon } from '../../../.storybook';

import { Button, InlineLoading } from '../..';

const props = () => ({
  status: select(
    'Loading status (status)',
    ['inactive', 'active', 'finished', 'error'],
    'active'
  ),
  description: text(
    'Loading progress description (description)',
    'Loading data...'
  ),
  successDelay: number(
    'The duration for successful state before `onSuccess` fires (successDelay)',
    1500
  ),
  onSuccess: action('onSuccess'),
});

storiesOf(carbon('InlineLoading'), module)
  .add('default', () => <InlineLoading {...props()} />, {
    info: "Basic implementation of an Inline Loading component. Inline Loading spinners are used when creating, updating, or deleting an item. They help notify users that their change is underway, with different states for 'loading' and 'success'.",
  })
  .add(
    'UX example',
    () => {
      class MockSubmission extends PureComponent {
        state = {
          submitting: false,
          success: false,
        };

        handleSubmit() {
          this.setState({ submitting: true });

          // Instead of making a real request, we mock it with a timer
          setTimeout(() => {
            this.setState({ submitting: false, success: true });

            // To make submittable again, we reset the state after a bit so the user gets completion feedback
            setTimeout(() => this.setState({ success: false }), 1500);
          }, 2000);
        }

        render() {
          const { children } = this.props;
          const { submitting, success } = this.state;

          const handleSubmit = this.handleSubmit.bind(this);

          return children({
            handleSubmit,
            submitting,
            success,
          });
        }
      }

      return (
        <MockSubmission>
          {({ handleSubmit, submitting, success }) => (
            <div style={{ display: 'flex', width: '300px' }}>
              <Button kind="secondary" disabled={submitting || success}>
                Cancel
              </Button>
              {submitting || success ? (
                <InlineLoading
                  style={{ marginLeft: '1rem' }}
                  description="Submitting..."
                  status={success ? 'finished' : 'active'}
                />
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          )}
        </MockSubmission>
      );
    },
    {
      info: {
        text: `
            This is a full example of how to levarage the <InlineLoading /> component to create a nice user experience when submitting a form.
    
            For the full source code of this example, check out the 'story' panel below.
          `,
      },
    }
  );
