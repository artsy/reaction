/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Submission_order = {
    readonly id: string | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Submission_order",
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
(node as any).hash = 'a28eb158dd8a4b23df5ecca95a1d45e4';
export default node;
