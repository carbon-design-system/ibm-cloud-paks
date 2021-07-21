//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { action } from '@storybook/addon-actions';

import { pkg } from '../../settings';
import { BreadcrumbWithOverflow } from '.';
import { getStorybookPrefix } from '../../../config';

const storybookPrefix = getStorybookPrefix(
  pkg,
  BreadcrumbWithOverflow.displayName
);

export default {
  title: `${storybookPrefix}/${BreadcrumbWithOverflow.displayName}`,
  component: BreadcrumbWithOverflow,
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 20, max: 800, step: 10 },
    },
    lastBreadcrumb: {
      control: {
        type: 'select',
        options: [
          'A short title',
          'A slightly longer length title',
          'Breadcrumb 5 is a longer breadcrumb it could go on for much longer than expected',
        ],
      },
      defaultValue: 'A short title',
    },
    lastBreadcrumbIsCurrent: { control: { type: 'boolean' } },
  },
  decorators: [
    (story) => <div className={`ccs-sb__display-box`}>{story()}</div>,
  ],
};

const breadcrumbItems = [
  {
    key: '1',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 1 click')();
    },
    label: 'Breadcrumb 1',
  },
  {
    key: '2',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 2 click')();
    },
    label: 'Breadcrumb 2',
  },
  {
    key: '3',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 3 click')();
    },
    label: 'Breadcrumb 3',
  },
  {
    key: '4',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 4 click')();
    },
    label: <span>Breadcrumb 4</span>,
    title: 'Breadcrumb 4 title',
  },
];

const Template = (argsIn) => {
  const {
    breadcrumbs,
    containerWidth,
    lastBreadcrumb,
    lastBreadcrumbIsCurrent,
    ...args
  } = {
    ...argsIn,
  };

  const isCurrentPage = !!lastBreadcrumbIsCurrent;

  const breadcrumbsWithLastItem = [...breadcrumbs].concat({
    key: 'last one',
    href: isCurrentPage ? null : '/#',
    isCurrentPage: isCurrentPage,
    label: <span>{lastBreadcrumb}</span>,
    title: lastBreadcrumb,
  });

  return (
    <div style={{ width: containerWidth }}>
      <BreadcrumbWithOverflow {...args} breadcrumbs={breadcrumbsWithLastItem} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  breadcrumbs: breadcrumbItems,
  containerWidth: 500,
  overflowAriaLabel: 'Open and close additional breadcrumb item list.',
};
