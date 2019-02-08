/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _MerchandisableArtworks_viewer$ref: unique symbol;
export type MerchandisableArtworks_viewer$ref = typeof _MerchandisableArtworks_viewer$ref;
export type MerchandisableArtworks_viewer = {
    readonly filter_artworks: ({
        readonly __id: string;
        readonly artworks_connection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly title: string | null;
                    readonly artist_names: string | null;
                    readonly image: ({
                        readonly cropped: ({
                            readonly url: string | null;
                        }) | null;
                    }) | null;
                    readonly date: string | null;
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
          "storageKey": "artworks_connection(first:8)",
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
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "title",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "artist_names",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "image",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "cropped",
                          "storageKey": "cropped(height:40,width:40)",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "height",
                              "value": 40,
                              "type": "Int!"
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 40,
                              "type": "Int!"
                            }
                          ],
                          "concreteType": "CroppedImageUrl",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "url",
                              "args": null,
                              "storageKey": null
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "date",
                      "args": null,
                      "storageKey": null
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
(node as any).hash = 'ac574c66ce17df1ec6783a69504f80f3';
export default node;
