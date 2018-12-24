/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkContextAuction_viewer$ref } from "./ArtworkContextAuction_viewer.graphql";
export type ArtworkContextAuctionQueryVariables = {
    readonly artworkSlug: string;
    readonly excludeArtworkIDs?: ReadonlyArray<string> | null;
    readonly isClosed: boolean;
};
export type ArtworkContextAuctionQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": ArtworkContextAuction_viewer$ref;
    }) | null;
};
export type ArtworkContextAuctionQuery = {
    readonly response: ArtworkContextAuctionQueryResponse;
    readonly variables: ArtworkContextAuctionQueryVariables;
};



/*
query ArtworkContextAuctionQuery(
  $artworkSlug: String!
  $excludeArtworkIDs: [String!]
  $isClosed: Boolean!
) {
  viewer {
    ...ArtworkContextAuction_viewer_Vp8Up
  }
}

fragment ArtworkContextAuction_viewer_Vp8Up on Viewer {
  artwork(id: $artworkSlug) {
    sale {
      href
      is_closed
      __id
    }
    ...AuctionArtworkGrid_artwork_4wpKaB @skip(if: $isClosed)
    ...ArtistArtworkGrid_artwork_4wpKaB @include(if: $isClosed)
    ...RelatedWorksArtworkGrid_artwork
    __id
  }
  sales(size: 4, sort: TIMELY_AT_NAME_ASC) {
    ...AuctionCard_sale
    __id
  }
}

fragment AuctionArtworkGrid_artwork_4wpKaB on Artwork {
  sale {
    href
    artworksConnection(first: 8, exclude: $excludeArtworkIDs) {
      ...ArtworkGrid_artworks
    }
    __id
  }
  __id
}

fragment ArtistArtworkGrid_artwork_4wpKaB on Artwork {
  id
  artist {
    name
    href
    counts {
      artworks(format: "0,0", label: "work")
    }
    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC, exclude: $excludeArtworkIDs) {
      ...ArtworkGrid_artworks
    }
    __id
  }
  __id
}

fragment RelatedWorksArtworkGrid_artwork on Artwork {
  layers {
    name
    id
    __id
  }
  layer {
    name
    artworksConnection(first: 8) {
      ...ArtworkGrid_artworks
    }
    __id
  }
  __id
}

fragment AuctionCard_sale on Sale {
  cover_image {
    cropped(width: 200, height: 180) {
      url
    }
  }
  end_at
  href
  id
  is_live_open
  is_preview
  live_start_at
  name
  start_at
  is_closed
  partner {
    name
    __id
  }
  __id
}

fragment ArtworkGrid_artworks on ArtworkConnection {
  edges {
    node {
      __id
      image {
        aspect_ratio
      }
      ...GridItem_artwork
    }
  }
}

fragment GridItem_artwork on Artwork {
  _id
  image {
    placeholder
    url(version: "large")
    aspect_ratio
  }
  is_biddable
  sale {
    is_preview
    __id
  }
  is_acquireable
  is_offerable
  href
  ...Metadata_artwork
  ...Save_artwork
  __id
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
  __id
}

fragment Save_artwork on Artwork {
  __id
  id
  is_saved
  sale {
    is_closed
    __id
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
  }
  collecting_institution
  partner(shallow: true) {
    name
    href
    __id
  }
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    display_timely_at
    __id
  }
  sale_artwork {
    highest_bid {
      display
      __id: id
    }
    opening_bid {
      display
    }
    __id
  }
  __id
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
    __id
  }
  partner(shallow: true) {
    type
    __id
  }
  sale_artwork {
    highest_bid {
      display
      __id: id
    }
    opening_bid {
      display
    }
    counts {
      bidder_positions
    }
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artworkSlug",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "excludeArtworkIDs",
    "type": "[String!]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isClosed",
    "type": "Boolean!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_closed",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "first",
  "value": 8,
  "type": "Int"
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_preview",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_live_open",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v11 = [
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "date",
            "args": null,
            "storageKey": null
          },
          v3,
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
            "name": "is_biddable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              v7,
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_auction",
                "args": null,
                "storageKey": null
              },
              v8,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_open",
                "args": null,
                "storageKey": null
              },
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "display_timely_at",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_acquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_offerable",
            "args": null,
            "storageKey": null
          },
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
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
                    "value": "large",
                    "type": "[String]"
                  }
                ],
                "storageKey": "url(version:\"large\")"
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "sale_message",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "cultural_maker",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": "artists(shallow:true)",
            "args": v9,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              v3,
              v1,
              v4
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "collecting_institution",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": "partner(shallow:true)",
            "args": v9,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              v4,
              v1,
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "type",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
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
                "name": "highest_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkHighestBid",
                "plural": false,
                "selections": [
                  v10,
                  {
                    "kind": "ScalarField",
                    "alias": "__id",
                    "name": "id",
                    "args": null,
                    "storageKey": null
                  }
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
                  v10
                ]
              },
              v3,
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
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_inquireable",
            "args": null,
            "storageKey": null
          },
          v5,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_saved",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
],
v12 = {
  "kind": "Variable",
  "name": "exclude",
  "variableName": "excludeArtworkIDs",
  "type": "[String]"
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkContextAuctionQuery",
  "id": null,
  "text": "query ArtworkContextAuctionQuery(\n  $artworkSlug: String!\n  $excludeArtworkIDs: [String!]\n  $isClosed: Boolean!\n) {\n  viewer {\n    ...ArtworkContextAuction_viewer_Vp8Up\n  }\n}\n\nfragment ArtworkContextAuction_viewer_Vp8Up on Viewer {\n  artwork(id: $artworkSlug) {\n    sale {\n      href\n      is_closed\n      __id\n    }\n    ...AuctionArtworkGrid_artwork_4wpKaB @skip(if: $isClosed)\n    ...ArtistArtworkGrid_artwork_4wpKaB @include(if: $isClosed)\n    ...RelatedWorksArtworkGrid_artwork\n    __id\n  }\n  sales(size: 4, sort: TIMELY_AT_NAME_ASC) {\n    ...AuctionCard_sale\n    __id\n  }\n}\n\nfragment AuctionArtworkGrid_artwork_4wpKaB on Artwork {\n  sale {\n    href\n    artworksConnection(first: 8, exclude: $excludeArtworkIDs) {\n      ...ArtworkGrid_artworks\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtistArtworkGrid_artwork_4wpKaB on Artwork {\n  id\n  artist {\n    name\n    href\n    counts {\n      artworks(format: \"0,0\", label: \"work\")\n    }\n    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC, exclude: $excludeArtworkIDs) {\n      ...ArtworkGrid_artworks\n    }\n    __id\n  }\n  __id\n}\n\nfragment RelatedWorksArtworkGrid_artwork on Artwork {\n  layers {\n    name\n    id\n    __id\n  }\n  layer {\n    name\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n    }\n    __id\n  }\n  __id\n}\n\nfragment AuctionCard_sale on Sale {\n  cover_image {\n    cropped(width: 200, height: 180) {\n      url\n    }\n  }\n  end_at\n  href\n  id\n  is_live_open\n  is_preview\n  live_start_at\n  name\n  start_at\n  is_closed\n  partner {\n    name\n    __id\n  }\n  __id\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n  }\n  is_biddable\n  sale {\n    is_preview\n    __id\n  }\n  is_acquireable\n  is_offerable\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  id\n  is_saved\n  sale {\n    is_closed\n    __id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    display_timely_at\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkContextAuctionQuery",
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
            "name": "ArtworkContextAuction_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "artworkSlug",
                "variableName": "artworkSlug",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "excludeArtworkIDs",
                "variableName": "excludeArtworkIDs",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "isClosed",
                "variableName": "isClosed",
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
    "name": "ArtworkContextAuctionQuery",
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
            "name": "artwork",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "artworkSlug",
                "type": "String!"
              }
            ],
            "concreteType": "Artwork",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  v1,
                  v2,
                  v3
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "layers",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworkLayer",
                "plural": true,
                "selections": [
                  v4,
                  v5,
                  v3
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "layer",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworkLayer",
                "plural": false,
                "selections": [
                  v4,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworksConnection",
                    "storageKey": "artworksConnection(first:8)",
                    "args": [
                      v6
                    ],
                    "concreteType": "ArtworkConnection",
                    "plural": false,
                    "selections": v11
                  },
                  v3
                ]
              },
              v3,
              {
                "kind": "Condition",
                "passingValue": true,
                "condition": "isClosed",
                "selections": [
                  v5,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artist",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artist",
                    "plural": false,
                    "selections": [
                      v4,
                      v1,
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
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "0,0",
                                "type": "String"
                              },
                              {
                                "kind": "Literal",
                                "name": "label",
                                "value": "work",
                                "type": "String"
                              }
                            ],
                            "storageKey": "artworks(format:\"0,0\",label:\"work\")"
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artworks_connection",
                        "storageKey": null,
                        "args": [
                          v12,
                          {
                            "kind": "Literal",
                            "name": "filter",
                            "value": [
                              "IS_FOR_SALE"
                            ],
                            "type": "[ArtistArtworksFilters]"
                          },
                          v6,
                          {
                            "kind": "Literal",
                            "name": "sort",
                            "value": "PUBLISHED_AT_DESC",
                            "type": "ArtworkSorts"
                          }
                        ],
                        "concreteType": "ArtworkConnection",
                        "plural": false,
                        "selections": v11
                      },
                      v3
                    ]
                  }
                ]
              },
              {
                "kind": "Condition",
                "passingValue": false,
                "condition": "isClosed",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "sale",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Sale",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artworksConnection",
                        "storageKey": null,
                        "args": [
                          v12,
                          v6
                        ],
                        "concreteType": "ArtworkConnection",
                        "plural": false,
                        "selections": v11
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sales",
            "storageKey": "sales(size:4,sort:\"TIMELY_AT_NAME_ASC\")",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 4,
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "TIMELY_AT_NAME_ASC",
                "type": "SaleSorts"
              }
            ],
            "concreteType": "Sale",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "live_start_at",
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
                    "storageKey": "cropped(height:180,width:200)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 180,
                        "type": "Int!"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 200,
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
              v1,
              v5,
              v8,
              v7,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "end_at",
                "args": null,
                "storageKey": null
              },
              v4,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "start_at",
                "args": null,
                "storageKey": null
              },
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "partner",
                "storageKey": null,
                "args": null,
                "concreteType": "Partner",
                "plural": false,
                "selections": [
                  v4,
                  v3
                ]
              },
              v3
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
(node as any).hash = '0727656bd8cb0227a80f8c8efb018cfe';
export default node;
