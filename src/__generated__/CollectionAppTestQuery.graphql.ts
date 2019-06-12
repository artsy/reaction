/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionApp_collection$ref } from "./CollectionApp_collection.graphql";
export type CollectionAppTestQueryVariables = {};
export type CollectionAppTestQueryResponse = {
    readonly collection: {
        readonly " $fragmentRefs": CollectionApp_collection$ref;
    } | null;
};
export type CollectionAppTestQuery = {
    readonly response: CollectionAppTestQueryResponse;
    readonly variables: CollectionAppTestQueryVariables;
};



/*
query CollectionAppTestQuery {
  collection: marketingCollection(slug: "kaws-companions") {
    ...CollectionApp_collection
    id
  }
}

fragment CollectionApp_collection on MarketingCollection {
  id
  slug
  title
  description
  headerImage
  category
  credit
  query {
    artist_ids
    artist_id
    gene_id
    id
  }
  artworks(aggregations: [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {
    ...Header_artworks
    ...SeoProductsForArtworks_artworks
  }
  ...CollectionFilterContainer_collection_33e20w
}

fragment Header_artworks on FilterArtworks {
  merchandisable_artists {
    id
    _id
    name
    imageUrl
    birthday
    nationality
    ...FollowArtistButton_artist
  }
}

fragment SeoProductsForArtworks_artworks on FilterArtworks {
  artworks_connection(first: 30, after: "") {
    edges {
      node {
        __id
        availability
        category
        date
        href
        is_acquireable
        is_price_range
        price
        price_currency
        title
        artists {
          name
          id
        }
        image {
          url(version: "larger")
          id
        }
        meta {
          description
        }
        partner(shallow: true) {
          name
          type
          profile {
            icon {
              url(version: "larger")
              id
            }
            id
          }
          locations(size: 1) {
            address
            address_2
            city
            state
            country
            postal_code
            phone
            id
          }
          id
        }
        id
      }
    }
  }
}

fragment CollectionFilterContainer_collection_33e20w on MarketingCollection {
  artworks(aggregations: [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {
    aggregations {
      slice
      counts {
        id
        name
        count
      }
    }
  }
  ...CollectionRefetch_collection_33e20w
}

fragment CollectionRefetch_collection_33e20w on MarketingCollection {
  slug
  filtered_artworks: artworks(aggregations: [TOTAL], medium: "*", size: 0, sort: "-partner_updated_at") {
    ...CollectArtworkGrid_filtered_artworks
  }
}

fragment CollectArtworkGrid_filtered_artworks on FilterArtworks {
  __id
  artworks: artworks_connection(first: 30, after: "") {
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

fragment FollowArtistButton_artist on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "slug",
    "value": "kaws-companions"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "category",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  }
],
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_acquireable",
  "args": null,
  "storageKey": null
},
v12 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "larger"
      }
    ],
    "storageKey": "url(version:\"larger\")"
  },
  (v1/*: any*/)
],
v13 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v17 = [
  (v15/*: any*/),
  (v16/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v18 = {
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
    "name": "CollectionAppTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collection",
        "name": "marketingCollection",
        "storageKey": "marketingCollection(slug:\"kaws-companions\")",
        "args": (v0/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionApp_collection",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionAppTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collection",
        "name": "marketingCollection",
        "storageKey": "marketingCollection(slug:\"kaws-companions\")",
        "args": (v0/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "headerImage",
            "args": null,
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "credit",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "query",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollectionQuery",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "artist_ids",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "artist_id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "gene_id",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artworks",
            "storageKey": "artworks(aggregations:[\"MERCHANDISABLE_ARTISTS\",\"MEDIUM\",\"MAJOR_PERIOD\",\"TOTAL\"],include_medium_filter_in_aggregation:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "MERCHANDISABLE_ARTISTS",
                  "MEDIUM",
                  "MAJOR_PERIOD",
                  "TOTAL"
                ]
              },
              {
                "kind": "Literal",
                "name": "include_medium_filter_in_aggregation",
                "value": true
              }
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "merchandisable_artists",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
                    "name": "birthday",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "nationality",
                    "args": null,
                    "storageKey": null
                  },
                  (v7/*: any*/),
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
                        "name": "follows",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworks_connection",
                "storageKey": "artworks_connection(after:\"\",first:30)",
                "args": (v8/*: any*/),
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
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "availability",
                            "args": null,
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_price_range",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "price",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "price_currency",
                            "args": null,
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              (v6/*: any*/),
                              (v1/*: any*/)
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
                            "selections": (v12/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "meta",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "ArtworkMeta",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/)
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "partner",
                            "storageKey": "partner(shallow:true)",
                            "args": (v13/*: any*/),
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              (v14/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "profile",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Profile",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "icon",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "plural": false,
                                    "selections": (v12/*: any*/)
                                  },
                                  (v1/*: any*/)
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "locations",
                                "storageKey": "locations(size:1)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "size",
                                    "value": 1
                                  }
                                ],
                                "concreteType": "Location",
                                "plural": true,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "address",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "address_2",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "city",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "state",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "country",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "postal_code",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "phone",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  (v1/*: any*/)
                                ]
                              },
                              (v1/*: any*/)
                            ]
                          },
                          (v1/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
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
                      (v1/*: any*/),
                      (v6/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "count",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "filtered_artworks",
            "name": "artworks",
            "storageKey": "artworks(aggregations:[\"TOTAL\"],medium:\"*\",size:0,sort:\"-partner_updated_at\")",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ]
              },
              {
                "kind": "Literal",
                "name": "medium",
                "value": "*"
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 0
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-partner_updated_at"
              }
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": "artworks",
                "name": "artworks_connection",
                "storageKey": "artworks_connection(after:\"\",first:30)",
                "args": (v8/*: any*/),
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
                        "selections": (v17/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "first",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": (v17/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "last",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": (v17/*: any*/)
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
                          (v15/*: any*/),
                          (v16/*: any*/)
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
                          (v7/*: any*/),
                          (v1/*: any*/),
                          (v10/*: any*/),
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
                              (v1/*: any*/),
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
                          (v5/*: any*/),
                          (v2/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "image_title",
                            "args": null,
                            "storageKey": null
                          },
                          (v9/*: any*/),
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
                            "args": (v13/*: any*/),
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              (v7/*: any*/),
                              (v10/*: any*/),
                              (v6/*: any*/),
                              (v1/*: any*/)
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
                            "args": (v13/*: any*/),
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              (v10/*: any*/),
                              (v1/*: any*/),
                              (v14/*: any*/)
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
                              (v1/*: any*/),
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
                                  (v18/*: any*/),
                                  (v1/*: any*/)
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
                                  (v18/*: any*/)
                                ]
                              },
                              (v1/*: any*/)
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
                          (v11/*: any*/),
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
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionAppTestQuery",
    "id": null,
    "text": "query CollectionAppTestQuery {\n  collection: marketingCollection(slug: \"kaws-companions\") {\n    ...CollectionApp_collection\n    id\n  }\n}\n\nfragment CollectionApp_collection on MarketingCollection {\n  id\n  slug\n  title\n  description\n  headerImage\n  category\n  credit\n  query {\n    artist_ids\n    artist_id\n    gene_id\n    id\n  }\n  artworks(aggregations: [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {\n    ...Header_artworks\n    ...SeoProductsForArtworks_artworks\n  }\n  ...CollectionFilterContainer_collection_33e20w\n}\n\nfragment Header_artworks on FilterArtworks {\n  merchandisable_artists {\n    id\n    _id\n    name\n    imageUrl\n    birthday\n    nationality\n    ...FollowArtistButton_artist\n  }\n}\n\nfragment SeoProductsForArtworks_artworks on FilterArtworks {\n  artworks_connection(first: 30, after: \"\") {\n    edges {\n      node {\n        __id\n        availability\n        category\n        date\n        href\n        is_acquireable\n        is_price_range\n        price\n        price_currency\n        title\n        artists {\n          name\n          id\n        }\n        image {\n          url(version: \"larger\")\n          id\n        }\n        meta {\n          description\n        }\n        partner(shallow: true) {\n          name\n          type\n          profile {\n            icon {\n              url(version: \"larger\")\n              id\n            }\n            id\n          }\n          locations(size: 1) {\n            address\n            address_2\n            city\n            state\n            country\n            postal_code\n            phone\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CollectionFilterContainer_collection_33e20w on MarketingCollection {\n  artworks(aggregations: [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {\n    aggregations {\n      slice\n      counts {\n        id\n        name\n        count\n      }\n    }\n  }\n  ...CollectionRefetch_collection_33e20w\n}\n\nfragment CollectionRefetch_collection_33e20w on MarketingCollection {\n  slug\n  filtered_artworks: artworks(aggregations: [TOTAL], medium: \"*\", size: 0, sort: \"-partner_updated_at\") {\n    ...CollectArtworkGrid_filtered_artworks\n  }\n}\n\nfragment CollectArtworkGrid_filtered_artworks on FilterArtworks {\n  __id\n  artworks: artworks_connection(first: 30, after: \"\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        __id\n        id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      id\n      href\n      image {\n        aspect_ratio\n        id\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  title\n  image_title\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n    id\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction\n    is_closed\n    id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '9e30bf9733a890c0eb1a29ad6ee3f9e0';
export default node;
