/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkDetailsConditionInfo_artwork$ref } from "./ArtworkDetailsConditionInfo_artwork.graphql";
declare const _ArtworkDetails_artwork$ref: unique symbol;
export type ArtworkDetails_artwork$ref = typeof _ArtworkDetails_artwork$ref;
export type ArtworkDetails_artwork = {
    readonly " $fragmentRefs": ArtworkDetailsConditionInfo_artwork$ref;
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
      "name": "ArtworkDetailsConditionInfo_artwork",
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
(node as any).hash = '8c06fc233dbafd1e798099aaa6f6d03f';
export default node;
