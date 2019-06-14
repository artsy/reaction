/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkContextArtist_artwork$ref } from "./ArtworkContextArtist_artwork.graphql";
import { ArtworkContextFair_artwork$ref } from "./ArtworkContextFair_artwork.graphql";
import { ArtworkContextShow_artwork$ref } from "./ArtworkContextShow_artwork.graphql";
declare const _OtherWorks_artwork$ref: unique symbol;
export type OtherWorks_artwork$ref = typeof _OtherWorks_artwork$ref;
export type OtherWorks_artwork = {
    readonly id: string;
    readonly _id: string;
    readonly sale: ({
        readonly is_closed: boolean | null;
    }) | null;
    readonly context: ({
        readonly __typename: string;
    }) | null;
    readonly " $fragmentRefs": ArtworkContextArtist_artwork$ref & ArtworkContextFair_artwork$ref & ArtworkContextShow_artwork$ref;
    readonly " $refType": OtherWorks_artwork$ref;
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
  "name": "OtherWorks_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextArtist_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextFair_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextShow_artwork",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
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
        v0
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "context",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__typename",
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
(node as any).hash = '1bb13c76c15c70b72ccc562789cd161a';
export default node;
