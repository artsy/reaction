/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistRecommendations_artist$ref } from "./ArtistRecommendations_artist.graphql";
export type ArtistRecommendations_Test_QueryVariables = {};
export type ArtistRecommendations_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": ArtistRecommendations_artist$ref;
    } | null;
};
export type ArtistRecommendations_Test_Query = {
    readonly response: ArtistRecommendations_Test_QueryResponse;
    readonly variables: ArtistRecommendations_Test_QueryVariables;
};



/*
query ArtistRecommendations_Test_Query {
  artist(id: "andy-warhol") {
    ...ArtistRecommendations_artist
    id
  }
}

fragment ArtistRecommendations_artist on Artist {
  id
  name
  related {
    artists(first: 3, after: "", min_forsale_artworks: 7) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          ...RecommendedArtist_artist
          __typename
        }
        cursor
      }
    }
  }
}

fragment RecommendedArtist_artist on Artist {
  id
  _id
  name
  formatted_nationality_and_birthday
  href
  image {
    cropped(width: 100, height: 100) {
      url
    }
    id
  }
  artworks_connection(first: 20, sort: PUBLISHED_AT_DESC, filter: IS_FOR_SALE) {
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
  ...FollowArtistButton_artist
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

fragment FollowArtistButton_artist on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
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
    "kind": "Literal",
    "name": "id",
    "value": "andy-warhol"
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  {
    "kind": "Literal",
    "name": "min_forsale_artworks",
    "value": 7
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
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
    "name": "ArtistRecommendations_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"andy-warhol\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistRecommendations_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistRecommendations_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"andy-warhol\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
                "name": "artists",
                "storageKey": "artists(after:\"\",first:3,min_forsale_artworks:7)",
                "args": (v3/*: any*/),
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
                          (v1/*: any*/),
                          (v4/*: any*/),
                          (v2/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "formatted_nationality_and_birthday",
                            "args": null,
                            "storageKey": null
                          },
                          (v5/*: any*/),
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
                                "name": "cropped",
                                "storageKey": "cropped(height:100,width:100)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 100
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 100
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
                              },
                              (v1/*: any*/)
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artworks_connection",
                            "storageKey": "artworks_connection(filter:\"IS_FOR_SALE\",first:20,sort:\"PUBLISHED_AT_DESC\")",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "filter",
                                "value": "IS_FOR_SALE"
                              },
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 20
                              },
                              {
                                "kind": "Literal",
                                "name": "sort",
                                "value": "PUBLISHED_AT_DESC"
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
                                      (v6/*: any*/),
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
                                        "args": (v7/*: any*/),
                                        "concreteType": "Artist",
                                        "plural": true,
                                        "selections": [
                                          (v6/*: any*/),
                                          (v5/*: any*/),
                                          (v2/*: any*/),
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
                                        "args": (v7/*: any*/),
                                        "concreteType": "Partner",
                                        "plural": false,
                                        "selections": [
                                          (v2/*: any*/),
                                          (v5/*: any*/),
                                          (v1/*: any*/),
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
                                              (v8/*: any*/),
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
                                              (v8/*: any*/)
                                            ]
                                          },
                                          (v1/*: any*/)
                                        ]
                                      },
                                      (v4/*: any*/),
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "is_inquireable",
                                        "args": null,
                                        "storageKey": null
                                      },
                                      (v1/*: any*/),
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
                          (v6/*: any*/),
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
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "__typename",
                            "args": null,
                            "storageKey": null
                          }
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
                "alias": null,
                "name": "artists",
                "args": (v3/*: any*/),
                "handle": "connection",
                "key": "ArtistRecommendations_artists",
                "filters": [
                  "min_forsale_artworks"
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
    "name": "ArtistRecommendations_Test_Query",
    "id": null,
    "text": "query ArtistRecommendations_Test_Query {\n  artist(id: \"andy-warhol\") {\n    ...ArtistRecommendations_artist\n    id\n  }\n}\n\nfragment ArtistRecommendations_artist on Artist {\n  id\n  name\n  related {\n    artists(first: 3, after: \"\", min_forsale_artworks: 7) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          ...RecommendedArtist_artist\n          __typename\n        }\n        cursor\n      }\n    }\n  }\n}\n\nfragment RecommendedArtist_artist on Artist {\n  id\n  _id\n  name\n  formatted_nationality_and_birthday\n  href\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n    id\n  }\n  artworks_connection(first: 20, sort: PUBLISHED_AT_DESC, filter: IS_FOR_SALE) {\n    edges {\n      node {\n        __id\n        image {\n          aspect_ratio\n          id\n        }\n        ...FillwidthItem_artwork\n        id\n      }\n    }\n  }\n  ...FollowArtistButton_artist\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n    id\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction\n    is_closed\n    id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '69bb9cd8b80ae8198b01710e3cc02010';
export default node;
