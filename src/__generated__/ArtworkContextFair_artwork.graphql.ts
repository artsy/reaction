/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { FairArtworkGrid_artwork$ref } from "./FairArtworkGrid_artwork.graphql";
import { PartnerShowArtworkGrid_artwork$ref } from "./PartnerShowArtworkGrid_artwork.graphql";
declare const _ArtworkContextFair_artwork$ref: unique symbol;
export type ArtworkContextFair_artwork$ref = typeof _ArtworkContextFair_artwork$ref;
export type ArtworkContextFair_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly name: string | null;
        readonly href: string | null;
    }) | null;
    readonly " $fragmentRefs": FairArtworkGrid_artwork$ref & PartnerShowArtworkGrid_artwork$ref & ArtistArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextFair_artwork$ref;
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
  "name": "ArtworkContextFair_artwork",
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
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "FairArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PartnerShowArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistArtworkGrid_artwork",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '167cefe738a69a2d780a89f662da5cdb';
export default node;
