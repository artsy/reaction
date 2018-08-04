/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Summary_order$ref } from "./Summary_order.graphql";
declare const _Review_order$ref: unique symbol;
export type Review_order$ref = typeof _Review_order$ref;
export type Review_order = {
    readonly id: string | null;
    readonly " $fragmentRefs": Summary_order$ref;
    readonly " $refType": Review_order$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Review_order",
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
(node as any).hash = '2bcbbf6dbe7025129e62f481d60e23f9';
export default node;
