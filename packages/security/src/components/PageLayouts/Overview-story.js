/**
 * @file Overview page layout stories.
 * @copyright IBM Security 2020 - 2021
 */

import { Activity16, Copy16 } from '@carbon/icons-react';

import classnames from 'classnames';
import { Row, Column } from 'carbon-components-react';
import React from 'react';

import { pageLayouts } from '../../../.storybook';

import {
  ActionBarModule,
  ButtonClusterModule,
  Button,
  DataTablePagination,
  DescriptionListModule,
  ICA,
  ICAModule,
  Tag,
  TitleBarModule,
  TypeLayout,
  TypeLayoutBody,
  TypeLayoutCell,
  TypeLayoutRow,
} from '../..';

import config, { withContainer } from './stories';

const { decorators, parameters } = config;

export default {
  title: pageLayouts('Overview'),
  parameters,
  decorators,
};

// TODO: Remove workaround for https://github.ibm.com/security/design-core-experience/issues/241
const withBorder =
  (WrappedComponent) =>
  ({ className, direction, nested, ...other }) => {
    const namespace = 'container__border';

    return (
      <WrappedComponent
        className={classnames(namespace, className, {
          [`${namespace}--${direction}`]: direction,
          [`${namespace}--nested`]: nested,
        })}
        {...other}
      />
    );
  };

const RowWithContainer = withContainer(Row);
const RowWithBorderContainer = withBorder(withContainer(Row));
const ColumnWithBorder = withBorder(Column);
const DescriptionListModuleWithBorder = withBorder(DescriptionListModule);

export const Default = () => (
  <>
    <ActionBarModule>
      <Tag type="gray">Closed</Tag>
      ID: 12&nbsp;&nbsp;|&nbsp;&nbsp;Result: Completed
    </ActionBarModule>

    <Row>
      <Column lg={12}>
        <RowWithBorderContainer direction="bottom" narrow>
          <ColumnWithBorder direction="right">
            <DescriptionListModule>
              <TitleBarModule title="General settings and scope" subsection />

              <TypeLayout>
                <TypeLayoutBody>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Name</TypeLayoutCell>
                    <TypeLayoutCell>
                      ServiceNow entitlements review
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Description</TypeLayoutCell>
                    <TypeLayoutCell>
                      Sample description of the ServiceNow entitlements review
                      campaign that may need to go to several lines.
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Type</TypeLayoutCell>
                    <TypeLayoutCell>User entitlements</TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Priority</TypeLayoutCell>
                    <TypeLayoutCell>Medium</TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Applications</TypeLayoutCell>
                    <TypeLayoutCell>
                      <ul>
                        <li>ServiceNow 1</li>
                        <li>ServiceNow 2</li>
                        <li>ServiceNow 3</li>
                      </ul>
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Include only</TypeLayoutCell>
                    <TypeLayoutCell>
                      All users and groups included
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Except for</TypeLayoutCell>
                    <TypeLayoutCell>
                      No users and groups excluded
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Reviewer</TypeLayoutCell>
                    <TypeLayoutCell>User manager</TypeLayoutCell>
                  </TypeLayoutRow>
                </TypeLayoutBody>
              </TypeLayout>
            </DescriptionListModule>
          </ColumnWithBorder>

          <Column>
            <DescriptionListModuleWithBorder direction="bottom" nested>
              <TitleBarModule title="Schedule" subsection />

              <TypeLayout>
                <TypeLayoutBody>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Start date</TypeLayoutCell>
                    <TypeLayoutCell>Jul 1 2019 at 12:00PM CST</TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Duration</TypeLayoutCell>
                    <TypeLayoutCell>20 days</TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Frequency</TypeLayoutCell>
                    <TypeLayoutCell>
                      This campaign repeats every 3 months
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                </TypeLayoutBody>
              </TypeLayout>
            </DescriptionListModuleWithBorder>

            <DescriptionListModule>
              <TitleBarModule title="Campaign end" subsection />

              <TypeLayout>
                <TypeLayoutBody>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Reminders</TypeLayoutCell>
                    <TypeLayoutCell>
                      Start 10 days before campaign ends
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Campaign end</TypeLayoutCell>
                    <TypeLayoutCell>
                      Take no action on entitlements not reviewed
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                </TypeLayoutBody>
              </TypeLayout>
            </DescriptionListModule>
          </Column>
        </RowWithBorderContainer>

        <RowWithContainer narrow>
          <Column>
            <TitleBarModule title="Campaign results" subsection />
          </Column>
        </RowWithContainer>

        <ICAModule>
          {({ getLayoutProps }) => (
            <RowWithContainer narrow>
              <Column {...getLayoutProps({ lg: 3, md: 2, sm: 2 })}>
                <ICA label="Reviews complete" value={300} />
              </Column>
              <Column {...getLayoutProps({ lg: 3, md: 2, sm: 2 })}>
                <ICA label="Approved" value={241} />
              </Column>
              <Column {...getLayoutProps({ lg: 3, md: 2, sm: 2 })}>
                <ICA label="Rejected" value={28} />
              </Column>
            </RowWithContainer>
          )}
        </ICAModule>

        <Row narrow>
          <Column>
            <DataTablePagination
              headers={[
                {
                  header: 'Reviewer',
                  key: 'reviewer',
                },
                {
                  header: 'Approved',
                  key: 'approved',
                },
                {
                  header: 'Rejected',
                  key: 'rejected',
                },
                {
                  header: 'Not reviewed',
                  key: 'notReviewed',
                },
                {
                  header: 'Completion',
                  key: 'completion',
                },
              ]}
              pageSize={5}
              pageSizes={[5, 10, 25, 50]}
              rows={[
                {
                  approved: 5,
                  completion: '10%',
                  id: '0',
                  notReviewed: 54,
                  rejected: 0,
                  reviewer: 'john@cse-bank.com',
                },
                {
                  approved: 64,
                  completion: '92%',
                  id: '1',
                  notReviewed: 6,
                  rejected: 5,
                  reviewer: 'maria@cse-bank.com',
                },
                {
                  approved: 71,
                  completion: '100%',
                  id: '2',
                  notReviewed: 0,
                  rejected: 0,
                  reviewer: 'rogelio@cse-bank.com',
                },
              ]}
            />
          </Column>
        </Row>
      </Column>

      <Column lg={4}>
        <Row narrow>
          <Column>
            <ButtonClusterModule>
              <Button kind="ghost" renderIcon={Copy16}>
                Duplicate campaign
              </Button>

              <Button kind="ghost" renderIcon={Activity16}>
                View activity report
              </Button>
            </ButtonClusterModule>
          </Column>
        </Row>

        <Row>
          <Column>
            <DescriptionListModule>
              <TitleBarModule title="Details" subsection />

              <TypeLayout>
                <TypeLayoutBody>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Created by</TypeLayoutCell>
                    <TypeLayoutCell>
                      <ul>
                        <li>Scott Damon</li>
                        <li>scottd@cse-bank.com</li>
                      </ul>
                    </TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Created on</TypeLayoutCell>
                    <TypeLayoutCell>Jun 21 2018</TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Modified on</TypeLayoutCell>
                    <TypeLayoutCell>–</TypeLayoutCell>
                  </TypeLayoutRow>
                  <TypeLayoutRow>
                    <TypeLayoutCell>Closed on</TypeLayoutCell>
                    <TypeLayoutCell>Jul 15 2018</TypeLayoutCell>
                  </TypeLayoutRow>
                </TypeLayoutBody>
              </TypeLayout>
            </DescriptionListModule>
          </Column>
        </Row>
      </Column>
    </Row>
  </>
);
