/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _WorksForYouContents_viewer$ref: unique symbol;
export type WorksForYouContents_viewer$ref = typeof _WorksForYouContents_viewer$ref;
export type WorksForYouContents_viewer = {
    readonly me: ({
        readonly followsAndSaves: ({
            readonly notifications: ({
                readonly pageInfo: {
                    readonly hasNextPage: boolean;
                    readonly endCursor: string | null;
                };
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly __id: string;
                        readonly summary: string | null;
                        readonly artists: string | null;
                        readonly artworksConnection: ({
                            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
                        }) | null;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
    }) | null;
    readonly " $refType": WorksForYouContents_viewer$ref;
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
  "name": "WorksForYouContents_viewer",
  "type": "Viewer",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "me",
          "followsAndSaves",
          "notifications"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "me",
      "storageKey": null,
      "args": null,
      "concreteType": "Me",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "followsAndSaves",
          "storageKey": null,
          "args": null,
          "concreteType": "FollowsAndSaves",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": "notifications",
              "name": "__WorksForYou_notifications_connection",
              "storageKey": "__WorksForYou_notifications_connection(sort:\"PUBLISHED_AT_DESC\")",
              "args": [
                {
                  "kind": "Literal",
                  "name": "sort",
                  "value": "PUBLISHED_AT_DESC",
                  "type": "ArtworkSorts"
                }
              ],
              "concreteType": "FollowedArtistsArtworksGroupConnection",
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
                  "concreteType": "FollowedArtistsArtworksGroupEdge",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "node",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "FollowedArtistsArtworksGroup",
                      "plural": false,
                      "selections": [
                        v0,
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "summary",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "artists",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "artworksConnection",
                          "storageKey": null,
                          "args": null,
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
    }
  ]
};
})();
(node as any).hash = '70a43775f36bd66126320b6ded7bc13c';
export default node;
