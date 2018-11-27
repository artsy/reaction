/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { AuctionArtworkGrid_artwork$ref } from "./AuctionArtworkGrid_artwork.graphql";
declare const _ArtworkContextAuction_artwork$ref: unique symbol;
export type ArtworkContextAuction_artwork$ref = typeof _ArtworkContextAuction_artwork$ref;
export type ArtworkContextAuction_artwork = {
    readonly sale: ({
        readonly href: string | null;
        readonly is_closed: boolean | null;
    }) | null;
    readonly " $fragmentRefs": AuctionArtworkGrid_artwork$ref & ArtistArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextAuction_artwork$ref;
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
  "name": "ArtworkContextAuction_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "isClosed",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "excludeArtworkIDs",
      "type": "[String!]",
      "defaultValue": null
    }
  ],
  "selections": [
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
          "name": "href",
          "args": null,
          "storageKey": null
        },
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
    v0,
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "isClosed",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistArtworkGrid_artwork",
          "args": null
        }
      ]
    },
    {
      "kind": "Condition",
      "passingValue": false,
      "condition": "isClosed",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "AuctionArtworkGrid_artwork",
          "args": [
            {
              "kind": "Variable",
              "name": "excludeArtworkIDs",
              "variableName": "excludeArtworkIDs",
              "type": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '77bf053375e82c5c7467f2d42aef1ec1';
export default node;
