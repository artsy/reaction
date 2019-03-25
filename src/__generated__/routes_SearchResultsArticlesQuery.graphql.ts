/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { SearchResultsArticles_viewer$ref } from "./SearchResultsArticles_viewer.graphql";
export type routes_SearchResultsArticlesQueryVariables = {
    readonly term: string;
};
export type routes_SearchResultsArticlesQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": SearchResultsArticles_viewer$ref;
    }) | null;
};
export type routes_SearchResultsArticlesQuery = {
    readonly response: routes_SearchResultsArticlesQueryResponse;
    readonly variables: routes_SearchResultsArticlesQueryVariables;
};



/*
query routes_SearchResultsArticlesQuery(
  $term: String!
) {
  viewer {
    ...SearchResultsArticles_viewer_4hh6ED
  }
}

fragment SearchResultsArticles_viewer_4hh6ED on Viewer {
  search(query: $term, first: 10, entities: [ARTICLE]) {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        __typename
        ... on SearchableItem {
          _id
          displayLabel
          href
          imageUrl
          searchableType
        }
        ... on Node {
          __id
        }
      }
    }
  }
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
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
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v3 = [
  v1,
  v2,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_SearchResultsArticlesQuery",
  "id": null,
  "text": "query routes_SearchResultsArticlesQuery(\n  $term: String!\n) {\n  viewer {\n    ...SearchResultsArticles_viewer_4hh6ED\n  }\n}\n\nfragment SearchResultsArticles_viewer_4hh6ED on Viewer {\n  search(query: $term, first: 10, entities: [ARTICLE]) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        __typename\n        ... on SearchableItem {\n          _id\n          displayLabel\n          href\n          imageUrl\n          searchableType\n        }\n        ... on Node {\n          __id\n        }\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_SearchResultsArticlesQuery",
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
            "name": "SearchResultsArticles_viewer",
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
    "name": "routes_SearchResultsArticlesQuery",
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
                  "ARTICLE"
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
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageCursors",
                "storageKey": null,
                "args": null,
                "concreteType": "PageCursors",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "around",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": true,
                    "selections": v3
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": v3
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": v3
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "previous",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": [
                      v1,
                      v2
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
                            "name": "_id",
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
                            "name": "imageUrl",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "searchableType",
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
(node as any).hash = '33d2ebed272622f485e34105a9093938';
export default node;
