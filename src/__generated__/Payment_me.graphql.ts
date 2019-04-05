/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { PaymentPicker_me$ref } from "./PaymentPicker_me.graphql";
declare const _Payment_me$ref: unique symbol;
export type Payment_me$ref = typeof _Payment_me$ref;
export type Payment_me = {
    readonly " $fragmentRefs": PaymentPicker_me$ref;
    readonly " $refType": Payment_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Payment_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "PaymentPicker_me",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6e58b93df5b176669dbf779516ec980d';
export default node;
