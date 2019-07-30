/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkSidebarClassification_artwork$ref: unique symbol;
export type ArtworkSidebarClassification_artwork$ref = typeof _ArtworkSidebarClassification_artwork$ref;
export type ArtworkSidebarClassification_artwork = {
    readonly attribution_class: ({
        readonly shortDescription: string | null;
    }) | null;
    readonly " $refType": ArtworkSidebarClassification_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarClassification_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "attribution_class",
      "storageKey": null,
      "args": null,
      "concreteType": "AttributionClass",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "shortDescription",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '9e838ec31647d41024deeaf3f0cbb356';
export default node;
