/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Bid_saleArtwork$ref: unique symbol;
export type Bid_saleArtwork$ref = typeof _Bid_saleArtwork$ref;
export type Bid_saleArtwork = {
    readonly id: string;
    readonly lotLabel: string | null;
    readonly " $refType": Bid_saleArtwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Bid_saleArtwork",
  "type": "SaleArtwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "lotLabel",
      "name": "lot_label",
      "args": null,
      "storageKey": null
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
(node as any).hash = '918412b76714f9f1b576776fd81739c0';
export default node;
