/**
 * @file Default labels.
 * @copyright IBM Security 2019
 */

import PropTypes from 'prop-types';

export const labels = {
  // DataDecorator
  /** @type {string} the primary button label for the DataDecorator's PanelContainer */
  DATA_DECORATOR_PRIMARY_BUTTON: '',
  /** @type {string} the secondary button label for the DataDecorator's PanelContainer */
  DATA_DECORATOR_SECONDARY_BUTTON: '',
  /** @type {string} the close button aria label for the DataDecorator's PanelContainer */
  DATA_DECORATOR_CLOSE_BUTTON: 'Close',

  // FilterPanel
  /** @type {string} Label for truncated filters list to expand */
  FILTER_PANEL_CATEGORY_EXPAND_LABEL: '',
  /** @type {string} Label for expanded filters list to collapse */
  FILTER_PANEL_CATEGORY_COLLAPSE_LABEL: '',
  /** @type {string} Label for filter search input */
  FILTER_PANEL_SEARCH_LABEL: '',
  /** @type {string} Label for filter search when no filters are found */
  FILTER_PANEL_SEARCH_NO_RESULTS_LABEL: '',
  /** @type {string} The default aria label for the Search input clear button */
  FILTER_PANEL_SEARCH_CLOSE_BUTTON: 'Clear search',

  // Panel
  /** @type {string} The PanelContainer's primary button label */
  PANEL_CONTAINER_PRIMARY_BUTTON: '',
  /** @type {string} The PanelContainer's secondary button label */
  PANEL_CONTAINER_SECONDARY_BUTTON: '',
  /** @type {string} The PanelContainer's close button aria label */
  PANEL_CONTAINER_CLOSE_BUTTON: 'Close',

  // Search
  /** @type {string} aria label for the Search activate btn and input */
  SEARCH_LABEL: '',
  /** @type {string} Placeholder text to be displayed in the search input. */
  SEARCH_PLACEHOLDER_LABEL: '',
  /** @type {string} An aria label for the search input clear button. */
  SEARCH_CLOSE_BUTTON: 'Clear search',

  // `Tag`
  /** @type {string} Label for the button used to remove the tag. */
  TAG_REMOVE_BUTTON: 'Remove',

  // `TagWall`
  /** @type {string} Label. */
  TAG_WALL_LABEL: '',

  /** @type {string} Tag wall 'add' button. */
  TAG_WALL_ADD_BUTTON: '',

  /** @type {string} Tag 'remove' button. */
  TAG_WALL_REMOVE_BUTTON: '',

  // Tearsheet
  /** @type {string} label for the tearsheet primary button */
  TEARSHEET_PRIMARY_BUTTON: 'Okay',
  /** @type {string} label for the tearsheet secondary button */
  TEARSHEET_SECONDARY_BUTTON: 'Cancel',
  /** @type {string} label for the tearsheet delete button */
  TEARSHEET_DELETE_BUTTON: 'Delete',
  /** @type {string} aria label for the tearsheet close button */
  TEARSHEET_CLOSE_BUTTON: 'Close',
  /** @type {string} Text for the tearsheet cancel setup button */
  TEARSHEET_TERTIARY_BUTTON: 'Cancel setup',
  /** @type {string} Secondary text for the tearsheet cancel setup button */
  TEARSHEET_TERTIARY_SECONDARY_TEXT: 'Information will not be saved upon exit',

  // TearsheetSmall
  /** @type {string} label for the tearsheet primary button */
  TEARSHEET_SMALL_PRIMARY_BUTTON: 'Save',
  /** @type {string} label for the tearsheet secondary button */
  TEARSHEET_SMALL_SECONDARY_BUTTON: 'Cancel',
  /** @type {string} aria label for the tearsheet close button */
  TEARSHEET_SMALL_CLOSE_BUTTON: 'Close',

  // Wizard.
  /** @type {string} The finish button label for the Wizard component's Tearsheet */
  WIZARD_FINISH_BUTTON: 'Finish',
  /** @type {string} The next button label for the Wizard component's Tearsheet */
  WIZARD_NEXT_BUTTON: 'Next',
  /** @type {string} The cancel button label for the Wizard component's Tearsheet */
  WIZARD_CANCEL_BUTTON: 'Cancel',
  /** @type {string} The back button label for the Wizard component's Tearsheet */
  WIZARD_BACK_BUTTON: 'Back',
  /** @type {string} The cancel setup button for the Wizard component's Tearsheet */
  WIZARD_TERTIARY_BUTTON: 'Cancel',
  /** @type {string} Secondary text for the Wizard component Tearsheet cancel setup button */
  WIZARD_TERTIARY_SECONDARY_TEXT: 'Information will not be saved upon exit',
  /** @type {string} The delete button label for the Wizard component's Tearsheet */
  WIZARD_TEARSHEET_DELETE_BUTTON: 'Delete connection',

  // ErrorPage
  /** @type {object} List of Error objects */
  ERRORS: {
    404: {
      TITLE: '404',
      ERRORNAME: 'Page not found',
      ERRORMESSAGE:
        'We could not find the page you were looking for, but here are some helpful places to start from:',
    },
    403: {
      TITLE: '403',
      ERRORNAME: 'Access denied',
      ERRORMESSAGE:
        'You do not have the correct subscription to access this content. Please contact your administrator.',
    },
    500: {
      TITLE: '500',
      ERRORNAME: 'Internal server error',
      ERRORMESSAGE:
        'An internal server error occurred when trying to access this content.',
    },
    default: {
      TITLE: 'UnknownError',
    },
  },
};

// Helpers

/**
 * filters out falsy entries
 * @param {object} obj object to be filtered
 * @returns {object} object without falsey entries
 */
export const filterFalsey = (obj) =>
  Object.entries(obj)
    .filter(([key, value]) => Boolean(value)) // eslint-disable-line no-unused-vars
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});

export const propType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])
);
