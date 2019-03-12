/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsAdditionalInfo_artwork$ref: unique symbol;
export type ArtworkDetailsAdditionalInfo_artwork$ref = typeof _ArtworkDetailsAdditionalInfo_artwork$ref;
export type ArtworkDetailsAdditionalInfo_artwork = {
    readonly series: string | null;
    readonly publisher: string | null;
    readonly manufacturer: string | null;
    readonly image_rights: string | null;
    readonly framed: ({
        readonly label: string | null;
        readonly details: string | null;
    }) | null;
    readonly signatureInfo: ({
        readonly label: string | null;
        readonly details: string | null;
    }) | null;
    readonly conditionDescription: ({
        readonly label: string | null;
        readonly details: string | null;
    }) | null;
    readonly certificateOfAuthenticity: ({
        readonly label: string | null;
        readonly details: string | null;
    }) | null;
    readonly " $refType": ArtworkDetailsAdditionalInfo_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
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
];
return {
  "kind": "Fragment",
  "name": "ArtworkDetailsAdditionalInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "series",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "publisher",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "manufacturer",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "image_rights",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "framed",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "signatureInfo",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "conditionDescription",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "certificateOfAuthenticity",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "plural": false,
      "selections": v0
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
})();
(node as any).hash = '24faf5a518a2d1dd07edcaaf5872be3a';
export default node;
