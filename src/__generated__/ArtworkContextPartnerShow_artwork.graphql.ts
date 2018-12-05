/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { PartnerShowArtworkGrid_artwork$ref } from "./PartnerShowArtworkGrid_artwork.graphql";
declare const _ArtworkContextPartnerShow_artwork$ref: unique symbol;
export type ArtworkContextPartnerShow_artwork$ref = typeof _ArtworkContextPartnerShow_artwork$ref;
export type ArtworkContextPartnerShow_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly name: string | null;
        readonly href: string | null;
    }) | null;
    readonly " $fragmentRefs": PartnerShowArtworkGrid_artwork$ref & ArtistArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextPartnerShow_artwork$ref;
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
  "name": "ArtworkContextPartnerShow_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "excludeArtworkIDs",
      "type": "[String!]",
      "defaultValue": null
    }
  ],
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
      "name": "PartnerShowArtworkGrid_artwork",
      "args": [
        {
          "kind": "Variable",
          "name": "excludeArtworkIDs",
          "variableName": "excludeArtworkIDs",
          "type": null
        }
      ]
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
(node as any).hash = '0a41432c29a508d718e9b169ef6db39d';
export default node;
