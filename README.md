# Propbar Property Query SDK

The Propbar Property Query SDK is a TypeScript library that enables the easy construction of complex queries for searching and filtering data. It offers a fluent and intuitive API for building queries with multiple groups and conditions.

## Todo
- [] Add documentation for loadQuery method

## Installation

To install the Propbar Property Query SDK, you can use npm:

```bash
npm install @vepler/property-query-builder

OR 

yarn add @vepler/property-query-builder

```

# Example
Here's an example demonstrating how to use the Propbar Property Query SDK to construct a query:

This example illustrates how to add groups, add conditions, update conditions, remove conditions, update entire groups, and retrieve the current state of the query.


```typescript
import { QueryBuilder } from '@vepler/property-query-builder';

const queryBuilder = new QueryBuilder();

// Add a group
const groupId1 = queryBuilder.addGroup('AND');

// Add conditions to the group
queryBuilder.addCondition(groupId1, {
  field: 'price',
  comparator: 'gt',
  value: 250000,
});
queryBuilder.addCondition(groupId1, {
  field: 'bedrooms',
  comparator: 'eq',
  value: 2,
});

// Add another group
const groupId2 = queryBuilder.addGroup('OR');

// Add conditions to the second group
queryBuilder.addCondition(groupId2, {
  field: 'price',
  comparator: 'gt',
  value: 300000,
});
queryBuilder.addCondition(groupId2, {
  field: 'bedrooms',
  comparator: 'eq',
  value: 3,
});

// Update a condition
queryBuilder.updateCondition(groupId1, 0, {
  field: 'price',
  comparator: 'gte',
  value: 200000,
});

// Remove a condition
queryBuilder.removeCondition(groupId2, 1);

// Update an entire group
queryBuilder.updateGroup(groupId2, 'AND', [
  {
    field: 'price',
    comparator: 'lt',
    value: 400000,
  },
  {
    field: 'bedrooms',
    comparator: 'gte',
    value: 2,
  },
]);

// Get the current state of the query
const query = queryBuilder.getQuery();
console.log(JSON.stringify(query, null, 2));

```

# Usage
## Importing the SDK
To use the Propbar Property Query SDK in your TypeScript project, import the `QueryBuilder` class:

```typescript
import { QueryBuilder } from '@vepler/property-query-builder';
```

## Creating a Query Builder Instance
Create an instance of the `QueryBuilder` class to begin building your query:
    
```typescript
const queryBuilder = new QueryBuilder();
```

## Adding Groups
To add a group to the query, use the addGroup method and specify the operator ('AND' or 'OR'):

```typescript
const groupId = queryBuilder.addGroup('AND');
```
The `addGroup` method returns a generated group ID that you can use to reference the group when adding or modifying conditions.

## Adding Conditions
To add a condition to a group, use the addCondition method and provide the group ID and the condition object:
```typescript
queryBuilder.addCondition(groupId, {
  field: 'price',
  comparator: 'gt',
  value: 250000,
});
```
The condition object should have the following properties:

- `field`: The field to apply the condition on.
- `comparator`: The comparison operator ('eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'contains', 'startswith', 'endswith', or 'regex').
- `value`: The value to compare against (can be a string, number, boolean, or an array of these types).

## Removing Conditions
To remove a condition from a group, use the `removeCondition` method and provide the group ID and the index of the condition:
```typescript
queryBuilder.removeCondition(groupId, conditionIndex);
```

## Updating Conditions
To update a condition within a group, use the `updateCondition` method and provide the group ID, the index of the condition, and the updated condition object:
```typescript
queryBuilder.updateCondition(groupId, conditionIndex, {
  field: 'price',
  comparator: 'gte',
  value: 200000,
});
```

## Updating Groups
To update an entire group, use the `updateGroup` method and provide the group ID, the operator, and an array of conditions:
```typescript
queryBuilder.updateGroup(groupId, 'AND', [
  {
    field: 'price',
    comparator: 'lt',
    value: 400000,
  },
  {
    field: 'bedrooms',
    comparator: 'gte',
    value: 2,
  },
]);
```

## Removing Groups
To remove a group from the query, use the `removeGroup` method and provide the group ID:
```typescript
queryBuilder.removeGroup(groupId);
```

## Getting the Query
To obtain the current state of the query, use the `getQuery` method:

```typescript
const query = queryBuilder.getQuery();
```
The `getQuery` method returns the query object that follows the defined schema.

# Query Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "query": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "operator": {
            "type": "string",
            "enum": ["AND", "OR"]
          },
          "groups": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "conditions": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "field": {
                        "type": "string"
                      },
                      "comparator": {
                        "type": "string",
                        "enum": [
                          "eq",
                          "ne",
                          "gt",
                          "gte",
                          "lt",
                          "lte",
                          "in",
                          "nin",
                          "contains",
                          "startswith",
                          "endswith",
                          "regex"
                        ]
                      },
                      "value": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "number"
                          },
                          {
                            "type": "boolean"
                          },
                          {
                            "type": "array",
                            "items": {
                              "oneOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "number"
                                },
                                {
                                  "type": "boolean"
                                }
                              ]
                            }
                          }
                        ]
                      }
                    },
                    "required": ["field", "comparator", "value"]
                  }
                }
              },
              "required": ["conditions"]
            }
          }
        },
        "required": ["operator", "groups"]
      }
    }
  },
  "required": ["query"]
}
```

# License
The Propbar Property Query SDK is open-source software licensed under the MIT License.
