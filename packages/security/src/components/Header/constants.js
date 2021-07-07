/**
 * @file Header constants.
 * @copyright IBM Security 2018
 */

import PropTypes from 'prop-types';

import { getComponentNamespace } from '../../globals/namespace';

const defaultProps = {
  className: null,
  onNotificationClear: (notificationId) => notificationId,
  notifications: [],
  profile: null,
  showEditProfile: true,
  showNotifications: true,
  totalNotifications: 0,
};

const namespace = getComponentNamespace('header');

const propTypes = {
  /** @type {string} Extra classes. */
  className: PropTypes.string,

  /** @type {object.<object, *>} An object list of labels. */
  labels: PropTypes.shape({
    /** @type {object.<string, string>} An object list of brand labels. */
    brand: PropTypes.shape({
      /** @type {string} The company. */
      company: PropTypes.string.isRequired,

      /** The domain. */
      domain: PropTypes.string,

      /** @type {string} The product name. */
      product: PropTypes.string.isRequired,
    }).isRequired,

    /** @type {object.<string, string>} An object list of notifications labels. */
    notifications: PropTypes.shape({
      /** @type {string} The notification button label. */
      button: PropTypes.string.isRequired,

      /** @type {string} The notification clear button label. */
      clear: PropTypes.string.isRequired,

      /** @type {string} The notification button clear all label. */
      clear_all: PropTypes.string.isRequired,

      /** @type {string} The notifications link label. */
      link: PropTypes.string.isRequired,

      /** @type {string} The notifications success label. */
      success: PropTypes.string.isRequired,

      /** @type {string} The notifications today label. */
      today: PropTypes.string.isRequired,

      /** @type {string} The notifications title label. */
      title: PropTypes.string.isRequired,

      /** @type {string} The notification 'via' label. */
      via: PropTypes.string.isRequired,

      /** @type {string} The svg title text for the notification "preferences" icon link. */
      preferences: PropTypes.string,
    }).isRequired,

    /** @type {object.<string, string>} An object list of profile labels. */
    profile: PropTypes.shape({
      /** @type {string} The account label. */
      link: PropTypes.string,

      /** @type {string} Registration label. */
      registration: PropTypes.string.isRequired,

      /** @type {string} Logging in label. */
      sign_in: PropTypes.string.isRequired,

      /** @type {string} Logging out label. */
      sign_out: PropTypes.string.isRequired,

      /** @type {string} Edit profile label. */
      edit_profile: PropTypes.string,

      /** @type {string} Account label. */
      account: PropTypes.string,
    }).isRequired,
  }).isRequired,

  /** @type {Array<Object.*>} An array list of accounts. */
  accounts: PropTypes.arrayOf(
    /** @type {object.<string, string>} An object list of accounts. */
    PropTypes.shape({
      /** @type {string} The account id. */
      id: PropTypes.string.isRequired,

      /** @type {string} The account name. */
      name: PropTypes.string.isRequired,
    })
  ),

  /** @type {Function} The callback when an account is clicked. */
  onAccountClick: PropTypes.func,

  /** @type {Array<Object.*>} An array list of notifications. */
  notifications: PropTypes.arrayOf(
    /** @type {object.<string, string>} An object list of notifications. */
    PropTypes.shape({
      /** @type {string} The notification ID. */
      id: PropTypes.string.isRequired,

      /** @type {string} The notification date. */
      datetime: PropTypes.string.isRequired,

      /** @type {string} The notification description. */
      description: PropTypes.string.isRequired,

      /** @type {string} The notification URL. */
      href: PropTypes.string,

      /** @type {string} The notification label. */
      label: PropTypes.string.isRequired,

      /** @type {string} The product name. */
      product: PropTypes.string.isRequired,
    }).isRequired
  ),

  /** @type {object.<string, string>} An object list of URLs. */
  links: PropTypes.shape({
    /** @type {string} The product URL. */
    product: PropTypes.string.isRequired,

    /** @type {string} The profile URL. */
    profile: PropTypes.string.isRequired,

    /** @type {string} The registration URL. */
    registration: PropTypes.string.isRequired,

    /** @type {string} The URL to sign in. */
    sign_in: PropTypes.string.isRequired,

    /** @type {string} The URL to sign out. */
    sign_out: PropTypes.string.isRequired,

    /** @type {string} The URL to edit profile. */
    edit_profile: PropTypes.string,

    /** @type {string} The preferences href in the notifications popover. */
    notifications_preferences: PropTypes.string,

    /** @type {string} The 'view all' href in the notifications popover. */
    notifications_view_all: PropTypes.string,
  }).isRequired,

  /** @type {Function} The callback when a notification is cleared. */
  onNotificationClear: PropTypes.func,

  /** @type {object.<object, *>} An object list of profile information. */
  profile: PropTypes.shape({
    /** @type {string} The profile image URL. */
    image_url: PropTypes.string,

    /** @type {string} The profile email. */
    email: PropTypes.string,

    /** @type {accounts} The current user account. */
    account: PropTypes.shape({
      /** @type {string} The account id. */
      id: PropTypes.string.isRequired,

      /** @type {string} The account name. */
      name: PropTypes.string.isRequired,
    }),

    /** @type {object.<string, string>} An object list of profile names. */
    name: PropTypes.shape({
      /** @type {string} The profile first name. */
      first_name: PropTypes.string.isRequired,

      /** @type {string} The profile surname. */
      surname: PropTypes.string.isRequired,
    }).isRequired,

    /** Optional description for a profile. */
    description: PropTypes.node,
  }),

  /** @type {boolean} Whether or not to show the Edit Profile link. */
  showEditProfile: PropTypes.bool,

  /** @type {boolean} Whether or not to show the notifications bell. */
  showNotifications: PropTypes.bool,

  /** @type {number} The total number of unread notifications of the current user. */
  totalNotifications: PropTypes.number.isRequired,
};

export { defaultProps, namespace, propTypes };
