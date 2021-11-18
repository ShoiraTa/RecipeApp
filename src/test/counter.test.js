/**
 * @jest-environment jsdom
 */

import { apiMock2, countertests } from '../__mocks__/counter-test.js';

describe('Add a new meal', () => {
  test('Add a new meal', () => {
    expect(apiMock2(3, 'meal').length).toBe(3);
  });

  test('Get number of meals', () => {
    const mealsArr = [{
      id: '1',
      name: 'chicken',
    }, {
      id: '2',
      name: 'meat',
    },
    {
      id: '3',
      name: 'chicken soap',
    },
    {
      id: '4',
      name: 'fahitas',
    },
    ];
    expect(countertests(mealsArr).length).toBe(4);
  });
});