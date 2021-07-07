/**
 * @file Non-entitled section mocks.
 * @copyright IBM Security 2019
 */

import { icon } from '../../_mocks_';
import { forbidden } from '../../ErrorPage/ErrorPage';

const { backgroundImage, ...style } = forbidden;

const props = {
  backgroundImage,
  style: { ...style },
};

const noSubscriptionExample = {
  ...props,
  title:
    'You need a subscription to access this content. Please contact your administrator to subscribe.',
  subTitle: 'What is the subscription for?',
  description: 'The subscription is for the Application.',
  links: [
    {
      id: 'lm',
      text: 'Learn More',
      href: '#learn',
      icon,
    },
  ],
};

const sharingExample = {
  ...props,
  title:
    'This shared page or source link is unavailable to you. Please contact your administrator for help.',
  subTitle: 'Here are some helpful links:',
  description: '',
  links: [
    {
      id: 'resource-1',
      text: 'Resource 1',
      href: '#resource-1',
    },
    {
      id: 'resource-2',
      text: 'Resource 2',
      href: '#resource-2',
    },
  ],
};

export { noSubscriptionExample, sharingExample };
