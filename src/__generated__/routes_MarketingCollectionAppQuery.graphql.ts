/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionApp_collection$ref } from "./CollectionApp_collection.graphql";
export type routes_MarketingCollectionAppQueryVariables = {
    readonly slug: string;
    readonly medium?: string | null;
    readonly major_periods?: ReadonlyArray<string | null> | null;
    readonly for_sale?: boolean | null;
    readonly sort?: string | null;
    readonly at_auction?: boolean | null;
    readonly acquireable?: boolean | null;
    readonly offerable?: boolean | null;
    readonly inquireable_only?: boolean | null;
    readonly price_range?: string | null;
};
export type routes_MarketingCollectionAppQueryResponse = {
    readonly collection: ({
        readonly " $fragmentRefs": CollectionApp_collection$ref;
    }) | null;
};
export type routes_MarketingCollectionAppQuery = {
    readonly response: routes_MarketingCollectionAppQueryResponse;
    readonly variables: routes_MarketingCollectionAppQueryVariables;
};



/*
query routes_MarketingCollectionAppQuery(
  $slug: String!
  $medium: String
  $major_periods: [String]
  $for_sale: Boolean
  $sort: String
  $at_auction: Boolean
  $acquireable: Boolean
  $inquireable_only: Boolean
  $price_range: String
) {
  collection: marketingCollection(slug: $slug) {
    ...CollectionApp_collection_2MAp2l
    __id: id
  }
}

fragment CollectionApp_collection_2MAp2l on MarketingCollection {
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
    __id: id
  }
  artworks(aggregations: [MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {
    ...SeoProductsForArtworks_artworks
    __id
  }
  ...CollectionFilterContainer_collection_36eVHW
  __id: id
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
          __id
        }
        image {
          url(version: "larger")
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
            }
            __id
          }
          locations(size: 1) {
            address
            address_2
            city
            state
            country
            postal_code
            phone
            __id
          }
          __id
        }
      }
    }
  }
  __id
}

fragment CollectionFilterContainer_collection_36eVHW on MarketingCollection {
  artworks(aggregations: [MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {
    aggregations {
      slice
      counts {
        id
        name
        count
        __id
      }
    }
    __id
  }
  ...CollectionRefetch_collection_4y2oRj
  __id: id
}

fragment CollectionRefetch_collection_4y2oRj on MarketingCollection {
  slug
  filtered_artworks: artworks(aggregations: [TOTAL], medium: $medium, major_periods: $major_periods, for_sale: $for_sale, at_auction: $at_auction, acquireable: $acquireable, inquireable_only: $inquireable_only, size: 0, sort: $sort, price_range: $price_range) {
    ...CollectArtworkGrid_filtered_artworks
    __id
  }
  __id: id
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
  _id
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
    "name": "slug",
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
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "category",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": "",
    "type": "String"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 30,
    "type": "Int"
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
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v13 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "larger",
        "type": "[String]"
      }
    ],
    "storageKey": "url(version:\"larger\")"
  }
],
v14 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v18 = [
  v16,
  v17,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_MarketingCollectionAppQuery",
  "id": null,
  "text": "query routes_MarketingCollectionAppQuery(\n  $slug: String!\n  $medium: String\n  $major_periods: [String]\n  $for_sale: Boolean\n  $sort: String\n  $at_auction: Boolean\n  $acquireable: Boolean\n  $inquireable_only: Boolean\n  $price_range: String\n) {\n  collection: marketingCollection(slug: $slug) {\n    ...CollectionApp_collection_2MAp2l\n    __id: id\n  }\n}\n\nfragment CollectionApp_collection_2MAp2l on MarketingCollection {\n  id\n  slug\n  title\n  description\n  headerImage\n  category\n  credit\n  query {\n    artist_ids\n    artist_id\n    gene_id\n    __id: id\n  }\n  artworks(aggregations: [MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {\n    ...SeoProductsForArtworks_artworks\n    __id\n  }\n  ...CollectionFilterContainer_collection_36eVHW\n  __id: id\n}\n\nfragment SeoProductsForArtworks_artworks on FilterArtworks {\n  artworks_connection(first: 30, after: \"\") {\n    edges {\n      node {\n        __id\n        availability\n        category\n        date\n        href\n        is_acquireable\n        is_price_range\n        price\n        price_currency\n        title\n        artists {\n          name\n          __id\n        }\n        image {\n          url(version: \"larger\")\n        }\n        meta {\n          description\n        }\n        partner(shallow: true) {\n          name\n          type\n          profile {\n            icon {\n              url(version: \"larger\")\n            }\n            __id\n          }\n          locations(size: 1) {\n            address\n            address_2\n            city\n            state\n            country\n            postal_code\n            phone\n            __id\n          }\n          __id\n        }\n      }\n    }\n  }\n  __id\n}\n\nfragment CollectionFilterContainer_collection_36eVHW on MarketingCollection {\n  artworks(aggregations: [MEDIUM, MAJOR_PERIOD, TOTAL], include_medium_filter_in_aggregation: true) {\n    aggregations {\n      slice\n      counts {\n        id\n        name\n        count\n        __id\n      }\n    }\n    __id\n  }\n  ...CollectionRefetch_collection_4y2oRj\n  __id: id\n}\n\nfragment CollectionRefetch_collection_4y2oRj on MarketingCollection {\n  slug\n  filtered_artworks: artworks(aggregations: [TOTAL], medium: $medium, major_periods: $major_periods, for_sale: $for_sale, at_auction: $at_auction, acquireable: $acquireable, inquireable_only: $inquireable_only, size: 0, sort: $sort, price_range: $price_range) {\n    ...CollectArtworkGrid_filtered_artworks\n    __id\n  }\n  __id: id\n}\n\nfragment CollectArtworkGrid_filtered_artworks on FilterArtworks {\n  __id\n  artworks: artworks_connection(first: 30, after: \"\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        __id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n  }\n  is_biddable\n  sale {\n    is_preview\n    __id\n  }\n  is_acquireable\n  is_offerable\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    display_timely_at\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_MarketingCollectionAppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collection",
        "name": "marketingCollection",
        "storageKey": null,
        "args": v1,
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionApp_collection",
            "args": [
              {
                "kind": "Variable",
                "name": "acquireable",
                "variableName": "acquireable",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "at_auction",
                "variableName": "at_auction",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "for_sale",
                "variableName": "for_sale",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "inquireable_only",
                "variableName": "inquireable_only",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "major_periods",
                "variableName": "major_periods",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "medium",
                "variableName": "medium",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "offerable",
                "variableName": "offerable",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "price_range",
                "variableName": "price_range",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "sort",
                "variableName": "sort",
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
    "name": "routes_MarketingCollectionAppQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collection",
        "name": "marketingCollection",
        "storageKey": null,
        "args": v1,
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          v3,
          v4,
          v5,
          v6,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "headerImage",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
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
              v2
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artworks",
            "storageKey": "artworks(aggregations:[\"MEDIUM\",\"MAJOR_PERIOD\",\"TOTAL\"],include_medium_filter_in_aggregation:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "MEDIUM",
                  "MAJOR_PERIOD",
                  "TOTAL"
                ],
                "type": "[ArtworkAggregation]"
              },
              {
                "kind": "Literal",
                "name": "include_medium_filter_in_aggregation",
                "value": true,
                "type": "Boolean"
              }
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworks_connection",
                "storageKey": "artworks_connection(after:\"\",first:30)",
                "args": v7,
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
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "price",
                            "args": null,
                            "storageKey": null
                          },
                          v8,
                          v3,
                          v9,
                          v10,
                          v11,
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
                            "name": "availability",
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
                          v5,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              v12,
                              v8
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
                            "selections": v13
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
                              v6
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "partner",
                            "storageKey": "partner(shallow:true)",
                            "args": v14,
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              v12,
                              v15,
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
                                    "selections": v13
                                  },
                                  v8
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
                                    "value": 1,
                                    "type": "Int"
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
                                  v8
                                ]
                              },
                              v8
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              v8,
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
                      v4,
                      v12,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "count",
                        "args": null,
                        "storageKey": null
                      },
                      v8
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
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "acquireable",
                "variableName": "acquireable",
                "type": "Boolean"
              },
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ],
                "type": "[ArtworkAggregation]"
              },
              {
                "kind": "Variable",
                "name": "at_auction",
                "variableName": "at_auction",
                "type": "Boolean"
              },
              {
                "kind": "Variable",
                "name": "for_sale",
                "variableName": "for_sale",
                "type": "Boolean"
              },
              {
                "kind": "Variable",
                "name": "inquireable_only",
                "variableName": "inquireable_only",
                "type": "Boolean"
              },
              {
                "kind": "Variable",
                "name": "major_periods",
                "variableName": "major_periods",
                "type": "[String]"
              },
              {
                "kind": "Variable",
                "name": "medium",
                "variableName": "medium",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "price_range",
                "variableName": "price_range",
                "type": "String"
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 0,
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "sort",
                "variableName": "sort",
                "type": "String"
              }
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              v8,
              {
                "kind": "LinkedField",
                "alias": "artworks",
                "name": "artworks_connection",
                "storageKey": "artworks_connection(after:\"\",first:30)",
                "args": v7,
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
                        "selections": v18
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "first",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": v18
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "last",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": v18
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
                          v16,
                          v17
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
                          v9,
                          v8,
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
                              v8,
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
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_closed",
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
                          v11,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_offerable",
                            "args": null,
                            "storageKey": null
                          },
                          v10,
                          v5,
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
                            "args": v14,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              v8,
                              v10,
                              v12
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
                            "args": v14,
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              v12,
                              v10,
                              v8,
                              v15
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
                                  v19,
                                  v2
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
                                  v19
                                ]
                              },
                              v8,
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
                          v4,
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
(node as any).hash = '06d61fff67b2877d0262e412adec175a';
export default node;
