export type Operator = 'AND' | 'OR';

export type Comparator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'startswith'
  | 'endswith';

export type Condition = {
  field: string;
  comparator: Comparator;
  value: string | number | boolean | (string | number | boolean)[];
};

export type Group = {
  conditions: Condition[];
};

export type QueryGroup = {
  operator: Operator;
  groups: Group[];
};

export type Query = QueryGroup[];
