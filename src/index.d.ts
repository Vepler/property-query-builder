// src/index.d.ts
import { Query, Condition, Operator } from './query-builder-types';

declare module '@vepler/property-query-builder' {
  export class QueryBuilder {
    private query: Query;

    constructor();

    public addGroup(operator: Operator): string;
    public removeGroup(groupId: string): QueryBuilder;
    public addCondition(groupId: string, condition: Condition): QueryBuilder;
    public removeCondition(groupId: string, conditionIndex: number): QueryBuilder;
    public updateCondition(groupId: string, conditionIndex: number, condition: Condition): QueryBuilder;
    public updateGroup(groupId: string, operator: Operator, conditions: Condition[]): QueryBuilder;
    public listGroupIds(): string[];
    public loadQuery(rawQuery: Query): QueryBuilder;
    public getQuery(): Query;

    private generateGroupId(): string;
  }
}
