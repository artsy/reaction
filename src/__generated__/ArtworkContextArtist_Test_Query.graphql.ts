/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkContextArtist_artwork$ref } from "./ArtworkContextArtist_artwork.graphql";
export type ArtworkContextArtist_Test_QueryVariables = {};
export type ArtworkContextArtist_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkContextArtist_artwork$ref;
    }) | null;
};
export type ArtworkContextArtist_Test_Query = {
    readonly response: ArtworkContextArtist_Test_QueryResponse;
    readonly variables: ArtworkContextArtist_Test_QueryVariables;
};



/*
query ArtworkContextArtist_Test_Query {
  artwork(id: "on-kawara-9-jan-1973") {
    ...ArtworkContextArtist_artwork
    __id
  }
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

fragment ArtistArtworkGrid_artwork_2Lx1mV on Artwork {
  id
  artist {
    name
    href
    counts {
      artworks(format: "0,0", label: "work")
    }
    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC) {
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
  }
  is_biddable
  sale {
    is_preview
    display_timely_at
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
    "kind": "Literal",
    "name": "id",
    "value": "on-kawara-9-jan-1973",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "first",
  "value": 8,
  "type": "Int"
},
v6 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC",
  "type": "ArtworkSorts"
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v9 = [
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
            "name": "is_offerable",
            "args": null,
            "storageKey": null
          },
          v1,
          v4,
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
            "name": "_id",
            "args": null,
            "storageKey": null
          },
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "display_timely_at",
                "args": null,
                "storageKey": null
              },
              v1,
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
          v2,
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
            "args": v7,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              v1,
              v4,
              v3
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
            "args": v7,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              v3,
              v4,
              v1,
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
                  v8,
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
                  v8
                ]
              },
              v1
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
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkContextArtist_Test_Query",
  "id": null,
  "text": "query ArtworkContextArtist_Test_Query {\n  artwork(id: \"on-kawara-9-jan-1973\") {\n    ...ArtworkContextArtist_artwork\n    __id\n  }\n}\n\nfragment ArtworkContextArtist_artwork on Artwork {\n  id\n  artist {\n    name\n    href\n    __id\n  }\n  ...ArtistArtworkGrid_artwork_2Lx1mV\n  ...PartnerArtworkGrid_artwork_2Lx1mV\n  ...RelatedWorksArtworkGrid_artwork\n  __id\n}\n\nfragment ArtistArtworkGrid_artwork_2Lx1mV on Artwork {\n  id\n  artist {\n    name\n    href\n    counts {\n      artworks(format: \"0,0\", label: \"work\")\n    }\n    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __id\n        }\n      }\n    }\n    __id\n  }\n  __id\n}\n\nfragment PartnerArtworkGrid_artwork_2Lx1mV on Artwork {\n  partner {\n    artworksConnection(first: 8, for_sale: true, sort: PUBLISHED_AT_DESC) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __id\n        }\n      }\n    }\n    href\n    name\n    __id\n  }\n  __id\n}\n\nfragment RelatedWorksArtworkGrid_artwork on Artwork {\n  layers {\n    name\n    id\n    __id\n  }\n  layer {\n    name\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __id\n        }\n      }\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      id\n      href\n      image {\n        aspect_ratio\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  title\n  image_title\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n  }\n  is_biddable\n  sale {\n    is_preview\n    display_timely_at\n    __id\n  }\n  is_acquireable\n  is_offerable\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_closed\n    __id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkContextArtist_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"on-kawara-9-jan-1973\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkContextArtist_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkContextArtist_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"on-kawara-9-jan-1973\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          v2,
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
                  v5,
                  v6
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": v9
              }
            ]
          },
          v1,
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
                  v5,
                  {
                    "kind": "Literal",
                    "name": "for_sale",
                    "value": true,
                    "type": "Boolean"
                  },
                  v6
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": v9
              },
              v4,
              v3,
              v1
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
              v2,
              v1
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
              v3,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(first:8)",
                "args": [
                  v5
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": v9
              },
              v1
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'e257ace3146cfbfb1d9f86d83fe04f69';
export default node;
