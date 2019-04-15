/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { PaymentPicker_me$ref } from "./PaymentPicker_me.graphql";
declare const _NewPayment_me$ref: unique symbol;
export type NewPayment_me$ref = typeof _NewPayment_me$ref;
export type NewPayment_me = {
    readonly " $fragmentRefs": PaymentPicker_me$ref;
    readonly " $refType": NewPayment_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "NewPayment_me",
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
(node as any).hash = '7bb5f7c3b4fe86e246747b31a9b14b64';
export default node;
