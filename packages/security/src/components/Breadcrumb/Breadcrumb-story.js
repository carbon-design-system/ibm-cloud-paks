/**
 * @file Breadcrumb stories.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { carbon } from '../../../.storybook';

import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../..';

const props = () => ({
  className: 'some-class',
  noTrailingSlash: boolean('No trailing slash (noTrailingSlash)', false),
  onClick: action('onClick'),
});

storiesOf(carbon('Breadcrumb'), module)
  .add(
    'default',
    () => (
      <Breadcrumb {...props()}>
        <BreadcrumbItem>
          <a href="/#">Breadcrumb 1 that is very long and will be truncated</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
      </Breadcrumb>
    ),
    {
      info: {
        text: `
        Breadcrumb enables users to quickly see their location within a path of navigation and move up to a parent level if desired.
      `,
      },
    }
  )
  .add('skeleton', () => <BreadcrumbSkeleton />, {
    info: {
      text: `
        Placeholder skeleton state to use when content is loading.
        `,
    },
  })
  .add(
    'current page',
    () => (
      <Breadcrumb {...props()} noTrailingSlash>
        <BreadcrumbItem>
          <a href="/#">Breadcrumb 1 that is very long and will be truncated</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="#" isCurrentPage>
          Breadcrumb 3
        </BreadcrumbItem>
      </Breadcrumb>
    ),
    {
      info: {
        text: 'You can specify a BreadcrumbItem component as the current page with the `isCurrentPage` prop',
      },
    }
  )
  .add(
    'current page with aria-current',
    () => (
      <Breadcrumb {...props()} noTrailingSlash>
        <BreadcrumbItem>
          <a href="/#">Breadcrumb 1 that is very long and will be truncated</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="#" aria-current="page">
          Breadcrumb 3
        </BreadcrumbItem>
      </Breadcrumb>
    ),
    {
      info: {
        text: 'You can specify a BreadcrumbItem component as the current page with the `aria-current` prop by specifying `aria-current="page"`',
      },
    }
  );
