/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkDetailsChecklist_artwork$ref: unique symbol;
export type ArtworkDetailsChecklist_artwork$ref = typeof _ArtworkDetailsChecklist_artwork$ref;
export type ArtworkDetailsChecklist_artwork = {
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
    readonly " $refType": ArtworkDetailsChecklist_artwork$ref;
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
  "name": "ArtworkDetailsChecklist_artwork",
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
(node as any).hash = 'c8d15d3dc9346159f345ef5190245dbd';
export default node;
