/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkContextAuction_artwork$ref } from "./ArtworkContextAuction_artwork.graphql";
export type ArtworkContextAuctionQueryVariables = {
    readonly artworkSlug: string;
    readonly excludeArtworkIDs?: ReadonlyArray<string> | null;
    readonly isClosed: boolean;
};
export type ArtworkContextAuctionQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkContextAuction_artwork$ref;
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
  artwork(id: $artworkSlug) {
    ...ArtworkContextAuction_artwork_JhSHv
    __id
  }
}

fragment ArtworkContextAuction_artwork_JhSHv on Artwork {
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkSlug",
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
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_closed",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "Literal",
  "name": "first",
  "value": 8,
  "type": "Int"
},
v8 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v10 = [
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
            "name": "sale_message",
            "args": null,
            "storageKey": null
          },
          v2,
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_preview",
                "args": null,
                "storageKey": null
              },
              v2,
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
              v4,
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
          v3,
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
            "name": "date",
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
            "name": "cultural_maker",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": "artists(shallow:true)",
            "args": v8,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              v2,
              v3,
              v5
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
            "args": v8,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              v5,
              v3,
              v2,
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
                  v9,
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
                  v9
                ]
              },
              v2,
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
          v6,
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
v11 = {
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
  "text": "query ArtworkContextAuctionQuery(\n  $artworkSlug: String!\n  $excludeArtworkIDs: [String!]\n  $isClosed: Boolean!\n) {\n  artwork(id: $artworkSlug) {\n    ...ArtworkContextAuction_artwork_JhSHv\n    __id\n  }\n}\n\nfragment ArtworkContextAuction_artwork_JhSHv on Artwork {\n  sale {\n    href\n    is_closed\n    __id\n  }\n  ...AuctionArtworkGrid_artwork_4wpKaB @skip(if: $isClosed)\n  ...ArtistArtworkGrid_artwork_4wpKaB @include(if: $isClosed)\n  ...RelatedWorksArtworkGrid_artwork\n  __id\n}\n\nfragment AuctionArtworkGrid_artwork_4wpKaB on Artwork {\n  sale {\n    href\n    artworksConnection(first: 8, exclude: $excludeArtworkIDs) {\n      ...ArtworkGrid_artworks\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtistArtworkGrid_artwork_4wpKaB on Artwork {\n  id\n  artist {\n    name\n    href\n    counts {\n      artworks(format: \"0,0\", label: \"work\")\n    }\n    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC, exclude: $excludeArtworkIDs) {\n      ...ArtworkGrid_artworks\n    }\n    __id\n  }\n  __id\n}\n\nfragment RelatedWorksArtworkGrid_artwork on Artwork {\n  layers {\n    name\n    id\n    __id\n  }\n  layer {\n    name\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n  }\n  is_biddable\n  sale {\n    is_preview\n    __id\n  }\n  is_acquireable\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  id\n  is_saved\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    display_timely_at\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n",
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
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkContextAuction_artwork",
            "args": [
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
          },
          v2
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
        "name": "artwork",
        "storageKey": null,
        "args": v1,
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
              v3,
              v4,
              v2
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
              v5,
              v6,
              v2
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
              v5,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(first:8)",
                "args": [
                  v7
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": v10
              },
              v2
            ]
          },
          v2,
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "isClosed",
            "selections": [
              v6,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artist",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": false,
                "selections": [
                  v5,
                  v3,
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
                      v11,
                      {
                        "kind": "Literal",
                        "name": "filter",
                        "value": [
                          "IS_FOR_SALE"
                        ],
                        "type": "[ArtistArtworksFilters]"
                      },
                      v7,
                      {
                        "kind": "Literal",
                        "name": "sort",
                        "value": "PUBLISHED_AT_DESC",
                        "type": "ArtworkSorts"
                      }
                    ],
                    "concreteType": "ArtworkConnection",
                    "plural": false,
                    "selections": v10
                  },
                  v2
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
                      v11,
                      v7
                    ],
                    "concreteType": "ArtworkConnection",
                    "plural": false,
                    "selections": v10
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '4dcfbb44d7699b57eb776f647dd66355';
export default node;
