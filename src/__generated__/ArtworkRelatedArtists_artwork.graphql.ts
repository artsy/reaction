/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistCard_artist$ref } from "./ArtistCard_artist.graphql";
declare const _ArtworkRelatedArtists_artwork$ref: unique symbol;
export type ArtworkRelatedArtists_artwork$ref = typeof _ArtworkRelatedArtists_artwork$ref;
export type ArtworkRelatedArtists_artwork = {
    readonly artist: ({
        readonly related: ({
            readonly artists: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly " $fragmentRefs": ArtistCard_artist$ref;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
    }) | null;
    readonly " $refType": ArtworkRelatedArtists_artwork$ref;
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
  "name": "ArtworkRelatedArtists_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
          "kind": "LinkedField",
          "alias": null,
          "name": "related",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistRelatedData",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "artists",
              "storageKey": "artists(first:4,kind:\"MAIN\")",
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 4,
                  "type": "Int"
                },
                {
                  "kind": "Literal",
                  "name": "kind",
                  "value": "MAIN",
                  "type": "RelatedArtistsKind"
                }
              ],
              "concreteType": "ArtistConnection",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "edges",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ArtistEdge",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "node",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Artist",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "FragmentSpread",
                          "name": "ArtistCard_artist",
                          "args": null
                        },
                        v0
                      ]
                    }
                  ]
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
(node as any).hash = '913e8714cddf8f087d66b3df5a04de8f';
export default node;
