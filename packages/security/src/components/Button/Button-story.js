/**
 * @file Button stories.
 * @copyright IBM Security 2019 - 2021
 */

import { Add16, Add24, Search16, Search24 } from '@carbon/icons-react';

import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { settings } from 'carbon-components';
import React from 'react';

import { carbon, info } from '../../../.storybook';
import { Button, ButtonSkeleton } from '../..';

const { prefix } = settings;

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Danger button (danger)': 'danger',
  'Ghost button (ghost)': 'ghost',
  'Ghost danger button (ghost-danger)': 'ghost-danger',
};

const sizes = {
  Default: 'default',
  Field: 'field',
  'Small (sm)': 'sm',
  'Large (lg)': 'lg',
  'Extra large size (xl)': 'xl',
};

const iconsToUse = {
  Add16,
  Add24,
  Search16,
  Search24,
};

const props = {
  regular: (
    iconToUse = iconsToUse[
      (() => {
        const icons = {};

        Object.keys(iconsToUse).forEach((icon) => {
          icons[`${icon} (${icon} from '@carbon/icons-react')`] = `${icon}`;
        });

        return select(
          'Icon (icon)',
          {
            None: 'None',
            ...icons,
          },
          'none'
        );
      })()
    ]
  ) => {
    return {
      className: 'some-class',
      loading: boolean('Button loading state (loading)', false),
      kind: select('Button kind (kind)', kinds, 'primary'),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, 'default'),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      iconDescription: text(
        'Icon description (iconDescription)',
        'Button icon'
      ),
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },

  set: () => {
    return {
      className: 'some-class',
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, 'default'),
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },
};

/* eslint-disable react/prop-types */
const CustomLink = ({ children, href, ...other }) => (
  <a href={href} {...other}>
    {children}
  </a>
);
/* eslint-enable react/prop-types */

const documentation = info('', {
  story: 'button',
});

storiesOf(carbon('Button'), module)
  .add(
    'default',
    () => {
      const regularProps = props.regular();
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Button {...regularProps} className="some-class">
            Button
          </Button>
          &nbsp;
          <Button {...regularProps} href="#" className="some-class">
            Link
          </Button>
          &nbsp;
          <Button {...regularProps} as="p" href="#" className="some-class">
            Element
          </Button>
          &nbsp;
          <Button
            {...regularProps}
            as={CustomLink}
            href="#"
            className="some-class">
            Custom component
          </Button>
        </div>
      );
    },
    documentation
  )
  .add(
    'Sets of Buttons',
    () => {
      const setProps = props.set();
      return (
        <div className={`${prefix}--btn-set`}>
          <Button kind="secondary" {...setProps}>
            Secondary button
          </Button>
          <Button kind="primary" {...setProps}>
            Primary button
          </Button>
        </div>
      );
    },
    documentation
  )
  .add(
    'skeleton',
    () => (
      <div>
        <ButtonSkeleton />
        &nbsp;
        <ButtonSkeleton href="#" />
        &nbsp;
        <ButtonSkeleton small />
      </div>
    ),
    documentation
  );
