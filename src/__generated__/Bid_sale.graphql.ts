/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Bid_sale$ref: unique symbol;
export type Bid_sale$ref = typeof _Bid_sale$ref;
export type Bid_sale = {
    readonly id: string;
    readonly registrationStatus: ({
        readonly qualified_for_bidding: boolean | null;
    }) | null;
    readonly " $refType": Bid_sale$ref;
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
  "name": "Bid_sale",
  "type": "Sale",
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
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '92b376759e4d1648c2ad962a0c810a91';
export default node;
