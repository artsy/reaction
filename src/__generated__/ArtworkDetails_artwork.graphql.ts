/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkDetailsAboutTheWork_artwork$ref } from "./ArtworkDetailsAboutTheWork_artwork.graphql";
import { ArtworkDetailsAdditionalInfo_artwork$ref } from "./ArtworkDetailsAdditionalInfo_artwork.graphql";
import { ArtworkDetailsChecklist_artwork$ref } from "./ArtworkDetailsChecklist_artwork.graphql";
declare const _ArtworkDetails_artwork$ref: unique symbol;
export type ArtworkDetails_artwork$ref = typeof _ArtworkDetails_artwork$ref;
export type ArtworkDetails_artwork = {
    readonly " $fragmentRefs": ArtworkDetailsAboutTheWork_artwork$ref & ArtworkDetailsChecklist_artwork$ref & ArtworkDetailsAdditionalInfo_artwork$ref;
    readonly " $refType": ArtworkDetails_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkDetails_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWork_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsChecklist_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAdditionalInfo_artwork",
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
(node as any).hash = 'ae9daf8427f7b8c5801836a5c6afaa76';
export default node;
