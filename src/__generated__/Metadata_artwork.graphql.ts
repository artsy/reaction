/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { Contact_artwork$ref } from "./Contact_artwork.graphql";
import { Details_artwork$ref } from "./Details_artwork.graphql";
declare const _Metadata_artwork$ref: unique symbol;
export type Metadata_artwork$ref = typeof _Metadata_artwork$ref;
export type Metadata_artwork = {
    readonly " $fragmentRefs": Details_artwork$ref & Contact_artwork$ref;
    readonly " $refType": Metadata_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Metadata_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Details_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Contact_artwork",
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
(node as any).hash = '429d7bf897069aa9099d5938e9b6169d';
export default node;
