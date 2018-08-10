/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Submission_order = {
    readonly id: string | null;
    readonly code: string | null;
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
      "alias": null,
      "name": "code",
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
(node as any).hash = 'ca1abbe36144eb62277e125aba18723a';
export default node;
