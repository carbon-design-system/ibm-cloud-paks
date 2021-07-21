//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// Import portions of React that are needed.
import React, { useState, useEffect, useRef } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from 'carbon-components-react';
import { pkg, carbon } from '../../settings';
import { useResizeDetector } from 'react-resize-detector';
import { ArrowLeft16 } from '@carbon/icons-react';

// Carbon and package components we use.
import {
  Breadcrumb,
  BreadcrumbItem,
  OverflowMenu,
  OverflowMenuItem,
} from 'carbon-components-react';
import { OverflowMenuHorizontal32 } from '@carbon/icons-react';
import uuidv4 from '../../global/js/utils/uuidv4';
import {
  deprecateProp,
  extractShapesArray,
} from '../../global/js/utils/props-helper';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--breadcrumb-with-overflow`;
const componentName = 'BreadcrumbWithOverflow';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

const getHref = (shape) => {
  // This function should extract href from item
  // It expects that the href is attached either to the item or direct child
  // It prefers item.props.href
  return shape?.href ? shape.href : shape?.children?.props?.href;
};

const getTitle = (shape) => {
  // This function should extract text based title from the item.
  // It prefers in this order
  // - shape.data-title
  // - shape.title
  // - shape.label if string
  // - shape.label.props.children if string. This case is likely if an <a /> is used inside a BreadcrumbItem
  let useAsTitle = null;

  if (shape) {
    /* istanbul ignore next if */ // list represents preferred order with checks, no else case expected
    if (shape['data-title']) {
      useAsTitle = shape['data-title'];
    } else if (shape.title) {
      useAsTitle = shape.title;
    } else if (typeof shape.label === 'string') {
      useAsTitle = shape.label;
    } else if (typeof shape?.label?.props?.children === 'string') {
      useAsTitle = shape.label.props.children;
    }
  }

  return useAsTitle;
};

/**
 * Converts the deprecated children array shapes into breadcrumbs
 */
const processShapesArray = (arr) => {
  return arr.map((shape) => {
    const { children: label, ...rest } = shape;
    const href = getHref(shape);

    return { ...rest, href, label };
  });
};

/**
 * The BreadcrumbWithOverflow is used internally by the PageHeader to wrap BreadcrumbItems.
 */
export let BreadcrumbWithOverflow = ({
  breadcrumbs: breadcrumbsIn,
  children: deprecated_children,
  className,
  maxVisible,
  noTrailingSlash,
  overflowAriaLabel,
  ...other
}) => {
  const [displayCount, setDisplayCount] = useState(3);
  const [displayedBreadcrumbItems, setDisplayedBreadcrumbItems] = useState([]);
  const breadcrumbItemWithOverflow = useRef(null);
  const sizingContainerRef = useRef(null);
  const internalId = useRef(uuidv4());
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // eslint-disable-next-line react/prop-types
  const BreadcrumbOverflowMenu = ({ overflowItems }) => {
    return (
      <BreadcrumbItem key={`breadcrumb-overflow-${internalId.current}`}>
        <OverflowMenu
          ariaLabel={overflowAriaLabel}
          menuOffset={{ top: 10, left: 59 }} // TODO: REMOVE when this is fixed https://github.com/carbon-design-system/carbon/issues/9155
          renderIcon={OverflowMenuHorizontal32}
          className={`${blockClass}__overflow-menu`}
          menuOptionsClass={`${carbon.prefix}--breadcrumb-menu-options`} // TODO: REMOVE when this is fixed https://github.com/carbon-design-system/carbon/issues/9155
        >
          {
            // eslint-disable-next-line react/prop-types
            overflowItems.map((item, index) => (
              <OverflowMenuItem
                key={`breadcrumb-overflow-menu-item-${internalId.current}-${index}`}
                href={item.props.href}
                onClick={item.props.onClick}
                itemText={item.props.children}
              />
            ))
          }
        </OverflowMenu>
      </BreadcrumbItem>
    );
  };

  useEffect(() => {
    const workWith =
      breadcrumbsIn ??
      processShapesArray(extractShapesArray(deprecated_children));

    const newBreadcrumbs = workWith.map(({ title, ...rest }) => {
      return {
        ...rest,
        title: title ?? getTitle(rest),
      };
    });

    setBreadcrumbs(newBreadcrumbs);
  }, [breadcrumbsIn, deprecated_children]);

  useEffect(() => {
    // updates displayedBreadcrumbItems and overflowBreadcrumbItems based on displayCount and breadcrumbs
    if (breadcrumbs.length === 0) {
      setDisplayedBreadcrumbItems([]);
      return;
    }

    const newDisplayedBreadcrumbItems = breadcrumbs.map(
      ({ className, key, label, title, ...rest }, index) => (
        <BreadcrumbItem
          key={key}
          className={
            index > 0 || displayCount > 1
              ? cx([className, `${blockClass}__displayed-breadcrumb`])
              : className
          }
          title={index + 1 === breadcrumbs.length ? title : null}
          {...rest}>
          {label}
        </BreadcrumbItem>
      )
    );

    // The breadcrumb has the form [first item] [overflow] [items 2...(n-1)] [last item].
    // The overflow is only shown if there isn't space to display all the items, and in that case:
    //  * the last item is always displayed (even if there isn't really space for it -- it can contract to an ellipsis);
    //  * the first item is the next to be displayed, if there's space once the last item and overflow are shown;
    //  * any remaining space after the first item, last item and overflow are shown is used to show items (n-1), (n-2), (n-3), ..., until the space is used up ;
    // Note that displayCount (min 1) has been computed based on the available space and the above sequence.
    const overflowPosition = displayCount > 1 ? 1 : 0;

    let newOverflowBreadcrumbItems = newDisplayedBreadcrumbItems.splice(
      overflowPosition,
      breadcrumbs.length - displayCount
    );

    // if needed add overflow menu
    if (newOverflowBreadcrumbItems.length) {
      newDisplayedBreadcrumbItems.splice(
        overflowPosition,
        0,
        <BreadcrumbOverflowMenu
          overflowItems={newOverflowBreadcrumbItems}
          key={`displayed-breadcrumb-${internalId}-overflow`}
        />
      );
    }

    setDisplayedBreadcrumbItems(newDisplayedBreadcrumbItems);
  }, [breadcrumbs, displayCount]);

  const checkFullyVisibleBreadcrumbItems = () => {
    const displayItemIndex = (itemCount, index) => {
      // In this data set the overflow measuring item is [0]
      // so the first displayItem in the list is [1]
      // we never return 0;

      if (index === 0) {
        return itemCount - 1; // the last item in the list
      } else if (index === 1) {
        return 1; // the first item in the list
      } else {
        return itemCount - index; // count down from itemCount - 2 to 1
      }
    };

    if (maxVisible <= 1) {
      setDisplayCount(1);
    } else {
      // how many will fit?
      let willFit = 0;
      let spaceAvailable = breadcrumbItemWithOverflow.current.offsetWidth; // not sure how to test resize

      /* istanbul ignore next if */
      if (sizingContainerRef.current) {
        const sizingBreadcrumbItems =
          sizingContainerRef.current.querySelectorAll(
            `.${carbon.prefix}--breadcrumb-item`
          );

        const breadcrumbWidthsIncludingMargin = [];
        for (let item of sizingBreadcrumbItems) {
          const computedStyle = window
            ? window.getComputedStyle(sizingBreadcrumbItems[0])
            : null;

          const marginWidths = computedStyle
            ? parseFloat(computedStyle.marginLeft || 0, 10) +
              parseFloat(computedStyle.marginRight || 0, 10)
            : 0;

          breadcrumbWidthsIncludingMargin.push(item.offsetWidth + marginWidths);
        }

        let overflowWidth = breadcrumbWidthsIncludingMargin[0];

        for (let i = 0; i < breadcrumbWidthsIncludingMargin.length - 1; i++) {
          // count used one less than length to account for the included overflow item
          const index = displayItemIndex(
            breadcrumbWidthsIncludingMargin.length,
            i
          );

          if (spaceAvailable >= breadcrumbWidthsIncludingMargin[index]) {
            spaceAvailable -= breadcrumbWidthsIncludingMargin[index];
            willFit += 1;
          } else {
            break;
          }
        }

        // if not enough space for all breadcrumb items
        if (willFit < breadcrumbWidthsIncludingMargin.length - 1) {
          // -1 for overflow item

          while (willFit > 0 && spaceAvailable < overflowWidth) {
            willFit -= 1;

            // Highly unlikely any useful breadcrumb-item is smaller than the overflow menu, but we loop anyway just in case

            // item removed is based on last item added which is the current value of willFit
            const itemToRemove = displayItemIndex(
              breadcrumbWidthsIncludingMargin.length,
              willFit
            );
            spaceAvailable += breadcrumbWidthsIncludingMargin[itemToRemove];
          }
        }
      }

      if (willFit <= 1) {
        setDisplayCount(1);
      } else {
        setDisplayCount(maxVisible ? Math.min(willFit, maxVisible) : willFit);
      }
    }
  };

  useEffect(() => {
    checkFullyVisibleBreadcrumbItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breadcrumbs, maxVisible]);

  /* istanbul ignore next */ // not sure how to test resize
  const handleResize = () => {
    /* istanbul ignore next */ // not sure how to test resize
    checkFullyVisibleBreadcrumbItems();
  };

  /* istanbul ignore next */ // not sure how to test resize
  const handleBreadcrumbItemsResize = () => {
    /* istanbul ignore next */ // not sure how to test resize
    checkFullyVisibleBreadcrumbItems();
  };

  let backItem = breadcrumbs[breadcrumbs.length - 1];
  /* istanbul ignore next if */ // not sure how to test media queries
  if (backItem?.isCurrentPage) {
    backItem = breadcrumbs[breadcrumbs.length - 2];
  }

  useResizeDetector({
    onResize: handleBreadcrumbItemsResize,
    targetRef: sizingContainerRef,
  });

  useResizeDetector({
    onResize: handleResize,
    targetRef: breadcrumbItemWithOverflow,
  });

  return (
    <div
      className={cx(blockClass, className, {
        [`${blockClass}__with-items`]: displayedBreadcrumbItems.length > 1,
      })}
      ref={breadcrumbItemWithOverflow}>
      <div className={cx([`${blockClass}__space`])}>
        {/* This next element is purely here to measure the size of the breadcrumb items */}
        <div
          className={`${blockClass}__breadcrumb-container ${blockClass}__breadcrumb-container--hidden`}
          aria-hidden={true}
          ref={sizingContainerRef}>
          <Breadcrumb>
            <BreadcrumbItem key={`${blockClass}-hidden-overflow-${internalId}`}>
              <OverflowMenu
                ariaLabel={overflowAriaLabel}
                renderIcon={OverflowMenuHorizontal32}
              />
            </BreadcrumbItem>
            {breadcrumbs.map(({ label: children, key, ...rest }) => (
              <BreadcrumbItem key={key} {...rest}>
                {children}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </div>

        {backItem?.href && backItem?.title && (
          <Button
            className={`${blockClass}__breadcrumb-back-button`}
            hasIconOnly
            iconDescription={backItem.title}
            kind="ghost"
            href={backItem.href}
            renderIcon={ArrowLeft16}
            size="field"
            tooltipPosition="right"
            type="button"
          />
        )}
        <Breadcrumb
          className={cx(`${blockClass}__breadcrumb-container`, {
            [`${blockClass}__breadcrumb-container-with-items`]:
              displayedBreadcrumbItems.length > 1,
          })}
          noTrailingSlash={noTrailingSlash}
          {...other}>
          {displayedBreadcrumbItems}
        </Breadcrumb>
      </div>
    </div>
  );
};

// Return a placeholder if not released and not enabled by feature flag
BreadcrumbWithOverflow = pkg.checkComponentEnabled(
  BreadcrumbWithOverflow,
  componentName
);

export const deprecatedProps = {
  /**
   * **Deprecated** see property `breadcrumbs`
   *
   * children of the breadcrumb-item set (these are expected to be breadcrumb-items)
   */
  children: deprecateProp(
    PropTypes.arrayOf(PropTypes.element),
    'Usage changed to expect breadcrumb item like shapes, see `breadcrumbs`.'
  ),
};

BreadcrumbWithOverflow.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Optional string representing the link location for the BreadcrumbItem
       */
      href: PropTypes.string,

      /**
       * Provide if this breadcrumb item represents the current page
       */
      isCurrentPage: PropTypes.bool,

      /**
       * Key required to render array efficiently
       */
      key: PropTypes.string.isRequired,

      /**
       * Pass in content that will be inside of the BreadcrumbItem
       */
      label: PropTypes.node,

      /**
       * A string based alternative to the children, required only if children is not of type string.
       */
      title: PropTypes.string.isRequired.if(
        ({ label }) => typeof label !== 'string'
      ),
    })
  ),
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * maxVisible: maximum visible breadcrumb-items before overflow is used (values less than 1 are treated as 1)
   */
  maxVisible: PropTypes.number,
  /**
   * noTrailing slash - same as for Carbon
   */
  noTrailingSlash: PropTypes.bool,
  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do nto fit.
   */
  overflowAriaLabel: PropTypes.string.isRequired,
  ...deprecatedProps,
};

BreadcrumbWithOverflow.defaultProps = {
  noTrailingSlash: false,
};
BreadcrumbWithOverflow.displayName = componentName;
