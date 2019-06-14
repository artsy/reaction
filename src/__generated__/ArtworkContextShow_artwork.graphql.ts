/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { PartnerArtworkGrid_artwork$ref } from "./PartnerArtworkGrid_artwork.graphql";
import { PartnerShowArtworkGrid_artwork$ref } from "./PartnerShowArtworkGrid_artwork.graphql";
import { RelatedWorksArtworkGrid_artwork$ref } from "./RelatedWorksArtworkGrid_artwork.graphql";
declare const _ArtworkContextShow_artwork$ref: unique symbol;
export type ArtworkContextShow_artwork$ref = typeof _ArtworkContextShow_artwork$ref;
export type ArtworkContextShow_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly name: string | null;
        readonly href: string | null;
    }) | null;
    readonly " $fragmentRefs": PartnerShowArtworkGrid_artwork$ref & ArtistArtworkGrid_artwork$ref & PartnerArtworkGrid_artwork$ref & RelatedWorksArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextShow_artwork$ref;
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
  "name": "ArtworkContextShow_artwork",
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
      "args": v1
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistArtworkGrid_artwork",
      "args": v1
    },
    {
      "kind": "FragmentSpread",
      "name": "PartnerArtworkGrid_artwork",
      "args": v1
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedWorksArtworkGrid_artwork",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '231df6a202ff3ad81f117a2f80ddb59e';
export default node;
