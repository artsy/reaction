/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _AuthenticityCertificate_artwork$ref: unique symbol;
export type AuthenticityCertificate_artwork$ref = typeof _AuthenticityCertificate_artwork$ref;
export type AuthenticityCertificate_artwork = {
    readonly hasCertificateOfAuthenticity: boolean | null;
    readonly is_biddable: boolean | null;
    readonly " $refType": AuthenticityCertificate_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "AuthenticityCertificate_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasCertificateOfAuthenticity",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_biddable",
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
(node as any).hash = '80912d790965a940931e0e426a0fd89b';
export default node;
