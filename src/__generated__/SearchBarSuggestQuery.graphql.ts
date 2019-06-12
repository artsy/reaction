/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SearchBar_viewer$ref } from "./SearchBar_viewer.graphql";
export type SearchBarSuggestQueryVariables = {
    readonly term: string;
    readonly hasTerm: boolean;
};
export type SearchBarSuggestQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": SearchBar_viewer$ref;
    } | null;
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
  search(query: $term, mode: AUTOSUGGEST, first: 7) @include(if: $hasTerm) {
    edges {
      node {
        __typename
        displayLabel
        href
        ... on SearchableItem {
          displayType
          id
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
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SearchBarSuggestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
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
            "kind": "FragmentSpread",
            "name": "SearchBar_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "hasTerm",
                "variableName": "hasTerm"
              },
              {
                "kind": "Variable",
                "name": "term",
                "variableName": "term"
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
    "argumentDefinitions": (v0/*: any*/),
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
                    "value": 7
                  },
                  {
                    "kind": "Literal",
                    "name": "mode",
                    "value": "AUTOSUGGEST"
                  },
                  {
                    "kind": "Variable",
                    "name": "query",
                    "variableName": "term"
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
                            "kind": "InlineFragment",
                            "type": "SearchableItem",
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "displayType",
                                "args": null,
                                "storageKey": null
                              },
                              (v1/*: any*/)
                            ]
                          },
                          {
                            "kind": "ClientExtension",
                            "selections": [
                              (v1/*: any*/)
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SearchBarSuggestQuery",
    "id": null,
    "text": "query SearchBarSuggestQuery(\n  $term: String!\n  $hasTerm: Boolean!\n) {\n  viewer {\n    ...SearchBar_viewer_2Mejjw\n  }\n}\n\nfragment SearchBar_viewer_2Mejjw on Viewer {\n  search(query: $term, mode: AUTOSUGGEST, first: 7) @include(if: $hasTerm) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        href\n        ... on SearchableItem {\n          displayType\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '179ff37868a1bbadf4ea470bc76df6d6';
export default node;
