//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
// import { action } from '@storybook/addon-actions';

import {
  BreadcrumbItem,
  Column,
  Grid,
  Header,
  HeaderName,
  Row,
  Tab,
  Tabs,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from 'carbon-components-react';
import { CheckmarkFilled16 } from '@carbon/icons-react';
import {
  Lightning16,
  Bee24,
  Printer16,
  Security24,
  Settings16,
  VolumeMute16,
} from '@carbon/icons-react';

import { pkg, carbon } from '../../settings';
import { getDeprecatedArgTypes } from '../../global/js/utils/props-helper';
import { getStorybookPrefix } from '../../../config';
import { ActionBarItem } from '../ActionBar';
import { PageHeader, deprecatedProps } from './PageHeader';
const storybookPrefix = getStorybookPrefix(pkg, PageHeader.displayName);

import { demoTableHeaders, demoTableData } from './PageHeaderDemo.data';

import styles from './_storybook-styles.scss'; // import index in case more files are added later.
import mdx from './PageHeader.mdx';

const storyClass = 'page-header-stories';

export default {
  title: `${storybookPrefix}/${PageHeader.displayName}`,
  component: PageHeader,
  subcomponents: {
    ActionBarItem,
  },
  parameters: { styles, layout: 'fullscreen', docs: { page: mdx } },
  decorators: [
    (story) => <div className={`${storyClass}__viewport`}>{story()}</div>,
  ],
  argTypes: getDeprecatedArgTypes(deprecatedProps),
};

// Test values for props.

const actionBarItems = [1, 2, 3, 4].map((item) => ({
  key: `a-key-${item}`,
  renderIcon: Lightning16,
  iconDescription: `Action ${item}`,
}));

const actionBarOverflowAriaLabel = 'Show further action bar items';

const manyActionBarItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
  key: `a-key-${item}`,
  renderIcon: Lightning16,
  iconDescription: `Action ${item}`,
}));

const breadcrumbItems = (
  <>
    <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
  </>
);
const manyBreadcrumbItems = (
  <>
    <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 4</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 6</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 7</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 8</BreadcrumbItem>
  </>
);
const breadcrumbOverflowAriaLabel =
  'Open and close additional breadcrumb item list.';

const className = 'client-class-1 client-class-2';
const dummyPageContent = (
  <Grid className={`${storyClass}__dummy-content`} narrow={true}>
    <Row>
      <Column
        sm={1}
        md={2}
        lg={4}
        className={`${storyClass}__dummy-content-block`}>
        <div className={`${storyClass}__dummy-content-text`}>Column #1</div>
      </Column>
      <Column
        sm={1}
        md={2}
        lg={4}
        className={`${storyClass}__dummy-content-block`}>
        <div className={`${storyClass}__dummy-content-text`}>Column #2</div>
      </Column>
      <Column
        sm={2}
        md={4}
        lg={8}
        className={`${storyClass}__dummy-content-block`}>
        <div className={`${storyClass}__dummy-content-text`}>Column #3</div>
      </Column>
    </Row>
  </Grid>
);
const pageActions = [
  {
    key: 'secondary',
    kind: 'secondary',
    label: 'Secondary button',
    onClick: () => {},
  },
  {
    key: 'primary',
    kind: 'primary',
    label: 'Primary button',
    onClick: () => {},
  },
];
const pageActionsOverflowLabel = 'Page actions...';

const manyPageActions = [
  {
    key: '1',
    kind: 'danger',
    label: 'Secondary 1',
    onClick: () => {},
  },
  {
    key: '2',
    kind: 'secondary',
    label: 'Secondary 2',
    onClick: () => {},
  },
  {
    key: '3',
    kind: 'primary',
    label: 'Primary',
    onClick: () => {},
  },
];

const statusIndicator = (
  <>
    <CheckmarkFilled16 className={`${storyClass}__status-icon`} /> Running
  </>
);
const subtitle = 'Optional subtitle if necessary';
const longSubtitle =
  'Optional subtitle if necessary, which is very long in this case, but will need to be handled somehow. It just keeps going on and on and on and on and on.';
// cspell: disable
const summaryDetails = (
  <div style={{ display: 'flex' }}>
    <p
      style={{
        // stylelint-disable-next-line carbon/layout-token-use
        marginRight: '50px',
        maxWidth: '400px',
      }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.
    </p>
    <p>
      Property: Value
      <br />
      Property: Value
      <br />
      Property: Value
    </p>
  </div>
);
// cspell: enable
const tabBar = (
  <Tabs>
    <Tab label="Tab 1" />
    <Tab label="Tab 2" />
    <Tab label="Tab 3" />
    <Tab label="Tab 4" />
  </Tabs>
);
const longTabBar = (
  <Tabs>
    <Tab label="Tab 1" />
    <Tab label="Tab 2" />
    <Tab label="Tab 3" />
    <Tab label="Tab 4" />
    <Tab label="Tab 5" />
    <Tab label="Tab 6" />
    <Tab label="Tab 7" />
    <Tab label="Tab 8" />
  </Tabs>
);

const tags = [
  { type: 'blue', label: 'A tag' },
  { type: 'green', label: 'A tag' },
  { type: 'warm-gray', label: 'A tag' },
  { type: 'purple', label: 'A tag' },
];

const manyTags = [
  { type: 'blue', label: 'Blue' },
  { type: 'green', label: 'Green' },
  { type: 'warm-gray', label: 'Warm gray' },
  { type: 'purple', label: 'Purple' },
  { type: 'red', label: 'Red' },
  { type: 'teal', label: 'Teal' },
  { type: 'red', label: 'Longer ThanAPieceOfString' },
  { type: 'high-contrast', label: 'High contrast' },
  { type: 'magenta', label: 'Magenta' },
  { type: 'blue', label: 'Blue 2' },
  { type: 'green', label: 'Green 2' },
  { type: 'warm-gray', label: 'Warm gray 2' },
  { type: 'purple', label: 'Purple 2' },
  { type: 'red', label: 'Red 2' },
  { type: 'teal', label: 'Teal 2' },
  { type: 'red', label: 'Longer ThanAPieceOfString 2' },
  { type: 'high-contrast', label: 'High contrast 2' },
  { type: 'magenta', label: 'Magenta 2' },
];

const title = { text: 'Page title', loading: false, icon: Bee24 };
const longTitle = {
  text: 'A very long page title that is going to exceed 60% of the stage width and get truncated on large screens',
  loading: false,
  icon: Bee24,
};

// Template.
const Template = (args) => {
  const { children, ...props } = args;

  return (
    <>
      <style>{`.${carbon.prefix}--modal { opacity: 0; }`};</style>
      <PageHeader className={className} {...props}>
        {children}
      </PageHeader>
      {dummyPageContent}
    </>
  );
};

// Stories
export const AllAttributesSet = Template.bind({});
AllAttributesSet.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  actionBarItems,
  actionBarOverflowAriaLabel,
  title,
  pageActions,
  pageActionsOverflowLabel,
  subtitle,
  children: summaryDetails,
  navigation: tabBar,
  tags,
};

export const NoAttributesSet = Template.bind({});
NoAttributesSet.args = {};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title,
};

export const TitleAndPageActions = Template.bind({});
TitleAndPageActions.args = {
  title,
  pageActions,
  pageActionsOverflowLabel,
};

export const BreadcrumbItemsAndTitle = Template.bind({});
BreadcrumbItemsAndTitle.args = {
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
};

export const BreadcrumbItemsTitleAndPageActions = Template.bind({});
BreadcrumbItemsTitleAndPageActions.args = {
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  pageActions,
  pageActionsOverflowLabel,
};

export const BreadcrumbItemsTitleAndStatus = Template.bind({});
BreadcrumbItemsTitleAndStatus.args = {
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  children: statusIndicator,
};

export const BreadcrumbItemsTitleTabs = Template.bind({});
BreadcrumbItemsTitleTabs.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  navigation: tabBar,
};

export const BreadcrumbItemsTitleIconTabs = Template.bind({});
BreadcrumbItemsTitleIconTabs.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  titleIcon: Bee24,
  navigation: tabBar,
};

export const BreadcrumbItemsTitlePageActionsTabs = Template.bind({});
BreadcrumbItemsTitlePageActionsTabs.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  pageActions,
  pageActionsOverflowLabel,
  navigation: tabBar,
};

export const BreadcrumbItemsTitlePageActionsTags = Template.bind({});
BreadcrumbItemsTitlePageActionsTags.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  pageActions,
  pageActionsOverflowLabel,
  tags,
};

export const BreadcrumbItemsTitleTabsTags = Template.bind({});
BreadcrumbItemsTitleTabsTags.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  navigation: tabBar,
  tags,
};

export const BreadcrumbItemsActionBarTitlePageActionsTabsTags = Template.bind(
  {}
);
BreadcrumbItemsActionBarTitlePageActionsTabsTags.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  actionBarItems,
  actionBarOverflowAriaLabel,
  title,
  pageActions,
  pageActionsOverflowLabel,
  navigation: tabBar,
};

export const BreadcrumbItemsActionBar = Template.bind({});
BreadcrumbItemsActionBar.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  actionBarItems,
  actionBarOverflowAriaLabel,
  collapseTitle: true,
  title,
};

export const BreadcrumbItemsTitlePageActionsSubtitle = Template.bind({});
BreadcrumbItemsTitlePageActionsSubtitle.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  pageActions,
  pageActionsOverflowLabel,
  subtitle,
};

export const BreadcrumbItemsTitlePageActionsSummarydetailsTabs = Template.bind(
  {}
);
BreadcrumbItemsTitlePageActionsSummarydetailsTabs.args = {
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  title,
  pageActions,
  pageActionsOverflowLabel,
  children: summaryDetails,
  navigation: tabBar,
};

export const AllAttributesSetKeepsBreadcrumbTabs = Template.bind({});
AllAttributesSetKeepsBreadcrumbTabs.args = {
  disableBreadcrumbScroll: true,
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  actionBarItems,
  actionBarOverflowAriaLabel,
  title,
  pageActions,
  pageActionsOverflowLabel,
  subtitle,
  children: summaryDetails,
  navigation: tabBar,
  tags,
};

export const AllAttributesSetPreCollapseTitle = Template.bind({});
AllAttributesSetPreCollapseTitle.args = {
  collapseTitle: true,
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  actionBarItems,
  actionBarOverflowAriaLabel,
  title,
  pageActions,
  pageActionsOverflowLabel,
  subtitle,
  children: summaryDetails,
  navigation: tabBar,
  tags,
};

export const LongValuesManyItems = Template.bind({});
LongValuesManyItems.args = {
  hasBackgroundAlways: true,
  breadcrumbItems: manyBreadcrumbItems,
  breadcrumbOverflowAriaLabel,
  actionBarItems: manyActionBarItems,
  actionBarOverflowAriaLabel,
  title: longTitle,
  pageActions: manyPageActions,
  pageActionsOverflowLabel,
  subtitle: longSubtitle,
  children: summaryDetails,
  navigation: longTabBar,
  tags: manyTags,
  allTagsModalTitle: 'All tags',
  allTagsModalSearchLabel: 'Search all tags',
  allTagsModalSearchPlaceholderText: 'Search all tags',
  showAllTagsLabel: 'View all tags',
};

const includeTheseArgs = (args) => {
  const result = {};

  const keys = Object.keys(args);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!key.endsWith('SwitchedArg')) {
      const switchedArg = args[`${key}SwitchedArg`];
      if (switchedArg !== false) {
        result[key] = args[key];
      }
    }
  }
  return result;
};

const TemplateWithSwitchedArgs = (args) => {
  return (
    <>
      <PageHeader className="example-class-name" {...includeTheseArgs(args)} />
      {dummyPageContent}
    </>
  );
};

export const AllAttributesWithSwitches = TemplateWithSwitchedArgs.bind({});
AllAttributesWithSwitches.args = {
  actionBarItems,
  actionBarItemsSwitchedArg: true,
  actionBarOverflowAriaLabel,
  children: summaryDetails,
  childrenSwitchedArg: true,
  hasBackgroundAlways: true,
  breadcrumbItems,
  breadcrumbItemsSwitchedArg: true,
  breadcrumbOverflowAriaLabel,
  disableBreadcrumbScroll: false,
  navigation: tabBar,
  navigationSwitchedArg: true,
  pageActions,
  pageActionsSwitchedArg: true,
  pageActionsOverflowLabel,
  collapseTitle: false,
  subtitle,
  subtitleSwitchedArg: true,
  tags,
  tagsSwitchedArg: true,
  title,
  titleSwitchedArg: true,
};

const TemplatePageHeaderWithCarbonHeader = (args) => {
  return (
    <>
      <style>{`.${carbon.prefix}--modal { opacity: 0; }`};</style>
      <div className={`${storyClass}__app`}>
        <Header aria-label="IBM Platform Name">
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
        </Header>
        <div
          className={`${storyClass}__content-container`}
          style={{
            // stylelint-disable-next-line carbon/layout-token-use
            marginTop: '48px',
          }}>
          <PageHeader
            className="example-class-name"
            {...includeTheseArgs(args)}
          />
          <div className={`${storyClass}__inner-content`}>
            {dummyPageContent}
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Demo template using more realistic sample data from PageHeaderDemo.data.js
 */
export const PageHeaderWithCarbonHeader =
  TemplatePageHeaderWithCarbonHeader.bind({});
PageHeaderWithCarbonHeader.args = {
  actionBarItems,
  actionBarItemsSwitchedArg: true,
  actionBarOverflowAriaLabel,
  children: summaryDetails,
  childrenSwitchedArg: true,
  hasBackgroundAlways: true,
  breadcrumbItems,
  breadcrumbItemsSwitchedArg: true,
  breadcrumbOverflowAriaLabel,
  disableBreadcrumbScroll: false,
  navigation: tabBar,
  navigationSwitchedArg: true,
  pageActions,
  pageActionsSwitchedArg: true,
  pageActionsOverflowLabel,
  collapseTitle: false,
  subtitle,
  subtitleSwitchedArg: true,
  tags,
  tagsSwitchedArg: true,
  title,
  titleSwitchedArg: true,
};

const TemplateDemo = () => {
  return (
    <>
      <style>{`.${carbon.prefix}--modal { opacity: 0; }`};</style>
      <div className={`${storyClass}__app`}>
        <Header aria-label="IBM Platform Name">
          <HeaderName href="#" prefix="IBM">
            Cloud Cognitive application
          </HeaderName>
        </Header>
        <div
          className={`${storyClass}__content-container`}
          style={{
            // stylelint-disable-next-line carbon/layout-token-use
            marginTop: '48px',
          }}>
          <PageHeader
            breadcrumbOverflowAriaLabel="Open and close additional breadcrumb item list."
            breadcrumbItems={
              <>
                <BreadcrumbItem href="../../../homepage">
                  Homepage
                </BreadcrumbItem>
                <BreadcrumbItem href="../../Reports">Reports</BreadcrumbItem>
                <BreadcrumbItem href="../June2021">June 2021</BreadcrumbItem>
              </>
            }
            actionBarItems={[
              { key: '1', renderIcon: Printer16, iconDescription: `Print` },
              { key: '2', renderIcon: Settings16, iconDescription: `Settings` },
              { key: '3', renderIcon: VolumeMute16, iconDescription: `Mute` },
            ]}
            actionBarOverflowAriaLabel="Show more action bar items"
            title={{
              text: 'Authentication activity',
              loading: false,
              icon: Security24,
            }}
            disableBreadcrumbScroll
            pageActions={[
              {
                key: 'acknowledge',
                kind: 'secondary',
                label: 'Acknowledge',
                onClick: () => {},
              },
              {
                key: 'escalate',
                kind: 'primary',
                label: 'Escalate',
                onClick: () => {},
              },
            ]}
            pageActionsOverflowLabel="Page actions..."
            subtitle="This report details the monthly authentication failures"
            navigation={
              <Tabs>
                <Tab label="Summary" />
                <Tab label="Region 1" />
                <Tab label="Region 2" />
                <Tab label="Region 3" />
              </Tabs>
            }
            tags={[
              {
                type: 'cyan',
                label: 'Not urgent',
              },
              {
                type: 'red',
                label: 'Security',
              },
            ]}>
            <p>Severity 1: 0</p>
            <p>Severity 1: 814</p>
            <p>Severity 3: 3,108</p>
          </PageHeader>
          {
            <Grid className={`${storyClass}__dummy-content`} narrow={true}>
              <Row>
                <Column
                  sm={4}
                  md={8}
                  lg={16}
                  className={`${storyClass}__dummy-content-block`}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {demoTableHeaders.map((header) => (
                          <TableHeader key={header}>{header}</TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {demoTableData.map((row) => (
                        <TableRow key={row.Index}>
                          {Object.keys(row).map((key) => {
                            return <TableCell key={key}>{row[key]}</TableCell>;
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>{' '}
                </Column>
              </Row>
            </Grid>
          }
        </div>
      </div>
    </>
  );
};

export const PageHeaderDemo = TemplateDemo.bind({});
