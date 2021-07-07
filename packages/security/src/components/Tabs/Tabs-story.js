/**
 * @file Tabs stories.
 * @copyright IBM Security 2019 - 2021
 */

import { breakpoints } from '@carbon/layout';

import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { carbon } from '../../../.storybook';

import { Tabs, Tab, TabsSkeleton } from '../..';

const props = {
  tabs: () => ({
    className: 'some-class',
    selected: number('The index of the selected tab (selected in <Tabs>)', 1),
    triggerHref: text(
      'The href of trigger button for narrow mode (triggerHref in <Tabs>)',
      '#'
    ),
    role: text('ARIA role (role in <Tabs>)', 'navigation'),
    iconDescription: text(
      'The description of the trigger icon for narrow mode (iconDescription in <Tabs>)',
      'show menu options'
    ),
    onClick: action('onClick'),
    onKeyDown: action('onKeyDown'),
    onSelectionChange: action('onSelectionChange'),
    tabContentClassName: text(
      'The className for the child `<TabContent>` components',
      'tab-content'
    ),
  }),
  tab: () => ({
    disabled: boolean('Disabled (disabled in <Tab>)', false),
    href: text('The href for tab (href in <Tab>)', '#'),
    role: text('ARIA role (role in <Tab>)', 'presentation'),
    tabIndex: number('Tab index (tabIndex in <Tab>)', 0),
    onClick: action('onClick'),
    onKeyDown: action('onKeyDown'),
  }),
};

const CustomLabel = ({ text }) => <span>{text}</span>;

const TabContentRenderedOnlyWhenSelected = ({ selected, children, ...other }) =>
  !selected ? null : (
    <div {...other} selected={selected}>
      {children}
    </div>
  );

storiesOf(carbon('Tabs'), module)
  .addDecorator((story) => (
    <div style={{ minWidth: breakpoints.md.width }}>{story()}</div>
  ))
  .add(
    'Default',
    () => (
      <Tabs {...props.tabs()}>
        <Tab {...props.tab()} label="Tab label 1">
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for first tab goes here.
          </div>
        </Tab>
        <Tab {...props.tab()} label="Tab label 2">
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for second tab goes here.
          </div>
        </Tab>
        <Tab
          {...props.tab()}
          label="Tab label 3"
          renderContent={TabContentRenderedOnlyWhenSelected}>
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for third tab goes here.
          </div>
        </Tab>
        <Tab {...props.tab()} label={<CustomLabel text="Custom Label" />}>
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for fourth tab goes here.
          </div>
        </Tab>
      </Tabs>
    ),
    {
      info: {
        text: `
            Tabs are used to quickly navigate between views within the same context. Create individual
            Tab components for each item in the Tabs list.
          `,
      },
    }
  )
  .add('skeleton', () => <TabsSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
