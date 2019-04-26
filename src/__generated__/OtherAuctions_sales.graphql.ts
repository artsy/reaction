/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { AuctionCard_sale$ref } from "./AuctionCard_sale.graphql";
declare const _OtherAuctions_sales$ref: unique symbol;
export type OtherAuctions_sales$ref = typeof _OtherAuctions_sales$ref;
export type OtherAuctions_sales = ReadonlyArray<{
    readonly " $fragmentRefs": AuctionCard_sale$ref;
    readonly " $refType": OtherAuctions_sales$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "OtherAuctions_sales",
  "type": "Sale",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "AuctionCard_sale",
      "args": null
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
(node as any).hash = 'a958527d99f4fac7d2d2cd1c0e826c82';
export default node;
