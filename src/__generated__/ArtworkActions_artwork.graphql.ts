/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSharePanel_artwork$ref } from "./ArtworkSharePanel_artwork.graphql";
import { Save_artwork$ref } from "./Save_artwork.graphql";
declare const _ArtworkActions_artwork$ref: unique symbol;
export type ArtworkActions_artwork$ref = typeof _ArtworkActions_artwork$ref;
export type ArtworkActions_artwork = {
    readonly sale: ({
        readonly is_closed: boolean | null;
        readonly is_auction: boolean | null;
    }) | null;
    readonly " $fragmentRefs": Save_artwork$ref & ArtworkSharePanel_artwork$ref;
    readonly " $refType": ArtworkActions_artwork$ref;
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
  "name": "ArtworkActions_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Save_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSharePanel_artwork",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_closed",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_auction",
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
(node as any).hash = 'a8dada00c54810c0036837a4c2d4b12c';
export default node;
