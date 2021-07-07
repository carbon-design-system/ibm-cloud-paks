/**
 * @file Profile image stories.
 * @copyright IBM Security 2019 - 2021
 */

import { boolean, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import React from 'react';

import { security } from '../../../.storybook';

import { ProfileImage } from '../..';

import { className, large, profile } from './_mocks_';

const profileImageProps = () => ({
  className,
  large: boolean('Large (large)', large),
});

storiesOf(security('ProfileImage'), module).add('default', () => (
  <ProfileImage
    {...profileImageProps()}
    profile={object('Profile (profile)', profile)}
  />
));
