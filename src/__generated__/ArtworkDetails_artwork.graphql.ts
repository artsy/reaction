/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkDetailsAboutTheWork_artwork$ref } from "./ArtworkDetailsAboutTheWork_artwork.graphql";
import { ArtworkDetailsAdditionalInfo_artwork$ref } from "./ArtworkDetailsAdditionalInfo_artwork.graphql";
import { ArtworkDetailsArticles_artwork$ref } from "./ArtworkDetailsArticles_artwork.graphql";
import { ArtworkDetailsChecklist_artwork$ref } from "./ArtworkDetailsChecklist_artwork.graphql";
declare const _ArtworkDetails_artwork$ref: unique symbol;
export type ArtworkDetails_artwork$ref = typeof _ArtworkDetails_artwork$ref;
export type ArtworkDetails_artwork = {
    readonly literature: string | null;
    readonly exhibition_history: string | null;
    readonly " $fragmentRefs": ArtworkDetailsAboutTheWork_artwork$ref & ArtworkDetailsChecklist_artwork$ref & ArtworkDetailsAdditionalInfo_artwork$ref & ArtworkDetailsArticles_artwork$ref;
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
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsArticles_artwork",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "literature",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "exhibition_history",
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
(node as any).hash = 'a87be833b96987ccb431ad7a09de2938';
export default node;
