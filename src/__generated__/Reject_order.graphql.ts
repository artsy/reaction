/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSummaryItem_order$ref } from "./ArtworkSummaryItem_order.graphql";
declare const _Reject_order$ref: unique symbol;
export type Reject_order$ref = typeof _Reject_order$ref;
export type Reject_order = {
    readonly id: string | null;
    readonly stateExpiresAt: string | null;
    readonly lastOffer: ({
        readonly id: string | null;
        readonly createdAt: string | null;
    }) | null;
    readonly " $fragmentRefs": ArtworkSummaryItem_order$ref;
    readonly " $refType": Reject_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Reject_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stateExpiresAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lastOffer",
      "storageKey": null,
      "args": null,
      "concreteType": "Offer",
      "plural": false,
      "selections": [
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "createdAt",
          "args": null,
          "storageKey": null
        },
        v1
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order",
      "args": null
    },
    v1
  ]
};
})();
(node as any).hash = '73a56b9bef18b094bacc24c3be7c684c';
export default node;
