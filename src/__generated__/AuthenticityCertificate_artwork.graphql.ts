/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _AuthenticityCertificate_artwork$ref: unique symbol;
export type AuthenticityCertificate_artwork$ref = typeof _AuthenticityCertificate_artwork$ref;
export type AuthenticityCertificate_artwork = {
    readonly certificateOfAuthenticity: ({
        readonly label: string | null;
        readonly details: string | null;
    }) | null;
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
      "kind": "LinkedField",
      "alias": null,
      "name": "certificateOfAuthenticity",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "label",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "details",
          "args": null,
          "storageKey": null
        }
      ]
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
(node as any).hash = '934bdc62f5185450f2929220156255bd';
export default node;
