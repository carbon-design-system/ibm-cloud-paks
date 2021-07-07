/**
 * @file Description module stories.
 * @copyright IBM Security 2020 - 2021
 */

import React from 'react';

import { getDocsParameters } from '../../../../.storybook';
import withResponsive from '../../../../.storybook/decorators';

import { DescriptionModule, TitleBarModule } from '../../..';

import getTitle from '../stories';
import page from './index.mdx';

export default {
  title: getTitle(DescriptionModule.name),
  component: DescriptionModule,
  parameters: {
    docs: { page },

    ...getDocsParameters(),
  },
  decorators: [withResponsive],
};

export const Default = () => (
  <DescriptionModule>
    {({ getLayoutProps }) => (
      <>
        <TitleBarModule title="Section title" />

        <p {...getLayoutProps()}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          finibus tortor eget est ornare, a ultrices risus tincidunt.
          Suspendisse condimentum mauris at ornare tempor. Phasellus a arcu
          ante. Morbi vitae ultrices quam, eget eleifend magna. Morbi quis
          porttitor ex, in elementum tellus. In eget rutrum eros, eu scelerisque
          risus. Phasellus vel pretium lorem, ut laoreet sapien. Cras ac purus
          vitae velit efficitur iaculis. Nunc.
        </p>
      </>
    )}
  </DescriptionModule>
);

export const Variant = () => (
  <DescriptionModule>
    {({ getLayoutProps }) => (
      <>
        <TitleBarModule title="Section title" />

        <TitleBarModule title="Sub-section title" subsection />

        <p {...getLayoutProps()}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          finibus tortor eget est ornare, a ultrices risus tincidunt.
          Suspendisse condimentum mauris at ornare tempor. Phasellus a arcu
          ante. Morbi vitae ultrices quam, eget eleifend magna. Morbi quis
          porttitor ex, in elementum tellus. In eget rutrum eros, eu scelerisque
          risus. Phasellus vel pretium lorem, ut laoreet sapien. Cras ac purus
          vitae velit efficitur iaculis. Nunc.
        </p>
      </>
    )}
  </DescriptionModule>
);

Variant.parameters = {
  viewMode: 'canvas',
};
