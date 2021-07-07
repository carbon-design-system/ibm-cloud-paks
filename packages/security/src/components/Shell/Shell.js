/**
 * @file Shell.
 * @copyright IBM Security 2019 - 2021
 */

import { ArrowLeft16 } from '@carbon/icons-react';

import classnames from 'classnames';
import dataUri from 'data-uri.macro';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { getComponentNamespace } from '../../globals/namespace';

import Header from '../Header';
import Icon from '../Icon';
import Link from '../Link';
import Toolbar from '../Toolbar';
import { SkipToContent } from '../..';

export const namespace = getComponentNamespace('shell');

const { defaultProps: headerDefaultProps, propTypes: headerPropTypes } = Header;

const Shell = ({
  header,
  profile,
  renderAddons,
  returnToBanner,
  skipToContent,
  toolbar,
}) => {
  const {
    accounts,
    clearAllNotifications,
    totalNotifications,
    links,
    notifications,
    onAccountClick,
    onNotificationClear,
    ...headerProps
  } = header;

  const activeClass = `${namespace}--active`;
  const returnClass = `${activeClass}--return`;

  const headerNamespace = '__header';

  return (
    <Fragment>
      {skipToContent && (
        <div className={`${namespace}__skip-to-content`}>
          <SkipToContent
            id={`${namespace}__skip-to-content__link`}
            className={`${namespace}__skip-to-content__link`}
            href={skipToContent.href}>
            {skipToContent.label}
          </SkipToContent>
        </div>
      )}
      {returnToBanner && (
        <div className={`${namespace}__banner__container`}>
          <Link
            id="returnToBanner"
            className={`${namespace}__banner`}
            href={returnToBanner.href}
            style={{
              backgroundImage: `url(${dataUri(
                '../../images/aurora-banner@2x.png'
              )})`,
            }}>
            <Icon
              className={`${namespace}__banner__icon`}
              renderIcon={ArrowLeft16}
            />
            <span className={`${namespace}__banner__text`}>
              {returnToBanner.view
                ? `Return to ${returnToBanner.application} / ${returnToBanner.view}`
                : `Return to ${returnToBanner.application}`}
            </span>
          </Link>
        </div>
      )}
      <div
        className={classnames(namespace, {
          [activeClass]: profile,
          [returnClass]: returnToBanner,
        })}>
        {profile && (
          <Toolbar
            className={classnames({
              [`${returnClass}__toolbar`]: returnToBanner,
            })}
            renderAddons={renderAddons}
            {...toolbar}
          />
        )}
        <Header
          accounts={accounts}
          className={classnames({
            [`${activeClass}${headerNamespace}`]: profile,
            [`${returnClass}${headerNamespace}`]: returnToBanner,
          })}
          clearAllNotifications={clearAllNotifications}
          totalNotifications={totalNotifications}
          labels={header.labels}
          links={links}
          notifications={notifications}
          onAccountClick={onAccountClick}
          onNotificationClear={onNotificationClear}
          profile={profile}
          {...headerProps}
        />
      </div>
    </Fragment>
  );
};

Shell.defaultProps = {
  header: headerDefaultProps,
  profile: headerDefaultProps.profile,
  renderAddons: Toolbar.defaultProps.renderAddons,
  returnToBanner: null,
  skipToContent: null,
  toolbar: {},
};

Shell.propTypes = {
  /** @type {object<object.Object>} An object list of header properties. */
  header: PropTypes.shape(headerPropTypes),

  /** @type {object<object.Object>} An object list of profile properties. */
  profile: headerPropTypes.profile,

  /** @type {Array<{id: string, tooltip: string, render: Function: React.Element}>} An object list to render custom addon icons. */
  renderAddons: Toolbar.propTypes.renderAddons,

  /** @type {object<object.Object>} An object list of banner properties. */
  returnToBanner: PropTypes.shape({
    application: PropTypes.string.isRequired,
    view: PropTypes.string,
    href: PropTypes.string.isRequired,
  }),

  /** @type {object.<string, string>} Object of 'skip-to-content' link information. */
  skipToContent: PropTypes.shape({
    /** @type {string} Label text for 'skip-to-content'. */
    label: PropTypes.string,

    /** @type {string} Location to skip to. */
    href: PropTypes.string,
  }),

  /** @type {object<object.Object>} An object list of toolbar properties. */
  toolbar: PropTypes.shape(Toolbar.propTypes),
};

export default Shell;
