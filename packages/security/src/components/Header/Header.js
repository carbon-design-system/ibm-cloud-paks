/**
 * @file Header.
 * @copyright IBM Security 2019 - 2020
 */

import { Close20, Notification20, Settings20 } from '@carbon/icons-react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import theme from '../../globals/theme';

import toggle from '../Component';

import { Accordion, AccordionItem } from '../Accordion';
import Button from '../Button';
import Icon from '../Icon';

import IconButton from '../IconButton';
import { namespace as iconButtonNamespace } from '../IconButton/IconButton';

import Link from '../Link';
import ProfileImage from '../ProfileImage';
import ScrollGradient from '../ScrollGradient';
import Transition from '../Transition';

import HeaderListItem from './HeaderListItem';
import { namespace as headerListItemNamespace } from './HeaderListItem/constants';

import HeaderNotification from './HeaderNotification';
import HeaderPopoverHeader from './HeaderPopoverHeader';
import HeaderPopoverLinkSecondary from './HeaderPopoverLinkSecondary';

import { defaultProps, namespace, propTypes } from './constants';

const headerButtonNamespace = `${namespace}__button`;

const getPopoverLabelId = (string) => `${namespace}__popover__label--${string}`;

/**
 * Renders the popover.
 * @param {HTMLElement} children The containing elements of the popover.
 * @param {boolean} state Whether the popover is toggled or not.
 * @returns {HTMLElement} The rendered popover.
 */
const renderPopover = (children, state) => (
  <Transition className={namespace} component="span">
    {state && <div className={`${namespace}__popover`}>{children}</div>}
  </Transition>
);

/**
 * Header class.
 * @className
 */
export default class Header extends Component {
  static propTypes = {
    ...propTypes,
    /**
     * @type {function(links: Object, labels: Object): React.Element} render custom login and sign up section
     */
    renderLoginAndSignup: PropTypes.func,
  };

  static defaultProps = {
    ...defaultProps,
    renderLoginAndSignup: (links, labels) => (
      <Fragment>
        <HeaderListItem>
          <Button href={links.registration}>{labels.registration}</Button>
        </HeaderListItem>
        <HeaderListItem>
          <Button href={links.sign_in} kind="secondary">
            {labels.sign_in}
          </Button>
        </HeaderListItem>
      </Fragment>
    ),
  };

  state = {
    isActive: { notifications: false, profile: false },
    isUserActive: Header.getIsUserActive(this.props.profile),
    accountList: Header.getAccountList({
      accounts: this.props.accounts,
      profile: this.props.profile,
    }),
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      isUserActive: Header.getIsUserActive(nextProps.profile),
      accountList: Header.getAccountList({
        accounts: nextProps.accounts,
        profile: nextProps.profile,
      }),
    };
  }

  /**
   * Returns whether a user is active or not.
   * @param {object.<object, *>} profile An object list of profile information.
   * @returns {boolean} Whether the user is active or not.
   * @static
   */
  static getIsUserActive(profile) {
    return profile !== null;
  }

  /**
   * Returns a list of valid user accounts not including their current one.
   * @param {object.<Array, *>} userAccounts An object list of account information.
   * @returns {Array} A list of valid accounts.
   * @static
   */
  static getAccountList(userAccounts) {
    if (userAccounts.profile && userAccounts.profile.account) {
      return (
        (userAccounts.accounts &&
          userAccounts.accounts.filter(
            (account) => account.id !== userAccounts.profile.account.id
          )) ||
        []
      );
    }
    return [];
  }

  toggle = toggle.bind(this);

  /**
   * Clears a notification.
   * @param {string} id The ID of the notification to clear.
   */
  clearNotification(id) {
    this.props.onNotificationClear(id);
  }

  /**
   * Clears all notifications.
   */
  clearAllNotifications() {
    if (!this.props.clearAllNotifications) {
      this.props.notifications.forEach((notification) =>
        this.props.onNotificationClear(notification.id)
      );
    } else {
      this.props.clearAllNotifications(
        this.props.notifications.map((notification) => notification.id)
      );
    }
  }

  /**
   * Closes the popover when loses focus.
   */
  closePopover(target) {
    setTimeout(() => {
      const activeElement =
        target.getRootNode().activeElement || document.activeElement;
      const value = target.getAttribute('value');
      const label = activeElement
        ? activeElement.getAttribute('aria-label') || ''
        : '';
      if (!target.contains(activeElement) && label.indexOf(value) === -1) {
        this.toggle(value);
      }
    }, 0);
  }

  /**
   * Renders the profile.
   * @returns {Function} The rendered profile element.
   */
  renderProfile() {
    const { labels, links, profile, onAccountClick } = this.props;
    const { accountList, isActive } = this.state;

    if (isActive.profile) {
      setTimeout(() => {
        this.userProfile.focus();
      }, 0);
    }

    const hasAccount = profile.account;

    const accountElement = hasAccount && (
      <Fragment>
        <div className={`${namespace}__popover__profile__body__label`}>
          {labels.profile.account}:{' '}
          <span className="selectable-text">{profile.account.id}</span>
        </div>
        <div className={`${namespace}__popover__profile__body__name`}>
          <span className={`${namespace}__popover__profile__body__name__text`}>
            {hasAccount.name}
          </span>
        </div>
      </Fragment>
    );

    const hasAccountList = accountList.length > 0;
    const popoverLabelId = getPopoverLabelId('profile');

    return renderPopover(
      <div
        ref={(userProfile) => {
          this.userProfile = userProfile;
        }}
        className={`${namespace}__popover--focus`}
        aria-labelledby={popoverLabelId}
        onBlur={() => this.closePopover(this.userProfile)}
        role="tabpanel"
        tabIndex="0"
        value="profile">
        <HeaderPopoverHeader
          className={`${namespace}__popover__profile__header`}>
          <Fragment>
            <ProfileImage
              className={`${namespace}__popover__profile__header__icon`}
              profile={profile}
              large
            />
            <div>
              <span
                id={popoverLabelId}
                className={`${namespace}__popover__profile__header__title`}>
                {profile.name.first_name} {profile.name.surname}
              </span>
              <span className={`${namespace}__popover__profile__header__email`}>
                {profile.email}
              </span>
            </div>
          </Fragment>
        </HeaderPopoverHeader>
        {profile.description && (
          <section className={`${namespace}__popover__profile__description`}>
            {profile.description}
          </section>
        )}
        {hasAccount && (
          <section
            className={classnames(`${namespace}__popover__profile__body`, {
              [`${namespace}__popover__profile__body--account`]:
                !hasAccountList,
            })}>
            {!hasAccountList ? (
              accountElement
            ) : (
              <Accordion
                className={`${namespace}__popover__profile__body__accordion`}>
                <AccordionItem
                  className={`${namespace}__popover__profile__body__accordion__item`}
                  title={accountElement}>
                  <ul className={`${namespace}__popover__profile__body__list`}>
                    {accountList.map(({ id, name }) => (
                      <li
                        key={id}
                        className={`${namespace}__popover__profile__body__account`}>
                        <button
                          value={id}
                          onClick={onAccountClick}
                          className={`${namespace}__popover__profile__body__account__button`}>
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              </Accordion>
            )}
          </section>
        )}
        <section className={`${namespace}__popover__footer`}>
          {this.props.showEditProfile && (
            <HeaderPopoverLinkSecondary
              className={`${namespace}__popover__profile__footer__edit`}
              href={links.edit_profile}>
              {labels.profile.edit_profile}
            </HeaderPopoverLinkSecondary>
          )}
          <HeaderPopoverLinkSecondary
            className={`${namespace}__popover__profile__footer__logout`}
            href={links.sign_out}>
            {labels.profile.sign_out}
          </HeaderPopoverLinkSecondary>
        </section>
      </div>,
      isActive.profile
    );
  }

  /**
   * Renders notifications.
   * @returns {Function} The rendered notifications element.
   */
  renderNotifications() {
    const { labels, links, notifications, totalNotifications } = this.props;
    const { isActive } = this.state;
    const { length } = notifications;

    if (isActive.notifications) {
      setTimeout(() => {
        this.notifications.focus();
      }, 0);
    }

    const popoverLabelId = getPopoverLabelId('notifications');

    return renderPopover(
      <div
        ref={(notifications) => {
          this.notifications = notifications;
        }}
        className={`${namespace}__popover--focus`}
        aria-labelledby={popoverLabelId}
        onBlur={() => this.closePopover(this.notifications)}
        role="tabpanel"
        tabIndex="0"
        value="notifications">
        <HeaderPopoverHeader
          id={popoverLabelId}
          title={labels.notifications.title}
        />
        {length > 0 && (
          <div className={`${namespace}__popover__content`}>
            <span className={`${namespace}__popover__label`}>
              {labels.notifications.today}
            </span>
            <button
              className={`${namespace}__popover__button`}
              aria-label={labels.notifications.clear_all}
              onClick={() => this.clearAllNotifications()}>
              <Icon renderIcon={Close20} />
            </button>
          </div>
        )}
        <ScrollGradient color={theme.inverse02}>
          <ul className={`${namespace}__popover__list`}>
            <Transition
              className={`${namespace}__notification`}
              component="span">
              {notifications
                .sort(
                  (a, b) =>
                    new Date(b.datetime).getTime() -
                    new Date(a.datetime).getTime()
                )
                .map(
                  (
                    { datetime, description, href, id, label, product },
                    index
                  ) => (
                    <li key={id} className={`${namespace}__popover__list-item`}>
                      <HeaderNotification
                        clearButtonLabel={`${labels.notifications.clear} '${description}'`}
                        dateTime={datetime}
                        description={description}
                        href={href}
                        onClearButtonClick={() => this.clearNotification(id)}
                        product={product}
                        timeLabel={label}
                        viaLabel={labels.notifications.via}
                        tabIndex="0"
                        tooltipDirection={index === 0 ? 'bottom' : 'top'}
                      />
                    </li>
                  )
                )}
            </Transition>
          </ul>
        </ScrollGradient>
        {!length && (
          <span className={`${namespace}__popover__container`}>
            {labels.notifications.success}
          </span>
        )}

        <div className={`${namespace}__popover__footer`}>
          {links.notifications_view_all && (
            <HeaderPopoverLinkSecondary href={links.notifications_view_all}>
              {labels.notifications.link}{' '}
              {totalNotifications > 0 && `(${totalNotifications})`}
            </HeaderPopoverLinkSecondary>
          )}
          {links.notifications_preferences && (
            <Icon
              className={`${namespace}__popover__icon`}
              renderIcon={Settings20}
              title={labels.notifications.preferences || ''}
            />
          )}
        </div>
      </div>,
      isActive.notifications
    );
  }

  /**
   * Renders whether the user is active or not.
   * @returns {Fragment} The correctly rendered profile element.
   */
  renderIsUserActive() {
    const { labels, links, profile } = this.props;
    const { isActive, isUserActive } = this.state;

    const { notifications } = isActive;

    const activeClass = '--active';

    const headerListItemClass = `${headerListItemNamespace}${activeClass}`;
    const buttonActiveClass = `${headerButtonNamespace}${activeClass}`;

    const notificationsButtonClasses = classnames(headerButtonNamespace, {
      [buttonActiveClass]: notifications,
      [`${headerButtonNamespace}--notifications`]:
        this.props.notifications.filter((n) => !n.acknowledged).length > 0,
    });

    const profileButtonClasses = classnames(
      iconButtonNamespace,
      headerButtonNamespace,
      {
        [buttonActiveClass]: isActive.profile,
        [`${iconButtonNamespace}${activeClass}`]: isActive.profile,
      }
    );

    return isUserActive ? (
      <Fragment>
        {this.props.showNotifications && (
          <HeaderListItem
            className={headerListItemClass}
            hasPopup={isUserActive}
            isExpanded={isActive.notifications}>
            <Fragment>
              <IconButton
                aria-label={labels.notifications.button}
                className={notificationsButtonClasses}
                onClick={() => this.toggle('notifications')}
                renderIcon={Notification20}
                state={notifications}
                tooltip={false}>
                <Icon name="notification" />
              </IconButton>
              {this.renderNotifications()}
            </Fragment>
          </HeaderListItem>
        )}

        <HeaderListItem
          className={headerListItemClass}
          hasPopup={isUserActive}
          isExpanded={isActive.profile}>
          <Fragment>
            <button
              aria-label={labels.profile.button}
              className={profileButtonClasses}
              onClick={() => this.toggle('profile')}>
              <ProfileImage profile={profile} />
            </button>

            {this.renderProfile()}
          </Fragment>
        </HeaderListItem>
      </Fragment>
    ) : (
      this.props.renderLoginAndSignup(links, labels.profile)
    );
  }

  render() {
    const { className, labels, links } = this.props;
    const { brand } = labels;

    const link = links.product;
    const { company, domain, product } = brand;

    const { isUserActive } = this.state;
    const classes = classnames(`${namespace}__container`, className);

    const domainElement = (title) => (
      <span className={`${namespace}__link__title--domain`}>{title}</span>
    );

    return (
      <div className={classes}>
        <header className={namespace} role="banner">
          <Link className={`${namespace}__link`} href={link}>
            {`${company} `}
            {domain ? (
              <Fragment>
                {domainElement(`${domain} `)}
                <span className={`${namespace}__link__title--product`}>
                  {product}
                </span>
              </Fragment>
            ) : (
              domainElement(product)
            )}
          </Link>
          <ul
            className={`${namespace}__group  ${
              isUserActive && `${namespace}__group--active`
            }`}>
            {this.renderIsUserActive()}
          </ul>
        </header>
      </div>
    );
  }
}
