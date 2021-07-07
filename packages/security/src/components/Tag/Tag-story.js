/**
 * @file Tag stories.
 * @copyright IBM Security 2019 - 2021
 */

import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { types as typesList } from 'carbon-components-react/es/components/Tag';

import React from 'react';

import { carbon } from '../../../.storybook';

import { InteractiveTag, Tag, TagSkeleton } from '../..';

const types = typesList.reduce(
  (accumulator, type) => ({
    ...accumulator,
    [`${type} (${type})`]: type,
  }),
  {}
);

const props = () => ({
  disabled: boolean('Disabled (disabled)', false),
  type: select('Tag type (type)', types, typesList[0]),
});

const interactiveTagProps = () => ({
  ...props(),
  onRemove: action('onRemove'),
  removable: true,
});

const content = () => text('Content (children)', 'This is not a tag');

storiesOf(carbon('Tag'), module)
  .add(
    'Default',
    () => (
      <Tag {...props()} className="some-class">
        {text('Content (children)', 'This is not a tag')}
      </Tag>
    ),
    {
      info: {
        text: `
            Tags are used for items that need to be labeled, categorized, or organized using keywords that describe them.
            The example below shows how the Tag component can be used. Each type has a default message describing the type,
            but a custom message can also be applied.
          `,
      },
    }
  )
  .add(
    'Interactive tag',
    () => (
      <InteractiveTag {...interactiveTagProps()}>{content()}</InteractiveTag>
    ),
    {
      info: {
        text: `
            Basic implementation of an interactive tag.
          `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <TagSkeleton />
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
