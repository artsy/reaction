/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Shipping_order = {
    readonly id: string | null;
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
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6fc1d37a0891e8a8003f7392085deff2';
export default node;
