/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
declare const _ArtworkSidebarArtists_artwork$ref: unique symbol;
export type ArtworkSidebarArtists_artwork$ref = typeof _ArtworkSidebarArtists_artwork$ref;
export type ArtworkSidebarArtists_artwork = {
    readonly artists: ReadonlyArray<({
        readonly __id: string;
        readonly id: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly " $fragmentRefs": FollowArtistButton_artist$ref;
    }) | null> | null;
    readonly " $refType": ArtworkSidebarArtists_artwork$ref;
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
  "name": "ArtworkSidebarArtists_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        v0,
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
        {
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist",
          "args": null
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '078b2375943c21b18376b77d8ceb6d15';
export default node;
