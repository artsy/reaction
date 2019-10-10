/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SecurePayment_artwork$ref: unique symbol;
export type SecurePayment_artwork$ref = typeof _SecurePayment_artwork$ref;
export type SecurePayment_artwork = {
    readonly is_acquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly " $refType": SecurePayment_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SecurePayment_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_acquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_offerable",
      "args": null,
      "storageKey": null
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
(node as any).hash = '0e7579e709bc9421eda100bf10f95fa4';
export default node;
