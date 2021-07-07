/**
 * @file Non entitled section.
 * @copyright IBM Security 2019 - 2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Link from '../Link';

import { carbonPrefix, getComponentNamespace } from '../../globals/namespace';

const namespace = getComponentNamespace('ne-section');

/**
 * Non entitled section component.
 */
const NonEntitledSection = ({
  backgroundImage,
  className,
  description,
  title,
  subTitle,
  links,
  style,
  ...other
}) => {
  const classes = classnames(className, namespace, `${carbonPrefix}--grid`);

  return (
    <section
      className={classes}
      style={
        backgroundImage && {
          backgroundImage: `url("${backgroundImage}")`,
          ...style,
        }
      }
      {...other}>
      <div className={`${namespace}__content-wrapper ${carbonPrefix}--row`}>
        <div
          className={`${namespace}__content ${carbonPrefix}--col-lg-5 ${carbonPrefix}--col-md-4`}>
          <h2 className={`${namespace}__title`}>{title}</h2>
          <h3 className={`${namespace}__sub-title`}>{subTitle}</h3>
          {description && (
            <p className={`${namespace}__description`}>{description}</p>
          )}
          {links.length > 0 &&
            links.map(({ id, text, href, icon }) => (
              <div key={id} className={`${namespace}__link-wrapper`}>
                <Link id={id} href={href} className={`${namespace}__link`}>
                  {icon !== undefined && (
                    <img
                      // `alt` is purposely left blank:
                      alt=""
                      aria-hidden
                      className={`${namespace}__link__icon`}
                      src={icon}
                    />
                  )}
                  <span className={`${namespace}__link__text`}>{text}</span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

NonEntitledSection.defaultProps = {
  backgroundImage: null,
  className: '',
  description: '',
  links: [],
};

NonEntitledSection.propTypes = {
  /** @type {string} Background image data URI. */
  backgroundImage: PropTypes.string,

  /** @type {string} The class name of the section. */
  className: PropTypes.string,

  /** @type {string} Section heading. */
  title: PropTypes.string.isRequired,

  /** @type {string} Section description heading. */
  subTitle: PropTypes.string.isRequired,

  /** @type {string} Section description. */
  description: PropTypes.string,

  /** @type {Array<Object.*>} An array list of links. */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      /** @type {node} Provide the identifier for the <a> node */
      id: PropTypes.string.isRequired,

      /** @type {node} Provide the text for the Link. */
      text: PropTypes.string.isRequired,

      /** @type {string} Provide the `href` attribute for the <a> node */
      href: PropTypes.string.isRequired,

      /** @type {string} Provide the `src` attribute for an icon */
      icon: PropTypes.string,
    })
  ),
};

export default NonEntitledSection;
