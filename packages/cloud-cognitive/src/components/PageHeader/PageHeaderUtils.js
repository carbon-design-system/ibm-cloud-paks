/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pkg } from '../../settings';
export const blockClass = `${pkg.prefix}--page-header`;

/**
 * Assesses the vertical height of various elements and calls setMetrics with update
 * @param {{}} headerRef
 * @param {{}} navigation
 * @param {boolean} disableBreadcrumbScroll
 * @param {()} setMetrics
 */
export const utilCheckUpdateVerticalSpace = (
  headerRef,
  navigation,
  disableBreadcrumbScroll,
  setMetrics
) => {
  const dynamicRefs = {};

  const getDynamicRef = (selector) => {
    // would love to do this differently but digging in the dom seems easier
    // than getting a ref to a conditionally rendered item
    /* don't know how to test resize */
    /* istanbul ignore next if */
    if (!headerRef.current) {
      return undefined;
    } else {
      let dRef = dynamicRefs[selector];
      if (!dRef || dRef.parentNode === null) {
        dynamicRefs[selector] = headerRef.current.querySelector(selector);
      }
    }
    return dynamicRefs[selector];
  };

  // Utility function that checks the heights of various elements which are used to determine layout
  const update = {};

  const breadcrumbTitleEl = getDynamicRef(`.${blockClass}__breadcrumb-title`);
  const breadcrumbRowEl = getDynamicRef(`.${blockClass}__breadcrumb-row`);
  const titleRowEl = getDynamicRef(`.${blockClass}__title-row`);
  const subtitleRowEl = getDynamicRef(`.${blockClass}__subtitle-row`);
  const availableRowEl = getDynamicRef(`.${blockClass}__available-row`);
  const navigationRowEl = getDynamicRef(`.${blockClass}__navigation-row`);

  update.headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;
  update.headerWidth = headerRef.current ? headerRef.current.offsetWidth : 0;

  // The header offset is the vertical distance from the top of the document to
  // the page header, which we obtain using getBoundingClientRect() for robust
  // behavior. We use this offset as the scroll/fixed threshold.
  const doc = headerRef.current?.ownerDocument;
  update.headerOffset = headerRef.current
    ? headerRef.current.getBoundingClientRect().top +
      (doc.defaultView.pageYOffset || doc.documentElement.scrollTop) -
      (doc.documentElement.clientTop || doc.body.clientTop || 0)
    : 0;

  update.breadcrumbRowHeight = breadcrumbRowEl
    ? breadcrumbRowEl.clientHeight
    : 0;
  update.breadcrumbRowWidth = breadcrumbRowEl ? breadcrumbRowEl.offsetWidth : 0;

  update.breadcrumbTitleHeight = breadcrumbTitleEl
    ? breadcrumbTitleEl.clientHeight
    : 1;

  update.titleRowHeight = titleRowEl ? titleRowEl.clientHeight : 0;
  update.subtitleRowHeight = subtitleRowEl ? subtitleRowEl.clientHeight : 0;
  update.availableRowHeight = availableRowEl ? availableRowEl.clientHeight : 0;
  update.navigationRowHeight = navigationRowEl
    ? navigationRowEl.clientHeight
    : 1;

  update.breadcrumbRowSpaceBelow = 0;
  update.titleRowSpaceAbove = 0;

  // Base for calculating sticky top
  update.headerTopValue = -update.headerHeight;
  if (navigation) {
    // adjust top for sticky with navigation
    update.headerTopValue += update.navigationRowHeight;
  }

  if (disableBreadcrumbScroll || !navigation) {
    // adjust sticky top if no navigation or breadcrumb is to stay on screen
    update.headerTopValue += update.breadcrumbRowHeight;
  }

  if (window) {
    let val;
    /* don't know how to test resize */
    /* istanbul ignore next if */
    if (breadcrumbRowEl) {
      val = parseFloat(
        window
          .getComputedStyle(breadcrumbRowEl)
          .getPropertyValue('margin-bottom'),
        10
      );
      update.breadcrumbRowSpaceBelow = isNaN(val) ? 0 : val;
    }
    /* don't know how to test resize */
    /* istanbul ignore next if */
    if (titleRowEl) {
      val = parseFloat(
        window.getComputedStyle(titleRowEl).getPropertyValue('margin-top'),
        10
      );
      update.titleRowSpaceAbove = isNaN(val) ? 0 : val;
    }
  }

  setMetrics((previous) => ({ ...previous, ...update }));
};

/**
 * Takes the title parameters and returns a titleShape
 * @param {{} | string} title
 * @param {{}} titleIcon
 * @param {string} defaultTitle
 * @returns
 */
export const utilGetTitleShape = (title, titleIcon, defaultTitle) => {
  // Title shape is used to allow title to be string or shape
  let newShape = { ...defaultTitle };

  if (title) {
    if (title.text) {
      // title is in shape format
      newShape = Object.assign(newShape, { ...title });
    } else {
      // title is a string
      newShape.text = title;
    }
  }

  if (!newShape.icon && titleIcon) {
    // if no icon use titleIcon if supplied
    newShape.icon = titleIcon;
  }

  return newShape;
};

// Set css style values directly onto a node. Note that this is effective
// immediately, rather than using the React `style` prop which goes through
// the React DOM update optimization.
export const utilSetCustomCSSProps = (targetRef, kvPairs) => {
  if (targetRef.current) {
    const keys = Object.keys(kvPairs);
    for (let k of keys) {
      targetRef.current.style.setProperty(k, kvPairs[k]);
    }
  }
};
