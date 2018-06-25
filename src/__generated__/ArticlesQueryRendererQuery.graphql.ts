/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type ArticlesQueryRendererQueryVariables = {
    readonly artistID: string;
    readonly first: number;
};
export type ArticlesQueryRendererQueryResponse = {
    readonly artist: ({}) | null;
};



/*
query ArticlesQueryRendererQuery(
  $artistID: String!
  $first: Int!
) {
  artist(id: $artistID) {
    ...ArticlesRefetchContainer_artist_3ASum4
    __id
  }
}

fragment ArticlesRefetchContainer_artist_3ASum4 on Artist {
  id
  articlesConnection(first: $first, sort: PUBLISHED_AT_DESC, in_editorial_feed: true) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        href
        thumbnail_title
        author {
          name
          __id
        }
        published_at(format: "MMM d, YYYY")
        thumbnail_image {
          resized(width: 300) {
            url
          }
        }
        __id
      }
    }
  }
  __id
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cursor",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "page",
    "args": null,
    "storageKey": null
  },
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
  "name": "ArticlesQueryRendererQuery",
  "id": null,
  "text": "query ArticlesQueryRendererQuery(\n  $artistID: String!\n  $first: Int!\n) {\n  artist(id: $artistID) {\n    ...ArticlesRefetchContainer_artist_3ASum4\n    __id\n  }\n}\n\nfragment ArticlesRefetchContainer_artist_3ASum4 on Artist {\n  id\n  articlesConnection(first: $first, sort: PUBLISHED_AT_DESC, in_editorial_feed: true) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        href\n        thumbnail_title\n        author {\n          name\n          __id\n        }\n        published_at(format: \"MMM d, YYYY\")\n        thumbnail_image {\n          resized(width: 300) {\n            url\n          }\n        }\n        __id\n      }\n    }\n  }\n  __id\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArticlesQueryRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArticlesRefetchContainer_artist",
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": null
              }
            ]
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArticlesQueryRendererQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "articlesConnection",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "in_editorial_feed",
                "value": true,
                "type": "Boolean"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PUBLISHED_AT_DESC",
                "type": "ArticleSorts"
              }
            ],
            "concreteType": "ArticleConnection",
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
                    "name": "hasPreviousPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "startCursor",
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
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ArticleEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Article",
                    "plural": false,
                    "selections": [
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
                        "name": "thumbnail_title",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "author",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Author",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "name",
                            "args": null,
                            "storageKey": null
                          },
                          v2
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "published_at",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM d, YYYY",
                            "type": "String"
                          }
                        ],
                        "storageKey": "published_at(format:\"MMM d, YYYY\")"
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "thumbnail_image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "resized",
                            "storageKey": "resized(width:300)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 300,
                                "type": "Int"
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "url",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          }
                        ]
                      },
                      v2
                    ]
                  }
                ]
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'f4921b30c23ad51ae5626bbde1088a1f';
export default node;
