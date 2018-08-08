/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Payment_order = {
    readonly id: string | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Payment_order",
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
(node as any).hash = 'e7b1db79b2e14c3ed826131814a97ed8';
export default node;
