/**
 * @file Header tests.
 * @copyright IBM Security 2018
 */

import { mount, shallow } from 'enzyme';
import React from 'react';

import { className } from '../../_mocks_';

import Header from '../';

import {
  labels,
  links,
  notifications,
  profile,
  profileWithAccount,
  accounts,
} from '../_mocks_';

import { defaultProps, namespace } from '../constants';

const { fn } = jest;

describe('Header', () => {
  const onNotificationClear = fn(defaultProps.onNotificationClear);

  const header = mount(
    <Header
      className={className}
      labels={labels}
      links={links}
      accounts={accounts}
      notifications={notifications}
      onNotificationClear={onNotificationClear}
      totalNotifications={307}
    />
  );

  const doesElementExist = (selector) => header.find(selector).exists();

  const getIconButton = (label) => header.find(`button[aria-label="${label}"]`);

  const getNotificationsButton = () =>
    getIconButton(labels.notifications.button);
  const hasNotificationsClass = () =>
    getNotificationsButton().hasClass(`${namespace}__button--notifications`);

  const { button } = labels.profile;

  describe('Render Props tests', () => {
    it('should render login and signup buttons via a render prop', () => {
      const linksProp = {
        ...links,
        registration: '/some/link',
        sign_in: '/sign/in/link',
      };
      const wrapper = shallow(
        <Header
          labels={labels}
          links={linksProp}
          renderLoginAndSignup={() => (
            <div id="render-prop-output">
              <a href="./#" id="login-link">
                Login
              </a>
              <a href="./#" id="signup-link">
                Signup
              </a>
            </div>
          )}
        />
      );
      expect(wrapper.find('#login-link')).toHaveLength(1);
      expect(wrapper.find('#signup-link')).toHaveLength(1);
      expect(wrapper.find('#render-prop-output')).toMatchSnapshot();
    });

    it('should render labels by render prop', () => {
      const linksProp = {
        ...links,
        registration: '/some/link',
        sign_in: '/sign/in/link',
      };
      const wrapper = shallow(
        <Header
          labels={labels}
          links={linksProp}
          renderLoginAndSignup={(links, labels) => (
            <div id="render-prop-output">
              <a href={links.sign_in}>{labels.sign_in}</a>
              <a href={links.registration}>{labels.registration}</a>
            </div>
          )}
        />
      );
      expect(
        wrapper.find('a').find({
          children: labels.profile.registration,
          href: linksProp.registration,
        })
      ).toHaveLength(1);
      expect(
        wrapper
          .find('a')
          .find({ children: labels.profile.sign_in, href: linksProp.sign_in })
      ).toHaveLength(1);
      expect(wrapper.find('#render-prop-output')).toMatchSnapshot();
    });
  });

  describe('Rendering', () => {
    const doesPopoverExist = () => doesElementExist(`.${namespace}__popover`);
    const getProfileButton = () => getIconButton(button);

    it('renders correctly', () => {
      expect(header).toMatchSnapshot();
    });

    it('renders the correct items when a user is logged out', () => {
      const doesButtonExist = (text) =>
        header
          .findWhere(
            (element) =>
              (element.type() === 'a' || element.type() === 'button') &&
              element.text() === text
          )
          .exists();

      expect(header.state('isUserActive')).toEqual(false);
      expect(doesButtonExist(labels.profile.registration)).toEqual(true);
      expect(doesButtonExist(labels.profile.sign_in)).toEqual(true);
    });

    it('renders the correct items when a user has logged in', () => {
      const doesGroupExist = () =>
        doesElementExist(`.${namespace}__group--active`);

      expect(doesGroupExist()).toEqual(false);

      header.setProps({ profile });

      expect(header.state('isUserActive')).toEqual(true);
      expect(doesGroupExist()).toEqual(true);
    });

    it('should render the correct notification class', () => {
      expect(hasNotificationsClass()).toEqual(true);
    });

    it('toggles the popover correctly', () => {
      expect(doesPopoverExist()).toEqual(false);

      getProfileButton().simulate('click');

      expect(header.state('isActive').profile).toEqual(true);
      expect(doesPopoverExist()).toEqual(true);

      getProfileButton().simulate('click');

      expect(header.state('isActive').profile).toEqual(false);
    });

    it('should keep the popover open when another item is selected', () => {
      getProfileButton().simulate('click');
      getNotificationsButton().simulate('click');

      expect(header.state('isActive').notifications).toEqual(true);
      expect(doesPopoverExist()).toEqual(true);

      getProfileButton().simulate('click');

      expect(header.state('isActive').notifications).toEqual(false);
      expect(header.state('isActive').profile).toEqual(true);
    });

    it('should keep the popover open when another item is selected', () => {
      getProfileButton().simulate('click');
      getNotificationsButton().simulate('click');

      expect(header.state('isActive').notifications).toEqual(true);
      expect(doesPopoverExist()).toEqual(true);

      getProfileButton().simulate('click');

      expect(header.state('isActive').notifications).toEqual(false);
      expect(header.state('isActive').profile).toEqual(true);
    });

    it('renders the correct items when a user has a list of accounts', () => {
      const headerWithAccount = mount(
        <Header
          className={className}
          labels={labels}
          links={links}
          accounts={accounts}
          notifications={notifications}
          onNotificationClear={onNotificationClear}
          profile={profileWithAccount}
        />
      );
      expect(headerWithAccount.state('isUserActive')).toEqual(true);
      expect(headerWithAccount.state('accountList').length).toEqual(2);
    });
  });

  describe('Events', () => {
    it('should invoke the `onNotificationClear` method when a notification is cleared', () => {
      getNotificationsButton().simulate('click');

      const { id } = notifications
        .map((notification) => ({ id: notification.id }))
        .find((notification, index) => index === 0);

      header
        .find(`.${namespace}__notification__button`)
        .first()
        .simulate('click');

      expect(onNotificationClear).toBeCalledWith(id);
    });

    it('should remove all notifications when the clear button is toggled', () => {
      const doesSuccessMessageExist = () =>
        doesElementExist(`[children="${labels.notifications.success}"]`);

      expect(doesSuccessMessageExist()).toEqual(false);

      header.find(`.${namespace}__popover__button`).simulate('click');

      expect(onNotificationClear).toBeCalled();
    });
  });
});
