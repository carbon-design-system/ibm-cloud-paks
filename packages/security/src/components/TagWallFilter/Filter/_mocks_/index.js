/**
 * @file Filter mocks.
 * @copyright IBM Security 2018
 */

const items = [
  {
    id: 'item-1',
    label: 'New York',
  },
  {
    id: 'item-2',
    label: 'London',
  },
  {
    id: 'item-3',
    label: 'Tokyo',
  },
  {
    id: 'item-4',
    label: 'Beijing',
  },
  {
    id: 'item-5',
    label: 'New Delhi',
  },
  {
    id: 'item-6',
    label: 'Berlin',
  },
  {
    id: 'item-7',
    label: 'Montreal',
  },
  {
    id: 'item-8',
    label: 'San Fransisco',
  },
  {
    id: 'item-9',
    label: 'Rio de Janeiro',
  },
  {
    id: 'item-10',
    label: 'Johannesburg',
  },
  {
    id: 'item-11',
    label: 'Abuja',
  },
];

const itemToString = (item) => (item ? item.label : '');

export { items, itemToString };
