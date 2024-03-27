import { QueryBuilder } from '../src';
import { Query, Condition } from '../src/query-builder-types';

describe('QueryBuilder', () => {
  let queryBuilder: QueryBuilder;

  beforeEach(() => {
    queryBuilder = new QueryBuilder();
  });

  test('should load the raw query into the current state', () => {
    const rawQuery: Query = {
      query: [
        {
          operator: 'AND',
          groups: [
            {
              conditions: [
                { field: 'currentSaleListingPrice', comparator: 'gt', value: 100000 },
                { field: 'beds', comparator: 'gte', value: 3 },
              ],
            },
          ],
        },
      ],
    };

    queryBuilder.loadQuery(rawQuery);

    expect(queryBuilder.getQuery()).toEqual(rawQuery);
  });

  test('should add another group after loading the raw query', () => {
    const rawQuery: Query = {
      query: [
        {
          operator: 'AND',
          groups: [
            {
              conditions: [
                { field: 'currentSaleListingPrice', comparator: 'gt', value: 100000 },
                { field: 'beds', comparator: 'gte', value: 3 },
              ],
            },
          ],
        },
      ],
    };

    queryBuilder.loadQuery(rawQuery);
    queryBuilder.addGroup('OR');

    expect(queryBuilder.getQuery().query).toHaveLength(2);
    expect(queryBuilder.getQuery().query[1].operator).toBe('OR');
  });

  test('should add a condition to a group that was loaded', () => {
    const rawQuery: Query = {
      query: [
        {
          operator: 'AND',
          groups: [
            {
              conditions: [
                { field: 'currentSaleListingPrice', comparator: 'gt', value: 100000 },
                { field: 'beds', comparator: 'gte', value: 3 },
              ],
            },
          ],
        },
      ],
    };

    queryBuilder.loadQuery(rawQuery);

    const newCondition: Condition = { field: 'propertyType', comparator: 'eq', value: 'House' };
    queryBuilder.addCondition('0', newCondition);

    expect(queryBuilder.getQuery().query[0].groups).toHaveLength(2);
    expect(queryBuilder.getQuery().query[0].groups[1].conditions[0]).toEqual(newCondition);
  });

  test('should not mutate the original raw query when loading and modifying', () => {
    const rawQuery: Query = {
      query: [
        {
          operator: 'AND',
          groups: [
            {
              conditions: [
                { field: 'currentSaleListingPrice', comparator: 'gt', value: 100000 },
                { field: 'beds', comparator: 'gte', value: 3 },
              ],
            },
          ],
        },
      ],
    };

    queryBuilder.loadQuery(rawQuery);
    queryBuilder.addGroup('OR');
    queryBuilder.addCondition('1', { field: 'propertyType', comparator: 'eq', value: 'House' });

    expect(queryBuilder.getQuery()).not.toBe(rawQuery);
    expect(rawQuery).toEqual({
      query: [
        {
          operator: 'AND',
          groups: [
            {
              conditions: [
                { field: 'currentSaleListingPrice', comparator: 'gt', value: 100000 },
                { field: 'beds', comparator: 'gte', value: 3 },
              ],
            },
          ],
        },
      ],
    });
  });
});
