/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkSidebarCurrentBidInfo_artwork$ref: unique symbol;
export type ArtworkSidebarCurrentBidInfo_artwork$ref = typeof _ArtworkSidebarCurrentBidInfo_artwork$ref;
export type ArtworkSidebarCurrentBidInfo_artwork = {
    readonly _id: string;
    readonly sale: ({
        readonly is_closed: boolean | null;
        readonly is_live_open: boolean | null;
    }) | null;
    readonly sale_artwork: ({
        readonly is_with_reserve: boolean | null;
        readonly reserve_message: string | null;
        readonly reserve_status: string | null;
        readonly current_bid: ({
            readonly display: string | null;
        }) | null;
        readonly counts: ({
            readonly bidder_positions: any | null;
        }) | null;
    }) | null;
    readonly myLotStanding: ReadonlyArray<{
        readonly most_recent_bid: ({
            readonly max_bid: ({
                readonly display: string | null;
            }) | null;
        }) | null;
        readonly active_bid: ({
            readonly is_winning: boolean | null;
        }) | null;
    }> | null;
    readonly " $refType": ArtworkSidebarCurrentBidInfo_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarCurrentBidInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
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
        v0
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
          "selections": v1
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
        v0
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
              "selections": v1
            },
            v0
          ]
        },
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
            v0
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '680492e9583527bb9b01c124d63412a3';
export default node;
