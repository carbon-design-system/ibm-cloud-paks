/**
 * @file Detail page layout stories.
 * @copyright IBM Security 2020 - 2021
 */

import { Filter16, Search16, View16 } from '@carbon/icons-react';

import { Row, Column } from 'carbon-components-react';
import React from 'react';

import { pageLayouts } from '../../../.storybook';

import {
  ActionBarModule,
  ActionBarModuleItems,
  CardAreaModule,
  DataTablePagination,
  Decorator,
  DescriptionModule,
  DescriptionListModule,
  ICA,
  ICAModule,
  IconButtonBar,
  SummaryCard as SummaryCardComponent,
  SummaryCardHeader,
  TitleBarModule,
  TypeLayout,
  TypeLayoutBody,
  TypeLayoutCell,
  TypeLayoutRow,
  unstable_withBackground,
} from '../..';

import config, { withContainer } from './stories';

const { decorators, parameters } = config;

// TODO: Remove workaround for https://github.ibm.com/security/design-core-experience/issues/241
const RowWithContainer = withContainer(Row);

const SummaryCard = unstable_withBackground(SummaryCardComponent);

export default {
  title: pageLayouts('Detail'),
  parameters,
  decorators,
};

export const Default = () => (
  <>
    <TitleBarModule title="Summary" />

    <Row>
      <Column lg={6}>
        <DescriptionModule>
          {({ getLayoutProps }) => (
            <p {...getLayoutProps()}>
              BadFlick is a backdoor that is usually seen being distributed
              using exploited word documents. It does not have any persistence
              to survive reboot, but it is capable of opening a reverse shell
              connection to its C2 server where it can download and execute
              possibly other malware.
            </p>
          )}
        </DescriptionModule>
      </Column>

      <Column lg={{ offset: 2, span: 8 }}>
        <DescriptionListModule>
          <TypeLayout>
            <TypeLayoutBody>
              <TypeLayoutRow>
                <TypeLayoutCell>Created by</TypeLayoutCell>
                <TypeLayoutCell>X-Force IRIS</TypeLayoutCell>
              </TypeLayoutRow>
              <TypeLayoutRow>
                <TypeLayoutCell>Last updated</TypeLayoutCell>
                <TypeLayoutCell>Jul 14 2019</TypeLayoutCell>
              </TypeLayoutRow>
            </TypeLayoutBody>
          </TypeLayout>
        </DescriptionListModule>
      </Column>
    </Row>

    <TitleBarModule title="Related reports" />

    <ActionBarModule>
      Supplementary details
      <ActionBarModuleItems>
        <IconButtonBar
          actions={[
            {
              label: 'Search',
              renderIcon: Search16,
            },
            {
              label: 'Filter',
              renderIcon: Filter16,
            },
            {
              label: 'View',
              renderIcon: View16,
            },
          ]}
          size="lg"
        />
      </ActionBarModuleItems>
    </ActionBarModule>

    <CardAreaModule>
      {({ getLayoutProps }) => (
        <Row narrow>
          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title="Threat actor" />
            </SummaryCard>
          </Column>
          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title="Threat report" />
            </SummaryCard>
          </Column>
          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title="IP report" />
            </SummaryCard>
          </Column>
          <Column>
            <SummaryCard {...getLayoutProps()}>
              <SummaryCardHeader title="Vulnerability report" />
            </SummaryCard>
          </Column>
        </Row>
      )}
    </CardAreaModule>

    <RowWithContainer narrow>
      <Column>
        <TitleBarModule element="h4" title="Indicators" />
      </Column>
    </RowWithContainer>

    <ICAModule>
      {({ getLayoutProps }) => (
        <RowWithContainer narrow>
          <Column {...getLayoutProps({ lg: 3, md: 2, sm: 2 })}>
            <ICA label="Malware" value={11} />
          </Column>
          <Column {...getLayoutProps({ lg: 3, md: 2, sm: 2 })}>
            <ICA label="IPs" value={8} />
          </Column>
          <Column {...getLayoutProps({ lg: 3, md: 2, sm: 2 })}>
            <ICA label="URLs" value={9} />
          </Column>
          <Column {...getLayoutProps({ lg: 3, md: 2, sm: 2 })}>
            <ICA label="VULs" value={1} />
          </Column>
        </RowWithContainer>
      )}
    </ICAModule>

    <Row narrow>
      <Column>
        <DataTablePagination
          headers={[
            {
              header: 'Name',
              key: 'name',
            },
            {
              header: 'Last sighted',
              key: 'lastSighted',
            },
          ]}
          pageSize={5}
          pageSizes={[5, 10, 25, 50]}
          rows={[
            {
              id: '0',
              lastSighted: 'Feb 3 2019 12:00 PM EST',
              name: (
                <Decorator
                  score={7}
                  type="MAL"
                  value="5020c08bcc061236643293bf0d897321"
                />
              ),
            },
            {
              id: '1',
              lastSighted: 'Feb 5 2019 12:00 PM EST',
              name: (
                <Decorator
                  score={7}
                  type="MAL"
                  value="aca7037286b64b0da05c9708d647c013"
                />
              ),
            },
            {
              id: '2',
              lastSighted: 'Feb 7 2019 12:00 PM EST',
              name: (
                <Decorator
                  score={7}
                  type="MAL"
                  value="bd9e4c82bf12c4e7a58221fc52fed705"
                />
              ),
            },
            {
              id: '3',
              lastSighted: 'Apr 1 2019 12:00 PM EST',
              name: <Decorator score={0} type="IP" value="103.243.175.181" />,
            },
            {
              id: '4',
              lastSighted: 'Apr 1 2019 12:00 PM EST',
              name: (
                <Decorator
                  score={7}
                  type="MAL"
                  value="5020c08bcc061236643293bf0d897321"
                />
              ),
            },
          ]}
        />
      </Column>
    </Row>
  </>
);
