/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _ArtistArtworkGrid_artwork$ref: unique symbol;
export type ArtistArtworkGrid_artwork$ref = typeof _ArtistArtworkGrid_artwork$ref;
export type ArtistArtworkGrid_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly name: string | null;
        readonly href: string | null;
        readonly artworks_connection: ({
            readonly edges: ReadonlyArray<({
                readonly __typename: string;
            }) | null> | null;
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
    }) | null;
    readonly " $refType": ArtistArtworkGrid_artwork$ref;
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
  "name": "ArtistArtworkGrid_artwork",
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
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworks_connection",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "exclude",
              "variableName": "excludeArtworkIDs",
              "type": "[String]"
            },
            {
              "kind": "Literal",
              "name": "filter",
              "value": [
                "IS_FOR_SALE"
              ],
              "type": "[ArtistArtworksFilters]"
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 8,
              "type": "Int"
            },
            {
              "kind": "Literal",
              "name": "sort",
              "value": "PUBLISHED_AT_DESC",
              "type": "ArtworkSorts"
            }
          ],
          "concreteType": "ArtworkConnection",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks",
              "args": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtworkEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '3ab6b39037f468a9ccdceb322dfa9c69';
export default node;
