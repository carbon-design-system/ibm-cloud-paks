/**
 * @file Delimited list.
 * @copyright IBM Security 2019 - 2021
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { getComponentNamespace } from '../../globals/namespace';

const namespace = getComponentNamespace('delimited-list');

/**
 * Delimited List component.
 */
function DelimitedList({ className, delimiter, items, truncate, ...other }) {
  const [hasOverflow, setHasOverflow] = useState(false);

  const element = useRef(null);

  // Use ref to compare the element's `scrollWidth` (full width with overflow)
  // to its `clientWidth` (innner width, not including overflow).
  useLayoutEffect(() => {
    if (
      element &&
      element.current &&
      element.current.scrollWidth > element.current.clientWidth
    ) {
      return setHasOverflow(true);
    }
    return setHasOverflow(false);
  }, [items]);

  const classes = classnames(namespace, className);
  const valueClasses = classnames(`${namespace}__value`, {
    [`${namespace}__value--truncated`]: truncate,
  });

  return (
    <div
      className={classes}
      title={hasOverflow ? items.join(delimiter) : undefined}
      {...other}>
      <div ref={element} className={valueClasses}>
        {items.length > 0 ? items.join(delimiter) : '–'}
      </div>
      {hasOverflow && truncate && items.length > 0 && (
        <div className={`${namespace}__count`}>{`[${items.length}]`}</div>
      )}
    </div>
  );
}

DelimitedList.propTypes = {
  /** Provide an optional class to be applied to the containing node */
  className: PropTypes.string,

  /** Delimiter used when rendering the items */
  delimiter: PropTypes.string,

  /** Array of items to render */
  items: PropTypes.arrayOf(PropTypes.any),

  /** Specify whether the `DelimitedList` is truncated if it overflows */
  truncate: PropTypes.bool,
};

DelimitedList.defaultProps = {
  className: undefined,
  delimiter: ', ',
  items: [],
  truncate: true,
};

export default DelimitedList;
