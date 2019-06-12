/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistShows_artist$ref } from "./ArtistShows_artist.graphql";
export type PartnerShowSorts = "CREATED_AT_ASC" | "CREATED_AT_DESC" | "END_AT_ASC" | "END_AT_DESC" | "NAME_ASC" | "NAME_DESC" | "PARTNER_ASC" | "PUBLISH_AT_ASC" | "PUBLISH_AT_DESC" | "START_AT_ASC" | "START_AT_DESC" | "created_at_asc" | "created_at_desc" | "end_at_asc" | "end_at_desc" | "name_asc" | "name_desc" | "publish_at_asc" | "publish_at_desc" | "start_at_asc" | "start_at_desc" | "%future added value";
export type ArtistShowsQueryVariables = {
    readonly first?: number | null;
    readonly last?: number | null;
    readonly after?: string | null;
    readonly before?: string | null;
    readonly artistID: string;
    readonly sort?: PartnerShowSorts | null;
    readonly status: string;
};
export type ArtistShowsQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": ArtistShows_artist$ref;
    } | null;
};
export type ArtistShowsQuery = {
    readonly response: ArtistShowsQueryResponse;
    readonly variables: ArtistShowsQueryVariables;
};



/*
query ArtistShowsQuery(
  $first: Int
  $last: Int
  $after: String
  $before: String
  $artistID: String!
  $sort: PartnerShowSorts
  $status: String!
) {
  artist(id: $artistID) {
    ...ArtistShows_artist_1Q1mII
    id
  }
}

fragment ArtistShows_artist_1Q1mII on Artist {
  id
  showsConnection(first: $first, after: $after, before: $before, last: $last, sort: $sort, status: $status) {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        partner {
          __typename
          ... on ExternalPartner {
            name
            id
          }
          ... on Partner {
            name
          }
        }
        name
        href
        exhibition_period
        cover_image {
          cropped(width: 800, height: 600) {
            url
          }
          id
        }
        city
        id
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
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "PartnerShowSorts",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "status",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  },
  {
    "kind": "Variable",
    "name": "sort",
    "variableName": "sort"
  },
  {
    "kind": "Variable",
    "name": "status",
    "variableName": "status"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistShowsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistShows_artist",
            "args": (v2/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistShowsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "showsConnection",
            "storageKey": null,
            "args": (v2/*: any*/),
            "concreteType": "ShowConnection",
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
                    "selections": (v6/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v6/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v6/*: any*/)
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
                      (v4/*: any*/),
                      (v5/*: any*/)
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
                "concreteType": "ShowEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Show",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
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
                            "kind": "InlineFragment",
                            "type": "ExternalPartner",
                            "selections": [
                              (v7/*: any*/),
                              (v3/*: any*/)
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Partner",
                            "selections": [
                              (v7/*: any*/)
                            ]
                          },
                          {
                            "kind": "ClientExtension",
                            "selections": [
                              (v3/*: any*/)
                            ]
                          }
                        ]
                      },
                      (v7/*: any*/),
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
                        "name": "exhibition_period",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "cover_image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "cropped",
                            "storageKey": "cropped(height:600,width:800)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 600
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 800
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
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
                          },
                          (v3/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "city",
                        "args": null,
                        "storageKey": null
                      },
                      (v3/*: any*/)
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
    "name": "ArtistShowsQuery",
    "id": null,
    "text": "query ArtistShowsQuery(\n  $first: Int\n  $last: Int\n  $after: String\n  $before: String\n  $artistID: String!\n  $sort: PartnerShowSorts\n  $status: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistShows_artist_1Q1mII\n    id\n  }\n}\n\nfragment ArtistShows_artist_1Q1mII on Artist {\n  id\n  showsConnection(first: $first, after: $after, before: $before, last: $last, sort: $sort, status: $status) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n        }\n        name\n        href\n        exhibition_period\n        cover_image {\n          cropped(width: 800, height: 600) {\n            url\n          }\n          id\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a8ad4e3edb6e4ecac82b89a3648d18f8';
export default node;
