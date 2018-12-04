/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { PartnerShowArtworkGrid_artwork$ref } from "./PartnerShowArtworkGrid_artwork.graphql";
declare const _ArtworkContextArtist_artwork$ref: unique symbol;
export type ArtworkContextArtist_artwork$ref = typeof _ArtworkContextArtist_artwork$ref;
export type ArtworkContextArtist_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly name: string | null;
        readonly href: string | null;
    }) | null;
    readonly " $fragmentRefs": ArtistArtworkGrid_artwork$ref & PartnerShowArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextArtist_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Variable",
    "name": "excludeArtworkIDs",
    "variableName": "excludeArtworkIDs",
    "type": null
  }
];
return {
  "kind": "Fragment",
  "name": "ArtworkContextArtist_artwork",
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
      "name": "ArtistArtworkGrid_artwork",
      "args": v1
    },
    {
      "kind": "FragmentSpread",
      "name": "PartnerShowArtworkGrid_artwork",
      "args": v1
    },
    v0
  ]
};
})();
(node as any).hash = '4113328173f27ffadf30be3da754e4ea';
export default node;
