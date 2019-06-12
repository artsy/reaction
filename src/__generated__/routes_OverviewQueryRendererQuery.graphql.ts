/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Overview_artist$ref } from "./Overview_artist.graphql";
export type routes_OverviewQueryRendererQueryVariables = {
    readonly artistID: string;
    readonly medium?: string | null;
    readonly major_periods?: ReadonlyArray<string | null> | null;
    readonly partner_id?: string | null;
    readonly for_sale?: boolean | null;
    readonly sort?: string | null;
    readonly at_auction?: boolean | null;
    readonly acquireable?: boolean | null;
    readonly offerable?: boolean | null;
    readonly inquireable_only?: boolean | null;
    readonly price_range?: string | null;
    readonly page?: number | null;
};
export type routes_OverviewQueryRendererQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": Overview_artist$ref;
    } | null;
};
export type routes_OverviewQueryRendererQuery = {
    readonly response: routes_OverviewQueryRendererQueryResponse;
    readonly variables: routes_OverviewQueryRendererQueryVariables;
};



/*
query routes_OverviewQueryRendererQuery(
  $artistID: String!
  $medium: String
  $major_periods: [String]
  $partner_id: ID
  $for_sale: Boolean
  $sort: String
  $at_auction: Boolean
  $acquireable: Boolean
  $offerable: Boolean
  $inquireable_only: Boolean
  $price_range: String
  $page: Int
) {
  artist(id: $artistID) {
    ...Overview_artist_2miQ2G
    id
  }
}

fragment Overview_artist_2miQ2G on Artist {
  ...ArtistBio_bio
  ...CurrentEvent_artist
  ...MarketInsights_artist
  ...SelectedCareerAchievements_artist
  ...Genes_artist
  ...ArtworkFilter_artist_2miQ2G
  id
  counts {
    partner_shows
  }
  href
  is_consignable
  biography_blurb(format: HTML, partner_bio: true) {
    text
    credit
  }
  currentEvent {
    name
  }
  related {
    genes {
      edges {
        node {
          id
        }
      }
    }
    artists(first: 1) {
      edges {
        node {
          __id
          id
        }
      }
    }
  }
  _id
  collections
  highlights {
    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
  }
}

fragment ArtistBio_bio on Artist {
  biography_blurb(format: HTML, partner_bio: true) {
    text
    credit
  }
}

fragment CurrentEvent_artist on Artist {
  currentEvent {
    event {
      __typename
    }
    image {
      resized(width: 300) {
        url
      }
      id
    }
    name
    status
    details
    partner
    href
  }
}

fragment MarketInsights_artist on Artist {
  _id
  collections
  highlights {
    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized {
          display(format: "0a")
        }
        id
      }
    }
  }
}

fragment SelectedCareerAchievements_artist on Artist {
  _id
  highlights {
    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
    label
    entities
  }
  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized {
          display(format: "0a")
        }
        organization
        sale_date(format: "YYYY")
        id
      }
    }
  }
}

fragment Genes_artist on Artist {
  related {
    genes {
      edges {
        node {
          href
          name
          id
        }
      }
    }
  }
}

fragment ArtworkFilter_artist_2miQ2G on Artist {
  id
  name
  is_followed
  counts {
    for_sale_artworks
    ecommerce_artworks
    auction_artworks
    artworks
    has_make_offer_artworks
  }
  filtered_artworks(aggregations: [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD], size: 0) {
    aggregations {
      slice
      counts {
        name
        id
      }
    }
  }
  ...ArtworkFilterRefetch_artist_2miQ2G
  ...FollowArtistButton_artist
}

fragment ArtworkFilterRefetch_artist_2miQ2G on Artist {
  __id
  grid: filtered_artworks(aggregations: [TOTAL], medium: $medium, major_periods: $major_periods, partner_id: $partner_id, for_sale: $for_sale, at_auction: $at_auction, acquireable: $acquireable, inquireable_only: $inquireable_only, offerable: $offerable, size: 0, sort: $sort, price_range: $price_range, page: $page) {
    ...ArtworkFilterArtworkGrid_filtered_artworks
  }
}

fragment FollowArtistButton_artist on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
}

fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworks {
  __id
  artworks: artworks_connection(first: 24, after: "") {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    ...ArtworkGrid_artworks
    edges {
      node {
        __id
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
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "medium",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "major_periods",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "partner_id",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "for_sale",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "at_auction",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "acquireable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "offerable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "inquireable_only",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "price_range",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "page",
    "type": "Int",
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
  "kind": "Variable",
  "name": "acquireable",
  "variableName": "acquireable"
},
v3 = {
  "kind": "Variable",
  "name": "at_auction",
  "variableName": "at_auction"
},
v4 = {
  "kind": "Variable",
  "name": "for_sale",
  "variableName": "for_sale"
},
v5 = {
  "kind": "Variable",
  "name": "inquireable_only",
  "variableName": "inquireable_only"
},
v6 = {
  "kind": "Variable",
  "name": "major_periods",
  "variableName": "major_periods"
},
v7 = {
  "kind": "Variable",
  "name": "medium",
  "variableName": "medium"
},
v8 = {
  "kind": "Variable",
  "name": "offerable",
  "variableName": "offerable"
},
v9 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v10 = {
  "kind": "Variable",
  "name": "partner_id",
  "variableName": "partner_id"
},
v11 = {
  "kind": "Variable",
  "name": "price_range",
  "variableName": "price_range"
},
v12 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v14 = [
  (v13/*: any*/)
],
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "Literal",
  "name": "size",
  "value": 0
},
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v24 = [
  (v22/*: any*/),
  (v23/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v25 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v26 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OverviewQueryRendererQuery",
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
            "name": "Overview_artist",
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OverviewQueryRendererQuery",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "biography_blurb",
            "storageKey": "biography_blurb(format:\"HTML\",partner_bio:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partner_bio",
                "value": true
              }
            ],
            "concreteType": "ArtistBlurb",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "text",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "credit",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "currentEvent",
            "storageKey": null,
            "args": null,
            "concreteType": "CurrentEvent",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "event",
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
                    "kind": "ClientExtension",
                    "selections": (v14/*: any*/)
                  }
                ]
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
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "resized",
                    "storageKey": "resized(width:300)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 300
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
                  (v13/*: any*/)
                ]
              },
              (v15/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "status",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "details",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "partner",
                "args": null,
                "storageKey": null
              },
              (v16/*: any*/)
            ]
          },
          (v17/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "collections",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "highlights",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "partners",
                "storageKey": "partners(display_on_partner_profile:true,first:10,partner_category:[\"blue-chip\",\"top-established\",\"top-emerging\"],represented_by:true)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "display_on_partner_profile",
                    "value": true
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                  },
                  {
                    "kind": "Literal",
                    "name": "partner_category",
                    "value": [
                      "blue-chip",
                      "top-established",
                      "top-emerging"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "represented_by",
                    "value": true
                  }
                ],
                "concreteType": "PartnerArtistConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PartnerArtistEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "categories",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Category",
                            "plural": true,
                            "selections": (v14/*: any*/)
                          },
                          (v13/*: any*/)
                        ]
                      },
                      (v13/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "auctionResults",
            "storageKey": "auctionResults(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")",
            "args": [
              (v18/*: any*/),
              {
                "kind": "Literal",
                "name": "recordsTrusted",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PRICE_AND_DATE_DESC"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "price_realized",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "display",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "0a"
                              }
                            ],
                            "storageKey": "display(format:\"0a\")"
                          }
                        ]
                      },
                      (v13/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "organization",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "sale_date",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "YYYY"
                          }
                        ],
                        "storageKey": "sale_date(format:\"YYYY\")"
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
            "name": "insights",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistInsight",
            "plural": true,
            "selections": [
              (v19/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "label",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "entities",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "related",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "genes",
                "storageKey": null,
                "args": null,
                "concreteType": "GeneConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Gene",
                        "plural": false,
                        "selections": [
                          (v16/*: any*/),
                          (v15/*: any*/),
                          (v13/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artists",
                "storageKey": "artists(first:1)",
                "args": [
                  (v18/*: any*/)
                ],
                "concreteType": "ArtistConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artist",
                        "plural": false,
                        "selections": [
                          (v20/*: any*/),
                          (v13/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v13/*: any*/),
          (v15/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_followed",
            "args": null,
            "storageKey": null
          },
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
                "name": "for_sale_artworks",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "ecommerce_artworks",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "auction_artworks",
                "args": null,
                "storageKey": null
              },
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
                "name": "has_make_offer_artworks",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "follows",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "partner_shows",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "filtered_artworks",
            "storageKey": "filtered_artworks(aggregations:[\"MEDIUM\",\"TOTAL\",\"GALLERY\",\"INSTITUTION\",\"MAJOR_PERIOD\"],size:0)",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "MEDIUM",
                  "TOTAL",
                  "GALLERY",
                  "INSTITUTION",
                  "MAJOR_PERIOD"
                ]
              },
              (v21/*: any*/)
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "aggregations",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "plural": true,
                    "selections": [
                      (v15/*: any*/),
                      (v13/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v20/*: any*/),
          {
            "kind": "LinkedField",
            "alias": "grid",
            "name": "filtered_artworks",
            "storageKey": null,
            "args": [
              (v2/*: any*/),
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ]
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v21/*: any*/),
              (v12/*: any*/)
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              (v20/*: any*/),
              {
                "kind": "LinkedField",
                "alias": "artworks",
                "name": "artworks_connection",
                "storageKey": "artworks_connection(after:\"\",first:24)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "after",
                    "value": ""
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 24
                  }
                ],
                "concreteType": "ArtworkConnection",
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
                        "selections": (v24/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "first",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": (v24/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "last",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": (v24/*: any*/)
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
                          (v22/*: any*/),
                          (v23/*: any*/)
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
                          (v20/*: any*/),
                          (v13/*: any*/),
                          (v16/*: any*/),
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
                              (v13/*: any*/),
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
                          (v17/*: any*/),
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
                            "name": "image_title",
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
                            "args": (v25/*: any*/),
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              (v20/*: any*/),
                              (v16/*: any*/),
                              (v15/*: any*/),
                              (v13/*: any*/)
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
                            "args": (v25/*: any*/),
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v13/*: any*/),
                              (v19/*: any*/)
                            ]
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
                              (v13/*: any*/),
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
                                  (v26/*: any*/),
                                  (v13/*: any*/)
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
                                  (v26/*: any*/)
                                ]
                              },
                              (v13/*: any*/)
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_inquireable",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_saved",
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
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v16/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_consignable",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_OverviewQueryRendererQuery",
    "id": null,
    "text": "query routes_OverviewQueryRendererQuery(\n  $artistID: String!\n  $medium: String\n  $major_periods: [String]\n  $partner_id: ID\n  $for_sale: Boolean\n  $sort: String\n  $at_auction: Boolean\n  $acquireable: Boolean\n  $offerable: Boolean\n  $inquireable_only: Boolean\n  $price_range: String\n  $page: Int\n) {\n  artist(id: $artistID) {\n    ...Overview_artist_2miQ2G\n    id\n  }\n}\n\nfragment Overview_artist_2miQ2G on Artist {\n  ...ArtistBio_bio\n  ...CurrentEvent_artist\n  ...MarketInsights_artist\n  ...SelectedCareerAchievements_artist\n  ...Genes_artist\n  ...ArtworkFilter_artist_2miQ2G\n  id\n  counts {\n    partner_shows\n  }\n  href\n  is_consignable\n  biography_blurb(format: HTML, partner_bio: true) {\n    text\n    credit\n  }\n  currentEvent {\n    name\n  }\n  related {\n    genes {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    artists(first: 1) {\n      edges {\n        node {\n          __id\n          id\n        }\n      }\n    }\n  }\n  _id\n  collections\n  highlights {\n    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biography_blurb(format: HTML, partner_bio: true) {\n    text\n    credit\n  }\n}\n\nfragment CurrentEvent_artist on Artist {\n  currentEvent {\n    event {\n      __typename\n    }\n    image {\n      resized(width: 300) {\n        url\n      }\n      id\n    }\n    name\n    status\n    details\n    partner\n    href\n  }\n}\n\nfragment MarketInsights_artist on Artist {\n  _id\n  collections\n  highlights {\n    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized {\n          display(format: \"0a\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SelectedCareerAchievements_artist on Artist {\n  _id\n  highlights {\n    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n    label\n    entities\n  }\n  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized {\n          display(format: \"0a\")\n        }\n        organization\n        sale_date(format: \"YYYY\")\n        id\n      }\n    }\n  }\n}\n\nfragment Genes_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtworkFilter_artist_2miQ2G on Artist {\n  id\n  name\n  is_followed\n  counts {\n    for_sale_artworks\n    ecommerce_artworks\n    auction_artworks\n    artworks\n    has_make_offer_artworks\n  }\n  filtered_artworks(aggregations: [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD], size: 0) {\n    aggregations {\n      slice\n      counts {\n        name\n        id\n      }\n    }\n  }\n  ...ArtworkFilterRefetch_artist_2miQ2G\n  ...FollowArtistButton_artist\n}\n\nfragment ArtworkFilterRefetch_artist_2miQ2G on Artist {\n  __id\n  grid: filtered_artworks(aggregations: [TOTAL], medium: $medium, major_periods: $major_periods, partner_id: $partner_id, for_sale: $for_sale, at_auction: $at_auction, acquireable: $acquireable, inquireable_only: $inquireable_only, offerable: $offerable, size: 0, sort: $sort, price_range: $price_range, page: $page) {\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworks {\n  __id\n  artworks: artworks_connection(first: 24, after: \"\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        __id\n        id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      id\n      href\n      image {\n        aspect_ratio\n        id\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  title\n  image_title\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n    id\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction\n    is_closed\n    id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3c80bd1af4514d8310abd4102b60326c';
export default node;
