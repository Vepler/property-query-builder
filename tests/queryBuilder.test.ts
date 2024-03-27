import { QueryBuilder } from '../src';
import { Query, Condition } from '../src/query-builder-types';

describe('QueryBuilder', () => {
    let queryBuilder: QueryBuilder;

    beforeEach(() => {
        queryBuilder = new QueryBuilder();
    });

    test('should add a new query group with the specified operator', () => {
        const groupId = queryBuilder.addGroup('AND');
        expect(groupId).toBe('0');
        expect(queryBuilder.getQuery()).toEqual({
            query: [{ operator: 'AND', groups: [] }],
        });
    });

    test('should remove a query group with the specified group ID', () => {
        queryBuilder.addGroup('AND');
        queryBuilder.addGroup('OR');
        queryBuilder.removeGroup('1');
        expect(queryBuilder.getQuery()).toEqual({
            query: [{ operator: 'AND', groups: [] }],
        });
    });

    test('should add a condition to the specified query group', () => {
        const groupId = queryBuilder.addGroup('AND');
        const condition: Condition = {
            field: 'currentSaleListingPrice',
            comparator: 'gt',
            value: 100000,
        };
        queryBuilder.addCondition(groupId, condition);
        expect(queryBuilder.getQuery()).toEqual({
            query: [
                {
                    operator: 'AND',
                    groups: [{ conditions: [condition] }],
                },
            ],
        });
    });

    test('should remove a condition from the specified query group', () => {
        const groupId = queryBuilder.addGroup('AND');
        const condition: Condition = {
            field: 'currentSaleListingPrice',
            comparator: 'gt',
            value: 100000,
        };
        queryBuilder.addCondition(groupId, condition);
        queryBuilder.removeCondition(groupId, 0);
        expect(queryBuilder.getQuery()).toEqual({
            query: [{ operator: 'AND', groups: [] }],
        });
    });

    test('should update a condition in the specified query group', () => {
        const groupId = queryBuilder.addGroup('AND');
        const condition: Condition = {
            field: 'currentSaleListingPrice',
            comparator: 'gt',
            value: 100000,
        };
        queryBuilder.addCondition(groupId, condition);
        const updatedCondition: Condition = {
            field: 'currentSaleListingPrice',
            comparator: 'lt',
            value: 200000,
        };
        queryBuilder.updateCondition(groupId, 0, updatedCondition);
        expect(queryBuilder.getQuery()).toEqual({
            query: [
                {
                    operator: 'AND',
                    groups: [{ conditions: [updatedCondition] }],
                },
            ],
        });
    });

    test('should update a query group with the specified operator and conditions', () => {
        const groupId = queryBuilder.addGroup('AND');
        const conditions: Condition[] = [
            {
                field: 'currentSaleListingPrice',
                comparator: 'gt',
                value: 100000,
            },
            {
                field: 'beds',
                comparator: 'gte',
                value: 3,
            },
        ];
        queryBuilder.updateGroup(groupId, 'OR', conditions);
        expect(queryBuilder.getQuery()).toEqual({
            query: [
                {
                    operator: 'OR',
                    groups: [
                        { conditions: [conditions[0]] },
                        { conditions: [conditions[1]] },
                    ],
                },
            ],
        });
    });

    test('should retrieve the constructed query', () => {
        const groupId = queryBuilder.addGroup('AND');
        const condition: Condition = {
            field: 'currentSaleListingPrice',
            comparator: 'gt',
            value: 100000,
        };
        queryBuilder.addCondition(groupId, condition);
        const query: Query = {
            query: [
                {
                    operator: 'AND',
                    groups: [{ conditions: [condition] }],
                },
            ],
        };
        expect(queryBuilder.getQuery()).toEqual(query);
    });
});
