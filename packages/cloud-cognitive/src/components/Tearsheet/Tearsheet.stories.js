/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { pkg } from '../../settings';
import '../../utils/enable-all'; // must come before component is imported (directly or indirectly)
import { Button, Tab, Tabs } from 'carbon-components-react';

import { Tearsheet, TearsheetNarrow } from '.';

import { getStorybookPrefix } from '../../../config';
const storybookPrefix = getStorybookPrefix(pkg, Tearsheet.displayName);

import styles from './_storybook-styles.scss';

import mdx from './Tearsheet.mdx';

export default {
  title: `${storybookPrefix}/Tearsheets/${Tearsheet.displayName}`,
  component: Tearsheet,
  subcomponents: {
    TearsheetNarrow,
  },
  parameters: { styles, docs: { page: mdx } },
  argTypes: {
    buttonSet: {
      control: {
        type: 'select',
        options: {
          'Two buttons': 0,
          'Three buttons with ghost': 1,
          'Three buttons': 2,
          'Four buttons': 3,
          None: 4,
        },
        default: 0,
      },
    },
    className,
    closeIconDescription: {},
    description: {
      control: {
        type: 'text',
      },
    },
    hasCloseIcon: {},
    height: {},
    label: {
      control: {
        type: 'text',
      },
    },
    influencerPosition: {},
    influencerWidth: {},
    preventCloseOnClickOutside: {},
    title: {
      control: {
        type: 'text',
      },
    },
    buttons: {
      control: {
        disable: true,
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
    influencer: {
      control: {
        disable: true,
      },
    },
    onClose: {
      control: {
        disable: true,
      },
    },
    navigation: {
      control: {
        disable: true,
      },
    },
    open: {
      control: {
        disable: true,
      },
    },
  },
};

// Test values for props.

const buttons_1 = (
  <div className="tearsheet-stories__buttons">
    <Button
      kind="secondary"
      className="tearsheet-stories__button-25"
      onClick={action('Secondary button click')}>
      Cancel
    </Button>
    <Button
      className="tearsheet-stories__button-25"
      onClick={action('Primary button click')}>
      Create
    </Button>
  </div>
);
const buttons_2 = (
  <div className="tearsheet-stories__buttons">
    <Button
      kind="ghost"
      className="tearsheet-stories__button-25"
      onClick={action('Ghost button click')}>
      Cancel
    </Button>
    <div className="tearsheet-stories__button-padding"></div>
    <Button
      kind="secondary"
      className="tearsheet-stories__button-25"
      onClick={action('Secondary button click')}>
      Back
    </Button>
    <Button
      className="tearsheet-stories__button-25"
      onClick={action('Primary button click')}>
      Next
    </Button>
  </div>
);
const buttons_3 = (
  <div className="tearsheet-stories__buttons">
    <Button
      kind="secondary"
      className="tearsheet-stories__button-25"
      onClick={action('Secondary button click')}>
      Keep both
    </Button>
    <Button
      kind="secondary"
      className="tearsheet-stories__button-25"
      onClick={action('Secondary button click')}>
      Stop
    </Button>
    <Button
      className="tearsheet-stories__button-25"
      onClick={action('Primary button click')}>
      Replace
    </Button>
  </div>
);
const buttons_4 = (
  <div className="tearsheet-stories__buttons">
    <Button
      kind="ghost"
      className="tearsheet-stories__button-25"
      onClick={action('Ghost button click')}>
      Cancel
    </Button>
    <div className="tearsheet-stories__button-padding"></div>
    <Button
      kind="secondary"
      className="tearsheet-stories__button-25"
      onClick={action('Secondary button click')}>
      Keep both
    </Button>
    <Button
      kind="secondary"
      className="tearsheet-stories__button-25"
      onClick={action('Secondary button click')}>
      Stop
    </Button>
    <Button
      className="tearsheet-stories__button-25"
      onClick={action('Primary button click')}>
      Replace
    </Button>
  </div>
);
const buttonSets = [buttons_1, buttons_2, buttons_3, buttons_4];

const className = 'client-class-1 client-class-2';

const closeIconDescription = 'Close the tearsheet';

const description = (
  <span>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat.
  </span>
);

const influencer = (
  <div className="tearsheet-stories__dummy-content-block">Influencer</div>
);

const label = 'The label of the tearsheet';

const mainContent = (
  <div className="tearsheet-stories__dummy-content-block">Main content</div>
);

const tabs = (
  <div className="tearsheet-stories__tabs">
    <Tabs onSelectionChange={action('Tab selection changed')}>
      <Tab label="Tab 1" />
      <Tab label="Tab 2" />
      <Tab label="Tab 3" />
      <Tab label="Tab 4" />
    </Tabs>
  </div>
);

const title = 'Title of the tearsheet';

// Template.
// eslint-disable-next-line react/prop-types
const Template = ({ buttonSet, ...args }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`.${pkg.prefix}-tearsheet { opacity: 0 }`};</style>
      <Button onClick={() => setOpen(true)}>Open Tearsheet</Button>
      <Tearsheet
        className={className}
        {...args}
        buttons={buttonSets[buttonSet]}
        open={open}
        onClose={() => setOpen(false)}>
        {mainContent}
      </Tearsheet>
    </>
  );
};

// Stories
export const AllAttributesSet = Template.bind({});
AllAttributesSet.args = {
  closeIconDescription,
  description,
  hasCloseIcon: true,
  height: 'normal',
  influencer,
  influencerPosition: 'left',
  influencerWidth: 'narrow',
  label,
  navigation: tabs,
  onClose: action('onClose called'),
  open: true,
  preventCloseOnClickOutside: true,
  title,
  buttonSet: 0,
};

export const NoAttributesSet = Template.bind({});
NoAttributesSet.args = {};

export const NoHeaderNavigation = Template.bind({});
NoHeaderNavigation.args = {
  closeIconDescription,
  description,
  hasCloseIcon: true,
  height: 'normal',
  influencer,
  influencerPosition: 'left',
  influencerWidth: 'narrow',
  label,
  onClose: action('onClose called'),
  open: true,
  preventCloseOnClickOutside: true,
  title,
  buttonSet: 0,
};

export const NoHeaderNavigationOrInfluencer = Template.bind({});
NoHeaderNavigationOrInfluencer.args = {
  closeIconDescription,
  description,
  hasCloseIcon: true,
  height: 'normal',
  label,
  onClose: action('onClose called'),
  open: true,
  preventCloseOnClickOutside: true,
  title,
  buttonSet: 0,
};
