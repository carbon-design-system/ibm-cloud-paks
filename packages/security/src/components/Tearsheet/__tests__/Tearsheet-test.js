/**
 * @file Tearsheet tests.
 * @copyright IBM Security 2019
 */
import React from 'react';
import { shallow } from 'enzyme';

import { Tearsheet } from '../index';
import labels from '../_mocks_';

describe('Tearsheet', () => {
  const renderSidebar = () => (
    <div
      style={{
        background: 'black',
        color: 'white',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      Sidebar
    </div>
  );
  const renderMain = () => (
    <div
      style={{
        background: 'black',
        color: 'white',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      Main Section
    </div>
  );
  const getButtons = () => ({
    primary: {
      onClick: jest.fn(),
      isDisabled: false,
    },
    secondary: {
      onClick: jest.fn(),
      isDisabled: false,
    },
    close: {
      onClick: jest.fn(),
      isDisabled: false,
    },
    delete: {
      onClick: jest.fn(),
      isDisabled: false,
    },
  });
  it('should render the Tearsheet', () => {
    const buttons = getButtons();
    const wrapper = shallow(
      <Tearsheet
        renderMain={renderMain}
        renderSidebar={renderSidebar}
        primaryButton={buttons.primary}
        secondaryButton={buttons.secondary}
        closeButton={buttons.close}
        deleteButton={buttons.delete}
        sidebarTitle="Title of setup"
        sidebarSubtitle="5 mins setup"
        mainTitle="Step title"
        labels={labels}
        isOpen
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the buttons onClick callbacks', () => {
    const buttons = getButtons();
    const wrapper = shallow(
      <Tearsheet
        renderMain={renderMain}
        renderSidebar={renderSidebar}
        primaryButton={buttons.primary}
        secondaryButton={buttons.secondary}
        closeButton={buttons.close}
        deleteButton={buttons.delete}
        sidebarTitle="Title of setup"
        sidebarSubtitle="5 mins setup"
        mainTitle="Step title"
        labels={labels}
        isOpen
      />
    );
    wrapper
      .find({ onClick: buttons.delete.onClick })
      .first()
      .simulate('click', { target: 'delete' });
    expect(buttons.delete.onClick).toHaveBeenCalledWith({ target: 'delete' });

    wrapper
      .find({ onClick: buttons.primary.onClick })
      .first()
      .simulate('click', { target: 'primary' });
    expect(buttons.primary.onClick).toHaveBeenCalledWith({ target: 'primary' });

    wrapper
      .find({ onClick: buttons.secondary.onClick })
      .first()
      .simulate('click', { target: 'secondary' });
    expect(buttons.secondary.onClick).toHaveBeenCalledWith({
      target: 'secondary',
    });

    wrapper
      .find({ onClick: buttons.close.onClick })
      .first()
      .simulate('click', { target: 'close' });
    expect(buttons.close.onClick).toHaveBeenCalledWith({ target: 'close' });
  });
  it('should override `labels` if button label property provided', () => {
    const buttons = getButtons();
    buttons.primary.label = 'Next - prop';
    buttons.secondary.label = 'Previous - prop';
    buttons.delete.label = 'Delete - prop';
    buttons.close.label = 'Close - prop';
    const wrapper = shallow(
      <Tearsheet
        renderMain={renderMain}
        renderSidebar={renderSidebar}
        primaryButton={buttons.primary}
        secondaryButton={buttons.secondary}
        closeButton={buttons.close}
        deleteButton={buttons.delete}
        sidebarTitle="Title of setup"
        sidebarSubtitle="5 mins setup"
        mainTitle="Step title"
        labels={labels}
        isOpen
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
