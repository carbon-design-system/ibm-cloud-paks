/**
 * @file List item module stories.
 * @copyright IBM Security 2021
 */

import {
  Bee16,
  InProgress16,
  Locked16,
  UserAvatar20,
} from '@carbon/icons-react';

import { action } from '@storybook/addon-actions';

import React from 'react';

import { getDocsParameters } from '../../../../.storybook';
import withResponsive from '../../../../.storybook/decorators';

import { ICA, ListItemModule, ProfileImage, StatusIcon, Tag } from '../../..';

import getTitle from '../stories';
import page from './index.mdx';

export default {
  title: getTitle(ListItemModule.name),
  component: ListItemModule,
  parameters: {
    docs: { page },

    ...getDocsParameters(),
  },
  decorators: [withResponsive],
};

export const Default = () => (
  <ListItemModule href="#">
    {({ Column, getLayoutProps }) => {
      const { avatar, component, description, icon, label, title } =
        getLayoutProps();

      return (
        <>
          <Column>
            <Bee16 {...icon} />
          </Column>

          <Column>
            {console.log()}
            <h2 {...title}>List title</h2>

            <p {...description}>
              Description here. It can go up to three lines before truncating.
            </p>

            <section {...component}>Nested Component</section>

            <span {...label}>Time stamp / label</span>

            <UserAvatar20 {...avatar} />
            <UserAvatar20 {...avatar} />
            <UserAvatar20 {...avatar} />
          </Column>

          <Column>
            <Locked16 />
          </Column>
        </>
      );
    }}
  </ListItemModule>
);

export const NonInteractive = () => (
  <ListItemModule>
    {({ Column, getLayoutProps }) => {
      const { label, title } = getLayoutProps();

      return (
        <Column>
          <h2 {...title}>List title</h2>

          <span {...label}>Label</span>
        </Column>
      );
    }}
  </ListItemModule>
);

export const AsButton = () => (
  <ListItemModule onClick={action('onClick')}>
    {({ Column, getLayoutProps }) => {
      const { label, title } = getLayoutProps();

      return (
        <Column>
          <h2 {...title}>List title</h2>

          <span {...label}>Label</span>
        </Column>
      );
    }}
  </ListItemModule>
);

export const WithProfileImage = () => (
  <ListItemModule href="#">
    {({ Column, getLayoutProps }) => {
      const { label, description, profileimage } = getLayoutProps();

      return (
        <>
          <Column>
            <ProfileImage
              {...profileimage}
              profile={{
                description: <span>Profile Image</span>,
                image_url: null,
                name: {
                  first_name: 'Sample',
                  surname: 'User',
                },
              }}
            />
          </Column>

          <Column>
            <p {...description}>
              Description here. It can go up to three lines before truncating.
            </p>

            <span {...label}>Today 11:50 AM</span>
          </Column>
        </>
      );
    }}
  </ListItemModule>
);

export const WithTag = () => (
  <ListItemModule href="#">
    {({ Column, getLayoutProps }) => {
      const { title, farsidecolumn } = getLayoutProps();

      return (
        <>
          <Column>
            <h2 {...title}>Bill Callahan</h2>
          </Column>

          <Column {...farsidecolumn}>
            <Tag>16</Tag>
          </Column>
        </>
      );
    }}
  </ListItemModule>
);

export const WithComponent = () => (
  <ListItemModule href="#">
    {({ Column, getLayoutProps }) => {
      const { component, description, icon, title } = getLayoutProps();

      return (
        <Column>
          <Bee16 {...icon} />

          <h2 {...title}>List title</h2>

          <p {...description}>
            Description here. It can go up to three lines before truncating.
          </p>

          <section {...component}>
            <ICA label="Label" value={100} />
          </section>
        </Column>
      );
    }}
  </ListItemModule>
);

export const WithStatusIcon = () => (
  <ListItemModule href="#">
    {({ Column, getLayoutProps }) => {
      const { farsidecolumn, label, title } = getLayoutProps();

      return (
        <>
          <Column>
            <h2 {...title}>GPON vulnerability exploited</h2>

            <span {...label}>Threat activity</span>
          </Column>

          <Column {...farsidecolumn}>
            <StatusIcon iconDescription="Status Icon" size="lg" status="info" />
          </Column>
        </>
      );
    }}
  </ListItemModule>
);

export const WithInProgressIcon = () => (
  <ListItemModule href="#">
    {({ Column, getLayoutProps }) => {
      const { avatar, icon, title } = getLayoutProps();

      return (
        <>
          <Column>
            <InProgress16 {...icon} />
          </Column>

          <Column>
            <h2 {...title}>Create new doc types</h2>

            <UserAvatar20 {...avatar} />
            <UserAvatar20 {...avatar} />
            <UserAvatar20 {...avatar} />
          </Column>
        </>
      );
    }}
  </ListItemModule>
);

NonInteractive.parameters = {
  viewMode: 'canvas',
};

AsButton.parameters = {
  viewMode: 'canvas',
};

WithProfileImage.parameters = {
  viewMode: 'canvas',
};

WithTag.parameters = {
  viewMode: 'canvas',
};

WithComponent.parameters = {
  viewMode: 'canvas',
};

WithStatusIcon.parameters = {
  viewMode: 'canvas',
};

WithInProgressIcon.parameters = {
  viewMode: 'canvas',
};
