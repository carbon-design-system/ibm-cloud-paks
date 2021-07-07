/**
 * @file Header mocks.
 * @copyright IBM Security 2018
 */

import React from 'react';
import { url } from '../../_mocks_';
import labels from '../locales/en/Header.json';

const hasSearch = true;
const hasSearchError = false;

const links = {
  product: url(),
  profile: url(),
  registration: url(),
  sign_in: url(),
  sign_out: url(),
  edit_profile: url(),
  notifications_preferences: url(),
  notifications_view_all: url(),
};

const accounts = new Array(3).fill().map((name = `Company`, id) => ({
  id: id.toString(),
  name: `${name} ${id + 1}`,
}));

const notifications = [
  {
    id: `notification__0`,
    description: 'A new request requires approval.',
    href: url(),
    product: 'Application 3',
    datetime: 'Fri Dec 21 2018 18:57:08 GMT-0600 (Central Standard Time)',
    label: '11min ago',
  },
  {
    id: `notification__1`,
    description: 'There have been 17 failed sign-ins in the last 3 days.',
    href: url(),
    product: 'Application 2',
    datetime: 'Wed May 01 2019 22:22:52 GMT-0500 (Central Daylight Time)',
    label: '1hr ago',
  },
  {
    id: `notification__2`,
    description: 'There are 3 unread messages in the queue.',
    href: url(),
    product: 'Application 3',
    datetime: 'Fri Jul 06 2018 00:17:49 GMT-0500 (Central Daylight Time)',
    label: '3hrs ago',
  },
  {
    id: `notification__3`,
    description: 'Review the results of the latest scan.',
    href: url(),
    product: 'Application 3',
    datetime: 'Sun Apr 14 2019 20:32:17 GMT-0500 (Central Daylight Time)',
    label: '3hrs ago',
  },
  {
    id: `notification__4`,
    description: 'A new administrator has been added to your account.',
    href: url(),
    product: 'Application 1',
    datetime: 'Sat Oct 20 2018 19:07:04 GMT-0500 (Central Daylight Time)',
    label: '4hrs ago',
  },
  {
    id: `notification__5`,
    description: 'There are 5 items that require your review.',
    href: url(),
    product: 'Application 2',
    datetime: 'Tue Dec 25 2018 18:14:28 GMT-0600 (Central Standard Time)',
    label: '5hrs ago',
  },
  {
    id: `notification__7`,
    description:
      'There are 103 threats found in the last scan. Please click to see the details.',
    href: url(),
    product: 'Application 2',
    datetime: 'Tue Nov 25 2018 18:14:28 GMT-0600 (Central Standard Time)',
    label: '10hrs ago',
  },
  {
    id: `notification__8`,
    description:
      'There are 3 ongoing attacks. Please click to take actions immediately.',
    href: url(),
    product: 'Application 2',
    datetime: 'Tue Oct 25 2018 18:14:28 GMT-0600 (Central Standard Time)',
    label: '24hrs ago',
  },
];

const profile = {
  image_url: null,
  name: {
    first_name: 'Sample',
    surname: 'User',
  },
  description: (
    <span>
      Example description node with extra information and{' '}
      <a href="#example">example link.</a>
    </span>
  ),
};

const profileWithAccount = Object.assign({}, profile, {
  email: 'example@ibm.com',
  account: accounts[0],
});

const profileWithAccountLongName = Object.assign({}, profile, {
  email: 'example@ibm.com',
  account: {
    ...accounts[0],
    name: `${accounts[0].name} plus more text to make the name super super long`,
  },
});
const defaultSearchValue = '127.0.0.1';

export {
  defaultSearchValue,
  hasSearch,
  hasSearchError,
  labels,
  links,
  accounts,
  notifications,
  profile,
  profileWithAccount,
  profileWithAccountLongName,
};
