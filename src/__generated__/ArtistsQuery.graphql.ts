/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Artists_gene$ref } from "./Artists_gene.graphql";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type ArtistsQueryVariables = {
    readonly geneNodeID: string;
    readonly count: number;
    readonly cursor?: string | null;
    readonly aggregations?: ReadonlyArray<ArtworkAggregation | null> | null;
};
export type ArtistsQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": Artists_gene$ref;
    } | null;
};
export type ArtistsQuery = {
    readonly response: ArtistsQueryResponse;
    readonly variables: ArtistsQueryVariables;
};



/*
query ArtistsQuery(
  $geneNodeID: ID!
  $count: Int!
  $cursor: String
  $aggregations: [ArtworkAggregation]
) {
  node(__id: $geneNodeID) {
    __typename
    ...Artists_gene_18MJUj
  }
}

fragment Artists_gene_18MJUj on Gene {
  __id
  artists: artists_connection(first: $count, after: $cursor) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        __id
        ...ArtistRow_artist
        id
        __typename
      }
      cursor
    }
  }
  filter_aggregations: filtered_artworks(aggregations: $aggregations, size: 0, include_medium_filter_in_aggregation: true) {
    ...TotalCount_filter_artworks
    aggregations {
      slice
      ...Dropdown_aggregation
    }
  }
}

fragment ArtistRow_artist on Artist {
  name
  href
  ...Follow_artist
  artworks: artworks_connection(first: 6) {
    ...Fillwidth_artworks
  }
}

fragment TotalCount_filter_artworks on FilterArtworks {
  counts {
    total
  }
}

fragment Dropdown_aggregation on ArtworksAggregationResults {
  slice
  counts {
    name
    id
    count
  }
}

fragment Follow_artist on Artist {
  __id
  id
  is_followed
}

fragment Fillwidth_artworks on ArtworkConnection {
  edges {
    node {
      __id
      image {
        aspect_ratio
        id
      }
      ...FillwidthItem_artwork
      id
    }
  }
}

fragment FillwidthItem_artwork on Artwork {
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
    "name": "geneNodeID",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "aggregations",
    "type": "[ArtworkAggregation]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "__id",
    "variableName": "geneNodeID"
  }
],
v2 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
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
  "name": "href",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v10 = {
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
    "name": "ArtistsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Artists_gene",
            "args": [
              (v2/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "Gene",
            "selections": [
              (v4/*: any*/),
              {
                "kind": "LinkedField",
                "alias": "artists",
                "name": "artists_connection",
                "storageKey": null,
                "args": (v5/*: any*/),
                "concreteType": "ArtistConnection",
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
                          (v4/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_followed",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "artworks",
                            "name": "artworks_connection",
                            "storageKey": "artworks_connection(first:6)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 6
                              }
                            ],
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
                                      (v4/*: any*/),
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
                                          (v8/*: any*/),
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
                                      (v7/*: any*/),
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
                                        "args": (v9/*: any*/),
                                        "concreteType": "Artist",
                                        "plural": true,
                                        "selections": [
                                          (v4/*: any*/),
                                          (v7/*: any*/),
                                          (v6/*: any*/),
                                          (v8/*: any*/)
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
                                        "args": (v9/*: any*/),
                                        "concreteType": "Partner",
                                        "plural": false,
                                        "selections": [
                                          (v6/*: any*/),
                                          (v7/*: any*/),
                                          (v8/*: any*/),
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
                                          (v8/*: any*/),
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
                                              (v10/*: any*/),
                                              (v8/*: any*/)
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
                                              (v10/*: any*/)
                                            ]
                                          },
                                          (v8/*: any*/)
                                        ]
                                      },
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
                                        "name": "is_inquireable",
                                        "args": null,
                                        "storageKey": null
                                      },
                                      (v8/*: any*/),
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
                          },
                          (v3/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": "artists",
                "name": "artists_connection",
                "args": (v5/*: any*/),
                "handle": "connection",
                "key": "Artists_artists",
                "filters": null
              },
              {
                "kind": "LinkedField",
                "alias": "filter_aggregations",
                "name": "filtered_artworks",
                "storageKey": null,
                "args": [
                  (v2/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "include_medium_filter_in_aggregation",
                    "value": true
                  },
                  {
                    "kind": "Literal",
                    "name": "size",
                    "value": 0
                  }
                ],
                "concreteType": "FilterArtworks",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FilterArtworksCounts",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "total",
                        "args": null,
                        "storageKey": null
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
                          (v6/*: any*/),
                          (v8/*: any*/),
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
              }
            ]
          },
          {
            "kind": "ClientExtension",
            "selections": [
              (v8/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistsQuery",
    "id": null,
    "text": "query ArtistsQuery(\n  $geneNodeID: ID!\n  $count: Int!\n  $cursor: String\n  $aggregations: [ArtworkAggregation]\n) {\n  node(__id: $geneNodeID) {\n    __typename\n    ...Artists_gene_18MJUj\n  }\n}\n\nfragment Artists_gene_18MJUj on Gene {\n  __id\n  artists: artists_connection(first: $count, after: $cursor) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        ...ArtistRow_artist\n        id\n        __typename\n      }\n      cursor\n    }\n  }\n  filter_aggregations: filtered_artworks(aggregations: $aggregations, size: 0, include_medium_filter_in_aggregation: true) {\n    ...TotalCount_filter_artworks\n    aggregations {\n      slice\n      ...Dropdown_aggregation\n    }\n  }\n}\n\nfragment ArtistRow_artist on Artist {\n  name\n  href\n  ...Follow_artist\n  artworks: artworks_connection(first: 6) {\n    ...Fillwidth_artworks\n  }\n}\n\nfragment TotalCount_filter_artworks on FilterArtworks {\n  counts {\n    total\n  }\n}\n\nfragment Dropdown_aggregation on ArtworksAggregationResults {\n  slice\n  counts {\n    name\n    id\n    count\n  }\n}\n\nfragment Follow_artist on Artist {\n  __id\n  id\n  is_followed\n}\n\nfragment Fillwidth_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n        id\n      }\n      ...FillwidthItem_artwork\n      id\n    }\n  }\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n    id\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction\n    is_closed\n    id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd9a3bfe133d142f393f301f23f2665cf';
export default node;
