/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _LotInfo_saleArtwork$ref: unique symbol;
export type LotInfo_saleArtwork$ref = typeof _LotInfo_saleArtwork$ref;
export type LotInfo_saleArtwork = {
    readonly counts: ({
        readonly bidderPositions: any | null;
    }) | null;
    readonly lotLabel: string | null;
    readonly minimumNextBid: ({
        readonly amount: string | null;
        readonly cents: number | null;
        readonly display: string | null;
    }) | null;
    readonly " $refType": LotInfo_saleArtwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "LotInfo_saleArtwork",
  "type": "SaleArtwork",
  "metadata": null,
  "argumentDefinitions": [],
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
          "alias": "bidderPositions",
          "name": "bidder_positions",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "lotLabel",
      "name": "lot_label",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "minimumNextBid",
      "name": "minimum_next_bid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkMinimumNextBid",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "amount",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cents",
          "args": null,
          "storageKey": null
        },
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
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '78ba547619a8a2d5ab0d32ec8acf85aa';
export default node;
