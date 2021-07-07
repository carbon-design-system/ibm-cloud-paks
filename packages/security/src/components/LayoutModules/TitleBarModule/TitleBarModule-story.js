/**
 * @file Title bar module stories.
 * @copyright IBM Security 2020 - 2021
 */

import { Add16, Edit16, Filter16 } from '@carbon/icons-react';
import React from 'react';

import { getDocsParameters } from '../../../../.storybook';
import withResponsive from '../../../../.storybook/decorators';

import { IconButtonBar, TitleBarModule } from '../../..';

import getTitle from '../stories';
import page from './index.mdx';

export default {
  title: getTitle(TitleBarModule.name),
  component: TitleBarModule,
  args: {
    title: 'Section title',
  },
  parameters: {
    docs: { page },

    ...getDocsParameters(),
  },
  decorators: [withResponsive],
};

export const Default = (args) => <TitleBarModule {...args} />;

export const Variant = () => (
  <TitleBarModule title="Sub-section title" subsection>
    <IconButtonBar
      actions={[
        {
          label: 'Action 1',
          renderIcon: Add16,
        },
        {
          label: 'Action 2',
          renderIcon: Edit16,
        },
        {
          label: 'Action 3',
          renderIcon: Filter16,
        },
      ]}
      size="lg"
    />
  </TitleBarModule>
);

Variant.parameters = {
  viewMode: 'canvas',
};
