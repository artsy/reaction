/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { PreviewGridItem_artwork$ref } from "./PreviewGridItem_artwork.graphql";
declare const _MerchandisableArtworks_viewer$ref: unique symbol;
export type MerchandisableArtworks_viewer$ref = typeof _MerchandisableArtworks_viewer$ref;
export type MerchandisableArtworks_viewer = {
    readonly filter_artworks: ({
        readonly __id: string;
        readonly artworks_connection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly " $fragmentRefs": PreviewGridItem_artwork$ref;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
    readonly " $refType": MerchandisableArtworks_viewer$ref;
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
  "name": "MerchandisableArtworks_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "filter_artworks",
      "storageKey": "filter_artworks(aggregations:[\"TOTAL\"],sort:\"-decayed_merch\")",
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ],
          "type": "[ArtworkAggregation]"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "-decayed_merch",
          "type": "String"
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        v0,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworks_connection",
          "storageKey": "artworks_connection(first:10)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 10,
              "type": "Int"
            }
          ],
          "concreteType": "ArtworkConnection",
          "plural": false,
          "selections": [
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
                    {
                      "kind": "FragmentSpread",
                      "name": "PreviewGridItem_artwork",
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
    }
  ]
};
})();
(node as any).hash = '79905c4eb172da9b968160702df1e1a8';
export default node;
