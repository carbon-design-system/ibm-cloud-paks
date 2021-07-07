/**
 * @file Status icon stories.
 * @copyright IBM Security 2019 - 2021
 */

import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { compose, getDisplayName, lifecycle } from 'recompose';
import React from 'react';

import { security } from '../../../.storybook';

import { StatusIcon } from '../..';
import { SIZE, STATUS } from './StatusIcon';

const storyProps = () => ({
  message: text('Label (message)', 'Label'),
  size: select('Size (size)', SIZE, StatusIcon.defaultProps.size),
  iconDescription: text('Icon ARIA label', 'Icon description.. '),
});

const status = STATUS[0];

storiesOf(security('StatusIcon'), module)
  .add('Default', () => <StatusIcon {...storyProps()} />)
  .add('Status', () => (
    <StatusIcon
      {...storyProps()}
      status={select('Status (status)', STATUS, status)}
    />
  ))
  .add('Dynamic', () => {
    let timeout;

    const StatusIconStory = compose(
      lifecycle({
        componentDidMount() {
          timeout = setTimeout(() => this.setState({ status }), 1000);
        },

        componentWillUnmount: () => clearTimeout(timeout),
      })
    )(StatusIcon);

    StatusIconStory.displayName = getDisplayName(StatusIcon);
    StatusIconStory.__docgenInfo = StatusIcon.__docgenInfo;

    return <StatusIconStory {...storyProps()} />;
  });
