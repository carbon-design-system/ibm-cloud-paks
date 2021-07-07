/**
 * @file Icon button tests.
 * @copyright IBM Security 2019
 */

import { shallow } from 'enzyme';
import React from 'react';

import {
  className,
  iconClassName,
  label,
  path,
  renderIcon,
  sizes,
  state,
} from '../_mocks_';

import { IconButton } from '../../..';
import { TooltipDirection } from '../IconButton';

describe('IconButton', () => {
  const onClick = jest.fn();

  const iconButtonProps = {
    className,
    iconClassName,
    label,
    onClick,
    renderIcon,
    state,
  };

  let iconButton;

  beforeEach(() => {
    iconButton = shallow(<IconButton {...iconButtonProps} />);
  });

  it('renders', () => {
    expect(iconButton).toMatchSnapshot();
  });

  it('renders the path variation', () => {
    iconButton.setProps({ path });
    expect(iconButton).toMatchSnapshot();
  });

  it('renders the disabled variation', () => {
    iconButton.setProps({ disabled: true });
    expect(iconButton).toMatchSnapshot();
  });

  sizes.forEach((size) => {
    it(`renders the '${size}' variation`, () => {
      iconButton.setProps({ size });
      expect(iconButton).toMatchSnapshot();
    });
  });

  Object.keys(TooltipDirection)
    .map((tooltipDirection) => TooltipDirection[tooltipDirection])
    .forEach((tooltipDirection) => {
      it(`renders the '${tooltipDirection}' tooltip`, () => {
        iconButton.setProps({ tooltipDirection });
        expect(iconButton).toMatchSnapshot();
      });
    });

  it('does not render the tooltip', () => {
    iconButton.setProps({ tooltip: false });
    expect(iconButton).toMatchSnapshot();
  });

  describe('Events', () => {
    it('should invoke the `onClick` method', () => {
      iconButton.simulate('click');

      expect(onClick).toBeCalled();
    });
  });
});
