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
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '85a24649ea395173de362675a7c1cdcd';
export default node;
