/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pkg, carbon } from '../../settings';

import { BreadcrumbItem, Button, Tab, Tabs } from 'carbon-components-react';
import { Lightning16, Bee32 } from '@carbon/icons-react';

import { PageHeader } from '.';
import { ActionBarItem } from '../ActionBar';
import { mockHTMLElement } from '../../global/js/utils/test-helper';

const blockClass = `${pkg.prefix}--page-header`;

/* Test properties. */
const actionBarOverflowAriaLabel = 'Show additional action bar items';

const actionBarItems = [1, 2, 3, 4].map((item) => ({
  key: `a-key-${item}`,
  renderIcon: Lightning16,
  iconDescription: `Action ${item}`,
  onClick: () => {},
}));

const actionBarItemsNodes = (
  <>
    <ActionBarItem
      renderIcon={Lightning16}
      iconDescription="Action 1"
      onClick={() => {}}
    />
    <ActionBarItem renderIcon={Lightning16} iconDescription="Action 2" />
    <ActionBarItem renderIcon={Lightning16} iconDescription="Action 3" />
    <ActionBarItem renderIcon={Lightning16} iconDescription="Action 4" />
  </>
);

const children = <span className="page-header-test--available-space" />;
const breadcrumbOverflowAriaLabel =
  'Open and close additional breadcrumb item list.';
const breadcrumbItems = (
  <>
    <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
  </>
);
const classNames = ['client-class-1', 'client-class-2'];
const pageActions = [
  {
    key: '1',
    kind: 'secondary',
    label: 'Secondary button',
    onClick: () => {},
  },
  {
    key: '2',
    kind: 'primary',
    label: 'Primary button',
    onClick: () => {},
  },
];
const pageActionsOverflowLabel = 'Page actions...';

const pageActionsDepTest = pageActions.map(({ label, ...rest }, index) => (
  <Button {...rest} key={index}>
    {label}
  </Button>
));

const pageActionsDepTest2 = (
  <>
    {pageActions.map(({ label, ...rest }, index) => (
      <Button {...rest} key={index}>
        {label}
      </Button>
    ))}
  </>
);

const subtitle = 'Optional subtitle if necessary';
const navigation = (
  <Tabs data-test-id="tabs">
    <Tab label="Tab 1" />
    <Tab label="Tab 2" />
    <Tab label="Tab 3" />
    <Tab label="Tab 4" />
  </Tabs>
);

// supply enough tags to trigger TagSet overflow required props
const tags = Array.from({ length: 20 }, () => ({
  'data-test-id': 'tags',
  type: 'blue',
  label: 'A tag',
}));

const titleObj = { text: 'Page title', loading: false, icon: Bee32 };
const titleString = 'Page title';

import uuidv4 from '../../global/js/utils/uuidv4';
import { prepareProps } from '../../global/js/utils/props-helper';
jest.mock('../../global/js/utils/uuidv4');

// init test sizes, in a method to take account of test window.innerWidth and window.innerHeight
const initSizes = () => ({
  offsetWidth: {
    [`${blockClass}`]: window.innerWidth,
    [`${carbon.prefix}--btn`]: 200,
    [`${blockClass}__breadcrumb-row`]: window.innerWidth,
    [`${pkg.prefix}--breadcrumb-with-overflow`]: window.innerWidth * 0.6,
    [`${pkg.prefix}--tag-set`]: window.innerWidth * 0.25,
    [`${pkg.prefix}--tag-set__sizing-tag`]: window.innerWidth * 0.05,
    [`${pkg.prefix}--button-set-with-overflow__button-container`]:
      window.innerWidth * 0.4,
    [`${pkg.prefix}--button-set-with-overflow`]: window.innerWidth * 0.4,
    [`${carbon.prefix}--breadcrumb-item`]: 200,
    [`${pkg.prefix}--action-bar__displayed-items`]: window.innerWidth * 0.3,
    [`${blockClass}__breadcrumb-title`]: window.innerWidth * 0.2,
    [`${pkg.prefix}--button-menu`]: 200,
    [`${pkg.prefix}--tag-set-overflow`]: 40,
  },
  clientHeight: {
    [`${blockClass}`]: 300,
    [`${blockClass}__available-row`]: 40,
    [`${blockClass}__breadcrumb-row`]: 40,
    [`${carbon.prefix}--breadcrumb-item`]: 40,
    [`${blockClass}__navigation-row`]: 48,
    [`${blockClass}__subtitle-row`]: 40,
    [`${blockClass}__title-row`]: 64,
  },
});
const testSizes = (el, property, _default) => {
  const classes = el.getAttribute('class').split(' ');
  const sizes = initSizes();

  const propSizes = sizes[property];
  if (propSizes) {
    for (let cls of classes) {
      // see if any class we check for is catered for.
      const val = propSizes[cls] ? propSizes[cls] : -1;
      if (val >= 0) {
        // console.log(property, cls, val);
        return val;
      }
    }
  }
  // console.log('testSizes found nothing.', property, el.outerHTML);
  return _default;
};

const testProps = {
  actionBarItems,
  actionBarOverflowAriaLabel,
  allTagsModalTitle: 'All tags',
  allTagsModalSearchLabel: 'Search all tags',
  allTagsModalSearchPlaceholderText: 'Search all tags',
  hasBackgroundAlways: true,
  breadcrumbOverflowAriaLabel,
  breadcrumbItems,
  className: classNames.join(' '),
  navigation,
  pageActions,
  pageActionsOverflowLabel,
  showAllTagsLabel: 'View all tags',
  subtitle,
  tags,
  title: titleObj,
};

const testPropsAltTitle = {
  title: titleString,
  titleIcon: Bee32,
};

describe('PageHeader', () => {
  const { ResizeObserver, scrollTo } = window;
  let mockElement;
  const mocks = [];

  window.innerWidth = 2000;
  window.innerHeight = 1080;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // TEMP: remove on updating BreadcrumbWithOverflow usage
    mockElement = mockHTMLElement({
      offsetWidth: {
        get: function () {
          return testSizes(this, 'offsetWidth', window.innerWidth);
        },
      },
      clientHeight: {
        get: function () {
          return testSizes(this, 'clientHeight', window.innerHeight);
        },
      },
    });

    mocks.push({
      id: 'uuidv4',
      mock: uuidv4.mockImplementation(() => 'test-id'),
    });
    window.scrollTo = jest.spyOn(window, 'scrollTo').mockImplementation();
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.spyOn(console, 'warn').mockRestore(); // TEMP: remove on updating BreadcrumbWithOverflow usage
    mocks.forEach((mock) => {
      mock.mock.mockRestore();
    });
    mockElement.mockRestore();
    jest.restoreAllMocks();
    window.scrollTo = scrollTo;
    window.ResizeObserver = ResizeObserver;
  });

  test('renders an empty header when no props are set', () => {
    const dataTestId = uuidv4();
    render(<PageHeader data-test-id={dataTestId} />);

    // console.dir(screen.getByRole('region')); // section should be a region https://fae.disability.illinois.edu/rulesets/ROLE_5/
    const header = screen.getByTestId(dataTestId);
    expect(header).toHaveClass(blockClass);

    expect(header).toHaveClass(`${blockClass}--show-background`);

    expect(header).not.toHaveClass(classNames[0]);
    expect(header).not.toHaveClass(classNames[1]);

    expect(
      document.querySelectorAll(`.${blockClass}__action-bar`)
    ).toHaveLength(0);
    expect(
      document.querySelectorAll('span.page-header-test--available-space')
    ).toHaveLength(0);
    expect(
      document.querySelectorAll(`.${blockClass}__page-actions`)
    ).toHaveLength(0);
    expect(document.querySelectorAll(`.${blockClass}__subtitle`)).toHaveLength(
      0
    );
    expect(screen.queryByText(subtitle)).toBeNull();
    expect(document.querySelectorAll(`.${blockClass}__title`)).toHaveLength(0);
    expect(screen.queryByText(titleObj.text)).toBeNull();
    expect(
      document.querySelectorAll(`.${blockClass}__title-icon`)
    ).toHaveLength(0);
  });

  test('renders all the appropriate content when all props are set', () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader {...testProps} data-test-id={dataTestId}>
        {children}
      </PageHeader>
    );

    // console.dir(screen.getByRole('region')); // section should be a region https://fae.disability.illinois.edu/rulesets/ROLE_5/
    const header = screen.getByTestId(dataTestId);
    expect(header).toHaveClass(blockClass);

    expect(header).toHaveClass(`${blockClass}--show-background`);
    expect(header).toHaveClass(classNames[0]);
    expect(header).toHaveClass(classNames[1]);
    expect(
      document.querySelectorAll(`.${blockClass}__action-bar`)
    ).toHaveLength(1);
    expect(
      document.querySelectorAll('span.page-header-test--available-space')
    ).toHaveLength(1);
    expect(
      document.querySelectorAll(`.${blockClass}__breadcrumb`)
    ).toHaveLength(1);
    expect(
      screen.getAllByText(/Breadcrumb [1-3]/, {
        // selector need to ignore sizing items
        selector: `.${pkg.prefix}--breadcrumb-with-overflow__breadcrumb-container:not(.${pkg.prefix}--breadcrumb-with-overflow__breadcrumb-container--hidden) .${carbon.prefix}--link`,
      })
    ).toHaveLength(3);
    expect(screen.queryAllByTestId('tabs')).toHaveLength(1);
    expect(screen.getAllByText(/Tab [1-4]/)).toHaveLength(4);
    expect(
      document.querySelectorAll(`.${blockClass}__page-actions`)
    ).toHaveLength(2);
    expect(document.querySelectorAll(`.${blockClass}__subtitle`)).toHaveLength(
      1
    );
    expect(screen.getByText(subtitle).textContent).toEqual(subtitle);
    expect(screen.queryAllByTestId('tabs')).toHaveLength(1);
    expect(
      screen.getAllByText('A tag', {
        // selector need to ignore sizing items
        selector: `.${pkg.prefix}--tag-set__displayed-tag .${carbon.prefix}--tag span`,
      }).length
    ).toBeGreaterThan(0);
    expect(document.querySelectorAll(`.${blockClass}__title`)).toHaveLength(1);
    expect(document.querySelector(`.${blockClass}__title`).textContent).toEqual(
      titleObj.text
    );
    expect(
      document.querySelectorAll(`.${blockClass}__title-icon`)
    ).toHaveLength(1);
  });

  test('copes with actionBarItems as nodes', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <PageHeader
        actionBarItems={actionBarItemsNodes}
        actionBarOverflowAriaLabel={actionBarOverflowAriaLabel}
      />
    );

    expect(warn).toBeCalledWith(
      'The usage of the prop `actionBarItems` of `PageHeader` has been changed and support for the old usage will soon be removed. Expects an array of objects with the following properties: iconDescription, renderIcon and onClick.'
    );

    warn.mockRestore(); // Remove mock
  });

  test('with deprecated page actions', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <PageHeader
        pageActions={pageActionsDepTest}
        pageActionsOverflowLabel={pageActionsOverflowLabel}
      />
    );

    screen.getByText('Primary button', {
      selector: `.${blockClass}__page-actions .${pkg.prefix}--button-set-with-overflow__button-container:not(.${pkg.prefix}--button-set-with-overflow__button-container--hidden) .${carbon.prefix}--btn`,
    });

    expect(warn).toBeCalledWith(
      'The usage of the prop `pageActions` of `PageHeader` has been changed and support for the old usage will soon be removed. Expects an array of objects with the following properties: label and onClick.'
    );

    warn.mockRestore(); // Remove mock
  });

  test('with deprecated page actions in a fragment', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <PageHeader
        pageActions={pageActionsDepTest2}
        pageActionsOverflowLabel={pageActionsOverflowLabel}
      />
    );

    screen.getByText('Primary button', {
      selector: `.${blockClass}__page-actions .${pkg.prefix}--button-set-with-overflow__button-container:not(.${pkg.prefix}--button-set-with-overflow__button-container--hidden) .${carbon.prefix}--btn`,
    });

    expect(warn).toBeCalledWith(
      'The usage of the prop `pageActions` of `PageHeader` has been changed and support for the old usage will soon be removed. Expects an array of objects with the following properties: label and onClick.'
    );

    warn.mockRestore(); // Remove mock
  });

  it('adds additional properties to the containing node', () => {
    const dataTestId = uuidv4();
    render(<PageHeader data-test-id={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(<PageHeader ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  test('collapse button works', () => {
    const dataTestId = uuidv4();
    render(
      <PageHeader
        {...testProps}
        collapseHeaderIconDescription="Toggle collapse"
        expandHeaderIconDescription="Toggle expand"
        hasCollapseHeaderToggle={true}
        data-test-id={dataTestId}>
        {children}
      </PageHeader>
    );

    const collapseButton = screen.getByRole('button', {
      name: 'Toggle collapse',
    });

    window.scrollTo.mockReset();
    expect(window.scrollTo).not.toHaveBeenCalled();
    userEvent.click(collapseButton);
    expect(window.scrollTo).toHaveBeenCalled();
    userEvent.click(collapseButton);
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });

  test('Navigation row renders when Navigation but no tags', () => {
    const { navigation } = testProps;
    render(<PageHeader {...{ navigation }} />);

    expect(screen.queryAllByTestId('tabs')).toHaveLength(1);
  });

  test('Navigation row renders when Tags but no Navigation', () => {
    const {
      tags,
      allTagsModalTitle,
      allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText,
      showAllTagsLabel,
    } = testProps;

    render(
      <PageHeader
        {...{
          tags,
          allTagsModalTitle,
          allTagsModalSearchLabel,
          allTagsModalSearchPlaceholderText,
          showAllTagsLabel,
        }}
      />
    );

    expect(
      screen.getAllByText('A tag', {
        // selector need to ignore sizing items
        selector: `.${pkg.prefix}--tag-set__displayed-tag .${carbon.prefix}--tag span`,
      }).length
    ).toBeGreaterThan(0);
  });

  test('Title row renders when PageActions but no Title', () => {
    const { pageActions, pageActionsOverflowLabel = pageActionsOverflowLabel } =
      testProps;
    render(<PageHeader {...{ pageActions, pageActionsOverflowLabel }} />);

    expect(
      document.querySelectorAll(`.${blockClass}__page-actions`)
    ).toHaveLength(1);
  });

  test('Title row renders when Title but no PageActions', () => {
    const { title } = testProps;
    render(<PageHeader {...{ title }} />);

    expect(
      document.querySelectorAll(
        `.${blockClass}__title-row .${blockClass}__title`
      )
    ).toHaveLength(1);
  });

  test('Title row renders when Title with pageActions and navigation but no subtitle or available space', () => {
    const { title } = testProps;
    render(
      <PageHeader
        {...{ title, pageActions, pageActionsOverflowLabel, navigation }}
      />
    );

    expect(
      document.querySelectorAll(
        `.${blockClass}__title-row .${blockClass}__title`
      )
    ).toHaveLength(1);
    expect(
      document.querySelectorAll(`.${blockClass}__navigation-row`)
    ).toHaveLength(1);
  });

  test('Breadcrumb row renders when breadcrumb but no action bar items', () => {
    render(
      <PageHeader
        {...prepareProps(testProps, 'actionBarItems', 'pageActions')}
      />
    );

    expect(
      screen.getAllByText(/Breadcrumb [1-3]/, {
        // selector need to ignore sizing items
        selector: `.${pkg.prefix}--breadcrumb-with-overflow__breadcrumb-container:not(.${pkg.prefix}--breadcrumb-with-overflow__breadcrumb-container--hidden) .${carbon.prefix}--link`,
      })
    ).toHaveLength(3);
  });

  test('Breadcrumb row renders when action bar items but no breadcrumb', () => {
    render(
      <PageHeader {...prepareProps(testProps, 'breadcrumbItems')}>
        {children}
      </PageHeader>
    );

    // screen.getByText(/Action/);
    const actionBarItems = document.querySelectorAll(
      `.${blockClass}__action-bar`
    );
    expect(actionBarItems).toHaveLength(1);
  });

  test('renders  title when using separate string and icon', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<PageHeader {...testPropsAltTitle} />);

    expect(warn).toBeCalledWith(
      'The prop `titleIcon` of `PageHeader` has been deprecated and will soon be removed. Use `title` prop shape instead.'
    );

    screen.getByText(titleString, { selector: `.${blockClass}__title span` });

    expect(
      document.querySelectorAll(`.${blockClass}__title-icon`)
    ).toHaveLength(1);
  });

  test('Without hasBackgroundAlways', () => {
    const { title } = testProps;

    render(
      <PageHeader
        {...{
          title,
          hasBackgroundAlways: false,
          breadcrumbOverflowAriaLabel: 'Show the breadcrumb overflow',
          breadcrumbItems,
        }}
        aria-label="Page header" // gives section role 'region'
      />
    );

    screen.getByRole('region');
  });

  test('ActionBar without overflow aria label', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { title } = testProps;
    render(
      <PageHeader
        {...{
          title,
          actionBarItems,
        }}
        aria-label="Page header" // gives section role 'region'
      />
    );

    expect(error).toBeCalledWith(
      expect.stringMatching(
        /^Warning: Failed prop type: The prop `actionBarOverflowAriaLabel` is marked as required in `PageHeader`/
      )
    );

    jest.spyOn(console, 'error').mockRestore();
  });

  test('Breadcrumb without overflow aria label', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { title } = testProps;
    render(
      <PageHeader
        {...{
          title,
          breadcrumbItems,
        }}
        aria-label="Page header" // gives section role 'region'
      />
    );

    expect(error).toBeCalledWith(
      expect.stringMatching(
        /^Warning: Failed prop type: The prop `overflowAriaLabel` is marked as required in `BreadcrumbWithOverflow`/
      )
    );

    jest.spyOn(console, 'error').mockRestore();
  });

  test('Works, for now, with deprecated props', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const warnings = [
      'The prop `actionBarOverflowLabel` of `PageHeader` has been deprecated and will soon be removed. Property renamed to `actionBarOverflowAriaLabel`.',
      'The prop `availableSpace` of `PageHeader` has been deprecated and will soon be removed. Make use of children instead.',
      'The prop `background` of `PageHeader` has been deprecated and will soon be removed. Property renamed to `hasBackgroundAlways`',
      'The prop `breadcrumbOverflowLabel` of `PageHeader` has been deprecated and will soon be removed. Property renamed to `breadcrumbOverflowAriaLabel`.',
      'The prop `collapseHeaderLabel` of `PageHeader` has been deprecated and will soon be removed. Property renamed to `collapseHeaderIconDescription`.',
      'The prop `collapseHeaderToggleWanted` of `PageHeader` has been deprecated and will soon be removed. Property renamed to `hasCollapseHeaderToggle`',
      'The prop `expandHeaderLabel` of `PageHeader` has been deprecated and will soon be removed. Property renamed to `expandHeaderIconDescription`.',
      'The prop `preCollapseTitleRow` of `PageHeader` has been deprecated and will soon be removed. Property renamed to `collapseTitle`.',
      'The prop `preventBreadcrumbScroll` of `PageHeader` has been deprecated and will soon be removed. Prop renamed to `disableBreadcrumbScroll`.',
    ];

    render(
      <PageHeader
        actionBarOverflowLabel={testProps.actionBarOverflowAriaLabel}
        availableSpace={children}
        background={testProps.hasBackgroundAlways}
        breadcrumbOverflowLabel={testProps.breadcrumbOverflowAriaLabel}
        collapseHeaderLabel="Collapse header"
        collapseHeaderToggleWanted={true}
        expandHeaderLabel="Expand header"
        preCollapseTitleRow={true}
        preventBreadcrumbScroll={true}
      />
    );

    for (let i = 0; i < warnings.length; i++) {
      expect(warn).toBeCalledWith(warnings[i]);
    }

    warn.mockRestore(); // Remove mock
  });
});
