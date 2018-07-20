/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Review_order = {
    readonly id: string | null;
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
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '1d0f4a95a73e73dddc9f7127c7919d90';
export default node;
