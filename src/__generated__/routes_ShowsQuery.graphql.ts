/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Shows_viewer$ref } from "./Shows_viewer.graphql";
export type routes_ShowsQueryVariables = {
    readonly artistID: string;
};
export type routes_ShowsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": Shows_viewer$ref;
    } | null;
};
export type routes_ShowsQuery = {
    readonly response: routes_ShowsQueryResponse;
    readonly variables: routes_ShowsQueryVariables;
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
    id
  }
  artist_upcomingShows: artist(id: $artistID) {
    ...ArtistShows_artist_4b9uba
    id
  }
  artist_pastShows: artist(id: $artistID) {
    ...ArtistShows_artist_21vaQg
    id
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
    "name": "artistID",
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
  "value": 4
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
},
v8 = [
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
                  (v2/*: any*/)
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
                  (v2/*: any*/)
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
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "city",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ShowsQuery",
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
            "kind": "LinkedField",
            "alias": "artist_currentShows",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(first:4,sort:\"end_at_asc\",status:\"running\")",
                "args": [
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "end_at_asc"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "running"
                  }
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v8/*: any*/)
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_upcomingShows",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(first:4,sort:\"start_at_asc\",status:\"upcoming\")",
                "args": [
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "start_at_asc"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "upcoming"
                  }
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v8/*: any*/)
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_pastShows",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(first:4,sort:\"end_at_desc\",status:\"closed\")",
                "args": [
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "end_at_desc"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "closed"
                  }
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v8/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ShowsQuery",
    "id": null,
    "text": "query routes_ShowsQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...Shows_viewer\n  }\n}\n\nfragment Shows_viewer on Viewer {\n  artist_currentShows: artist(id: $artistID) {\n    ...ArtistShows_artist_4FmGs3\n    id\n  }\n  artist_upcomingShows: artist(id: $artistID) {\n    ...ArtistShows_artist_4b9uba\n    id\n  }\n  artist_pastShows: artist(id: $artistID) {\n    ...ArtistShows_artist_21vaQg\n    id\n  }\n}\n\nfragment ArtistShows_artist_4FmGs3 on Artist {\n  id\n  showsConnection(first: 4, sort: end_at_asc, status: \"running\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n        }\n        name\n        href\n        exhibition_period\n        cover_image {\n          cropped(width: 800, height: 600) {\n            url\n          }\n          id\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShows_artist_4b9uba on Artist {\n  id\n  showsConnection(first: 4, sort: start_at_asc, status: \"upcoming\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n        }\n        name\n        href\n        exhibition_period\n        cover_image {\n          cropped(width: 800, height: 600) {\n            url\n          }\n          id\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShows_artist_21vaQg on Artist {\n  id\n  showsConnection(first: 4, sort: end_at_desc, status: \"closed\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n        }\n        name\n        href\n        exhibition_period\n        cover_image {\n          cropped(width: 800, height: 600) {\n            url\n          }\n          id\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3f21e3eaa135da5480e68124b3d8af07';
export default node;
