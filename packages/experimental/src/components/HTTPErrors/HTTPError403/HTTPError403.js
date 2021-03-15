import React from 'react';
import cx from 'classnames';
import { arrayOf, shape, string } from 'prop-types';
import HTTPErrorSvg403 from '../assets/HTTPErrorSvg403';
import { HTTPErrors } from '../HTTPErrors';

import { pkg } from '../../../settings';
import { Canary } from '../../_Canary';

const blockClass = `${pkg.prefix}--http-errors`;
const componentName = 'HTTPError403';

export const HTTPError403 = !pkg.isComponentEnabled(componentName)
  ? () => <Canary component={componentName} />
  : ({ className, description, errorCodeLabel, links, title, ...rest }) => {
      return (
        <div
          className={cx(`${blockClass}`, {
            [className]: className,
          })}
          {...rest}>
          <HTTPErrors
            description={description}
            errorCodeLabel={errorCodeLabel}
            title={title}
            links={links}
          />
          <HTTPErrorSvg403 className={cx(`${blockClass}-image`)} />
        </div>
      );
    };

HTTPError403.displayName = componentName; // displayName is used in preference to function.name by React

HTTPError403.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: string,
  /**
   * String that will provide the description for the HTTP error code
   */
  description: string,
  /**
   * String that will describe the error that occurred
   */
  errorCodeLabel: string,
  /**
   * Links that will display for extra context when receiving particular errors
   */
  links: arrayOf(
    shape({
      /**
       * The text to display for the link
       */
      text: string.isRequired,
      /**
       * The link's destination
       */
      url: string.isRequired,
    })
  ),
  /**
   * This will be for the main title of the HTTP error component
   */
  title: string,
};
