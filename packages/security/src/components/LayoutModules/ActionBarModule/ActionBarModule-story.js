/**
 * @file Action bar module stories.
 * @copyright IBM Security 2020 - 2021
 */

import {
  Add16,
  Edit16,
  Filter16,
  OverflowMenuVertical16,
  Search16,
  Table16,
} from '@carbon/icons-react';

import React from 'react';

import { getDocsParameters } from '../../../../.storybook';
import withResponsive from '../../../../.storybook/decorators';

import {
  ActionBarModule,
  ActionBarModuleItems,
  Button,
  IconButtonBar,
} from '../../..';

import getTitle from '../stories';
import page from './index.mdx';

export default {
  title: getTitle(ActionBarModule.name),
  component: ActionBarModule,
  subcomponents: { ActionBarModuleItems },
  parameters: {
    docs: { page },

    ...getDocsParameters(),
  },
  decorators: [withResponsive],
};

export const Default = () => (
  <ActionBarModule>
    <Button kind="ghost">Ghost button</Button>

    <ActionBarModuleItems>
      <IconButtonBar
        actions={[
          {
            label: 'Action 2',
            renderIcon: Search16,
          },
          {
            label: 'Action 3',
            renderIcon: Table16,
          },
          {
            label: 'Action 4',
            renderIcon: OverflowMenuVertical16,
          },
        ]}
        size="lg"
      />
    </ActionBarModuleItems>
  </ActionBarModule>
);

export const Variant = () => (
  <ActionBarModule>
    <Button
      iconDescription="Action 1"
      kind="ghost"
      renderIcon={Filter16}
      hasIconOnly
    />

    <ActionBarModuleItems>
      <IconButtonBar
        actions={[
          {
            label: 'Action 2',
            renderIcon: Add16,
          },
          {
            label: 'Action 3',
            renderIcon: Edit16,
          },
        ]}
        size="lg"
      />
    </ActionBarModuleItems>
  </ActionBarModule>
);

Variant.parameters = {
  viewMode: 'canvas',
};
