import { Condition, Operator, Query, QueryGroup } from './query-builder-types';

/**
 * QueryBuilder class for constructing and manipulating queries.
 */
export class QueryBuilder {
  private query: Query = []

  /**
   * Adds a new query group with the specified operator.
   * @param operator The operator for the new query group ('AND' or 'OR').
   * @returns The ID of the newly added group.
   */
  public addGroup(operator: Operator): string {
    const groupId = this.generateGroupId();
    const queryGroup: QueryGroup = {
      operator,
      groups: [],
    };
    this.query.push(queryGroup);
    return groupId;
  }

  /**
   * Removes a query group with the specified group ID.
   * @param groupId The ID of the group to remove.
   * @returns The QueryBuilder instance for chaining.
   */
  public removeGroup(groupId: string): QueryBuilder {
    this.query = this.query.filter(
      (queryGroup, index) => index !== parseInt(groupId, 10)
    );
    return this;
  }

  /**
   * Adds a condition to the specified query group.
   * @param groupId The ID of the group to add the condition to.
   * @param condition The condition to add.
   * @returns The QueryBuilder instance for chaining.
   */
  public addCondition(groupId: string, condition: Condition): QueryBuilder {
    const queryGroup = this.query[parseInt(groupId, 10)];
    if (queryGroup) {
      queryGroup.groups.push({ conditions: [condition] });
    }
    return this;
  }

  /**
   * Removes a condition from the specified query group.
   * @param groupId The ID of the group to remove the condition from.
   * @param conditionIndex The index of the condition to remove.
   * @returns The QueryBuilder instance for chaining.
   */
  public removeCondition(
    groupId: string,
    conditionIndex: number
  ): QueryBuilder {
    const queryGroup = this.query[parseInt(groupId, 10)];
    if (queryGroup) {
      queryGroup.groups = queryGroup.groups.filter(
        (group, index) => index !== conditionIndex
      );
    }
    return this;
  }

  /**
   * Updates a condition in the specified query group.
   * @param groupId The ID of the group to update the condition in.
   * @param conditionIndex The index of the condition to update.
   * @param condition The updated condition.
   * @returns The QueryBuilder instance for chaining.
   */
  public updateCondition(
    groupId: string,
    conditionIndex: number,
    condition: Condition
  ): QueryBuilder {
    const queryGroup = this.query[parseInt(groupId, 10)];
    if (queryGroup) {
      queryGroup.groups[conditionIndex] = { conditions: [condition] };
    }
    return this;
  }

  /**
   * Updates a query group with the specified operator and conditions.
   * @param groupId The ID of the group to update.
   * @param operator The updated operator for the query group.
   * @param conditions The updated conditions for the query group.
   * @returns The QueryBuilder instance for chaining.
   */
  public updateGroup(
    groupId: string,
    operator: 'AND' | 'OR',
    conditions: Condition[]
  ): QueryBuilder {
    const queryGroup = this.query[parseInt(groupId, 10)];
    if (queryGroup) {
      queryGroup.operator = operator;
      queryGroup.groups = conditions.map((condition) => ({
        conditions: [condition],
      }));
    }
    return this;
  }


  /**
   * Retrieves the group IDs for the current query.
   */
  public listGroupIds(): string[] {
    return this.query.map((_, index) => index.toString());
  }

  /**
   * Loads a raw query into the current state, generating new group IDs and condition IDs.
   * @param rawQuery The raw query to load.
   * @returns The QueryBuilder instance for chaining.
   */
  public loadQuery(rawQuery: Query): QueryBuilder {
    this.query = rawQuery.map((queryGroup) => ({
        operator: queryGroup.operator,
        groups: queryGroup.groups.map((group) => ({
          conditions: group.conditions.map((condition) => ({
            ...condition,
          })),
        })),
      }))
    return this;
  }
  
  /**
   * Retrieves an array of unique filter fields used in the current query.
   * @returns An array of unique filter fields.
   */
  public getUniqueFilterFields(): string[] {
    const filterFields: Set<string> = new Set();

    const scanGroup = (group: QueryGroup) => {
      group.groups.forEach((subGroup) => {
        subGroup.conditions.forEach((condition) => {
          filterFields.add(condition.field);
        });
      });
    };

    this.query.forEach((queryGroup) => {
      scanGroup(queryGroup);
    });

    return Array.from(filterFields);
  }

  /**
   * Retrieves the constructed query.
   * @returns The constructed query.
   */
  public getQuery(): Query {
    return this.query;
  }

  /**
   * Generates a new group ID based on the current number of query groups.
   * @returns The generated group ID.
   */
  private generateGroupId(): string {
    return this.query.length.toString();
  }
}
