/**
 * @file Icon button bar stories.
 * @copyright IBM Security 2019 - 2021
 */

import {
  Add16,
  Add20,
  Add24,
  Add32,
  Edit16,
  Edit20,
  Edit24,
  Edit32,
  Locked16,
  Locked20,
  Locked24,
  Locked32,
  Notification16,
  Notification20,
  Notification24,
  Notification32,
} from '@carbon/icons-react';

import { action } from '@storybook/addon-actions';
import { select, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { patterns } from '../../../.storybook';

import { IconButton, IconButtonBar } from '../..';

import { className, iconClassName, sizes } from '../IconButton/_mocks_';
import { TooltipDirection } from '../IconButton/IconButton';

storiesOf(patterns('IconButtonBar'), module).add(
  'default',
  () => {
    const size = select('size', sizes, 'sm');
    /* eslint-disable no-nested-ternary */
    const actions = [
      {
        className,
        divider: select(
          'Icon 1 divider (divider)',
          ['left', 'right', 'sides'],
          'sides'
        ),
        disabled: false,
        iconClassName,
        label: 'Label 1',
        onClick: action('onClick'),
        renderIcon:
          size === 'sm'
            ? Add16
            : size === 'md'
            ? Add20
            : size === 'lg'
            ? Add24
            : Add32,
      },
      {
        className,
        divider: undefined,
        disabled: false,
        iconClassName,
        label: 'Label 2',
        onClick: action('onClick'),
        renderIcon:
          size === 'sm'
            ? Edit16
            : size === 'md'
            ? Edit20
            : size === 'lg'
            ? Edit24
            : Edit32,
      },
      {
        className,
        disabled: false,
        iconClassName,
        label: 'Label 3',
        onClick: action('onClick'),
        setFocus: true,
        renderIcon:
          size === 'sm'
            ? Locked16
            : size === 'md'
            ? Locked20
            : size === 'lg'
            ? Locked24
            : Locked32,
      },
      {
        className,
        disabled: false,
        iconClassName,
        label: 'Label 4',
        onClick: action('onClick'),
        renderIcon:
          size === 'sm'
            ? Notification16
            : size === 'md'
            ? Notification20
            : size === 'lg'
            ? Notification24
            : Notification32,
      },
    ];

    return (
      <div style={{ padding: '120px' }}>
        <IconButtonBar
          length={number('length', 3)}
          size={size}
          actions={actions}
          tooltip={boolean('tooltip', IconButton.defaultProps.tooltip)}
          iconTooltipDirection={select(
            'iconTooltipDirection',
            [TooltipDirection.TOP, TooltipDirection.BOTTOM],
            TooltipDirection.TOP
          )}
          overflowMenuDirection={select(
            'overflowMenuDirection',
            [TooltipDirection.TOP, TooltipDirection.BOTTOM],
            TooltipDirection.TOP
          )}
        />
      </div>
    );
  },
  {
    info: {
      text: `
          Basic implementation of an IconButtonBar component.
        `,
    },
  }
);
