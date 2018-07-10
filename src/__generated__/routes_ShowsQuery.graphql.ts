/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_ShowsQueryVariables = {
    readonly artistID: string;
};
export type routes_ShowsQueryResponse = {
    readonly viewer: ({}) | null;
};



/*
query routes_ShowsQuery(
  $artistID: String!
) {
  viewer {
    ...Shows_viewer
  }
}

fragment Shows_viewer on Viewer {
  artist_currentShows: artist(id: $artistID) {
    ...ArtistShows_artist_4FmGs3
    __id
  }
  artist_currentShowsPageCount: artist(id: $artistID) {
    showsConnection(first: 4, status: "running", sort: END_AT_ASC) {
      pageCursors {
        around {
          page
        }
      }
      totalCount
    }
    __id
  }
  artist_upcomingShows: artist(id: $artistID) {
    ...ArtistShows_artist_4b9uba
    __id
  }
  artist_pastShows: artist(id: $artistID) {
    ...ArtistShows_artist_21vaQg
    __id
  }
}

fragment ArtistShows_artist_4FmGs3 on Artist {
  id
  showsConnection(first: 4, sort: end_at_asc, status: "running") {
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
            __id
          }
          ... on Partner {
            name
          }
          ... on Node {
            __id
          }
        }
        name
        href
        exhibition_period
        cover_image {
          cropped(width: 800, height: 600) {
            url
          }
        }
        city
        __id
      }
    }
  }
  __id
}

fragment ArtistShows_artist_4b9uba on Artist {
  id
  showsConnection(first: 4, sort: start_at_asc, status: "upcoming") {
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
            __id
          }
          ... on Partner {
            name
          }
          ... on Node {
            __id
          }
        }
        name
        href
        exhibition_period
        cover_image {
          cropped(width: 800, height: 600) {
            url
          }
        }
        city
        __id
      }
    }
  }
  __id
}

fragment ArtistShows_artist_21vaQg on Artist {
  id
  showsConnection(first: 4, sort: end_at_desc, status: "closed") {
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
            __id
          }
          ... on Partner {
            name
          }
          ... on Node {
            __id
          }
        }
        name
        href
        exhibition_period
        cover_image {
          cropped(width: 800, height: 600) {
            url
          }
        }
        city
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
  previous {
    cursor
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 4,
  "type": "Int"
},
v4 = {
  "kind": "Literal",
  "name": "status",
  "value": "running",
  "type": "String"
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v7 = [
  v5,
  v6,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v10 = [
  v9
],
v11 = [
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
        "selections": v7
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "first",
        "storageKey": null,
        "args": null,
        "concreteType": "PageCursor",
        "plural": false,
        "selections": v7
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "last",
        "storageKey": null,
        "args": null,
        "concreteType": "PageCursor",
        "plural": false,
        "selections": v7
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
          v5
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
              v8,
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": v10
              },
              {
                "kind": "InlineFragment",
                "type": "ExternalPartner",
                "selections": v10
              }
            ]
          },
          v9,
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
                    "value": 600,
                    "type": "Int!"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 800,
                    "type": "Int!"
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
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "city",
            "args": null,
            "storageKey": null
          },
          v8
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_ShowsQuery",
  "id": null,
  "text": "query routes_ShowsQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...Shows_viewer\n  }\n}\n\nfragment Shows_viewer on Viewer {\n  artist_currentShows: artist(id: $artistID) {\n    ...ArtistShows_artist_4FmGs3\n    __id\n  }\n  artist_currentShowsPageCount: artist(id: $artistID) {\n    showsConnection(first: 4, status: \"running\", sort: END_AT_ASC) {\n      pageCursors {\n        around {\n          page\n        }\n      }\n      totalCount\n    }\n    __id\n  }\n  artist_upcomingShows: artist(id: $artistID) {\n    ...ArtistShows_artist_4b9uba\n    __id\n  }\n  artist_pastShows: artist(id: $artistID) {\n    ...ArtistShows_artist_21vaQg\n    __id\n  }\n}\n\nfragment ArtistShows_artist_4FmGs3 on Artist {\n  id\n  showsConnection(first: 4, sort: end_at_asc, status: \"running\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            __id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __id\n          }\n        }\n        name\n        href\n        exhibition_period\n        cover_image {\n          cropped(width: 800, height: 600) {\n            url\n          }\n        }\n        city\n        __id\n      }\n    }\n  }\n  __id\n}\n\nfragment ArtistShows_artist_4b9uba on Artist {\n  id\n  showsConnection(first: 4, sort: start_at_asc, status: \"upcoming\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            __id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __id\n          }\n        }\n        name\n        href\n        exhibition_period\n        cover_image {\n          cropped(width: 800, height: 600) {\n            url\n          }\n        }\n        city\n        __id\n      }\n    }\n  }\n  __id\n}\n\nfragment ArtistShows_artist_21vaQg on Artist {\n  id\n  showsConnection(first: 4, sort: end_at_desc, status: \"closed\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            __id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __id\n          }\n        }\n        name\n        href\n        exhibition_period\n        cover_image {\n          cropped(width: 800, height: 600) {\n            url\n          }\n        }\n        city\n        __id\n      }\n    }\n  }\n  __id\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ShowsQuery",
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
            "name": "Shows_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ShowsQuery",
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
            "alias": "artist_currentShows",
            "name": "artist",
            "storageKey": null,
            "args": v1,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(first:4,sort:\"end_at_asc\",status:\"running\")",
                "args": [
                  v3,
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "end_at_asc",
                    "type": "PartnerShowSorts"
                  },
                  v4
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": v11
              },
              v8
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_currentShowsPageCount",
            "name": "artist",
            "storageKey": null,
            "args": v1,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(first:4,sort:\"END_AT_ASC\",status:\"running\")",
                "args": [
                  v3,
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "END_AT_ASC",
                    "type": "PartnerShowSorts"
                  },
                  v4
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": [
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
                        "selections": [
                          v6
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "totalCount",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              v8
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_upcomingShows",
            "name": "artist",
            "storageKey": null,
            "args": v1,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(first:4,sort:\"start_at_asc\",status:\"upcoming\")",
                "args": [
                  v3,
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "start_at_asc",
                    "type": "PartnerShowSorts"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "upcoming",
                    "type": "String"
                  }
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": v11
              },
              v8
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_pastShows",
            "name": "artist",
            "storageKey": null,
            "args": v1,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(first:4,sort:\"end_at_desc\",status:\"closed\")",
                "args": [
                  v3,
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "end_at_desc",
                    "type": "PartnerShowSorts"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "closed",
                    "type": "String"
                  }
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": v11
              },
              v8
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
(node as any).hash = '3f21e3eaa135da5480e68124b3d8af07';
export default node;
