/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _OfferSummaryItem_order$ref: unique symbol;
export type OfferSummaryItem_order$ref = typeof _OfferSummaryItem_order$ref;
export type OfferSummaryItem_order = {
    readonly totalListPrice: string | null;
    readonly myLastOffer?: ({
        readonly amount: string | null;
    }) | null;
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
],
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
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
      "name": "totalListPrice",
      "args": v0,
      "storageKey": "totalListPrice(precision:2)"
    },
    v1,
    {
      "kind": "InlineFragment",
      "type": "OfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "Offer",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": v0,
              "storageKey": "amount(precision:2)"
            },
            v1
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'd2a9645b4aaaf247549f93de0eb282e8';
export default node;
