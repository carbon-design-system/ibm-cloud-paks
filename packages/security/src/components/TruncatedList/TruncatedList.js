/**
 * @file Truncated list component.
 * @copyright IBM Security 2020 - 2021
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Children } from 'react';

import Button from '../Button';
import ScrollGradient from '../ScrollGradient';

import { carbonPrefix, getComponentNamespace } from '../../globals/namespace';
import theme from '../../globals/theme';

const namespace = getComponentNamespace('truncated-list');

const TruncatedList = ({
  children,
  className,
  expandButtonClassName,
  as: List,
  scrollGradientColor,
  getExpandButtonLabel,
  truncateThreshold,
  collapsedItemLimit,
  expandedItemLimit,
  ...other
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [listContainer, setListContainer] = React.useState(null);

  const childrenLength = Children.count(children);
  const shouldTruncate = childrenLength > truncateThreshold;

  /**
   * Defines how many items must be displayed at a time.
   */
  const getDisplayCount = () => {
    // If we do not need to truncate, we can just show the entire list of items.
    if (!shouldTruncate) {
      return childrenLength;
    }

    // When the list is truncated and expanded, we use the expanded item limit.
    if (isExpanded) {
      return expandedItemLimit;
    }

    // If the truncate threshold is lower than the collapsed item limit, and the list needs to be
    // truncated, we must display the lowest of the two counts otherwise the expand button would
    // have a negative count.
    return Math.min(collapsedItemLimit, truncateThreshold);
  };

  const displayCount = getDisplayCount();

  /**
   * Adjusts the height of the list container so only the amount of items from the calculated
   * display amount can be viewed at a time.
   */
  const updateListContainerHeight = () => {
    if (listContainer) {
      const list = listContainer.firstElementChild;
      const items = list.children;

      // Calculate which item in the list is the last to show in our list. It either has to be the
      // calculate display count or the last item on the list. Whichever comes first.
      const lastItemToShow = items[Math.min(displayCount, items.length - 1)];
      listContainer.style.height = `${
        lastItemToShow.offsetTop + lastItemToShow.offsetHeight + 4
      }px`;
    }
  };

  // After the component's expanded state has changed update the height of the list container to be
  // the same as its visible children set.
  React.useEffect(() => {
    if (shouldTruncate) {
      updateListContainerHeight();
    }
  }, [isExpanded, displayCount]);

  const handleExpand = () => {
    // Pre-set the height of the list container to its own current height so we can smoothly
    // transition into its new height in the React Effect hook.
    updateListContainerHeight();
    setIsExpanded((currentExpand) => !currentExpand);
  };

  const childrenArray = Children.toArray(children);

  return (
    <>
      <ScrollGradient
        className={`${namespace}__scroller-container`}
        scrollElementClassName={`${namespace}__scroller`}
        color={scrollGradientColor}
        getScrollElementRef={setListContainer}>
        <List className={classnames(className, namespace)} {...other}>
          {childrenArray.slice(0, displayCount)}
          {shouldTruncate && isExpanded && childrenArray.slice(displayCount)}
        </List>
      </ScrollGradient>

      {shouldTruncate && (
        <Button
          className={classnames(
            expandButtonClassName,
            `${carbonPrefix}--link`,
            `${namespace}__expand-button`
          )}
          iconDescription=""
          size="small"
          onClick={handleExpand}>
          {getExpandButtonLabel(
            isExpanded,
            isExpanded ? childrenLength : displayCount,
            isExpanded ? 0 : childrenLength - displayCount
          )}
        </Button>
      )}
    </>
  );
};

TruncatedList.propTypes = {
  /** Items to have in the list. */
  children: PropTypes.node,

  /** Optional list class name. */
  className: PropTypes.string,

  /** Optional class name for expand button. */
  expandButtonClassName: PropTypes.string,

  /** The type of list element to render. This could be a ul, ol, or a custom React component. (Optional) */
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),

  /** Optional scroll gradient color. */
  scrollGradientColor: PropTypes.string,

  /** Function to compute the label for the expand toggle button. */
  getExpandButtonLabel: PropTypes.func,

  /** Number of items allowed in the list before the list is truncated. */
  truncateThreshold: PropTypes.number,

  /** Number of items to display when the list is truncated and collapsed. */
  collapsedItemLimit: PropTypes.number,

  /**
   * Number of items to show when the list is truncated and expanded. All items are rendered when
   * the list is expanded, this prop is to limit the visual height of the list.
   */
  expandedItemLimit: PropTypes.number,
};

TruncatedList.defaultProps = {
  children: undefined,
  className: undefined,
  expandButtonClassName: undefined,
  as: 'ul',
  scrollGradientColor: theme.uiBackground,
  getExpandButtonLabel: () => 'getExpandButtonLabel',
  truncateThreshold: 10,
  collapsedItemLimit: 5,
  expandedItemLimit: 10,
};

export default TruncatedList;
