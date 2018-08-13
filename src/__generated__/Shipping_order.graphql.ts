/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Summary_order$ref } from "./Summary_order.graphql";
declare const _Shipping_order$ref: unique symbol;
export type Shipping_order$ref = typeof _Shipping_order$ref;
export type Shipping_order = {
    readonly id: string | null;
    readonly " $fragmentRefs": Summary_order$ref;
    readonly " $refType": Shipping_order$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Shipping_order",
  "type": "Order",
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
      "kind": "FragmentSpread",
      "name": "Summary_order",
      "args": null
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
(node as any).hash = 'bf7680b445d71bfcdbacb3dfc5a6314c';
export default node;
