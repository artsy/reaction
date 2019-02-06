/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SuggestionsSearch_viewer$ref } from "./SuggestionsSearch_viewer.graphql";
export type SearchBarQueryVariables = {
    readonly term: string;
};
export type SearchBarQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": SuggestionsSearch_viewer$ref;
    }) | null;
};
export type SearchBarQuery = {
    readonly response: SearchBarQueryResponse;
    readonly variables: SearchBarQueryVariables;
};



/*
query SearchBarQuery(
  $term: String!
) {
  viewer {
    ...SuggestionsSearch_viewer_4hh6ED
  }
}

fragment SuggestionsSearch_viewer_4hh6ED on Viewer {
  search(query: $term, mode: AUTOSUGGEST, first: 10) {
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
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "SearchBarQuery",
  "id": null,
  "text": "query SearchBarQuery(\n  $term: String!\n) {\n  viewer {\n    ...SuggestionsSearch_viewer_4hh6ED\n  }\n}\n\nfragment SuggestionsSearch_viewer_4hh6ED on Viewer {\n  search(query: $term, mode: AUTOSUGGEST, first: 10) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SearchBarQuery",
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
            "name": "SuggestionsSearch_viewer",
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
    "name": "SearchBarQuery",
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
(node as any).hash = 'b852043c30769d6f0612c3b0d9e4fb7a';
export default node;
