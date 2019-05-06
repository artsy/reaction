/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SearchApp_viewer$ref } from "./SearchApp_viewer.graphql";
export type routes_SearchBarTopLevelQueryVariables = {
    readonly term: string;
};
export type routes_SearchBarTopLevelQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": SearchApp_viewer$ref;
    }) | null;
};
export type routes_SearchBarTopLevelQuery = {
    readonly response: routes_SearchBarTopLevelQueryResponse;
    readonly variables: routes_SearchBarTopLevelQueryVariables;
};



/*
query routes_SearchBarTopLevelQuery(
  $term: String!
) {
  viewer {
    ...SearchApp_viewer_4hh6ED
  }
}

fragment SearchApp_viewer_4hh6ED on Viewer {
  search(query: $term, first: 1, aggregations: [TYPE]) {
    aggregations {
      slice
      counts {
        count
        name
        __id
      }
    }
    ...NavigationTabs_searchableConnection
    edges {
      node {
        __typename
        ... on SearchableItem {
          id
          displayLabel
          displayType
        }
        ... on Node {
          __id
        }
      }
    }
  }
  filter_artworks(keyword: $term, size: 0, aggregations: [TOTAL]) {
    counts {
      total
    }
    __id
  }
}

fragment NavigationTabs_searchableConnection on SearchableConnection {
  aggregations {
    slice
    counts {
      count
      name
      __id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "term",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_SearchBarTopLevelQuery",
  "id": null,
  "text": "query routes_SearchBarTopLevelQuery(\n  $term: String!\n) {\n  viewer {\n    ...SearchApp_viewer_4hh6ED\n  }\n}\n\nfragment SearchApp_viewer_4hh6ED on Viewer {\n  search(query: $term, first: 1, aggregations: [TYPE]) {\n    aggregations {\n      slice\n      counts {\n        count\n        name\n        __id\n      }\n    }\n    ...NavigationTabs_searchableConnection\n    edges {\n      node {\n        __typename\n        ... on SearchableItem {\n          id\n          displayLabel\n          displayType\n        }\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n  filter_artworks(keyword: $term, size: 0, aggregations: [TOTAL]) {\n    counts {\n      total\n    }\n    __id\n  }\n}\n\nfragment NavigationTabs_searchableConnection on SearchableConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n      __id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_SearchBarTopLevelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SearchApp_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "term",
                "variableName": "term",
                "type": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_SearchBarTopLevelQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "search",
            "storageKey": null,
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TYPE"
                ],
                "type": "[SearchAggregation]"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 1,
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "query",
                "variableName": "term",
                "type": "String!"
              }
            ],
            "concreteType": "SearchableConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "aggregations",
                "storageKey": null,
                "args": null,
                "concreteType": "SearchAggregationResults",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "count",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "name",
                        "args": null,
                        "storageKey": null
                      },
                      v1
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "SearchableEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      },
                      v1,
                      {
                        "kind": "InlineFragment",
                        "type": "SearchableItem",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "id",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "displayLabel",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "displayType",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "filter_artworks",
            "storageKey": null,
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ],
                "type": "[ArtworkAggregation]"
              },
              {
                "kind": "Variable",
                "name": "keyword",
                "variableName": "term",
                "type": "String"
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 0,
                "type": "Int"
              }
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "total",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              v1
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      }
    ]
  }
};
})();
(node as any).hash = '3b024d92fcba431a3667ed0d990cbbaa';
export default node;
