/**
 * @file Small tearsheet tests.
 * @copyright IBM Security 2019
 */

import { shallow } from 'enzyme';
import React from 'react';

import TearsheetSmall from '../';

import {
  buttons,
  description,
  disabledButtons,
  heading,
  labels,
} from '../_mocks_';

const { closeButton, primaryButton, secondaryButton } = buttons;

describe('TearsheetSmall', () => {
  let tearsheetSmall;

  beforeEach(() => {
    tearsheetSmall = shallow(
      <TearsheetSmall
        heading={heading}
        description={description}
        closeButton={closeButton}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
        isOpen
        labels={labels}
      />
    );
  });

  it('renders', () => {
    expect(tearsheetSmall).toMatchSnapshot();
  });

  it('renders disabled buttons', () => {
    tearsheetSmall.setProps({
      closeButton: disabledButtons.closeButton,
      primaryButton: disabledButtons.primaryButton,

      secondaryButton: disabledButtons.secondaryButton,
    });

    expect(tearsheetSmall).toMatchSnapshot();
  });

  it('renders loading state', () => {
    tearsheetSmall.setProps({
      loading: true,
      loadingMessage: 'loading',
    });

    expect(tearsheetSmall).toMatchSnapshot();
  });

  it('should override `labels` if button label property provided', () => {
    tearsheetSmall.setProps({
      primaryButton: { ...primaryButton, label: 'Primary - prop' },
      secondaryButton: { ...secondaryButton, label: 'Secondary - prop' },
      closeButton: { ...closeButton, label: 'Close - prop' },
    });
    expect(tearsheetSmall).toMatchSnapshot();
  });
});
