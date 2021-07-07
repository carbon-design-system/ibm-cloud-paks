/**
 * @file Truncated list stories.
 * @copyright IBM Security 2020 - 2021
 */

import { number, color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { security } from '../../../.storybook';
import { TruncatedList, UnorderedList } from '../..';
import { createChildrenArray } from './_mocks_';

storiesOf(security(TruncatedList.name), module)
  .addDecorator((story) => (
    <div style={{ minWidth: 150, minHeight: 300 }}>{story()}</div>
  ))
  .add(
    'default',
    () => (
      <TruncatedList
        className="other-class"
        style={{ paddingLeft: 0 }}
        as={UnorderedList}
        scrollGradientColor={color(
          'scroll gradient color (scrollGradientColor)',
          TruncatedList.defaultProps.scrollGradientColor
        )}
        getExpandButtonLabel={(isExpanded, displayCount, hiddenCount) => {
          return isExpanded ? 'View less' : `View more (${hiddenCount})`;
        }}
        truncateThreshold={number(
          'Number of items to show before truncation (truncateThreshold)',
          10
        )}
        collapsedItemLimit={number(
          'Number of items to show when collapsed (collapsedItemLimit)',
          5
        )}
        expandedItemLimit={number(
          'Number items to show when expanded (expandedItemLimit)',
          10
        )}>
        {createChildrenArray(number('Number of items in list', 15))}
      </TruncatedList>
    ),
    {
      info: {
        text: `## Truncated list
This component is a list that accepts any number of list items (\`li\`). It allows consumers to control
how many items are revealed to the user while giving the user the ability to expand the list and see
the entire list. There are props that control how many items a user can see at once:

  * \`truncateThreshold\`: This prop will give consumers control of how many items are rendered
  before the list is truncated.

  * \`collapsedItemLimit\`: When the number of items surpass the truncation threshold, this prop
  allows consumers to set how many items should be displayed when the list is collapsed.

  * \`expandedItemLimit\`: When the list is truncated and expanded, all items in the list are
  rendered. However, this prop allows consumers to limit the height of the list so the expanded list
  is not too long. If the list is long, it becomes scrollable.

Additionally, to provide the desired expand button label, please provide a \`getExpandButtonLabel\`
function prop. The signature is as follows:

~~~js
getExpandButtonLabel = (isExpanded: boolean, displayCount: number, hiddenCount: number): string => {};
~~~`,
      },
    }
  );
