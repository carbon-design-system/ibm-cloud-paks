/**
 * @file Toolbar tests.
 * @copyright IBM Security 2019 - 2021
 */

import { Camera20 } from '@carbon/icons-react';

import { shallow, mount } from 'enzyme';
import React from 'react';

import { className } from '../../_mocks_';

import Toolbar from '../';
import { labels } from '../_mocks_';

import { namespace } from '../Toolbar';
import IconButton from '../../IconButton';

describe('Toolbar', () => {
  let toolbar;

  beforeEach(() => {
    toolbar = shallow(<Toolbar className={className} labels={labels} />);
  });

  const selectIconButton = () =>
    toolbar.find(IconButton).first().simulate('click');

  describe('Rendering', () => {
    it('renders correctly', () => {
      expect(toolbar.render()).toMatchSnapshot();
    });

    it("renders the HTML of the node's subtree", () => {
      expect(toolbar.render()).toMatchSnapshot();
    });

    it('renders the panel correctly', () => {
      selectIconButton();
      expect(toolbar).toMatchSnapshot();
    });
  });

  describe('With renderAddons', () => {
    let spec;

    beforeEach(() => {
      const onClick = jest.fn();
      const onMouseOver = jest.fn();
      const wrapper = shallow(
        <Toolbar
          labels={labels}
          renderAddons={[
            {
              id: 'example-addon',
              render: ({ iconClassName, className }) => (
                <IconButton
                  aria-label="Example addon"
                  className={className}
                  iconClassName={iconClassName}
                  onClick={onClick}
                  onFocus={onMouseOver}
                  onMouseOver={onMouseOver}
                  renderIcon={Camera20}
                />
              ),
            },
          ]}
        />
      );
      spec = { onClick, onMouseOver, wrapper };
    });

    it('should render the toolbar with addon icon', () => {
      const { wrapper } = spec;
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.render()).toMatchSnapshot();
      expect(
        wrapper.find({ 'aria-label': 'Example addon' }).render()
      ).toMatchSnapshot();
    });

    it('should render the addon icon tooltip', () => {
      const { wrapper } = spec;
      expect(wrapper.find({ id: 'example-addon' })).toMatchSnapshot();
      expect(wrapper.render().find('#example-addon')).toMatchSnapshot();
    });

    it('should click the addon icon', () => {
      const { onClick, wrapper } = spec;
      wrapper
        .find({ 'aria-label': 'Example addon' })
        .first()
        .simulate('click', { target: 'camera' });
      expect(onClick).toHaveBeenCalled();
      expect(onClick).toMatchSnapshot();
    });

    it('should hover the addon icon', () => {
      const { onMouseOver, wrapper } = spec;
      wrapper
        .find({ 'aria-label': 'Example addon' })
        .first()
        .simulate('mouseOver', { target: 'camera', type: 'mouse over' });
      expect(onMouseOver).toHaveBeenCalled();
      expect(onMouseOver).toMatchSnapshot();
    });

    it('should focus the addon icon', () => {
      const { onMouseOver, wrapper } = spec;
      wrapper
        .find({ 'aria-label': 'Example addon' })
        .first()
        .simulate('focus', { target: 'camera', type: 'focus' });
      expect(onMouseOver).toHaveBeenCalled();
      expect(onMouseOver).toMatchSnapshot();
    });
  });

  describe('Events', () => {
    it('emits a custom event when the panel is toggled', () => {
      const event = jest.fn();

      window.addEventListener(`${namespace}:toggle`, event);
      selectIconButton();

      expect(event).toBeCalled();

      expect(event.mock.calls[0][0].detail.isToggled).toEqual(
        toolbar.state('isActive').menu
      );
    });

    it('closes the panel when a click is detected outside the toolbar and panel', () => {
      const outsideNode = document.createElement('p');
      const mountedToolbar = mount(
        <Toolbar className={className} labels={labels} />
      );

      mountedToolbar.setState({ isActive: { support: true } });
      mountedToolbar.instance().handleClickOutside({ target: outsideNode });

      expect(mountedToolbar.state('isActive').support).toEqual(false);
    });
  });
});
