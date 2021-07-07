/**
 * @file Structured list stories.
 * @copyright IBM Security 2019 - 2021
 */

import { CheckmarkFilled16 } from '@carbon/icons-react';
import { storiesOf } from '@storybook/react';

import { settings } from 'carbon-components';
import React from 'react';

import { carbon } from '../../../.storybook';

import {
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListInput,
  StructuredListRow,
  StructuredListWrapper,
  StructuredListSkeleton,
} from '../..';

const { prefix } = settings;

/* eslint-disable react/jsx-key, react/no-array-index-key */

storiesOf(carbon('StructuredList'), module)
  .add(
    'Simple',
    () => (
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>ColumnA</StructuredListCell>
            <StructuredListCell head>ColumnB</StructuredListCell>
            <StructuredListCell head>ColumnC</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 1</StructuredListCell>
            <StructuredListCell>Row 1</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 2</StructuredListCell>
            <StructuredListCell>Row 2</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    ),
    {
      info: {
        text: `
            Structured Lists group content that is similar or related, such as terms or definitions.
          `,
      },
    }
  )
  .add(
    'Selection',
    () => {
      const structuredListBodyRowGenerator = (numRows) => {
        return Array(...Array(numRows)).map((n, i) => (
          <StructuredListRow label key={`row-${i}`} htmlFor={`row-${i}`}>
            <StructuredListCell>Row {i}</StructuredListCell>
            <StructuredListCell>Row {i}</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
            <StructuredListInput
              id={`row-${i}`}
              key={`row-${i}`}
              value={`row-${i}`}
              title={`row-${i}`}
              name="row-0"
              defaultChecked={!i || null}
            />
            <StructuredListCell>
              <CheckmarkFilled16
                className={`${prefix}--structured-list-svg`}
                aria-label="select an option">
                <title>select an option</title>
              </CheckmarkFilled16>
            </StructuredListCell>
          </StructuredListRow>
        ));
      };
      return (
        <StructuredListWrapper selection border>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>ColumnA</StructuredListCell>
              <StructuredListCell head>ColumnB</StructuredListCell>
              <StructuredListCell head>ColumnC</StructuredListCell>
              <StructuredListCell head />
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {structuredListBodyRowGenerator(4)}
          </StructuredListBody>
        </StructuredListWrapper>
      );
    },
    {
      info: {
        text: `
        Structured Lists with selection allow a row of list content to be selected.
      `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div style={{ width: '800px' }}>
        <StructuredListSkeleton />
      </div>
    ),
    {
      info: {
        text: `
            Placeholder skeleton state to use when content is loading.
          `,
      },
    }
  );
/* eslint-enable */
