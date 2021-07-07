/**
 * @file Notification stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { carbon } from '../../../.storybook';

import {
  InlineNotification,
  NotificationActionButton,
  ToastNotification,
} from '../..';

const kinds = {
  'Error (error)': 'error',
  'Info (info)': 'info',
  'Success (success)': 'success',
  'Warning (warning)': 'warning',
};
const notificationProps = () => ({
  kind: select('The notification kind (kind)', kinds, 'info'),
  role: text('ARIA role (role)', 'alert'),
  title: text('Title (title)', 'Notification title'),
  subtitle: text('Subtitle (subtitle)', 'Subtitle text goes here.'),
  iconDescription: text(
    'Icon description (iconDescription)',
    'describes the close button'
  ),
  hideCloseButton: boolean('Hide close button (hideCloseButton)', false),
  onCloseButtonClick: action('onCloseButtonClick'),
});

storiesOf(carbon('Notifications'), module)
  .add('Toast', () => (
    <ToastNotification
      {...notificationProps()}
      caption={text('Caption (caption)', 'Time stamp [00:00:00]')}
      style={{ minWidth: '30rem', marginBottom: '.5rem' }}
    />
  ))
  .add('inline', () => (
    <InlineNotification
      {...notificationProps()}
      actions={
        <NotificationActionButton
          onClick={action('NotificationActionButton onClick')}>
          {text('Action (NotificationActionButton > children)', 'Action')}
        </NotificationActionButton>
      }
    />
  ));
