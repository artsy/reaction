/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebar_artwork$ref } from "./ArtworkSidebar_artwork.graphql";
export type ArtworkSidebarQueryVariables = {
    readonly artworkID: string;
};
export type ArtworkSidebarQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebar_artwork$ref;
    }) | null;
};
export type ArtworkSidebarQuery = {
    readonly response: ArtworkSidebarQueryResponse;
    readonly variables: ArtworkSidebarQueryVariables;
};



/*
query ArtworkSidebarQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...ArtworkSidebar_artwork
    __id
  }
}

fragment ArtworkSidebar_artwork on Artwork {
  is_biddable
  is_in_auction
  sale_artwork {
    lot_label
    __id
  }
  sale {
    is_closed
    __id
  }
  ...ArtworkSidebarArtists_artwork
  ...ArtworkSidebarMetadata_artwork
  ...ArtworkSidebarAuctionPartnerInfo_artwork
  ...ArtworkSidebarCurrentBidInfo_artwork
  ...ArtworkSidebarBidAction_artwork
  ...ArtworkSidebarCommercial_artwork
  ...ArtworkSidebarPartnerInfo_artwork
  ...ArtworkSidebarExtraLinks_artwork
  __id
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  artists {
    __id
    id
    name
    href
    ...FollowArtistButton_artist
  }
  __id
}

fragment ArtworkSidebarMetadata_artwork on Artwork {
  edition_sets {
    __id
  }
  ...ArtworkSidebarTitleInfo_artwork
  ...ArtworkSidebarSizeInfo_piece
  ...ArtworkSidebarClassification_artwork
  __id
}

fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
  is_biddable
  partner {
    __id
    name
  }
  sale_artwork {
    estimate
    __id
  }
  sale {
    is_with_buyers_premium
    __id
  }
  __id
}

fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
  myLotStanding(live: true) {
    active_bid {
      is_winning
      max_bid {
        display
      }
      __id
    }
  }
  sale {
    is_open
    is_closed
    __id
  }
  sale_artwork {
    lot_label
    estimate
    is_with_reserve
    reserve_message
    reserve_status
    current_bid {
      display
    }
    counts {
      bidder_positions
    }
    __id
  }
  __id
}

fragment ArtworkSidebarBidAction_artwork on Artwork {
  myLotStanding(live: true) {
    active_bid {
      __id
    }
  }
  sale {
    registrationStatus {
      qualified_for_bidding
      __id
    }
    is_preview
    is_open
    is_live_open
    is_closed
    is_registration_closed
    __id
  }
  sale_artwork {
    increments {
      display
    }
    __id
  }
  __id
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  __id
  sale_message
  is_inquireable
  edition_sets {
    __id
    ...ArtworkSidebarSizeInfo_piece
  }
}

fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
  collecting_institution
  partner {
    __id
    name
    href
    locations {
      city
      __id
    }
  }
  __id
}

fragment ArtworkSidebarExtraLinks_artwork on Artwork {
  __id
  is_in_auction
  is_for_sale
  artists {
    __id
    is_consignable
  }
  sale {
    is_closed
    __id
  }
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  dimensions {
    in
    cm
  }
  edition_of
  ... on Node {
    __id
  }
  ... on EditionSet {
    __id
  }
}

fragment ArtworkSidebarTitleInfo_artwork on Artwork {
  title
  date
  medium
  __id
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attribution_class {
    short_description
  }
  __id
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
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID",
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
  "kind": "LinkedField",
  "alias": null,
  "name": "dimensions",
  "storageKey": null,
  "args": null,
  "concreteType": "dimensions",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "in",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cm",
      "args": null,
      "storageKey": null
    }
  ]
},
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "edition_of",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkSidebarQuery",
  "id": null,
  "text": "query ArtworkSidebarQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkSidebar_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_biddable\n  is_in_auction\n  sale_artwork {\n    lot_label\n    __id\n  }\n  sale {\n    is_closed\n    __id\n  }\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  __id\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  artists {\n    __id\n    id\n    name\n    href\n    ...FollowArtistButton_artist\n  }\n  __id\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  edition_sets {\n    __id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n  __id\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  is_biddable\n  partner {\n    __id\n    name\n  }\n  sale_artwork {\n    estimate\n    __id\n  }\n  sale {\n    is_with_buyers_premium\n    __id\n  }\n  __id\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  myLotStanding(live: true) {\n    active_bid {\n      is_winning\n      max_bid {\n        display\n      }\n      __id\n    }\n  }\n  sale {\n    is_open\n    is_closed\n    __id\n  }\n  sale_artwork {\n    lot_label\n    estimate\n    is_with_reserve\n    reserve_message\n    reserve_status\n    current_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    active_bid {\n      __id\n    }\n  }\n  sale {\n    registrationStatus {\n      qualified_for_bidding\n      __id\n    }\n    is_preview\n    is_open\n    is_live_open\n    is_closed\n    is_registration_closed\n    __id\n  }\n  sale_artwork {\n    increments {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  __id\n  sale_message\n  is_inquireable\n  edition_sets {\n    __id\n    ...ArtworkSidebarSizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  collecting_institution\n  partner {\n    __id\n    name\n    href\n    locations {\n      city\n      __id\n    }\n  }\n  __id\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  __id\n  is_in_auction\n  is_for_sale\n  artists {\n    __id\n    is_consignable\n  }\n  sale {\n    is_closed\n    __id\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of\n  ... on Node {\n    __id\n  }\n  ... on EditionSet {\n    __id\n  }\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n  __id\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attribution_class {\n    short_description\n  }\n  __id\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarQuery",
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
            "name": "ArtworkSidebar_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarQuery",
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
          v3,
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
            "name": "sale_artwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lot_label",
                "args": null,
                "storageKey": null
              },
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "estimate",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_with_reserve",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "reserve_message",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "reserve_status",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "current_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "plural": false,
                "selections": v4
              },
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
                "name": "increments",
                "storageKey": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": v4
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
                "name": "is_closed",
                "args": null,
                "storageKey": null
              },
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_with_buyers_premium",
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
                "kind": "LinkedField",
                "alias": null,
                "name": "registrationStatus",
                "storageKey": null,
                "args": null,
                "concreteType": "Bidder",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "qualified_for_bidding",
                    "args": null,
                    "storageKey": null
                  },
                  v2
                ]
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
                "name": "is_live_open",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_registration_closed",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              v5,
              v6,
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
                "name": "is_consignable",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edition_sets",
            "storageKey": null,
            "args": null,
            "concreteType": "EditionSet",
            "plural": true,
            "selections": [
              v2,
              v3,
              v7
            ]
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
            "name": "date",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "medium",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_in_auction",
            "args": null,
            "storageKey": null
          },
          v7,
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
            "name": "attribution_class",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributionClass",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "short_description",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              v2,
              v5,
              v6,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "locations",
                "storageKey": null,
                "args": null,
                "concreteType": "Location",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "city",
                    "args": null,
                    "storageKey": null
                  },
                  v2
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "myLotStanding",
            "storageKey": "myLotStanding(live:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true,
                "type": "Boolean"
              }
            ],
            "concreteType": "LotStanding",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "active_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_winning",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "max_bid",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "plural": false,
                    "selections": v4
                  },
                  v2
                ]
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
            "name": "is_inquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_for_sale",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '1988ef19372fd3bff993684592a2d8e8';
export default node;
