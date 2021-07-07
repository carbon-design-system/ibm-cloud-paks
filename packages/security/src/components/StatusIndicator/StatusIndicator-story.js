/**
 * @file Status indicator stories.
 * @copyright IBM Security 2019
 */

import { action } from '@storybook/addon-actions';

import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';
import {
  compose,
  getDisplayName,
  lifecycle,
  withStateHandlers,
} from 'recompose';

import { patterns } from '../../../.storybook';

import { StatusStep, StatusIndicator } from '../..';
import { STATUS } from './StatusStep/StatusStep';

import props from './_mocks_';

const { statusIndicator, statusSteps } = props;

const { retry, title } = statusIndicator;

const storyProps = {
  statusIndicator: {
    basic: () => ({
      title: text(`Title (title)`, title),
    }),
    retry: () => {
      const { description, label } = retry;

      return {
        retry: {
          label: text(`${label} label (retry.label)`, label),
          description,
          action: action('retry.action'),
        },
      };
    },
  },
  statusSteps: () =>
    statusSteps.map(({ description, key, label, status }) => ({
      key,
      label: text(`${description} label (StatusStep[${key}].label)`, label),
      status,
      description,
      errorMsg:
        status === 'failed'
          ? text('Error message (errorMsg)', 'Error message')
          : null,
    })),
};

const { statusIndicator: statusIndicatorProps, statusSteps: statusStepsProps } =
  storyProps;

const { basic, retry: retryProps } = statusIndicatorProps;

storiesOf(patterns('StatusIndicator'), module)
  .add('Default', () => (
    <StatusIndicator {...basic()}>
      {statusStepsProps().map(({ key, ...props }) => (
        <StatusStep key={key} {...props} />
      ))}
    </StatusIndicator>
  ))
  .add('Failure', () => (
    <StatusIndicator {...basic()} {...retryProps()}>
      {statusStepsProps().map(({ key, ...props }) => (
        <StatusStep key={key} {...props} />
      ))}
    </StatusIndicator>
  ))
  .add('Dynamic', () => {
    const { COMPLETE, DEFAULT } = STATUS;

    let interval;

    const StatusIndicatorStory = compose(
      withStateHandlers(
        {
          timer: 0,
        },
        {
          updateTimer:
            ({ timer }) =>
            () => ({ timer: timer + 1 }),
        }
      ),
      lifecycle({
        componentDidMount() {
          interval = setInterval(() => {
            const { updateTimer, timer } = this.props;

            this.setState({ current: timer });
            updateTimer();

            if (timer === statusSteps.length) {
              clearInterval(interval);
            }
          }, 1000);
        },

        componentWillUnmount: () => clearInterval(interval),
      })
    )(({ current }) => {
      const retry = current === statusSteps.length && retryProps();

      return (
        <StatusIndicator {...basic()} {...retry}>
          {statusSteps.map(({ key, ...props }) => (
            <StatusStep
              key={key}
              {...props}
              status={current >= key ? COMPLETE : DEFAULT}
            />
          ))}
        </StatusIndicator>
      );
    });

    StatusIndicatorStory.displayName = getDisplayName(StatusIndicator);
    StatusIndicatorStory.__docgenInfo = StatusIndicator.__docgenInfo;

    return <StatusIndicatorStory />;
  });
