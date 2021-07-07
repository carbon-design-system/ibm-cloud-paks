/**
 * @file Card.
 * @copyright IBM Security 2019
 */

import classnames from 'classnames';
import {
  array,
  element,
  func,
  node,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import React, { Fragment } from 'react';

import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('card');

const Card = ({
  className,
  children,
  label,
  link,
  header,
  body,
  footer,
  onClick,
  ...other
}) => {
  const cardHeader = header && (
    <div className={`${namespace}__header`}>
      {header.tag && (
        <p className={`${namespace}__header__tag`}>{header.tag}</p>
      )}
      {header.image && (
        <img
          className={`${namespace}__header__image`}
          alt={label}
          src={header.image}
        />
      )}
      <h1 className={`${namespace}__header__title`}>{header.title}</h1>
    </div>
  );

  const cardBody = body && (
    <div className={`${namespace}__body`}>
      {body.text && <p className={`${namespace}__body__text`}>{body.text}</p>}
      {body.children}
    </div>
  );

  const cardFooter = footer && (
    <div className={`${namespace}__footer`}>{footer.children}</div>
  );

  const content = (
    <Fragment>
      {cardHeader}
      {cardBody}
      {cardFooter}
      {children}
    </Fragment>
  );

  const classNames = classnames(namespace, className, {
    [`${namespace}__link`]: link,
  });

  return (
    <Fragment>
      {link ? (
        <a
          className={classNames}
          href={link}
          aria-label={label}
          onClick={onClick}
          {...other}>
          {content}
        </a>
      ) : (
        <div className={classNames} {...other}>
          {content}
        </div>
      )}
    </Fragment>
  );
};

/** Card child elements. */
const children = oneOfType([array, element, string]);

Card.defaultProps = {
  body: null,
  children: null,
  className: '',
  footer: null,
  header: null,
  label: '',
  link: null,
  onClick: null,
};

Card.propTypes = {
  /** @type {object.<object, *>} An object list of body props. */
  body: shape({
    children,

    /** @type {string} The text of the body. */
    text: string,
  }),

  /** @type {string} The class. */
  className: string,
  children,

  /** @type {object.<object, *>} An object list of footer props. */
  footer: shape({
    children,
  }),

  /** @type {object.<object, *>} An object list of header props. */
  header: shape({
    /** @type {string} The image of the header. */
    image: string,

    /** @type {string} Card header tag. */
    tag: node,

    /** @type {string} The title of the header. */
    title: string.isRequired,
  }),

  /** @type {string} The alt tag content for an image, if included in the header object. */
  label: string,

  /** @type {string} The link. */
  link: string,

  /** @type {string} Click handler. */
  onClick: func,
};

export default Card;
