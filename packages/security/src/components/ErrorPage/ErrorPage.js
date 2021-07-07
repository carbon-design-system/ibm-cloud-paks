/**
 * @file Error view component.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import dataUri from 'data-uri.macro';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../Link';

import { getComponentNamespace } from '../../globals/namespace';
import * as defaultLabels from '../../globals/nls';

const namespace = getComponentNamespace('error-page');

const backgroundImage = dataUri('../../images/entitlement@2x.png');

export const forbidden = {
  backgroundImage,
  backgroundSize: '574px 300px',
  backgroundPosition: '701px 233px',
  minHeight: '701px',
};

const errorIllustrations = {
  403: {
    ...forbidden,
    backgroundImage: `url(${backgroundImage})`,
  },
  default: {
    backgroundImage: `url(${dataUri('../../images/Error@2x.png')})`,
    backgroundSize: '275px 322px',
    backgroundPosition: '814px 222px',
    minHeight: '814px',
  },
};

/**
 * Error view component.
 */
const ErrorPage = ({
  backgroundImage,
  className,
  title,
  statusCode,
  errorName,
  errorMessage,
  links,
  labels,
  ...other
}) => {
  const classes = classnames(className, namespace);

  const errorLabels = defaultLabels.labels.ERRORS[statusCode];
  if (!title) {
    title = errorLabels
      ? errorLabels.TITLE
      : defaultLabels.labels.ERRORS.default.TITLE;
  }
  errorName = !errorName && errorLabels ? errorLabels.ERRORNAME : errorName;
  errorMessage =
    !errorMessage && errorLabels ? errorLabels.ERRORMESSAGE : errorMessage;

  let formattedBackgroundImage;

  if (!backgroundImage) {
    formattedBackgroundImage = errorIllustrations[statusCode]
      ? { ...errorIllustrations[statusCode] }
      : { ...errorIllustrations.default };
  } else {
    formattedBackgroundImage = { backgroundImage };
  }

  return (
    <section className={classes} style={formattedBackgroundImage} {...other}>
      <div className={`${namespace}__content-wrapper`}>
        <div className={`${namespace}__content`}>
          <h2 className={`${namespace}__title`}>{title}</h2>
          <h3 className={`${namespace}__sub-title`}>{errorName}</h3>
          {errorMessage && (
            <p className={`${namespace}__description`}>{errorMessage}</p>
          )}
          {links.length > 0 &&
            links.map(({ external = false, id, text, href, icon }) => (
              <Link
                id={id}
                key={id}
                href={href}
                target={external ? '_blank' : '_parent'}
                rel="noopener noreferrer"
                className={`${namespace}__link`}>
                {icon !== undefined && (
                  <img
                    alt={text}
                    className={`${namespace}__link__icon`}
                    src={icon}
                  />
                )}
                {text}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

const link = {
  /** @type {node} Provide the identifier for the <a> node */
  id: PropTypes.string.isRequired,

  /** @type {node} Provide the text for the Link. */
  text: PropTypes.string.isRequired,

  /** @type {string} Provide the `href` attribute for the <a> node */
  href: PropTypes.string.isRequired,

  /** @type {string} Provide the `src` attribute for an icon */
  icon: PropTypes.string,
};

ErrorPage.defaultProps = {
  backgroundImage: '',
  className: '',
  statusCode: null,
  errorName: '',
  errorMessage: '',
  links: [],
  labels: {},
  title: '',
};

ErrorPage.propTypes = {
  /** @type {string} Background image data URI. */
  backgroundImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /** @type {string} The class name of the section. */
  className: PropTypes.string,

  /** @type {string} The title of the section. */
  title: PropTypes.string,

  /** @type {string} statusCode for the ErrorPage section. */
  statusCode: PropTypes.number,

  /** @type {string} errorName for the ErrorPage section. */
  errorName: PropTypes.string,

  /** @type {string} errorMessage for the ErrorPage section. */
  errorMessage: PropTypes.string,

  /** @type {Array<Object.*>} An array list of links. */
  links: PropTypes.arrayOf(PropTypes.shape(link)),

  /** @type {object} the labels used by ErrorPage */
  labels: defaultLabels.propType,
};

export default ErrorPage;
