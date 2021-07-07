/**
 * @file Card area module stories.
 * @copyright IBM Security 2020 - 2021
 */

import { Filter16, List16, Search16, Table16 } from '@carbon/icons-react';
import { Column, Row } from 'carbon-components-react';
import React from 'react';

import { getDocsParameters } from '../../../../.storybook';

import {
  ActionBarModule,
  ActionBarModuleItems,
  Button,
  CardAreaModule,
  IconButtonBar,
  SummaryCard as SummaryCardComponent,
  SummaryCardHeader,
  TitleBarModule,
  unstable_withBackground,
} from '../../..';

import getTitle from '../stories';
import page from './index.mdx';

const SummaryCard = unstable_withBackground(SummaryCardComponent);

export default {
  title: getTitle(CardAreaModule.name),
  component: CardAreaModule,
  parameters: {
    docs: { page },

    ...getDocsParameters(),
  },
};

export const Default = () => (
  <CardAreaModule>
    {({ getLayoutProps }) => (
      <Row narrow>
        <Column>
          <SummaryCard {...getLayoutProps()}>
            <SummaryCardHeader title="Label" />
          </SummaryCard>
        </Column>

        <Column>
          <SummaryCard {...getLayoutProps()}>
            <SummaryCardHeader title="Label" />
          </SummaryCard>
        </Column>

        <Column>
          <SummaryCard {...getLayoutProps()}>
            <SummaryCardHeader title="Label" />
          </SummaryCard>
        </Column>
      </Row>
    )}
  </CardAreaModule>
);

export const Variant = () => (
  <CardAreaModule>
    {({ getLayoutProps }) => (
      <>
        <TitleBarModule title="Section title" />
        <TitleBarModule element="h3" title="Sub-section title" subsection />

        <Row narrow>
          <Column>
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
                      renderIcon: Search16,
                    },
                    {
                      label: 'Action 3',
                      renderIcon: List16,
                    },
                    {
                      label: 'Action 4',
                      renderIcon: Table16,
                    },
                  ]}
                  size="lg"
                />
              </ActionBarModuleItems>
            </ActionBarModule>
          </Column>
        </Row>

        <Row narrow>
          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title="Label" />
            </SummaryCard>
          </Column>

          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title="Label" />
            </SummaryCard>
          </Column>

          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title="Label" />
            </SummaryCard>
          </Column>
        </Row>
      </>
    )}
  </CardAreaModule>
);

Variant.parameters = {
  viewMode: 'canvas',
};
