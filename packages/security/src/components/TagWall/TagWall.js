/**
 * @file Tag wall.
 * @copyright IBM Security 2019 - 2021
 */

import classnames from 'classnames';
import { arrayOf, bool, func, shape, string, object } from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../globals/namespace/index';

import * as defaultLabels from '../../globals/nls';

import defaultItemToString from '../__tools__/defaultItemToString';

import Button from '../Button';
import InteractiveTag from '../InteractiveTag';

const namespace = getComponentNamespace('tag-wall');
const noop = () => {};

export const type = 'UNSELECT_ITEM';

/**
 * Tag wall component.
 */
const TagWall = ({
  addButtonDisabled,
  addLabel,
  className,
  disable,
  items,
  itemToString,
  label,
  onAddButton,
  onChange,
  labels,
  ...other
}) => {
  const { TAG_WALL_ADD_BUTTON, TAG_WALL_LABEL, TAG_WALL_REMOVE_BUTTON } = {
    ...defaultLabels.labels,
    ...defaultLabels.filterFalsey({
      TAG_WALL_ADD_BUTTON: addLabel,
      TAG_WALL_LABEL: label,
    }),
    ...labels,
  };

  return (
    <section
      className={classnames(namespace, className)}
      aria-label={TAG_WALL_LABEL}
      {...other}>
      {TAG_WALL_LABEL && (
        <h2 className={`${namespace}__label`}>{TAG_WALL_LABEL}</h2>
      )}

      {items.map((item, index) => {
        const key = `tag__${index}`;

        return (
          <InteractiveTag
            id={item.id}
            key={key}
            isSelected={item.isSelected}
            onRemove={(event) => {
              event.stopPropagation();

              onChange({ item, type });
            }}
            removable={!disable}
            removeBtnLabel={TAG_WALL_REMOVE_BUTTON}
            type="gray"
            {...item.props}>
            {itemToString(item)}
          </InteractiveTag>
        );
      })}
      {!addButtonDisabled && (
        <Button
          disabled={disable}
          kind="ghost"
          onClick={onAddButton}
          size="small">
          {TAG_WALL_ADD_BUTTON}
        </Button>
      )}
    </section>
  );
};

TagWall.propTypes = {
  /** @type {boolean} Determines whether or not the 'add' button is disabled. */
  addButtonDisabled: bool,

  /** @type {string} Label for button that adds tag. */
  addLabel: string,

  /** @type {string} Extra classes to add. */
  className: string,

  /** @type {boolean} Determines whether or not tag management is enabled. */
  disable: bool,

  /** @type {Array.<object.<string, boolean>>} List of tags to be consumed. */
  items: arrayOf(
    shape({
      id: string.isRequired,
      isSelected: bool,
      label: string.isRequired,
      props: object,
    })
  ).isRequired,

  /** @type {Function} Function that converts object to string. */
  itemToString: func,

  /** @type {string} Description label. */
  label: string,

  /** @type {object.<string, *>} Default translation labels object. */
  labels: defaultLabels.propType,

  /** @type {Function} Handles `onClick` for the 'add' button. */
  onAddButton: func,

  /** @type {Function} Communicates to the consuming component any changes to the tags. */
  onChange: func,
};

TagWall.defaultProps = {
  addButtonDisabled: false,
  addLabel: '',
  className: '',
  disable: false,
  itemToString: defaultItemToString,
  label: null,
  labels: {},
  onAddButton: noop,
  onChange: noop,
};

export default TagWall;
