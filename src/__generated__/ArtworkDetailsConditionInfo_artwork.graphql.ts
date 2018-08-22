/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsConditionInfo_artwork$ref: unique symbol;
export type ArtworkDetailsConditionInfo_artwork$ref = typeof _ArtworkDetailsConditionInfo_artwork$ref;
export type ArtworkDetailsConditionInfo_artwork = {
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
    readonly " $refType": ArtworkDetailsConditionInfo_artwork$ref;
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
  "name": "ArtworkDetailsConditionInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
(node as any).hash = '3783b10ba21ff253fbf846dfba1745bc';
export default node;
