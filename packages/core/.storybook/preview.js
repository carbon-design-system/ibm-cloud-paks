/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { withCarbonTheme } from '@carbon/storybook-addon-theme/react';
import { ArgsTable, Canvas, Story, Source } from '@storybook/addon-docs/blocks';
import { withInfo } from '@storybook/addon-info';
import LinkTo from '@storybook/addon-links/react';

import { Column, Row } from 'carbon-components-react';
import React, { useEffect } from 'react';

import { pkg } from '../../cloud-cognitive/src/settings';

import index from './index.scss';

// Enable all components, whether released or not, for storybook purposes
pkg._silenceWarnings(true);
pkg.setAllComponents(true);

const Style = ({ children, styles }) => {
  const { unuse, use } = styles;

  useEffect(() => {
    use();

    return () => unuse();
  }, []);

  return children;
};

const decorators = [
  withInfo,
  (storyFn, { parameters: { styles } }) => {
    const story = storyFn();

    return (
      <div className="preview-position-fix">
        <Style styles={index}>
          {styles ? <Style styles={styles}>{story}</Style> : story}
        </Style>
      </div>
    );
  },
  withCarbonTheme,
];

const order = [
  'Cloud & Cognitive/Released',
  'Cloud & Cognitive/Canary',
  'Cloud & Cognitive/Internal',
  'Legacy',
];
const toOrder = (value) => {
  const inOrder = order.findIndex((item) => value.startsWith(item));
  // length is last index + 1
  return inOrder < 0 ? order.length : inOrder;
};

const makeViewport = (name, width, shadow) => ({
  name,
  styles: {
    border: '1px solid #1EA7FD',
    boxShadow: `0 0 50px 20px rgb(30 167 253 / ${shadow}%)`,
    width,
    // when width is fixed, leave room for a horizontal scroll bar
    height: width === '100%' ? '100%' : 'calc(100% - 12px)',
  },
});
const carbonViewports = {
  basic: makeViewport('Select a Carbon breakpoint', '100%', 0),
  smMin: makeViewport('sm (≥320px)', '320px', 25),
  smMid: makeViewport('sm — mid range', '496px', 25),
  smMax: makeViewport('sm — top of range', '671px', 25),
  mdMin: makeViewport('md (≥672px)', '672px', 20),
  mdMid: makeViewport('md — mid range', '864px', 20),
  mdMax: makeViewport('md — top of range', '1055px', 20),
  lgMin: makeViewport('lg (≥1056px)', '1056px', 15),
  lgMid: makeViewport('lg — mid range', '1184px', 15),
  lgMax: makeViewport('lg — top of range', '1311px', 15),
  xlgMin: makeViewport('xlg (≥1312px)', '1312px', 10),
  xlgMid: makeViewport('xlg — mid range', '1448px', 10),
  xlgMax: makeViewport('xlg — top of range', '1583px', 10),
  maxMin: makeViewport('max (≥1584px)', '1584px', 5),
  maxMid: makeViewport('max — mid range', '2000px', 5),
};

const parameters = {
  controls: { expanded: true, hideNoControlsWarning: true },
  docs: {
    components: {
      ArgsTable,
      Canvas,
      Column,
      LinkTo,
      Row,
      Source,
      Story,
    },
  },
  layout: 'centered',
  options: {
    storySort: (a, b) => {
      // const storybookOrder = ['Cloud & Cognitive', ['Released', 'Canary'], 'Legacy'];
      const aInOrder = toOrder(a[1].kind);
      const bInOrder = toOrder(b[1].kind);

      if (aInOrder !== bInOrder) {
        return aInOrder - bInOrder;
      } else {
        // from storybook doc example https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy
        return a[1].kind === b[1].kind
          ? 0
          : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
      }
    },
  },

  // Optional default Carbon theme.
  carbonTheme: {
    theme: 'g10',
  },

  // viewport sizes based on Carbon breakpoints
  viewport: {
    viewports: carbonViewports,
    defaultViewport: 'basic',
  },
};

export { decorators, parameters };
