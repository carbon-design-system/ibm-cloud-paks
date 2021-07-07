/**
 * @file Shell stories.
 * @copyright IBM Security 2018 - 2021
 */

import { Camera20 } from '@carbon/icons-react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { disableCenteredStories, patterns } from '../../../.storybook';

import Shell from '.';

import { IconButton, Button } from '../..';

import {
  header,
  profile,
  toolbar,
  returnToBanner,
  skipToContent,
} from './_mocks_';

const shellProps = {
  header,
  profile,
  toolbar,
};

disableCenteredStories(storiesOf(patterns('Shell'), module))
  .add('default', () => <Shell {...shellProps} />, {
    info: {
      text: `
          Basic implementation of the shell.
        `,
    },
  })
  .add(
    'with addon and skip-to-content link',
    () => (
      <div>
        <Shell
          {...shellProps}
          skipToContent={skipToContent}
          renderAddons={[
            {
              id: 'example-addon',
              tooltip: 'Example Addon Action',
              render: ({ iconClassName, className }) => (
                <IconButton
                  className={className}
                  iconClassName={iconClassName}
                  label="Example Addon"
                  onClick={action('addon click')}
                  onFocus={action('addon hovered')}
                  onMouseOver={action('addon hovered')}
                  renderIcon={Camera20}
                  tooltipDirection={IconButton.TooltipDirection.RIGHT}
                />
              ),
            },
          ]}
        />
        <div id="main" style={{ paddingLeft: '5rem' }}>
          <p>Example page content.</p>
          <Button href="#">Example button</Button>
        </div>
      </div>
    ),
    {
      info: {
        text: `
          Shell with an extra icon and a skip-to-content link.
        `,
      },
    }
  )
  .add(
    'with returnTo banner',
    () => <Shell {...shellProps} returnToBanner={returnToBanner} />,
    {
      info: {
        text: `
          Shell with a return-to banner.
        `,
      },
    }
  )
  .add(
    'with returnTo banner inc. view',
    () => (
      <Shell
        {...shellProps}
        returnToBanner={{ ...returnToBanner, view: 'Preview page title' }}
      />
    ),
    {
      info: {
        text: `
          Shell with a return-to banner and a rendered addon.
        `,
      },
    }
  )
  .add(
    'with addon, skip-to-content link and returnToBanner',
    () => (
      <div>
        <Shell
          {...shellProps}
          returnToBanner={{ ...returnToBanner, view: 'Preview page title' }}
          skipToContent={skipToContent}
          renderAddons={[
            {
              id: 'example-addon',
              tooltip: 'Example Addon Action',
              render: ({ className, iconClassName }) => (
                <IconButton
                  className={className}
                  iconClassName={iconClassName}
                  label="Example Addon"
                  onClick={action('addon click')}
                  onFocus={action('addon hovered')}
                  onMouseOver={action('addon hovered')}
                  renderIcon={Camera20}
                  tooltipDirection={IconButton.TooltipDirection.RIGHT}
                />
              ),
            },
          ]}
        />
        <div id="main" style={{ paddingLeft: '5rem', paddingTop: '2rem' }}>
          <p>Example page content.</p>
          <Button href="#">Example button</Button>
        </div>
      </div>
    ),
    {
      info: {
        text: `
          Shell with an extra icon, a return-to banner, and a skip-to-content link.
        `,
      },
    }
  );
