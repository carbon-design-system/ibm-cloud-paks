/**
 * @file Scroll gradient stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { color, boolean } from '@storybook/addon-knobs';

import { security } from '../../../.storybook';

import { ScrollGradient, theme } from '../..';
import { className, children } from './_mocks_';

const gradientColor = theme.uiBackground;

const style = {
  width: '300px',
  height: '300px',
};

storiesOf(security('ScrollGradient'), module)
  .add(
    'vertical scrolling',
    () => (
      <ScrollGradient
        color={color('color', gradientColor)}
        style={style}
        className={className}>
        {children}
      </ScrollGradient>
    ),
    {
      info: {
        text: `
        Vertical implementation of scroll gradient component that adds and removes top and bottom fade outs based on scrolling position.
      `,
      },
    }
  )
  .add(
    'horizontal scrolling',
    () => (
      <ScrollGradient
        color={color('color', gradientColor)}
        style={style}
        className={className}
        direction={ScrollGradient.ScrollDirection.X}>
        <div style={{ width: '200%' }}>{children}</div>
      </ScrollGradient>
    ),
    {
      info: {
        text: `
        Horizontal implementation of scroll gradient component that adds and removes left and right fade outs based on scrolling position.
      `,
      },
    }
  )
  .add(
    'with no start gradient',
    () => (
      <ScrollGradient
        color={color('color', gradientColor)}
        hideStartGradient={boolean('hideStartGradient', true)}
        style={style}
        className={className}>
        {children}
      </ScrollGradient>
    ),
    {
      info: {
        text: `
        Optionally hide start gradient on top or left depending on scroll direction.
      `,
      },
    }
  )
  .add(
    'with no scrolling content',
    () => (
      <ScrollGradient
        color={color('color', gradientColor)}
        style={style}
        className={className}>
        <p>
          Content fits completely within content area, so neither scrollbar nor
          scroll gradients are necessary.
        </p>
      </ScrollGradient>
    ),
    {
      info: {
        text: `
        This component does not render gradients if the content can fit completely within the allowed area.
      `,
      },
    }
  )
  .add(
    'with internal gradients',
    () => (
      <ScrollGradient
        color={color('color', gradientColor)}
        style={style}
        className={className}>
        <p>Content before the scrollable element.</p>

        <ScrollGradient
          color={color('child color (color)', gradientColor)}
          style={{ height: '6rem', margin: '1rem 0' }}>
          <p>Does not need to scroll so does not have a gradient.</p>
        </ScrollGradient>

        <p>Content after the scrollable element.</p>

        {children}
      </ScrollGradient>
    ),
    {
      info: {
        text: `
      This story demonstrates that the scroll gradient state of a parent does not affect the scroll state of a child scroll gradient.
    `,
      },
    }
  );
