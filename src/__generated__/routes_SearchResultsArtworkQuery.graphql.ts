/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SearchResultsArtworksRoute_viewer$ref } from "./SearchResultsArtworksRoute_viewer.graphql";
export type routes_SearchResultsArtworkQueryVariables = {
    readonly term: string;
};
export type routes_SearchResultsArtworkQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": SearchResultsArtworksRoute_viewer$ref;
    }) | null;
};
export type routes_SearchResultsArtworkQuery = {
    readonly response: routes_SearchResultsArtworkQueryResponse;
    readonly variables: routes_SearchResultsArtworkQueryVariables;
};



/*
query routes_SearchResultsArtworkQuery(
  $term: String!
) {
  viewer {
    ...SearchResultsArtworksRoute_viewer_4hh6ED
  }
}

fragment SearchResultsArtworksRoute_viewer_4hh6ED on Viewer {
  search(query: $term, first: 10, entities: [ARTWORK]) {
    edges {
      node {
        __typename
        ... on Artwork {
          title
          artist_names
          date
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
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_SearchResultsArtworkQuery",
  "id": null,
  "text": "query routes_SearchResultsArtworkQuery(\n  $term: String!\n) {\n  viewer {\n    ...SearchResultsArtworksRoute_viewer_4hh6ED\n  }\n}\n\nfragment SearchResultsArtworksRoute_viewer_4hh6ED on Viewer {\n  search(query: $term, first: 10, entities: [ARTWORK]) {\n    edges {\n      node {\n        __typename\n        ... on Artwork {\n          title\n          artist_names\n          date\n        }\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_SearchResultsArtworkQuery",
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
            "name": "SearchResultsArtworksRoute_viewer",
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
    "name": "routes_SearchResultsArtworkQuery",
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
                "name": "entities",
                "value": [
                  "ARTWORK"
                ],
                "type": "[SearchEntity]"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10,
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
                        "name": "__id",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "Artwork",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "title",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "artist_names",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
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
(node as any).hash = '5a4f7343143f964173d600b97d3cb6f7';
export default node;
