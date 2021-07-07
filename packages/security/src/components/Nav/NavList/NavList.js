/**
 * @file Navigation list class.
 * @copyright IBM Security 2019 - 2021
 */

import { ChevronDown16 } from '@carbon/icons-react';

import classnames from 'classnames';
import { bool, func, node, number, string } from 'prop-types';
import React, { Component } from 'react';

import { getComponentNamespace } from '../../../globals/namespace';

import Icon from '../../Icon';
import NavItem, { namespace as navItemNamespace } from '../NavItem/NavItem';

export const navListNamespace = getComponentNamespace('nav__list');

export default class NavList extends Component {
  constructor(props) {
    super(props);

    const { activeHref, children } = this.props;
    let { isExpandedOnPageload: open } = this.props;

    // Reads all children, filters out children without HREF attributes, and creates an array of HREF strings.
    if (!open) {
      const hrefs = React.Children.toArray(children)
        .filter(
          ({ props: childProps }) =>
            childProps.href && childProps.href.length > 0
        )
        .map(({ props: childProps }) => childProps.href);

      open = hrefs.includes(activeHref);
    }

    this.state = { open };

    this.buildNewItemChild = this.buildNewItemChild.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  /**
   * Creates a new child list item.
   * @param {NavItem} child The child list item to create.
   * @param {number} index The index of the child list item.
   * @returns {NavItem} The new child list item.
   */
  buildNewItemChild({ props }, index) {
    const { onItemClick, activeHref } = this.props;

    const { onClick } = props;

    return (
      <NavItem
        {...props}
        key={`${navItemNamespace}--${index}`}
        onClick={(event, href) => {
          onItemClick(event, href);

          if (onClick) {
            onClick(event);
          }
        }}
        activeHref={activeHref}
        tabIndex={this.state.open ? 0 : -1}
      />
    );
  }

  /**
   * Closes the list.
   */
  close() {
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  /**
   * Handles toggling the list.
   * @param {SyntheticEvent} event The event fired when the list is toggled.
   */
  toggle({ which, type }) {
    const { open } = this.state;
    const { id, onListClick } = this.props;

    // Enter (13) and spacebar (32).
    if (which === 13 || which === 32 || type === 'click') {
      if (!open) {
        onListClick(id);
      }
      this.setState({ open: !open });
    }
  }

  render() {
    const { className, children, tabIndex, title } = this.props;
    const { open } = this.state;

    const classNames = classnames(navListNamespace, className, {
      [`${navItemNamespace}--expanded`]: open,
    });

    const newChildren = React.Children.map(children, (child, index) =>
      this.buildNewItemChild(child, index)
    );

    return (
      <li
        className={classNames}
        tabIndex={tabIndex}
        onClick={this.toggle}
        onKeyPress={this.toggle}
        role="menuitem">
        <div className={`${navItemNamespace}__link`}>
          <div className={`${navItemNamespace}__content`}>{title}</div>
          <Icon
            className={`${navListNamespace}__icon`}
            renderIcon={ChevronDown16}
          />
        </div>
        <ul
          aria-label={title}
          aria-hidden={!open}
          className={`${navListNamespace} ${navListNamespace}--nested`}
          role="menu">
          {newChildren}
        </ul>
      </li>
    );
  }
}

NavList.defaultProps = {
  activeHref: '#',
  className: '',
  children: null,
  id: '',
  isExpandedOnPageload: false,
  onItemClick: () => {},
  onListClick: () => {},
  tabIndex: 0,
  title: '',
};

NavList.propTypes = {
  /** @type {string} Hypertext reference for active page. */
  activeHref: string,

  /** @type {string} Extra classes to add. */
  className: string,

  /** @type {Node} Child elements. */
  children: node,

  /** @type {string} ID of a list. */
  id: string,

  /** @type {boolean} State of a list. */
  isExpandedOnPageload: bool,

  /** @type {Function} Click handler for an item. */
  onItemClick: func,

  /** @type {Function} Click handler for a list. */
  onListClick: func,

  /** @type {number} `tabindex` of an item. */
  tabIndex: number,

  /** @type {string} Label of the list. */
  title: string,
};
