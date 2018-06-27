/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtworkSidebarCurrentBidInfo_artwork = {
    readonly sale: ({
        readonly is_open: boolean | null;
        readonly is_closed: boolean | null;
    }) | null;
    readonly sale_artwork: ({
        readonly lot_label: string | null;
        readonly estimate: string | null;
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
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarCurrentBidInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
          "name": "is_open",
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
          "name": "lot_label",
          "args": null,
          "storageKey": null
        },
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
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "display",
              "args": null,
              "storageKey": null
            }
          ]
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
    v0
  ]
};
})();
(node as any).hash = '743819c75dea3c032da5ed68abf68be0';
export default node;
