/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ArtworkSidebarClassification_artwork$ref: unique symbol;
export type ArtworkSidebarClassification_artwork$ref = typeof _ArtworkSidebarClassification_artwork$ref;
export type ArtworkSidebarClassification_artwork = {
    readonly attribution_class: {
        readonly short_description: string | null;
    } | null;
    readonly " $refType": ArtworkSidebarClassification_artwork$ref;
};



const node: ReaderFragment = {
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
          "name": "short_description",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '0edd5c2a1b8b93a17d606367fe4c25ae';
export default node;
