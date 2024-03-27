import { QueryBuilder } from '../src';

describe('QueryBuilder', () => {
  let queryBuilder: QueryBuilder;

  beforeEach(() => {
    queryBuilder = new QueryBuilder();
  });

  afterEach(() => {
    queryBuilder = new QueryBuilder();
  });

  describe('getUniqueFilterFields', () => {
    it('should return an empty array when no conditions are added', () => {
      const uniqueFilterFields = queryBuilder.getUniqueFilterFields();
      expect(uniqueFilterFields).toEqual([]);
    });

    it('should return an array of unique filter fields', () => {
      const group1Id = queryBuilder.addGroup('AND');
      queryBuilder.addCondition(group1Id, {
        field: 'beds',
        comparator: 'eq',
        value: '2',
      });
      queryBuilder.addCondition(group1Id, {
        field: 'saleListingStatus',
        comparator: 'eq',
        value: 'live',
      });

      const group2Id = queryBuilder.addGroup('OR');
      queryBuilder.addCondition(group2Id, {
        field: 'baths',
        comparator: 'eq',
        value: 3,
      });
      queryBuilder.addCondition(group2Id, {
        field: 'saleListingStatus',
        comparator: 'eq',
        value: 'live',
      });

      const uniqueFilterFields = queryBuilder.getUniqueFilterFields();
      expect(uniqueFilterFields).toEqual(['beds', 'saleListingStatus', 'baths']);
    });

    it('should handle nested query groups', () => {
      const group1Id = queryBuilder.addGroup('AND');
      queryBuilder.addCondition(group1Id, {
        field: 'beds',
        comparator: 'eq',
        value: 1,
      });

      const group2Id = queryBuilder.addGroup('OR');
      queryBuilder.addCondition(group2Id, {
        field: 'baths',
        comparator: 'eq',
        value: 1,
      });

      const group3Id = queryBuilder.addGroup('AND');
      queryBuilder.addCondition(group3Id, {
        field: 'currentRentalListingPrice',
        comparator: 'eq',
        value: 125000,
      });
      queryBuilder.addCondition(group3Id, {
        field: 'saleListingStatus',
        comparator: 'eq',
        value: 'live',
      });

      const uniqueFilterFields = queryBuilder.getUniqueFilterFields();
      expect(uniqueFilterFields).toEqual(['beds', 'baths', 'currentRentalListingPrice', 'saleListingStatus']);
    });
  });
});
