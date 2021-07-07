/**
 * @file Shell mocks.
 * @copyright IBM Security 2018
 */

import { labels as headerLabels, links, profile } from '../../Header/_mocks_';

import {
  labels as toolbarLabels,
  menu,
  settings,
  support,
} from '../../Toolbar/_mocks_';

const header = {
  labels: headerLabels,
  links,
  totalNotifications: 307,
};

const toolbar = {
  labels: toolbarLabels,
  menu,
  settings,
  support,
};

const returnToBanner = {
  application: 'Application 1',
  href: '#example',
};

const skipToContent = {
  label: 'Skip to content',
  href: '#main',
};

export { header, profile, toolbar, returnToBanner, skipToContent };
