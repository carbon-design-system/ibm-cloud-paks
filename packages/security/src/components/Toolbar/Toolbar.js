/**
 * @file Toolbar.
 * @copyright IBM Security 2019 - 2021
 */

import {
  ArrowLeft20,
  Close20,
  Help20,
  Menu20,
  Settings20,
} from '@carbon/icons-react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isClient } from '../../globals/utils/capabilities';
import root from '../../globals/utils/globalRoot';

import toggle from '../Component';
import IconButton from '../IconButton';
import Nav from '../Nav';
import NavList from '../Nav/NavList';
import NavItem from '../Nav/NavItem';
import Transition from '../Transition';

import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('toolbar');

/**
 * Toolbar component.
 * @param {object.<string, *>} props Toolbar props.
 * @returns {Toolbar} Toolbar instance.
 */
export default class Toolbar extends Component {
  state = {
    isActive: { menu: false, settings: false, support: false },
    content: undefined,
    showContent: false,
  };

  componentDidMount() {
    if (isClient() && root.document) {
      root.document.addEventListener('click', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    if (isClient() && root.document) {
      root.document.removeEventListener('click', this.handleClickOutside);
    }
  }

  wrapper = React.createRef();

  /**
   * Handle a click outside of the Toolbar wrapper.
   * @param {Event} event A click event.
   */
  handleClickOutside = (event) => {
    const activeElement =
      event.target.getRootNode().activeElement || document.activeElement;

    if (
      event.target !== activeElement &&
      event.target.nodeName !== 'SHELL-COMPONENT' &&
      this.wrapper &&
      !this.wrapper.current.contains(event.target)
    ) {
      this.setState({
        isActive: { menu: false, settings: false, support: false },
      });
      this.props.onToggle(false);
    }
  };

  /**
   * Toggles the appropriate icon button based on whether the relevant panel is open.
   * @param {string} label The icon label.
   * @param {Function} renderIcon The icon to use.
   * @param {string} type The panel to check.
   * @returns {IconButton} The icon button to return.
   */
  toggleIcon(label, renderIcon, type) {
    const { [type]: isActiveItem } = this.state.isActive;

    const iconButtonClass = `${namespace}__button`;
    const iconButtonClasses = classnames(iconButtonClass, {
      [`${iconButtonClass}--active`]: isActiveItem,
    });

    return (
      <IconButton
        className={iconButtonClasses}
        aria-expanded={isActiveItem}
        {
          // Expanded panels are added to the UI when opened,
          // so this should not reference an ID that doesn't yet exist.
          ...(isActiveItem
            ? { [`aria-controls`]: `${namespace}--toolbar--${type}` }
            : {})
        }
        aria-label={label}
        iconClassName={`${namespace}__icon`}
        label={label}
        onClick={() => this.togglePanel(type)}
        renderIcon={isActiveItem ? Close20 : renderIcon}
        state={isActiveItem}
        tooltip={!isActiveItem}
        tooltipDirection={IconButton.TooltipDirection.RIGHT}
      />
    );
  }

  /**
   * Toggles the panel and applies the appropriate class to the body.
   * @param {string} type The type of panel to toggle.
   */
  togglePanel(type) {
    toggle.call(this, type, (state) => {
      const { [type]: isToggled } = state;

      this.props.onToggle(isToggled);

      root.dispatchEvent(
        new CustomEvent(`${namespace}:toggle`, {
          detail: { isToggled },
        })
      );
    });
  }

  toggleContent = (htmlContent = undefined) => {
    this.setState({
      content: htmlContent,
      showContent: !this.state.showContent,
    });
  };

  /**
   * Renders the panel content.
   * @param {string} type The type of panel to render.
   * @returns {React.Element} The rendered panel.
   */
  renderContent(type) {
    const { [type]: navigationType } = this.props;
    const { [type]: isActiveItem } = this.state.isActive;

    return (
      isActiveItem &&
      navigationType.length > 0 &&
      navigationType.map(({ id, navigation, title }) => (
        <Nav key={id} heading={title} label={title}>
          {navigation
            .filter((item) => item !== null && item !== undefined)
            .map(
              ({
                children,
                href,
                content,
                icon,
                id: navigationItemId,
                title: navigationItemTitle,
                ...props
              }) => {
                const hasIcon = icon !== undefined;

                return children ? (
                  <NavList key={navigationItemId} title={navigationItemTitle}>
                    {children.map(
                      ({
                        href: navigationListItemHref,
                        element: navigationListItemElement,
                        content,
                        icon,
                        id: navigationListItemId,
                        title: navigationListItemTitle,
                        ...props
                      }) => (
                        <NavItem
                          key={navigationListItemId}
                          onClick={() => this.togglePanel(type)}
                          id={navigationListItemId}
                          href={navigationListItemHref}
                          element={navigationListItemElement}
                          link={content === undefined}
                          handleItemSelect={() => this.toggleContent(content)}
                          {...props}>
                          {hasIcon && (
                            <img
                              alt={navigationListItemTitle}
                              className={`${namespace}__nav__item__icon`}
                              src={icon}
                            />
                          )}
                          {navigationListItemTitle}
                        </NavItem>
                      )
                    )}
                  </NavList>
                ) : (
                  <NavItem
                    key={navigationItemId}
                    id={navigationItemId}
                    onClick={() => this.togglePanel(type)}
                    href={href}
                    link={content === undefined}
                    handleItemSelect={() => this.toggleContent(content)}
                    {...props}>
                    {hasIcon && (
                      <img
                        alt={navigationItemTitle}
                        className={`${namespace}__nav__item__icon`}
                        src={icon}
                      />
                    )}

                    <div
                      className={classnames(`${namespace}__nav__item__title`, {
                        [`${namespace}__nav__item__title--icon`]: hasIcon,
                      })}>
                      {navigationItemTitle}
                    </div>
                  </NavItem>
                );
              }
            )}
        </Nav>
      ))
    );
  }

  render() {
    const {
      className,
      labels: {
        mainNavigation: { ariaLabel = null } = {},
        menu,
        settings,
        support,
      },
      renderAddons = [],
    } = this.props;
    const renderSupport = this.props.support.length > 0;
    const renderSettings = this.props.settings.length > 0;
    const classes = classnames(namespace, className, {
      [`${namespace}__minimized`]: !renderSupport && !renderSettings,
    });
    const { isActive } = this.state;
    const activeItems = Object.entries(isActive)
      // eslint-disable-next-line no-unused-vars
      .filter(([type, isActiveItem]) => isActiveItem);
    let currentType = '';
    let isPanelActive = false;
    if (activeItems.length > 0) {
      [[currentType, isPanelActive]] = activeItems;
    }

    return (
      <div ref={this.wrapper}>
        <nav aria-label={ariaLabel} className={classes}>
          <ul className={`${namespace}__group`}>
            <li>{this.toggleIcon(menu.button, Menu20, 'menu')}</li>
            {renderSettings && (
              <li>
                {this.toggleIcon(settings.button, Settings20, 'settings')}
              </li>
            )}
            {renderSupport && (
              <li>{this.toggleIcon(support.button, Help20, 'support')}</li>
            )}

            {renderAddons.map(({ id, render }) => (
              <li key={id}>
                {render({
                  className: `${namespace}__button`,
                  iconClassName: `${namespace}__icon`,
                })}
              </li>
            ))}
          </ul>
        </nav>

        <Transition className={namespace} component="span">
          {isPanelActive && this.state.showContent ? (
            <div
              role="navigation"
              aria-label={currentType}
              id={`${namespace}--toolbar--${currentType}`}
              className={`${namespace}__panel`}>
              <IconButton
                onClick={this.toggleContent}
                renderIcon={ArrowLeft20}
              />
              <div
                className={`${namespace}__content`}
                dangerouslySetInnerHTML={{ __html: this.state.content }} // eslint-disable-line react/no-danger
              />
            </div>
          ) : (
            isPanelActive && (
              <div
                role="navigation"
                aria-label={currentType}
                id={`${namespace}--toolbar--${currentType}`}
                className={`${namespace}__panel`}>
                {Object.keys(isActive).map((type) => (
                  <Transition
                    key={type}
                    className={`${namespace}__content`}
                    component="span">
                    {this.renderContent(type)}
                  </Transition>
                ))}
              </div>
            )
          )}
        </Transition>
      </div>
    );
  }
}

const href = PropTypes.string.isRequired;

const navigation = {
  /** @type {string} The ID of the navigation. */
  id: PropTypes.string.isRequired,

  /** @type {string} The title of the navigation. */
  title: PropTypes.node.isRequired,

  /** @type {node} Content. */
  content: PropTypes.node,

  /** @type {string} Icon. */
  icon: PropTypes.string,
};

const panel = () =>
  /** @type {Array<Object.*>} An array list of navigation lists and sub-navigation. */
  PropTypes.arrayOf(
    /** @type {object<object.Object>} An object list of navigation. */
    PropTypes.shape({
      ...navigation,

      /** @type {Array<Object.*>} An array list of navigation items. */
      navigation: PropTypes.arrayOf(
        /** @type {object<object.Object>} An object list of navigation. */
        PropTypes.shape(
          Object.assign({}, navigation, {
            /** @type {Array<Object.*>} An array list of sub-navigation items. */
            children: PropTypes.arrayOf(
              /** @type {object<object.Object>} An object list of sub-navigation. */
              PropTypes.shape(Object.assign({}, navigation, href))
            ),
            href,
          })
        )
      ).isRequired,
    }).isRequired
  );

Toolbar.propTypes = {
  /** @type {string} Extra classes to add. */
  className: PropTypes.string,

  /** @type {object<object.Object>} An object list of labels. */
  labels: PropTypes.shape({
    /** @type {object.<string, string>} An object list of navigation labels for the top level navigation item. */
    mainNavigation: PropTypes.shape({
      /** Specify the `aria-label` for the primary navigation */
      ariaLabel: PropTypes.string.isRequired,
    }).isRequired,

    /** @type {object.<string, string>} An object list of menu labels. */
    menu: PropTypes.shape({
      /** @type {string} The button label. */
      button: PropTypes.string.isRequired,

      /** @type {string} The tooltip label. */
      tooltip: PropTypes.string,
    }).isRequired,

    /** @type {object.<string, string>} An object list of settings labels. */
    settings: PropTypes.shape({
      /** @type {string} The button label. */
      button: PropTypes.string.isRequired,

      /** @type {string} The tooltip label. */
      tooltip: PropTypes.string,
    }),

    /** @type {object.<string, string>} An object list of support labels. */
    support: PropTypes.shape({
      /** @type {string} The button label. */
      button: PropTypes.string.isRequired,

      /** @type {string} The tooltip label. */
      tooltip: PropTypes.string,
    }),
  }).isRequired,

  /** @type {Function} Toggle handler. */
  onToggle: PropTypes.func,

  /** @type {Array<{id: string, tooltip: string, render: Function: React.Element}>} An object list to render custom addon icons. */
  renderAddons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
      tooltip: PropTypes.string,
    })
  ),

  // eslint-disable-next-line react/no-unused-prop-types
  menu: panel(),

  // eslint-disable-next-line react/no-unused-prop-types
  settings: panel(),

  // eslint-disable-next-line react/no-unused-prop-types
  support: panel(),
};

Toolbar.defaultProps = {
  renderAddons: [],
  className: null,
  onToggle: (isToggled) => isToggled,
  menu: [],
  settings: [],
  support: [],
};
