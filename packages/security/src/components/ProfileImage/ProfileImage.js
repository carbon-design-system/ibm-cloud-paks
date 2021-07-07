/**
 * @file Profile image.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('profile-image');

/**
 * Profile image component.
 * @param {object.<string, *>} props Profile image props.
 * @returns {ProfileImage} Profile image instance.
 */
const ProfileImage = ({ className, large, profile, ...other }) => {
  const classNames = classnames(namespace, className, {
    [`${namespace}--large`]: large,
  });

  return profile.image_url ? (
    <img
      className={classNames}
      alt={`${profile.name.first_name} ${profile.name.surname}`}
      src={profile.image_url}
      {...other}
    />
  ) : (
    <span className={classNames} {...other}>
      {`${profile.name.first_name.charAt(0)}${profile.name.surname.charAt(0)}`}
    </span>
  );
};

ProfileImage.defaultProps = {
  className: null,
  large: false,
};

ProfileImage.propTypes = {
  /** @type {string} Extra classes. */
  className: PropTypes.string,

  /** @type {boolean} Determines whether the profile image is large or not. */
  large: PropTypes.bool,

  /** @type {object.<string, *>} An object list of profile information. */
  profile: PropTypes.shape({
    /** @type {string} Profile image URL. */
    image_url: PropTypes.string,

    /** @type {object.<string, string>} An object list of profile name information. */
    name: PropTypes.shape({
      /** @type {string} First name. */
      first_name: PropTypes.string.isRequired,

      /** @type {string} Surname. */
      surname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProfileImage;
