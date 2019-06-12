/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { RecentlyViewed_me$ref } from "./RecentlyViewed_me.graphql";
export type RecentlyViewedQueryVariables = {};
export type RecentlyViewedQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": RecentlyViewed_me$ref;
    } | null;
};
export type RecentlyViewedQuery = {
    readonly response: RecentlyViewedQueryResponse;
    readonly variables: RecentlyViewedQueryVariables;
};



/*
query RecentlyViewedQuery {
  me {
    ...RecentlyViewed_me
    id
  }
}

fragment RecentlyViewed_me on Me {
  recentlyViewedArtworks(first: 20) {
    edges {
      node {
        __id
        image {
          aspect_ratio
          id
          placeholder
          url(version: "large")
        }
        href
        ...Metadata_artwork
        ...Save_artwork
        ...Badge_artwork
        id
      }
    }
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
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
  "name": "href",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
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
    "name": "RecentlyViewedQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RecentlyViewed_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RecentlyViewedQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "recentlyViewedArtworks",
            "storageKey": "recentlyViewedArtworks(first:20)",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
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
                      (v0/*: any*/),
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
                      (v2/*: any*/),
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
                        "args": (v3/*: any*/),
                        "concreteType": "Artist",
                        "plural": true,
                        "selections": [
                          (v0/*: any*/),
                          (v2/*: any*/),
                          (v4/*: any*/),
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
                        "args": (v3/*: any*/),
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v2/*: any*/),
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
                              (v5/*: any*/),
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
                              (v5/*: any*/)
                            ]
                          },
                          (v1/*: any*/)
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
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RecentlyViewedQuery",
    "id": null,
    "text": "query RecentlyViewedQuery {\n  me {\n    ...RecentlyViewed_me\n    id\n  }\n}\n\nfragment RecentlyViewed_me on Me {\n  recentlyViewedArtworks(first: 20) {\n    edges {\n      node {\n        __id\n        image {\n          aspect_ratio\n          id\n          placeholder\n          url(version: \"large\")\n        }\n        href\n        ...Metadata_artwork\n        ...Save_artwork\n        ...Badge_artwork\n        id\n      }\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n    id\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction\n    is_closed\n    id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7fd8678ce0ceade9e3f696b783d190df';
export default node;
