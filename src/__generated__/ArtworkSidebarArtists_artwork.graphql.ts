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
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "showFollowSuggestions",
      "type": "Boolean",
      "defaultValue": true
    }
  ],
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
          "args": [
            {
              "kind": "Variable",
              "name": "showFollowSuggestions",
              "variableName": "showFollowSuggestions",
              "type": null
            }
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '13362cc7f0cf86563149eb636de3337e';
export default node;
