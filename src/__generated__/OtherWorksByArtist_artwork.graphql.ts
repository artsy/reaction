/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _OtherWorksByArtist_artwork$ref: unique symbol;
export type OtherWorksByArtist_artwork$ref = typeof _OtherWorksByArtist_artwork$ref;
export type OtherWorksByArtist_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly name: string | null;
        readonly href: string | null;
        readonly counts: ({
            readonly artworks: any | null;
        }) | null;
        readonly artworks: ({
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
    }) | null;
    readonly " $refType": OtherWorksByArtist_artwork$ref;
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
  "name": "OtherWorksByArtist_artwork",
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
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "counts",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistCounts",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "artworks",
              "args": [
                {
                  "kind": "Literal",
                  "name": "format",
                  "value": "0,0",
                  "type": "String"
                },
                {
                  "kind": "Literal",
                  "name": "label",
                  "value": "work",
                  "type": "String"
                }
              ],
              "storageKey": "artworks(format:\"0,0\",label:\"work\")"
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": "artworks",
          "name": "artworks_connection",
          "storageKey": "artworks_connection(filter:[\"IS_FOR_SALE\"],first:10,sort:\"PUBLISHED_AT_DESC\")",
          "args": [
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
              "value": 10,
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
(node as any).hash = '26b5609a228a441a8c891e0d71fb0071';
export default node;
