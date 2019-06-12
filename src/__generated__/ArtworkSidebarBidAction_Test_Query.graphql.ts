/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarBidAction_artwork$ref } from "./ArtworkSidebarBidAction_artwork.graphql";
export type ArtworkSidebarBidAction_Test_QueryVariables = {};
export type ArtworkSidebarBidAction_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": ArtworkSidebarBidAction_artwork$ref;
    } | null;
};
export type ArtworkSidebarBidAction_Test_Query = {
    readonly response: ArtworkSidebarBidAction_Test_QueryResponse;
    readonly variables: ArtworkSidebarBidAction_Test_QueryVariables;
};



/*
query ArtworkSidebarBidAction_Test_Query {
  artwork(id: "auction_artwork") {
    ...ArtworkSidebarBidAction_artwork
    id
  }
}

fragment ArtworkSidebarBidAction_artwork on Artwork {
  myLotStanding(live: true) {
    most_recent_bid {
      max_bid {
        cents
      }
      id
    }
  }
  id
  _id
  sale {
    id
    registrationStatus {
      qualified_for_bidding
      id
    }
    is_preview
    is_open
    is_live_open
    is_closed
    is_registration_closed
  }
  sale_artwork {
    increments {
      cents
      display
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
    "value": "auction_artwork"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarBidAction_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarBidAction_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarBidAction_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
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
                "name": "most_recent_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "max_bid",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/)
                    ]
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          },
          (v2/*: any*/),
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
              (v2/*: any*/),
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
                  (v2/*: any*/)
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
                "name": "is_open",
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
                "name": "is_closed",
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
            "name": "sale_artwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "display",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarBidAction_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarBidAction_Test_Query {\n  artwork(id: \"auction_artwork\") {\n    ...ArtworkSidebarBidAction_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid {\n      max_bid {\n        cents\n      }\n      id\n    }\n  }\n  id\n  _id\n  sale {\n    id\n    registrationStatus {\n      qualified_for_bidding\n      id\n    }\n    is_preview\n    is_open\n    is_live_open\n    is_closed\n    is_registration_closed\n  }\n  sale_artwork {\n    increments {\n      cents\n      display\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'cee3e6eed892ecf9813e6d5a3f30ab18';
export default node;
