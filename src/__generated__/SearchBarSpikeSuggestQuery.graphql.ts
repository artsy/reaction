/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SearchBarSpike_viewer$ref } from "./SearchBarSpike_viewer.graphql";
export type SearchBarSpikeSuggestQueryVariables = {
    readonly term: string;
    readonly hasTerm: boolean;
};
export type SearchBarSpikeSuggestQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": SearchBarSpike_viewer$ref;
    }) | null;
};
export type SearchBarSpikeSuggestQuery = {
    readonly response: SearchBarSpikeSuggestQueryResponse;
    readonly variables: SearchBarSpikeSuggestQueryVariables;
};



/*
query SearchBarSpikeSuggestQuery(
  $term: String!
  $hasTerm: Boolean!
) {
  viewer {
    ...SearchBarSpike_viewer_2Mejjw
  }
}

fragment SearchBarSpike_viewer_2Mejjw on Viewer {
  search(query: $term, mode: AUTOSUGGEST, first: 10) @include(if: $hasTerm) {
    edges {
      node {
        __typename
        displayLabel
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
  "name": "SearchBarSpikeSuggestQuery",
  "id": null,
  "text": "query SearchBarSpikeSuggestQuery(\n  $term: String!\n  $hasTerm: Boolean!\n) {\n  viewer {\n    ...SearchBarSpike_viewer_2Mejjw\n  }\n}\n\nfragment SearchBarSpike_viewer_2Mejjw on Viewer {\n  search(query: $term, mode: AUTOSUGGEST, first: 10) @include(if: $hasTerm) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SearchBarSpikeSuggestQuery",
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
            "name": "SearchBarSpike_viewer",
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
    "name": "SearchBarSpikeSuggestQuery",
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
                            "name": "__id",
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
(node as any).hash = '8f96ba3e5a8c63a5c0392860a6c67b5d';
export default node;
