/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { WorksForYouArtistFeed_viewer$ref } from "./WorksForYouArtistFeed_viewer.graphql";
import { WorksForYouFeed_viewer$ref } from "./WorksForYouFeed_viewer.graphql";
export type ArtistArtworksFilters = "IS_FOR_SALE" | "IS_NOT_FOR_SALE" | "%future added value";
export type WorksForYouQueryVariables = {
    readonly includeSelectedArtist: boolean;
    readonly artistID: string;
    readonly forSale?: boolean | null;
    readonly filter?: ReadonlyArray<ArtistArtworksFilters | null> | null;
};
export type WorksForYouQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": WorksForYouFeed_viewer$ref & WorksForYouArtistFeed_viewer$ref;
    } | null;
};
export type WorksForYouQuery = {
    readonly response: WorksForYouQueryResponse;
    readonly variables: WorksForYouQueryVariables;
};



/*
query WorksForYouQuery(
  $includeSelectedArtist: Boolean!
  $artistID: String!
  $forSale: Boolean
  $filter: [ArtistArtworksFilters]
) {
  viewer {
    ...WorksForYouFeed_viewer_4jSCc2 @skip(if: $includeSelectedArtist)
    ...WorksForYouArtistFeed_viewer_45bsh6 @include(if: $includeSelectedArtist)
  }
}

fragment WorksForYouFeed_viewer_4jSCc2 on Viewer {
  me {
    followsAndSaves {
      notifications: bundledArtworksByArtist(sort: PUBLISHED_AT_DESC, first: 10, for_sale: $forSale) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            __id
            href
            summary
            artists
            published_at(format: "MMM DD")
            artworksConnection {
              ...ArtworkGrid_artworks
            }
            image {
              resized(height: 80, width: 80) {
                url
              }
              id
            }
            __typename
          }
          cursor
        }
      }
    }
    id
  }
}

fragment WorksForYouArtistFeed_viewer_45bsh6 on Viewer {
  artist(id: $artistID) {
    name
    href
    counts {
      artworks
      for_sale_artworks
    }
    image {
      resized(height: 80, width: 80) {
        url
      }
      id
    }
    artworks_connection(sort: PUBLISHED_AT_DESC, first: 10, filter: $filter) {
      pageInfo {
        hasNextPage
        endCursor
      }
      ...ArtworkGrid_artworks
      edges {
        node {
          __id
          id
          __typename
        }
        cursor
      }
    }
    id
  }
}

fragment ArtworkGrid_artworks on ArtworkConnection {
  edges {
    node {
      __id
      id
      href
      image {
        aspect_ratio
        id
      }
      ...GridItem_artwork
    }
  }
}

fragment GridItem_artwork on Artwork {
  _id
  title
  image_title
  image {
    placeholder
    url(version: "large")
    aspect_ratio
    id
  }
  href
  ...Metadata_artwork
  ...Save_artwork
  ...Badge_artwork
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment Save_artwork on Artwork {
  __id
  _id
  id
  is_saved
  title
}

fragment Badge_artwork on Artwork {
  is_biddable
  is_acquireable
  is_offerable
  href
  sale {
    is_preview
    display_timely_at
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message
  cultural_maker
  artists(shallow: true) {
    __id
    href
    name
    id
  }
  collecting_institution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    is_auction
    is_closed
    id
  }
  sale_artwork {
    counts {
      bidder_positions
    }
    highest_bid {
      display
      id
    }
    opening_bid {
      display
    }
    id
  }
}

fragment Contact_artwork on Artwork {
  _id
  href
  is_inquireable
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork {
    highest_bid {
      display
      id
    }
    opening_bid {
      display
    }
    counts {
      bidder_positions
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "includeSelectedArtist",
    "type": "Boolean!",
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
    "name": "forSale",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "filter",
    "type": "[ArtistArtworksFilters]",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "for_sale",
  "variableName": "forSale"
},
v2 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v4 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v5 = [
  (v3/*: any*/),
  (v1/*: any*/),
  (v4/*: any*/)
],
v6 = {
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
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "image",
  "storageKey": null,
  "args": null,
  "concreteType": "Image",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "aspect_ratio",
      "args": null,
      "storageKey": null
    },
    (v9/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "placeholder",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "url",
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": "large"
        }
      ],
      "storageKey": "url(version:\"large\")"
    }
  ]
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "image_title",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sale_message",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cultural_maker",
  "args": null,
  "storageKey": null
},
v17 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artists",
  "storageKey": "artists(shallow:true)",
  "args": (v17/*: any*/),
  "concreteType": "Artist",
  "plural": true,
  "selections": [
    (v7/*: any*/),
    (v8/*: any*/),
    (v18/*: any*/),
    (v9/*: any*/)
  ]
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "collecting_institution",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "partner",
  "storageKey": "partner(shallow:true)",
  "args": (v17/*: any*/),
  "concreteType": "Partner",
  "plural": false,
  "selections": [
    (v18/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "type",
      "args": null,
      "storageKey": null
    }
  ]
},
v22 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "sale",
  "storageKey": null,
  "args": null,
  "concreteType": "Sale",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_auction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_closed",
      "args": null,
      "storageKey": null
    },
    (v9/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_live_open",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_open",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_preview",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "display_timely_at",
      "args": null,
      "storageKey": null
    }
  ]
},
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v24 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "sale_artwork",
  "storageKey": null,
  "args": null,
  "concreteType": "SaleArtwork",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "bidder_positions",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "highest_bid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkHighestBid",
      "plural": false,
      "selections": [
        (v23/*: any*/),
        (v9/*: any*/)
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "opening_bid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "plural": false,
      "selections": [
        (v23/*: any*/)
      ]
    },
    (v9/*: any*/)
  ]
},
v25 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_inquireable",
  "args": null,
  "storageKey": null
},
v26 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_saved",
  "args": null,
  "storageKey": null
},
v27 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_biddable",
  "args": null,
  "storageKey": null
},
v28 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_acquireable",
  "args": null,
  "storageKey": null
},
v29 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_offerable",
  "args": null,
  "storageKey": null
},
v30 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "image",
  "storageKey": null,
  "args": null,
  "concreteType": "Image",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "resized",
      "storageKey": "resized(height:80,width:80)",
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 80
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 80
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
    },
    (v9/*: any*/)
  ]
},
v31 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v32 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v33 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "WorksForYouQuery",
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
            "kind": "Condition",
            "passingValue": false,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "WorksForYouFeed_viewer",
                "args": [
                  (v1/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "WorksForYouArtistFeed_viewer",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "artistID",
                    "variableName": "artistID"
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "WorksForYouQuery",
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
            "passingValue": false,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "me",
                "storageKey": null,
                "args": null,
                "concreteType": "Me",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "followsAndSaves",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FollowsAndSaves",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": "notifications",
                        "name": "bundledArtworksByArtist",
                        "storageKey": null,
                        "args": (v5/*: any*/),
                        "concreteType": "FollowedArtistsArtworksGroupConnection",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroupEdge",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "node",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "FollowedArtistsArtworksGroup",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "summary",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "artists",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "published_at",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "format",
                                        "value": "MMM DD"
                                      }
                                    ],
                                    "storageKey": "published_at(format:\"MMM DD\")"
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "artworksConnection",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "ArtworkConnection",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "name": "edges",
                                        "storageKey": null,
                                        "args": null,
                                        "concreteType": "ArtworkEdge",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "kind": "LinkedField",
                                            "alias": null,
                                            "name": "node",
                                            "storageKey": null,
                                            "args": null,
                                            "concreteType": "Artwork",
                                            "plural": false,
                                            "selections": [
                                              (v7/*: any*/),
                                              (v9/*: any*/),
                                              (v8/*: any*/),
                                              (v10/*: any*/),
                                              (v11/*: any*/),
                                              (v12/*: any*/),
                                              (v13/*: any*/),
                                              (v14/*: any*/),
                                              (v15/*: any*/),
                                              (v16/*: any*/),
                                              (v19/*: any*/),
                                              (v20/*: any*/),
                                              (v21/*: any*/),
                                              (v22/*: any*/),
                                              (v24/*: any*/),
                                              (v25/*: any*/),
                                              (v26/*: any*/),
                                              (v27/*: any*/),
                                              (v28/*: any*/),
                                              (v29/*: any*/)
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  (v30/*: any*/),
                                  (v31/*: any*/)
                                ]
                              },
                              (v32/*: any*/)
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "LinkedHandle",
                        "alias": "notifications",
                        "name": "bundledArtworksByArtist",
                        "args": (v5/*: any*/),
                        "handle": "connection",
                        "key": "WorksForYou_notifications",
                        "filters": [
                          "sort",
                          "for_sale"
                        ]
                      }
                    ]
                  },
                  (v9/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artist",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "artistID"
                  }
                ],
                "concreteType": "Artist",
                "plural": false,
                "selections": [
                  (v18/*: any*/),
                  (v8/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtistCounts",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "artworks",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "for_sale_artworks",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  (v30/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworks_connection",
                    "storageKey": null,
                    "args": (v33/*: any*/),
                    "concreteType": "ArtworkConnection",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v9/*: any*/),
                              (v8/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v24/*: any*/),
                              (v25/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/),
                              (v28/*: any*/),
                              (v29/*: any*/),
                              (v31/*: any*/)
                            ]
                          },
                          (v32/*: any*/)
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "artworks_connection",
                    "args": (v33/*: any*/),
                    "handle": "connection",
                    "key": "WorksForYouArtistFeed_artworks_connection",
                    "filters": [
                      "sort",
                      "filter"
                    ]
                  },
                  (v9/*: any*/)
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
    "name": "WorksForYouQuery",
    "id": null,
    "text": "query WorksForYouQuery(\n  $includeSelectedArtist: Boolean!\n  $artistID: String!\n  $forSale: Boolean\n  $filter: [ArtistArtworksFilters]\n) {\n  viewer {\n    ...WorksForYouFeed_viewer_4jSCc2 @skip(if: $includeSelectedArtist)\n    ...WorksForYouArtistFeed_viewer_45bsh6 @include(if: $includeSelectedArtist)\n  }\n}\n\nfragment WorksForYouFeed_viewer_4jSCc2 on Viewer {\n  me {\n    followsAndSaves {\n      notifications: bundledArtworksByArtist(sort: PUBLISHED_AT_DESC, first: 10, for_sale: $forSale) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            __id\n            href\n            summary\n            artists\n            published_at(format: \"MMM DD\")\n            artworksConnection {\n              ...ArtworkGrid_artworks\n            }\n            image {\n              resized(height: 80, width: 80) {\n                url\n              }\n              id\n            }\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouArtistFeed_viewer_45bsh6 on Viewer {\n  artist(id: $artistID) {\n    name\n    href\n    counts {\n      artworks\n      for_sale_artworks\n    }\n    image {\n      resized(height: 80, width: 80) {\n        url\n      }\n      id\n    }\n    artworks_connection(sort: PUBLISHED_AT_DESC, first: 10, filter: $filter) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          __id\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n    id\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      id\n      href\n      image {\n        aspect_ratio\n        id\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  title\n  image_title\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n    id\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction\n    is_closed\n    id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7eddd92206ae2b3242a4e9c8dee45389';
export default node;
