/**
 * @file IconButtonBar tests.
 * @copyright IBM Security 2019 - 2021
 */

import { Add16, Edit16, Locked16, Notification16 } from '@carbon/icons-react';

import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';

import { IconButtonBar } from '../../..';

import {
  className,
  iconClassName,
  label,
  sizes,
} from '../../IconButton/_mocks_';

import { namespace } from '../IconButtonBar';

const actions = [
  {
    className,
    divider: 'left',
    disabled: false,
    iconClassName,
    label: `${label} 1`,
    onClick: () => {},
    renderIcon: Add16,
  },
  {
    className,
    divider: 'right',
    disabled: false,
    iconClassName,
    label: `${label} 2`,
    onClick: () => {},
    renderIcon: Edit16,
  },
  {
    className,
    divider: 'sides',
    disabled: false,
    iconClassName,
    label: `${label} 3`,
    onClick: () => {},
    renderIcon: Locked16,
  },
  {
    className,
    disabled: false,
    iconClassName,
    label: `${label} 4`,
    onClick: () => {},
    renderIcon: Notification16,
  },
];

describe('IconButtonBar', () => {
  sizes.forEach((size) => {
    it(`renders the '${size}' variation`, () => {
      const iconButtonBar = shallow(<IconButtonBar actions={actions} />);
      iconButtonBar.setProps({ size });
      expect(iconButtonBar).toMatchSnapshot();
    });
  });

  [1, 2, 3, 4, 5].forEach((length) => {
    it(`renders the length of '${length}' variation`, () => {
      const iconButtonBar = shallow(<IconButtonBar actions={actions} />);
      iconButtonBar.setProps({ length });
      expect(iconButtonBar).toMatchSnapshot();
    });
  });

  it('renders a divider on the left', () => {
    const { getByLabelText } = render(
      <IconButtonBar
        actions={[
          {
            divider: 'left',
            label: 'Test label',
            onClick: () => {},
            renderIcon: Edit16,
          },
        ]}
      />
    );
    expect(getByLabelText('Test label').previousSibling).toHaveClass(
      `${namespace}__divider`
    );
  });

  it('renders a divider on the right', () => {
    const { getByLabelText } = render(
      <IconButtonBar
        actions={[
          {
            divider: 'right',
            label: 'Test label',
            onClick: () => {},
            renderIcon: Edit16,
          },
        ]}
      />
    );
    expect(getByLabelText('Test label').nextSibling).toHaveClass(
      `${namespace}__divider`
    );
  });

  it('renders a divider on both sides of a button', () => {
    const { getByLabelText } = render(
      <IconButtonBar
        actions={[
          {
            divider: 'sides',
            label: 'Test label',
            onClick: () => {},
            renderIcon: Edit16,
          },
        ]}
      />
    );
    expect(getByLabelText('Test label').previousSibling).toHaveClass(
      `${namespace}__divider`
    );
    expect(getByLabelText('Test label').nextSibling).toHaveClass(
      `${namespace}__divider`
    );
  });
});
