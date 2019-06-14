/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { OtherWorks_artwork$ref } from "./OtherWorks_artwork.graphql";
export type OtherWorksQueryVariables = {
    readonly artworkSlug: string;
};
export type OtherWorksQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": OtherWorks_artwork$ref;
    }) | null;
};
export type OtherWorksQuery = {
    readonly response: OtherWorksQueryResponse;
    readonly variables: OtherWorksQueryVariables;
};



/*
query OtherWorksQuery(
  $artworkSlug: String!
) {
  artwork(id: $artworkSlug) {
    ...OtherWorks_artwork
    __id
  }
}

fragment OtherWorks_artwork on Artwork {
  ...ArtworkContextArtist_artwork
  ...ArtworkContextFair_artwork
  ...ArtworkContextShow_artwork
  id
  _id
  sale {
    is_closed
    __id
  }
  context {
    __typename
    ... on Node {
      __id
    }
    ... on ArtworkContextFair {
      __id
    }
  }
  __id
}

fragment ArtworkContextArtist_artwork on Artwork {
  id
  artist {
    name
    href
    __id
  }
  ...ArtistArtworkGrid_artwork_2Lx1mV
  ...PartnerArtworkGrid_artwork_2Lx1mV
  ...RelatedWorksArtworkGrid_artwork
  __id
}

fragment ArtworkContextFair_artwork on Artwork {
  id
  artist {
    name
    href
    __id
  }
  ...FairArtworkGrid_artwork_2Lx1mV
  ...PartnerShowArtworkGrid_artwork_2Lx1mV
  ...ArtistArtworkGrid_artwork_2Lx1mV
  ...RelatedWorksArtworkGrid_artwork
  __id
}

fragment ArtworkContextShow_artwork on Artwork {
  id
  artist {
    name
    href
    __id
  }
  ...PartnerShowArtworkGrid_artwork_2Lx1mV
  ...ArtistArtworkGrid_artwork_2Lx1mV
  ...PartnerArtworkGrid_artwork_2Lx1mV
  ...RelatedWorksArtworkGrid_artwork
  __id
}

fragment PartnerShowArtworkGrid_artwork_2Lx1mV on Artwork {
  show {
    href
    name
    artworks_connection(first: 8) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
          __id
        }
      }
    }
    __id
  }
  __id
}

fragment ArtistArtworkGrid_artwork_2Lx1mV on Artwork {
  id
  artist {
    name
    href
    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC) {
      ...ArtworkGrid_artworks
      edges {
        __typename
      }
    }
    __id
  }
  __id
}

fragment PartnerArtworkGrid_artwork_2Lx1mV on Artwork {
  partner {
    artworksConnection(first: 8, for_sale: true, sort: PUBLISHED_AT_DESC) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
          __id
        }
      }
    }
    href
    name
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
      edges {
        node {
          id
          __id
        }
      }
    }
    __id
  }
  __id
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

fragment FairArtworkGrid_artwork_2Lx1mV on Artwork {
  fair: show(at_a_fair: true) {
    href
    artworks_connection(first: 8) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
          __id
        }
      }
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 8,
  "type": "Int"
},
v5 = [
  v4
],
v6 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_closed",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v13 = {
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
      "args": v6,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        v2,
        v7,
        v3
      ]
    },
    v2,
    v7,
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
        v8,
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
    v9,
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
    v10,
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
      "args": v6,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        v3,
        v7,
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
        v11,
        v2,
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
            v12,
            v8
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
            v12
          ]
        },
        v2
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
},
v14 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "ArtworkEdge",
    "plural": true,
    "selections": [
      v13
    ]
  }
],
v15 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC",
  "type": "ArtworkSorts"
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artworks_connection",
  "storageKey": "artworks_connection(first:8)",
  "args": v5,
  "concreteType": "ArtworkConnection",
  "plural": false,
  "selections": v14
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "OtherWorksQuery",
  "id": null,
  "text": "query OtherWorksQuery(\n  $artworkSlug: String!\n) {\n  artwork(id: $artworkSlug) {\n    ...OtherWorks_artwork\n    __id\n  }\n}\n\nfragment OtherWorks_artwork on Artwork {\n  ...ArtworkContextArtist_artwork\n  ...ArtworkContextFair_artwork\n  ...ArtworkContextShow_artwork\n  id\n  _id\n  sale {\n    is_closed\n    __id\n  }\n  context {\n    __typename\n    ... on Node {\n      __id\n    }\n    ... on ArtworkContextFair {\n      __id\n    }\n  }\n  __id\n}\n\nfragment ArtworkContextArtist_artwork on Artwork {\n  id\n  artist {\n    name\n    href\n    __id\n  }\n  ...ArtistArtworkGrid_artwork_2Lx1mV\n  ...PartnerArtworkGrid_artwork_2Lx1mV\n  ...RelatedWorksArtworkGrid_artwork\n  __id\n}\n\nfragment ArtworkContextFair_artwork on Artwork {\n  id\n  artist {\n    name\n    href\n    __id\n  }\n  ...FairArtworkGrid_artwork_2Lx1mV\n  ...PartnerShowArtworkGrid_artwork_2Lx1mV\n  ...ArtistArtworkGrid_artwork_2Lx1mV\n  ...RelatedWorksArtworkGrid_artwork\n  __id\n}\n\nfragment ArtworkContextShow_artwork on Artwork {\n  id\n  artist {\n    name\n    href\n    __id\n  }\n  ...PartnerShowArtworkGrid_artwork_2Lx1mV\n  ...ArtistArtworkGrid_artwork_2Lx1mV\n  ...PartnerArtworkGrid_artwork_2Lx1mV\n  ...RelatedWorksArtworkGrid_artwork\n  __id\n}\n\nfragment PartnerShowArtworkGrid_artwork_2Lx1mV on Artwork {\n  show {\n    href\n    name\n    artworks_connection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __id\n        }\n      }\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtistArtworkGrid_artwork_2Lx1mV on Artwork {\n  id\n  artist {\n    name\n    href\n    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC) {\n      ...ArtworkGrid_artworks\n      edges {\n        __typename\n      }\n    }\n    __id\n  }\n  __id\n}\n\nfragment PartnerArtworkGrid_artwork_2Lx1mV on Artwork {\n  partner {\n    artworksConnection(first: 8, for_sale: true, sort: PUBLISHED_AT_DESC) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __id\n        }\n      }\n    }\n    href\n    name\n    __id\n  }\n  __id\n}\n\nfragment RelatedWorksArtworkGrid_artwork on Artwork {\n  layers {\n    name\n    id\n    __id\n  }\n  layer {\n    name\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __id\n        }\n      }\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      id\n      href\n      image {\n        aspect_ratio\n        __id: id\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  title\n  image_title\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    __id: id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    __id\n  }\n  __id\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_closed\n    __id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n\nfragment FairArtworkGrid_artwork_2Lx1mV on Artwork {\n  fair: show(at_a_fair: true) {\n    href\n    artworks_connection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __id\n        }\n      }\n    }\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "OtherWorksQuery",
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
            "name": "OtherWorks_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OtherWorksQuery",
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
            "name": "layer",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkLayer",
            "plural": false,
            "selections": [
              v3,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(first:8)",
                "args": v5,
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": v14
              },
              v2
            ]
          },
          v10,
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(first:8,for_sale:true,sort:\"PUBLISHED_AT_DESC\")",
                "args": [
                  v4,
                  {
                    "kind": "Literal",
                    "name": "for_sale",
                    "value": true,
                    "type": "Boolean"
                  },
                  v15
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": v14
              },
              v7,
              v3,
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
              v3,
              v10,
              v2
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              v3,
              v7,
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworks_connection",
                "storageKey": "artworks_connection(filter:[\"IS_FOR_SALE\"],first:8,sort:\"PUBLISHED_AT_DESC\")",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "filter",
                    "value": [
                      "IS_FOR_SALE"
                    ],
                    "type": "[ArtistArtworksFilters]"
                  },
                  v4,
                  v15
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
                      v13,
                      v16
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "fair",
            "name": "show",
            "storageKey": "show(at_a_fair:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "at_a_fair",
                "value": true,
                "type": "Boolean"
              }
            ],
            "concreteType": "Show",
            "plural": false,
            "selections": [
              v7,
              v17,
              v2
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "show",
            "storageKey": null,
            "args": null,
            "concreteType": "Show",
            "plural": false,
            "selections": [
              v7,
              v3,
              v17,
              v2
            ]
          },
          v9,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              v11,
              v2
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v16,
              v2
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '19962bd64d1a61e2de8330034d92ae2d';
export default node;
