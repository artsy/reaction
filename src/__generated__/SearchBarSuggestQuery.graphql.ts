/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SearchBar_viewer$ref } from "./SearchBar_viewer.graphql";
export type SearchBarSuggestQueryVariables = {
    readonly term: string;
    readonly hasTerm: boolean;
};
export type SearchBarSuggestQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": SearchBar_viewer$ref;
    }) | null;
};
export type SearchBarSuggestQuery = {
    readonly response: SearchBarSuggestQueryResponse;
    readonly variables: SearchBarSuggestQueryVariables;
};



/*
query SearchBarSuggestQuery(
  $term: String!
  $hasTerm: Boolean!
) {
  viewer {
    ...SearchBar_viewer_2Mejjw
  }
}

fragment SearchBar_viewer_2Mejjw on Viewer {
  search(query: $term, mode: AUTOSUGGEST, first: 10) @include(if: $hasTerm) {
    edges {
      node {
        __typename
        displayLabel
        href
        ... on SearchableItem {
          searchableType
          id
        }
        ... on Node {
          __id
        }
      }
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
  },
  {
    "kind": "LocalArgument",
    "name": "hasTerm",
    "type": "Boolean!",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "SearchBarSuggestQuery",
  "id": null,
  "text": "query SearchBarSuggestQuery(\n  $term: String!\n  $hasTerm: Boolean!\n) {\n  viewer {\n    ...SearchBar_viewer_2Mejjw\n  }\n}\n\nfragment SearchBar_viewer_2Mejjw on Viewer {\n  search(query: $term, mode: AUTOSUGGEST, first: 10) @include(if: $hasTerm) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        href\n        ... on SearchableItem {\n          searchableType\n          id\n        }\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SearchBarSuggestQuery",
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
            "name": "SearchBar_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "hasTerm",
                "variableName": "hasTerm",
                "type": null
              },
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
    "name": "SearchBarSuggestQuery",
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
            "kind": "Condition",
            "passingValue": true,
            "condition": "hasTerm",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "search",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "mode",
                    "value": "AUTOSUGGEST",
                    "type": "SearchMode"
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
                            "name": "href",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "__id",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "SearchableItem",
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "searchableType",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "id",
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
              }
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
(node as any).hash = '179ff37868a1bbadf4ea470bc76df6d6';
export default node;
