/**
 * @file Truncated list mock data utilities used in tests and Storybook stories.
 * @copyright IBM Security 2020
 */

import React from 'react';
import ListItem from '../../ListItem';

/**
 * Creates an array of basic list item children for testing truncation of component.
 * @param {number} length Amount of children to create.
 * @returns {React.Component[]} Array of created children.
 */
export const createChildrenArray = (length) =>
  new Array(length).fill(null).map((value, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ListItem key={index} data-testid={`child-${index + 1}`}>
      child {index + 1}
    </ListItem>
  ));

export default { createChildrenArray };
