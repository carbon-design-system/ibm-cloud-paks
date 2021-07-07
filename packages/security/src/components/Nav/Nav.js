/**
 * @file Navigation class.
 * @copyright IBM Security 2019 - 2021
 */

import classnames from 'classnames';
import { node, string } from 'prop-types';
import React, { Children, Component } from 'react';

import NavItem, { namespace as navItemNamespace } from './NavItem/NavItem';
import NavList from './NavList';

import window from '../../globals/utils/globalRoot';
import { getComponentNamespace } from '../../globals/namespace';

export const navNamespace = getComponentNamespace('nav');

const { name } = NavList;

/**
 * Navigation class.
 * @className
 */
export default class Nav extends Component {
  constructor(props) {
    super(props);

    let { activeHref } = this.props;
    if (!activeHref && window.location) {
      const { hash, pathname } = window.location;

      activeHref = hash || pathname;
    }

    this.state = { activeHref };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleListClick = this.handleListClick.bind(this);

    this.navigationLists = [];
  }

  /**
   * Creates a new child list item.
   * @param {NavItem} child The child list item to create.
   * @param {number} index The index of the child list item.
   * @returns {NavItem} The new child list item.
   */
  buildNewItemChild({ props }, index) {
    const key = `${navItemNamespace}--${index}`;

    return (
      <NavItem
        {...props}
        activeHref={this.state.activeHref}
        key={key}
        onClick={(event, href) => {
          this.handleItemClick(event, href, props.onClick);
        }}
      />
    );
  }

  /**
   * Creates a new child list.
   * @param {NavList} child The child list to create.
   * @param {number} index The index of the child list.
   * @returns {NavList} The new child list.
   */
  buildNewListChild({ props }, index) {
    const key = `${navNamespace}__list--${index}`;

    return (
      <NavList
        {...props}
        activeHref={this.state.activeHref}
        id={key}
        key={key}
        onListClick={this.handleListClick}
        onItemClick={this.handleItemClick}
        ref={(navigationList) => {
          this.navigationLists.push(navigationList);
        }}
      />
    );
  }

  /**
   * Handles toggling the list item.
   * @param {SyntheticEvent} event The event fired when the list item is toggled.
   * @param {string} activeHref The URL of the list item.
   */
  handleItemClick(event, activeHref, onClick) {
    event.stopPropagation();

    const { type, which } = event;

    // Enter (13) and spacebar (32).
    const acceptableEvent = which === 13 || which === 32 || type === 'click';

    const diffHref = activeHref !== this.state.activeHref;
    if (acceptableEvent && diffHref) {
      this.setState({ activeHref });
    }

    if (onClick) {
      onClick(event);
    }
  }

  /**
   * Handles when a list has been selected.
   * @param {number} id The index of the list.
   */
  handleListClick(id) {
    Children.forEach(this.props.children, ({ props, type }, index) => {
      if (type.name === name) {
        const childId = `${navNamespace}__list--${index}`;

        if (childId !== id && !props.isExpandedOnPageload) {
          this.navigationLists
            .find(({ props }) => props.id === childId)
            .close();
        }
      }
    });
  }

  render() {
    const { activeHref, className, children, heading, label, ...other } =
      this.props;

    return (
      <nav
        className={classnames(navNamespace, className)}
        aria-label={label}
        {...other}>
        {heading && <h1 className={`${navNamespace}__heading`}>{heading}</h1>}

        <ul className={`${navNamespace}__wrapper`} role="menubar">
          {Children.map(children, (child, index) =>
            child.type.name === name
              ? this.buildNewListChild(child, index)
              : this.buildNewItemChild(child, index)
          )}
        </ul>
      </nav>
    );
  }
}

Nav.defaultProps = {
  activeHref: undefined,
  children: null,
  className: '',
  heading: null,
};

Nav.propTypes = {
  /** @type {string} Hypertext reference for active page. */
  activeHref: string,

  /** @type {Node} Child elements. */
  children: node,

  /** @type {string} Extra classes to add. */
  className: string,

  /** @type {string} Heading */
  heading: string,

  /** @type {string} Aria-label on the rendered `nav` element. */
  label: string.isRequired,
};
