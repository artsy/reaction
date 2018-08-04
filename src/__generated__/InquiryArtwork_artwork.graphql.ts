/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Artwork_artwork$ref } from "./Artwork_artwork.graphql";
declare const _InquiryArtwork_artwork$ref: unique symbol;
export type InquiryArtwork_artwork$ref = typeof _InquiryArtwork_artwork$ref;
export type InquiryArtwork_artwork = {
    readonly " $fragmentRefs": Artwork_artwork$ref;
    readonly " $refType": InquiryArtwork_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "InquiryArtwork_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Artwork_artwork",
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
(node as any).hash = '395ab37180661dd93a2a1ee189b363b5';
export default node;
