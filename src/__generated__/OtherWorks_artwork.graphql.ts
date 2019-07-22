/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
import { RelatedWorksArtworkGrid_artwork$ref } from "./RelatedWorksArtworkGrid_artwork.graphql";
declare const _OtherWorks_artwork$ref: unique symbol;
export type OtherWorks_artwork$ref = typeof _OtherWorks_artwork$ref;
export type OtherWorks_artwork = {
    readonly contextGrids: ReadonlyArray<({
        readonly __typename: string;
        readonly title: string | null;
        readonly ctaTitle: string | null;
        readonly ctaHref: string | null;
        readonly artworks: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                }) | null;
            }) | null> | null;
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
    }) | null> | null;
    readonly id: string;
    readonly _id: string;
    readonly sale: ({
        readonly is_closed: boolean | null;
    }) | null;
    readonly context: ({
        readonly __typename: string;
    }) | null;
    readonly " $fragmentRefs": RelatedWorksArtworkGrid_artwork$ref;
    readonly " $refType": OtherWorks_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
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
      "kind": "LinkedField",
      "alias": null,
      "name": "contextGrids",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": true,
      "selections": [
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "ctaTitle",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "ctaHref",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworks",
          "storageKey": "artworks(first:8)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 8,
              "type": "Int"
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
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    v1,
                    v2
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedWorksArtworkGrid_artwork",
      "args": null
    },
    v1,
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
        v2
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
        v0,
        v2
      ]
    },
    v2
  ]
};
})();
(node as any).hash = '269954e60ada0af3e2a551d25779a5d2';
export default node;
