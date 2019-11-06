/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type CollectionRefetch2QueryVariables = {
    acquireable?: boolean | null;
    aggregations?: ReadonlyArray<ArtworkAggregation | null> | null;
    atAuction?: boolean | null;
    color?: string | null;
    forSale?: boolean | null;
    height?: string | null;
    inquireableOnly?: boolean | null;
    majorPeriods?: ReadonlyArray<string | null> | null;
    medium?: string | null;
    offerable?: boolean | null;
    page?: number | null;
    priceRange?: string | null;
    sort?: string | null;
    slug: string;
    width?: string | null;
};
export type CollectionRefetch2QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"Collection_viewer">;
    } | null;
};
export type CollectionRefetch2Query = {
    readonly response: CollectionRefetch2QueryResponse;
    readonly variables: CollectionRefetch2QueryVariables;
};



/*
query CollectionRefetch2Query(
  $acquireable: Boolean
  $aggregations: [ArtworkAggregation] = [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]
  $atAuction: Boolean
  $color: String
  $forSale: Boolean
  $height: String
  $inquireableOnly: Boolean
  $majorPeriods: [String]
  $medium: String
  $offerable: Boolean
  $page: Int
  $priceRange: String
  $sort: String
  $slug: String!
  $width: String
) {
  viewer: marketingCollection(slug: $slug) {
    ...Collection_viewer_3bvDhp
  }
}

fragment Collection_viewer_3bvDhp on MarketingCollection {
  category
  credit
  description
  headerImage
  slug
  title
  featuredArtistExclusionIds
  query {
    artist_ids: artistIDs
    artist_id: artistID
    gene_id: geneID
  }
  relatedCollections {
    ...RelatedCollectionsRail_collections
  }
  linkedCollections {
    ...CollectionsHubRails_linkedCollections
  }
  artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, size: 20, sort: "-decayed_merch") {
    ...Header_artworks
    ...SeoProductsForArtworks_artworks
    aggregations {
      slice
      counts {
        value
        name
        count
      }
    }
    id
  }
  filtered_artworks: artworksConnection(acquireable: $acquireable, aggregations: $aggregations, atAuction: $atAuction, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, priceRange: $priceRange, size: 0, sort: $sort, width: $width) {
    id
    ...ArtworkFilterArtworkGrid2_filtered_artworks
  }
}

fragment RelatedCollectionsRail_collections on MarketingCollection {
  ...RelatedCollectionEntity_collection
}

fragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {
  groupType
  ...FeaturedCollectionsRails_collectionGroup
  ...OtherCollectionsRail_collectionGroup
  ...ArtistSeriesRail_collectionGroup
}

fragment Header_artworks on FilterArtworksConnection {
  ...DefaultHeader_headerArtworks
  merchandisable_artists: merchandisableArtists {
    slug
    internalID
    name
    imageUrl
    birthday
    nationality
    ...FollowArtistButton_artist
    id
  }
}

fragment SeoProductsForArtworks_artworks on FilterArtworksConnection {
  edges {
    node {
      id
      availability
      category
      date
      href
      is_acquireable: isAcquireable
      is_price_range: isPriceRange
      listPrice {
        __typename
        ... on PriceRange {
          display
        }
        ... on Money {
          display
        }
      }
      price_currency: priceCurrency
      title
      artists(shallow: true) {
        name
        id
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
          id
        }
        locations(size: 1) {
          address
          address_2: address2
          city
          state
          country
          postal_code: postalCode
          phone
          id
        }
        id
      }
    }
  }
}

fragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworksConnection {
  id
  aggregations {
    slice
    counts {
      value
      name
      count
    }
  }
  pageInfo {
    hasNextPage
    endCursor
  }
  pageCursors {
    ...Pagination_pageCursors
  }
  edges {
    node {
      id
    }
  }
  ...ArtworkGrid_artworks
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

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  edges {
    __typename
    node {
      id
      slug
      href
      image {
        aspect_ratio: aspectRatio
      }
      ...GridItem_artwork
    }
    ... on Node {
      id
    }
  }
}

fragment GridItem_artwork on Artwork {
  internalID
  title
  image_title: imageTitle
  image {
    placeholder
    url(version: "large")
    aspect_ratio: aspectRatio
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
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  is_acquireable: isAcquireable
  is_offerable: isOfferable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
}

fragment Contact_artwork on Artwork {
  href
  is_inquireable: isInquireable
  sale {
    is_auction: isAuction
    is_live_open: isLiveOpen
    is_open: isOpen
    is_closed: isClosed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork: saleArtwork {
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
}

fragment DefaultHeader_headerArtworks on FilterArtworksConnection {
  edges {
    node {
      href
      slug
      image {
        small: resized(height: 160) {
          url
          width
          height
        }
        large: resized(height: 220) {
          url
          width
          height
        }
      }
      id
    }
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    slug
    title
    description
    price_guidance: priceGuidance
    thumbnail
  }
}

fragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    ...OtherCollectionEntity_member
  }
}

fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    ...ArtistSeriesEntity_member
  }
}

fragment ArtistSeriesEntity_member on MarketingCollection {
  slug
  headerImage
  thumbnail
  title
  price_guidance: priceGuidance
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        artist {
          name
          id
        }
        title
        image {
          url(version: "small")
        }
        id
      }
    }
    id
  }
}

fragment OtherCollectionEntity_member on MarketingCollection {
  slug
  thumbnail
  title
}

fragment RelatedCollectionEntity_collection on MarketingCollection {
  headerImage
  slug
  title
  price_guidance: priceGuidance
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        artist {
          name
          id
        }
        title
        image {
          resized(width: 262) {
            url
          }
        }
        id
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "acquireable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "aggregations",
    "type": "[ArtworkAggregation]",
    "defaultValue": [
      "MERCHANDISABLE_ARTISTS",
      "MEDIUM",
      "MAJOR_PERIOD",
      "TOTAL"
    ]
  },
  {
    "kind": "LocalArgument",
    "name": "atAuction",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "color",
    "type": "String",
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
    "name": "height",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "inquireableOnly",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "majorPeriods",
    "type": "[String]",
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
    "name": "offerable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "page",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "priceRange",
    "type": "String",
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
    "name": "slug",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "width",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "kind": "Variable",
  "name": "acquireable",
  "variableName": "acquireable"
},
v3 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v4 = {
  "kind": "Variable",
  "name": "atAuction",
  "variableName": "atAuction"
},
v5 = {
  "kind": "Variable",
  "name": "color",
  "variableName": "color"
},
v6 = {
  "kind": "Variable",
  "name": "forSale",
  "variableName": "forSale"
},
v7 = {
  "kind": "Variable",
  "name": "height",
  "variableName": "height"
},
v8 = {
  "kind": "Variable",
  "name": "inquireableOnly",
  "variableName": "inquireableOnly"
},
v9 = {
  "kind": "Variable",
  "name": "majorPeriods",
  "variableName": "majorPeriods"
},
v10 = {
  "kind": "Variable",
  "name": "medium",
  "variableName": "medium"
},
v11 = {
  "kind": "Variable",
  "name": "offerable",
  "variableName": "offerable"
},
v12 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v13 = {
  "kind": "Variable",
  "name": "priceRange",
  "variableName": "priceRange"
},
v14 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v15 = {
  "kind": "Variable",
  "name": "width",
  "variableName": "width"
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "category",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "headerImage",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "ScalarField",
  "alias": "price_guidance",
  "name": "priceGuidance",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "Literal",
  "name": "sort",
  "value": "-decayed_merch"
},
v23 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "TOTAL"
    ]
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  (v22/*: any*/)
],
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v25 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v26 = [
  (v24/*: any*/),
  (v25/*: any*/)
],
v27 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artist",
  "storageKey": null,
  "args": null,
  "concreteType": "Artist",
  "plural": false,
  "selections": (v26/*: any*/)
},
v28 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v29 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v30 = [
  (v28/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "width",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "height",
    "args": null,
    "storageKey": null
  }
],
v31 = {
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
v32 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v33 = {
  "kind": "ScalarField",
  "alias": "is_acquireable",
  "name": "isAcquireable",
  "args": null,
  "storageKey": null
},
v34 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v35 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v36 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v37 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v38 = {
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "value",
          "args": null,
          "storageKey": null
        },
        (v24/*: any*/),
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
},
v39 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v40 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v41 = [
  (v39/*: any*/),
  (v40/*: any*/),
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
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionRefetch2Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "marketingCollection",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Collection_viewer",
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
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionRefetch2Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "marketingCollection",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          (v16/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "credit",
            "args": null,
            "storageKey": null
          },
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "featuredArtistExclusionIds",
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
                "alias": "artist_ids",
                "name": "artistIDs",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "artist_id",
                "name": "artistID",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "gene_id",
                "name": "geneID",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "relatedCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollection",
            "plural": true,
            "selections": [
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")",
                "args": (v23/*: any*/),
                "concreteType": "FilterArtworksConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FilterArtworksEdge",
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
                          (v27/*: any*/),
                          (v20/*: any*/),
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
                                "storageKey": "resized(width:262)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 262
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "plural": false,
                                "selections": [
                                  (v28/*: any*/)
                                ]
                              }
                            ]
                          },
                          (v25/*: any*/)
                        ]
                      }
                    ]
                  },
                  (v25/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "linkedCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollectionGroup",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "groupType",
                "args": null,
                "storageKey": null
              },
              (v24/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "members",
                "storageKey": null,
                "args": null,
                "concreteType": "MarketingCollection",
                "plural": true,
                "selections": [
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v17/*: any*/),
                  (v21/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "thumbnail",
                    "args": null,
                    "storageKey": null
                  },
                  (v18/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworksConnection",
                    "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")",
                    "args": (v23/*: any*/),
                    "concreteType": "FilterArtworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FilterArtworksEdge",
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
                              (v27/*: any*/),
                              (v20/*: any*/),
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
                                    "name": "url",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": "small"
                                      }
                                    ],
                                    "storageKey": "url(version:\"small\")"
                                  }
                                ]
                              },
                              (v25/*: any*/)
                            ]
                          }
                        ]
                      },
                      (v25/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artworksConnection",
            "storageKey": null,
            "args": [
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "includeMediumFilterInAggregation",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 20
              },
              (v22/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                      (v29/*: any*/),
                      (v19/*: any*/),
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
                            "alias": "small",
                            "name": "resized",
                            "storageKey": "resized(height:160)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 160
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "plural": false,
                            "selections": (v30/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "large",
                            "name": "resized",
                            "storageKey": "resized(height:220)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 220
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "plural": false,
                            "selections": (v30/*: any*/)
                          },
                          (v31/*: any*/)
                        ]
                      },
                      (v25/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "availability",
                        "args": null,
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "is_price_range",
                        "name": "isPriceRange",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "listPrice",
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
                            "type": "PriceRange",
                            "selections": (v34/*: any*/)
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Money",
                            "selections": (v34/*: any*/)
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "price_currency",
                        "name": "priceCurrency",
                        "args": null,
                        "storageKey": null
                      },
                      (v20/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artists",
                        "storageKey": "artists(shallow:true)",
                        "args": (v35/*: any*/),
                        "concreteType": "Artist",
                        "plural": true,
                        "selections": (v26/*: any*/)
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
                          (v17/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": "partner(shallow:true)",
                        "args": (v35/*: any*/),
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          (v24/*: any*/),
                          (v36/*: any*/),
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
                                "selections": [
                                  (v31/*: any*/)
                                ]
                              },
                              (v25/*: any*/)
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
                                "alias": "address_2",
                                "name": "address2",
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
                                "alias": "postal_code",
                                "name": "postalCode",
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
                              (v25/*: any*/)
                            ]
                          },
                          (v25/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": "merchandisable_artists",
                "name": "merchandisableArtists",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": true,
                "selections": [
                  (v19/*: any*/),
                  (v37/*: any*/),
                  (v24/*: any*/),
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
                  (v25/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": "is_followed",
                    "name": "isFollowed",
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
              (v38/*: any*/),
              (v25/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "filtered_artworks",
            "name": "artworksConnection",
            "storageKey": null,
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
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "kind": "Literal",
                "name": "size",
                "value": 0
              },
              (v14/*: any*/),
              (v15/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
              (v25/*: any*/),
              (v38/*: any*/),
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
                    "selections": (v41/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v41/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v41/*: any*/)
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
                      (v39/*: any*/),
                      (v40/*: any*/)
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
                "concreteType": "FilterArtworksEdge",
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
                      (v25/*: any*/),
                      (v19/*: any*/),
                      (v29/*: any*/),
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
                            "alias": "aspect_ratio",
                            "name": "aspectRatio",
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
                                "value": "large"
                              }
                            ],
                            "storageKey": "url(version:\"large\")"
                          }
                        ]
                      },
                      (v37/*: any*/),
                      (v20/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "image_title",
                        "name": "imageTitle",
                        "args": null,
                        "storageKey": null
                      },
                      (v32/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "sale_message",
                        "name": "saleMessage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "cultural_maker",
                        "name": "culturalMaker",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artists",
                        "storageKey": "artists(shallow:true)",
                        "args": (v35/*: any*/),
                        "concreteType": "Artist",
                        "plural": true,
                        "selections": [
                          (v25/*: any*/),
                          (v29/*: any*/),
                          (v24/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "collecting_institution",
                        "name": "collectingInstitution",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": "partner(shallow:true)",
                        "args": (v35/*: any*/),
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          (v24/*: any*/),
                          (v29/*: any*/),
                          (v25/*: any*/),
                          (v36/*: any*/)
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
                            "alias": "is_auction",
                            "name": "isAuction",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_closed",
                            "name": "isClosed",
                            "args": null,
                            "storageKey": null
                          },
                          (v25/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": "is_live_open",
                            "name": "isLiveOpen",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_open",
                            "name": "isOpen",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_preview",
                            "name": "isPreview",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "display_timely_at",
                            "name": "displayTimelyAt",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": "sale_artwork",
                        "name": "saleArtwork",
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
                                "alias": "bidder_positions",
                                "name": "bidderPositions",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "highest_bid",
                            "name": "highestBid",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "plural": false,
                            "selections": (v34/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "opening_bid",
                            "name": "openingBid",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "plural": false,
                            "selections": (v34/*: any*/)
                          },
                          (v25/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_inquireable",
                        "name": "isInquireable",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_saved",
                        "name": "isSaved",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_biddable",
                        "name": "isBiddable",
                        "args": null,
                        "storageKey": null
                      },
                      (v33/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "is_offerable",
                        "name": "isOfferable",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  (v25/*: any*/)
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
    "name": "CollectionRefetch2Query",
    "id": null,
    "text": "query CollectionRefetch2Query(\n  $acquireable: Boolean\n  $aggregations: [ArtworkAggregation] = [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]\n  $atAuction: Boolean\n  $color: String\n  $forSale: Boolean\n  $height: String\n  $inquireableOnly: Boolean\n  $majorPeriods: [String]\n  $medium: String\n  $offerable: Boolean\n  $page: Int\n  $priceRange: String\n  $sort: String\n  $slug: String!\n  $width: String\n) {\n  viewer: marketingCollection(slug: $slug) {\n    ...Collection_viewer_3bvDhp\n  }\n}\n\nfragment Collection_viewer_3bvDhp on MarketingCollection {\n  category\n  credit\n  description\n  headerImage\n  slug\n  title\n  featuredArtistExclusionIds\n  query {\n    artist_ids: artistIDs\n    artist_id: artistID\n    gene_id: geneID\n  }\n  relatedCollections {\n    ...RelatedCollectionsRail_collections\n  }\n  linkedCollections {\n    ...CollectionsHubRails_linkedCollections\n  }\n  artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, size: 20, sort: \"-decayed_merch\") {\n    ...Header_artworks\n    ...SeoProductsForArtworks_artworks\n    aggregations {\n      slice\n      counts {\n        value\n        name\n        count\n      }\n    }\n    id\n  }\n  filtered_artworks: artworksConnection(acquireable: $acquireable, aggregations: $aggregations, atAuction: $atAuction, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, priceRange: $priceRange, size: 0, sort: $sort, width: $width) {\n    id\n    ...ArtworkFilterArtworkGrid2_filtered_artworks\n  }\n}\n\nfragment RelatedCollectionsRail_collections on MarketingCollection {\n  ...RelatedCollectionEntity_collection\n}\n\nfragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {\n  groupType\n  ...FeaturedCollectionsRails_collectionGroup\n  ...OtherCollectionsRail_collectionGroup\n  ...ArtistSeriesRail_collectionGroup\n}\n\nfragment Header_artworks on FilterArtworksConnection {\n  ...DefaultHeader_headerArtworks\n  merchandisable_artists: merchandisableArtists {\n    slug\n    internalID\n    name\n    imageUrl\n    birthday\n    nationality\n    ...FollowArtistButton_artist\n    id\n  }\n}\n\nfragment SeoProductsForArtworks_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      category\n      date\n      href\n      is_acquireable: isAcquireable\n      is_price_range: isPriceRange\n      listPrice {\n        __typename\n        ... on PriceRange {\n          display\n        }\n        ... on Money {\n          display\n        }\n      }\n      price_currency: priceCurrency\n      title\n      artists(shallow: true) {\n        name\n        id\n      }\n      image {\n        url(version: \"larger\")\n      }\n      meta {\n        description\n      }\n      partner(shallow: true) {\n        name\n        type\n        profile {\n          icon {\n            url(version: \"larger\")\n          }\n          id\n        }\n        locations(size: 1) {\n          address\n          address_2: address2\n          city\n          state\n          country\n          postal_code: postalCode\n          phone\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworksConnection {\n  id\n  aggregations {\n    slice\n    counts {\n      value\n      name\n      count\n    }\n  }\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment DefaultHeader_headerArtworks on FilterArtworksConnection {\n  edges {\n    node {\n      href\n      slug\n      image {\n        small: resized(height: 160) {\n          url\n          width\n          height\n        }\n        large: resized(height: 220) {\n          url\n          width\n          height\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    title\n    description\n    price_guidance: priceGuidance\n    thumbnail\n  }\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...ArtistSeriesEntity_member\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  slug\n  headerImage\n  thumbnail\n  title\n  price_guidance: priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          url(version: \"small\")\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  slug\n  thumbnail\n  title\n}\n\nfragment RelatedCollectionEntity_collection on MarketingCollection {\n  headerImage\n  slug\n  title\n  price_guidance: priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          resized(width: 262) {\n            url\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '734c8cb1fafbf11c1e8a83979ebecb7b';
export default node;
