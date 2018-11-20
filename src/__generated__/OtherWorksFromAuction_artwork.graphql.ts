/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _OtherWorksFromAuction_artwork$ref: unique symbol;
export type OtherWorksFromAuction_artwork$ref = typeof _OtherWorksFromAuction_artwork$ref;
export type OtherWorksFromAuction_artwork = {
    readonly context: ({
        readonly artworks?: ReadonlyArray<({
            readonly id: string;
        }) | null> | null;
        readonly eligible_sale_artworks_count?: number | null;
        readonly end_at?: string | null;
        readonly href?: string | null;
        readonly is_closed?: boolean | null;
        readonly is_live_open?: boolean | null;
        readonly is_preview?: boolean | null;
        readonly live_start_at?: string | null;
        readonly name?: string | null;
        readonly start_at?: string | null;
        readonly status?: string | null;
    }) | null;
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
    readonly " $refType": OtherWorksFromAuction_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "OtherWorksFromAuction_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
        {
          "kind": "InlineFragment",
          "type": "ArtworkContextAuction",
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "is_live_open",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "artworks",
              "storageKey": "artworks(size:10)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "size",
                  "value": 10,
                  "type": "Int"
                }
              ],
              "concreteType": "Artwork",
              "plural": true,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
                v0
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "end_at",
              "args": null,
              "storageKey": null
            },
            v1,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "is_closed",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "eligible_sale_artworks_count",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "is_preview",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "live_start_at",
              "args": null,
              "storageKey": null
            },
            v2,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "start_at",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "status",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
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
        v2,
        v1,
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
(node as any).hash = 'f8e2f104a9540ac7f78c8fbbd2e4f42f';
export default node;
