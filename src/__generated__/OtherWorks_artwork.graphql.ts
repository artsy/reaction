/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkContextArtist_artwork$ref } from "./ArtworkContextArtist_artwork.graphql";
import { ArtworkContextAuction_artwork$ref } from "./ArtworkContextAuction_artwork.graphql";
import { ArtworkContextFair_artwork$ref } from "./ArtworkContextFair_artwork.graphql";
import { ArtworkContextPartnerShow_artwork$ref } from "./ArtworkContextPartnerShow_artwork.graphql";
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
    readonly " $fragmentRefs": ArtworkContextFair_artwork$ref & ArtworkContextAuction_artwork$ref & ArtworkContextPartnerShow_artwork$ref & ArtworkContextArtist_artwork$ref;
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
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextFair_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextAuction_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextPartnerShow_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkContextArtist_artwork",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '606026874ef3a545ac61714fe30eab8c';
export default node;
