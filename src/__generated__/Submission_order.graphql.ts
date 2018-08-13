/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Summary_order$ref } from "./Summary_order.graphql";
declare const _Submission_order$ref: unique symbol;
export type Submission_order$ref = typeof _Submission_order$ref;
export type Submission_order = {
    readonly id: string | null;
    readonly code: string | null;
    readonly " $fragmentRefs": Summary_order$ref;
    readonly " $refType": Submission_order$ref;
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
(node as any).hash = '5b7fdea0b95bd13ca4be0527293984f2';
export default node;
