/**
 * @file Header notification tests.
 * @copyright IBM Security 2018
 */

import { shallow } from 'enzyme';
import React from 'react';

import HeaderNotification from '../';
import { labels, notifications } from '../../_mocks_';

import { namespace } from '../constants';

const { fn } = jest;

describe('HeaderNotification', () => {
  const clearButtonLabel = labels.notifications.clear;
  const { dateTime, description, product, timeLabel } = notifications
    .map((notification) => ({
      dateTime: notification.datetime,
      description: notification.description,
      product: notification.product,
      timeLabel: notification.label,
    }))
    .find((notification, index) => index === 0);

  const onClearButtonClick = fn();

  const headerNotification = shallow(
    <HeaderNotification
      clearButtonLabel={clearButtonLabel}
      dateTime={dateTime}
      description={description}
      onClearButtonClick={onClearButtonClick}
      product={product}
      timeLabel={timeLabel}
      viaLabel={labels.notifications.via}
    />
  );

  const clearButton = headerNotification.find(`.${namespace}__button`);

  describe('Rendering', () => {
    it('renders correctly', () => {
      expect(headerNotification).toMatchSnapshot();
    });
  });

  describe('Events', () => {
    it('should invoke the `onClearButtonClick` method when the button is clicked', () => {
      clearButton.simulate('click', { preventDefault: () => {} });
      expect(onClearButtonClick).toBeCalled();
    });
  });
});
