/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarCurrentBidInfo_artwork$ref } from "./ArtworkSidebarCurrentBidInfo_artwork.graphql";
export type ArtworkSidebarCurrentBidInfo_Test_QueryVariables = {};
export type ArtworkSidebarCurrentBidInfo_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": ArtworkSidebarCurrentBidInfo_artwork$ref;
    } | null;
};
export type ArtworkSidebarCurrentBidInfo_Test_Query = {
    readonly response: ArtworkSidebarCurrentBidInfo_Test_QueryResponse;
    readonly variables: ArtworkSidebarCurrentBidInfo_Test_QueryVariables;
};



/*
query ArtworkSidebarCurrentBidInfo_Test_Query {
  artwork(id: "auction_artwork_estimate_premium") {
    ...ArtworkSidebarCurrentBidInfo_artwork
    id
  }
}

fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
  _id
  sale {
    is_closed
    is_live_open
    id
  }
  sale_artwork {
    is_with_reserve
    reserve_message
    reserve_status
    current_bid {
      display
    }
    counts {
      bidder_positions
    }
    id
  }
  myLotStanding(live: true) {
    active_bid {
      is_winning
      id
    }
    most_recent_bid {
      is_winning
      max_bid {
        display
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "auction_artwork_estimate_premium"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_winning",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarCurrentBidInfo_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
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
              (v1/*: any*/)
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
                "selections": (v2/*: any*/)
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
              (v1/*: any*/)
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
                "value": true
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
                  (v3/*: any*/),
                  (v1/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "most_recent_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "max_bid",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "plural": false,
                    "selections": (v2/*: any*/)
                  },
                  (v1/*: any*/)
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
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarCurrentBidInfo_Test_Query {\n  artwork(id: \"auction_artwork_estimate_premium\") {\n    ...ArtworkSidebarCurrentBidInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  _id\n  sale {\n    is_closed\n    is_live_open\n    id\n  }\n  sale_artwork {\n    is_with_reserve\n    reserve_message\n    reserve_status\n    current_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid {\n      is_winning\n      id\n    }\n    most_recent_bid {\n      is_winning\n      max_bid {\n        display\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '01b76694fe8750dc73441e93358e6487';
export default node;
