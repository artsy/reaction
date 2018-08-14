/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSidebar_artwork$ref } from "./ArtworkSidebar_artwork.graphql";
declare const _ArtworkApp_artwork$ref: unique symbol;
export type ArtworkApp_artwork$ref = typeof _ArtworkApp_artwork$ref;
export type ArtworkApp_artwork = {
    readonly " $fragmentRefs": ArtworkSidebar_artwork$ref;
    readonly " $refType": ArtworkApp_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkApp_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_artwork",
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
(node as any).hash = 'eb39ddb4b6ade84d5070591f00dd80f9';
export default node;
