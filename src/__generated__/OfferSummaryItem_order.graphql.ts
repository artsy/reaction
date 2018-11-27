/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _OfferSummaryItem_order$ref: unique symbol;
export type OfferSummaryItem_order$ref = typeof _OfferSummaryItem_order$ref;
export type OfferSummaryItem_order = {
    readonly itemsTotal: string | null;
    readonly totalListPrice: string | null;
    readonly " $refType": OfferSummaryItem_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
];
return {
  "kind": "Fragment",
  "name": "OfferSummaryItem_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotal",
      "args": v0,
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": v0,
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = 'f7823e8e7083206672c01e70a79d2a4a';
export default node;
