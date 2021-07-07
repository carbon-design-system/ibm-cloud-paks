/**
 * @file ICA module stories.
 * @copyright IBM Security 2020 - 2021
 */

import { Column, Row } from 'carbon-components-react';
import React from 'react';

import { getDocsParameters } from '../../../../.storybook';

import { ICA, ICAModule } from '../../..';

import getTitle from '../stories';
import page from './index.mdx';

export default {
  title: getTitle(ICAModule.name),
  component: ICAModule,
  parameters: {
    docs: { page },

    ...getDocsParameters(),
  },
};

export const Default = () => (
  <ICAModule>
    {({ getLayoutProps }) => (
      <Row>
        <Column {...getLayoutProps()}>
          <ICA label="Label" value={100} />
        </Column>

        <Column {...getLayoutProps()}>
          <ICA label="Label" value={100} />
        </Column>

        <Column {...getLayoutProps()}>
          <ICA label="Label" value={100} />
        </Column>
      </Row>
    )}
  </ICAModule>
);

export const Interaction = () => (
  <ICAModule hover>
    {({ getLayoutProps }) => (
      <Row>
        <Column {...getLayoutProps()}>
          <ICA label="Label" value={0} percentage />
        </Column>

        <Column {...getLayoutProps()}>
          <ICA label="Label" value={0} percentage />
        </Column>

        <Column {...getLayoutProps()}>
          <ICA label="Label" value={0} percentage />
        </Column>
      </Row>
    )}
  </ICAModule>
);

Interaction.parameters = {
  viewMode: 'canvas',
};
