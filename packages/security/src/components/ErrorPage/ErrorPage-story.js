/**
 * @file ErrorPage section stories.
 * @copyright IBM Security 2019
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';

import { disableCenteredStories, patterns } from '../../../.storybook';

import { ErrorPage } from '../..';

const statusCodes = {
  403: 403,
  404: 404,
  500: 500,
  'Custom error': 'Custom',
};

const props = () => ({
  statusCode: select('Status codes (statusCode)', statusCodes, 403),
  errorMessage: text('Error message (errorMessage)', ''),
  errorName: text('Error name (errorName)', ''),
  links: [
    {
      id: text('Link id (links[0].id)', 'link-example-id'),
      href: text('Link href (links[0].href)', '#'),
      text: text('Link text (links[0].text)', 'Return to...'),
    },
  ],
});

disableCenteredStories(storiesOf(patterns('ErrorPage'), module)).add(
  'default',
  () => <ErrorPage {...props()} />
);
