/**
 * @file Toolbar stories.
 * @copyright IBM Security 2018
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { patterns } from '../../../.storybook';

import Toolbar from './';
import { labels, menu, settings, support } from './_mocks_';

storiesOf(patterns('Toolbar'), module).add('default', () => (
  <Toolbar labels={labels} menu={menu} settings={settings} support={support} />
));

storiesOf(patterns('Toolbar'), module).add('Menu only', () => (
  <Toolbar labels={labels} menu={menu} />
));
