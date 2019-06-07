/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistCard_artist$ref } from "./ArtistCard_artist.graphql";
declare const _ArtworkRelatedArtists_artwork$ref: unique symbol;
export type ArtworkRelatedArtists_artwork$ref = typeof _ArtworkRelatedArtists_artwork$ref;
export type ArtworkRelatedArtists_artwork = {
    readonly id: string;
    readonly artist: ({
        readonly href: string | null;
        readonly related: ({
            readonly artists: ({
                readonly pageInfo: {
                    readonly hasNextPage: boolean;
                };
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
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "artist",
          "related",
          "artists"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 4
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": ""
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
          "name": "href",
          "args": null,
          "storageKey": null
        },
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
              "alias": "artists",
              "name": "__ArtworkRelatedArtists_artists_connection",
              "storageKey": "__ArtworkRelatedArtists_artists_connection(kind:\"MAIN\")",
              "args": [
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
                  "name": "pageInfo",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "PageInfo",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "hasNextPage",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "endCursor",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
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
                        v0,
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "__typename",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "cursor",
                      "args": null,
                      "storageKey": null
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
(node as any).hash = '5ec9d018d7422592fa838f8cd78ab245';
export default node;
