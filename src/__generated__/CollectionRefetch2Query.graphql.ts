/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Collection_viewer$ref } from "./Collection_viewer.graphql";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type CollectionRefetch2QueryVariables = {
    readonly acquireable?: boolean | null;
    readonly aggregations?: ReadonlyArray<ArtworkAggregation | null> | null;
    readonly at_auction?: boolean | null;
    readonly color?: string | null;
    readonly for_sale?: boolean | null;
    readonly height?: string | null;
    readonly inquireable_only?: boolean | null;
    readonly major_periods?: ReadonlyArray<string | null> | null;
    readonly medium?: string | null;
    readonly offerable?: boolean | null;
    readonly page?: number | null;
    readonly price_range?: string | null;
    readonly sort?: string | null;
    readonly slug: string;
    readonly width?: string | null;
};
export type CollectionRefetch2QueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": Collection_viewer$ref;
    }) | null;
};
export type CollectionRefetch2Query = {
    readonly response: CollectionRefetch2QueryResponse;
    readonly variables: CollectionRefetch2QueryVariables;
};



/*
query CollectionRefetch2Query(
  $acquireable: Boolean
  $aggregations: [ArtworkAggregation] = [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]
  $at_auction: Boolean
  $color: String
  $for_sale: Boolean
  $height: String
  $inquireable_only: Boolean
  $major_periods: [String]
  $medium: String
  $offerable: Boolean
  $page: Int
  $price_range: String
  $sort: String
  $slug: String!
  $width: String
) {
  viewer: marketingCollection(slug: $slug) {
    ...Collection_viewer_2aBr8l
    __id: id
  }
}

fragment Collection_viewer_2aBr8l on MarketingCollection {
  category
  credit
  description
  headerImage
  id
  slug
  title
  featuredArtistExclusionIds
  query {
    artist_ids
    artist_id
    gene_id
    __id: id
  }
  relatedCollections {
    ...RelatedCollectionsRail_collections
    __id: id
  }
  linkedCollections {
    ...CollectionsHubRails_linkedCollections
  }
  artworks(aggregations: $aggregations, include_medium_filter_in_aggregation: true, size: 20, sort: "-decayed_merch") {
    ...Header_artworks
    ...SeoProductsForArtworks_artworks
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
  filtered_artworks: artworks(acquireable: $acquireable, aggregations: $aggregations, at_auction: $at_auction, color: $color, for_sale: $for_sale, height: $height, inquireable_only: $inquireable_only, major_periods: $major_periods, medium: $medium, offerable: $offerable, page: $page, price_range: $price_range, size: 0, sort: $sort, width: $width) {
    __id
    ...ArtworkFilterArtworkGrid2_filtered_artworks
  }
  __id: id
}

fragment RelatedCollectionsRail_collections on MarketingCollection {
  ...RelatedCollectionEntity_collection
  __id: id
}

fragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {
  groupType
  ...FeaturedCollectionsRails_collectionGroup
  ...OtherCollectionsRail_collectionGroup
  ...ArtistSeriesRail_collectionGroup
}

fragment Header_artworks on FilterArtworks {
  ...DefaultHeader_headerArtworks
  merchandisable_artists {
    id
    _id
    name
    imageUrl
    birthday
    nationality
    ...FollowArtistButton_artist
    __id
  }
  __id
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
        artists(shallow: true) {
          name
          __id
        }
        image {
          url(version: "larger")
          __id: id
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
              __id: id
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

fragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworks {
  __id
  aggregations {
    slice
    counts {
      id
      name
      count
      __id
    }
  }
  artworks: artworks_connection(first: 30, after: "") {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        __id
      }
    }
    ...ArtworkGrid_artworks
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
        __id: id
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
    __id: id
  }
  href
  ...Metadata_artwork
  ...Save_artwork
  ...Badge_artwork
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
    __id
  }
  __id
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
    is_closed
    __id
  }
  sale_artwork {
    counts {
      bidder_positions
    }
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

fragment DefaultHeader_headerArtworks on FilterArtworks {
  hits {
    href
    id
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
      __id: id
    }
    __id
  }
  __id
}

fragment FollowArtistButton_artist on Artist {
  __id
  name
  id
  is_followed
  counts {
    follows
  }
}

fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    id
    slug
    title
    description
    price_guidance
    thumbnail
    __id: id
  }
}

fragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    ...OtherCollectionEntity_member
    __id: id
  }
}

fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    ...ArtistSeriesEntity_member
    __id: id
  }
}

fragment ArtistSeriesEntity_member on MarketingCollection {
  slug
  headerImage
  thumbnail
  title
  price_guidance
  artworks(aggregations: [TOTAL], sort: "-decayed_merch") {
    artworks_connection(first: 3) {
      edges {
        node {
          artist {
            name
            __id
          }
          title
          image {
            url(version: "small")
            __id: id
          }
          __id
        }
      }
    }
    __id
  }
  __id: id
}

fragment OtherCollectionEntity_member on MarketingCollection {
  slug
  thumbnail
  title
  __id: id
}

fragment RelatedCollectionEntity_collection on MarketingCollection {
  headerImage
  slug
  title
  price_guidance
  artworks(aggregations: [TOTAL], sort: "-decayed_merch") {
    artworks_connection(first: 3) {
      edges {
        node {
          artist {
            name
            __id
          }
          title
          image {
            resized(width: 262) {
              url
            }
            __id: id
          }
          __id
        }
      }
    }
    __id
  }
  __id: id
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
    "name": "at_auction",
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
    "name": "for_sale",
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
    "name": "inquireable_only",
    "type": "Boolean",
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
    "name": "price_range",
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
  "name": "description",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "headerImage",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price_guidance",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "Literal",
  "name": "sort",
  "value": "-decayed_merch",
  "type": "String"
},
v11 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "TOTAL"
    ],
    "type": "[ArtworkAggregation]"
  },
  v10
],
v12 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3,
    "type": "Int"
  }
],
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v15 = [
  v13,
  v14
],
v16 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artist",
  "storageKey": null,
  "args": null,
  "concreteType": "Artist",
  "plural": false,
  "selections": v15
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations",
  "type": "[ArtworkAggregation]"
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v20 = [
  v17,
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
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v22 = [
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
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_acquireable",
  "args": null,
  "storageKey": null
},
v25 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v26 = [
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
  },
  v2
],
v27 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v28 = {
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
        v6,
        v13,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "count",
          "args": null,
          "storageKey": null
        },
        v14
      ]
    }
  ]
},
v29 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v30 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v31 = [
  v29,
  v30,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v32 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CollectionRefetch2Query",
  "id": null,
  "text": "query CollectionRefetch2Query(\n  $acquireable: Boolean\n  $aggregations: [ArtworkAggregation] = [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]\n  $at_auction: Boolean\n  $color: String\n  $for_sale: Boolean\n  $height: String\n  $inquireable_only: Boolean\n  $major_periods: [String]\n  $medium: String\n  $offerable: Boolean\n  $page: Int\n  $price_range: String\n  $sort: String\n  $slug: String!\n  $width: String\n) {\n  viewer: marketingCollection(slug: $slug) {\n    ...Collection_viewer_2aBr8l\n    __id: id\n  }\n}\n\nfragment Collection_viewer_2aBr8l on MarketingCollection {\n  category\n  credit\n  description\n  headerImage\n  id\n  slug\n  title\n  featuredArtistExclusionIds\n  query {\n    artist_ids\n    artist_id\n    gene_id\n    __id: id\n  }\n  relatedCollections {\n    ...RelatedCollectionsRail_collections\n    __id: id\n  }\n  linkedCollections {\n    ...CollectionsHubRails_linkedCollections\n  }\n  artworks(aggregations: $aggregations, include_medium_filter_in_aggregation: true, size: 20, sort: \"-decayed_merch\") {\n    ...Header_artworks\n    ...SeoProductsForArtworks_artworks\n    aggregations {\n      slice\n      counts {\n        id\n        name\n        count\n        __id\n      }\n    }\n    __id\n  }\n  filtered_artworks: artworks(acquireable: $acquireable, aggregations: $aggregations, at_auction: $at_auction, color: $color, for_sale: $for_sale, height: $height, inquireable_only: $inquireable_only, major_periods: $major_periods, medium: $medium, offerable: $offerable, page: $page, price_range: $price_range, size: 0, sort: $sort, width: $width) {\n    __id\n    ...ArtworkFilterArtworkGrid2_filtered_artworks\n  }\n  __id: id\n}\n\nfragment RelatedCollectionsRail_collections on MarketingCollection {\n  ...RelatedCollectionEntity_collection\n  __id: id\n}\n\nfragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {\n  groupType\n  ...FeaturedCollectionsRails_collectionGroup\n  ...OtherCollectionsRail_collectionGroup\n  ...ArtistSeriesRail_collectionGroup\n}\n\nfragment Header_artworks on FilterArtworks {\n  ...DefaultHeader_headerArtworks\n  merchandisable_artists {\n    id\n    _id\n    name\n    imageUrl\n    birthday\n    nationality\n    ...FollowArtistButton_artist\n    __id\n  }\n  __id\n}\n\nfragment SeoProductsForArtworks_artworks on FilterArtworks {\n  artworks_connection(first: 30, after: \"\") {\n    edges {\n      node {\n        __id\n        availability\n        category\n        date\n        href\n        is_acquireable\n        is_price_range\n        price\n        price_currency\n        title\n        artists(shallow: true) {\n          name\n          __id\n        }\n        image {\n          url(version: \"larger\")\n          __id: id\n        }\n        meta {\n          description\n        }\n        partner(shallow: true) {\n          name\n          type\n          profile {\n            icon {\n              url(version: \"larger\")\n              __id: id\n            }\n            __id\n          }\n          locations(size: 1) {\n            address\n            address_2\n            city\n            state\n            country\n            postal_code\n            phone\n            __id\n          }\n          __id\n        }\n      }\n    }\n  }\n  __id\n}\n\nfragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworks {\n  __id\n  aggregations {\n    slice\n    counts {\n      id\n      name\n      count\n      __id\n    }\n  }\n  artworks: artworks_connection(first: 30, after: \"\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        __id\n      }\n    }\n    ...ArtworkGrid_artworks\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      id\n      href\n      image {\n        aspect_ratio\n        __id: id\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  title\n  image_title\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    __id: id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    __id\n  }\n  __id\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_closed\n    __id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n\nfragment DefaultHeader_headerArtworks on FilterArtworks {\n  hits {\n    href\n    id\n    image {\n      small: resized(height: 160) {\n        url\n        width\n        height\n      }\n      large: resized(height: 220) {\n        url\n        width\n        height\n      }\n      __id: id\n    }\n    __id\n  }\n  __id\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  name\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    id\n    slug\n    title\n    description\n    price_guidance\n    thumbnail\n    __id: id\n  }\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n    __id: id\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...ArtistSeriesEntity_member\n    __id: id\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  slug\n  headerImage\n  thumbnail\n  title\n  price_guidance\n  artworks(aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    artworks_connection(first: 3) {\n      edges {\n        node {\n          artist {\n            name\n            __id\n          }\n          title\n          image {\n            url(version: \"small\")\n            __id: id\n          }\n          __id\n        }\n      }\n    }\n    __id\n  }\n  __id: id\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  slug\n  thumbnail\n  title\n  __id: id\n}\n\nfragment RelatedCollectionEntity_collection on MarketingCollection {\n  headerImage\n  slug\n  title\n  price_guidance\n  artworks(aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    artworks_connection(first: 3) {\n      edges {\n        node {\n          artist {\n            name\n            __id\n          }\n          title\n          image {\n            resized(width: 262) {\n              url\n            }\n            __id: id\n          }\n          __id\n        }\n      }\n    }\n    __id\n  }\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionRefetch2Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "marketingCollection",
        "storageKey": null,
        "args": v1,
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Collection_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "acquireable",
                "variableName": "acquireable",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "aggregations",
                "variableName": "aggregations",
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
                "name": "color",
                "variableName": "color",
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
                "name": "height",
                "variableName": "height",
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
                "name": "page",
                "variableName": "page",
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
              },
              {
                "kind": "Variable",
                "name": "width",
                "variableName": "width",
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
    "name": "CollectionRefetch2Query",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "marketingCollection",
        "storageKey": null,
        "args": v1,
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "featuredArtistExclusionIds",
            "args": null,
            "storageKey": null
          },
          v3,
          v4,
          v5,
          v6,
          v7,
          v8,
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
            "name": "relatedCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollection",
            "plural": true,
            "selections": [
              v5,
              v7,
              v8,
              v9,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworks",
                "storageKey": "artworks(aggregations:[\"TOTAL\"],sort:\"-decayed_merch\")",
                "args": v11,
                "concreteType": "FilterArtworks",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworks_connection",
                    "storageKey": "artworks_connection(first:3)",
                    "args": v12,
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
                              v16,
                              v8,
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
                                        "value": 262,
                                        "type": "Int"
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "plural": false,
                                    "selections": [
                                      v17
                                    ]
                                  },
                                  v2
                                ]
                              },
                              v14
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  v14
                ]
              },
              v2
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
              v13,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "members",
                "storageKey": null,
                "args": null,
                "concreteType": "MarketingCollection",
                "plural": true,
                "selections": [
                  v6,
                  v7,
                  v8,
                  v4,
                  v9,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "thumbnail",
                    "args": null,
                    "storageKey": null
                  },
                  v2,
                  v5,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworks",
                    "storageKey": "artworks(aggregations:[\"TOTAL\"],sort:\"-decayed_merch\")",
                    "args": v11,
                    "concreteType": "FilterArtworks",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artworks_connection",
                        "storageKey": "artworks_connection(first:3)",
                        "args": v12,
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
                                  v16,
                                  v8,
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
                                            "value": "small",
                                            "type": "[String]"
                                          }
                                        ],
                                        "storageKey": "url(version:\"small\")"
                                      },
                                      v2
                                    ]
                                  },
                                  v14
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      v14
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artworks",
            "storageKey": null,
            "args": [
              v18,
              {
                "kind": "Literal",
                "name": "include_medium_filter_in_aggregation",
                "value": true,
                "type": "Boolean"
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 20,
                "type": "Int"
              },
              v10
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "hits",
                "storageKey": null,
                "args": null,
                "concreteType": "Artwork",
                "plural": true,
                "selections": [
                  v19,
                  v6,
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
                            "value": 160,
                            "type": "Int"
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "plural": false,
                        "selections": v20
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
                            "value": 220,
                            "type": "Int"
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "plural": false,
                        "selections": v20
                      },
                      v2
                    ]
                  },
                  v14
                ]
              },
              v14,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "merchandisable_artists",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": true,
                "selections": [
                  v6,
                  v21,
                  v13,
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
                  v14,
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
                "args": v22,
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
                          v14,
                          v3,
                          v23,
                          v19,
                          v24,
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
                          v8,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": "artists(shallow:true)",
                            "args": v25,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": v15
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": v26
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
                              v4
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "partner",
                            "storageKey": "partner(shallow:true)",
                            "args": v25,
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              v13,
                              v27,
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
                                    "selections": v26
                                  },
                                  v14
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
                                  v14
                                ]
                              },
                              v14
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              v28
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
              v18,
              {
                "kind": "Variable",
                "name": "at_auction",
                "variableName": "at_auction",
                "type": "Boolean"
              },
              {
                "kind": "Variable",
                "name": "color",
                "variableName": "color",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "for_sale",
                "variableName": "for_sale",
                "type": "Boolean"
              },
              {
                "kind": "Variable",
                "name": "height",
                "variableName": "height",
                "type": "String"
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
                "name": "offerable",
                "variableName": "offerable",
                "type": "Boolean"
              },
              {
                "kind": "Variable",
                "name": "page",
                "variableName": "page",
                "type": "Int"
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
              },
              {
                "kind": "Variable",
                "name": "width",
                "variableName": "width",
                "type": "String"
              }
            ],
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              v14,
              v28,
              {
                "kind": "LinkedField",
                "alias": "artworks",
                "name": "artworks_connection",
                "storageKey": "artworks_connection(after:\"\",first:30)",
                "args": v22,
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
                        "selections": v31
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "first",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": v31
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "last",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": v31
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
                          v29,
                          v30
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
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": "artists(shallow:true)",
                            "args": v25,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              v14,
                              v19,
                              v13
                            ]
                          },
                          v14,
                          v19,
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
                              v2,
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
                          v21,
                          v8,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "image_title",
                            "args": null,
                            "storageKey": null
                          },
                          v23,
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
                          v6,
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
                            "args": v25,
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              v13,
                              v19,
                              v14,
                              v27
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
                              v14,
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
                                  v32,
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
                                  v32
                                ]
                              },
                              v14
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
                          v24,
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
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '64b59e9198ee3f15a5383370856b1473';
export default node;
