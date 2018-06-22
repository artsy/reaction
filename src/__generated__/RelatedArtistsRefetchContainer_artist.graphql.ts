/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type RelatedArtistsRefetchContainer_artist = {
    readonly id: string;
    readonly related: ({
        readonly artists: ({
            readonly pageInfo: {
                readonly hasNextPage: boolean;
                readonly hasPreviousPage: boolean;
                readonly startCursor: string | null;
                readonly endCursor: string | null;
            };
            readonly pageCursors: ({}) | null;
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly name: string | null;
                    readonly image: ({
                        readonly cropped: ({
                            readonly url: string | null;
                        }) | null;
                    }) | null;
                    readonly formatted_nationality_and_birthday: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
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
  "name": "RelatedArtistsRefetchContainer_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "before",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "kind",
      "type": "RelatedArtistsKind",
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
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "RelatedArtists",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artists",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "after",
              "variableName": "after",
              "type": "String"
            },
            {
              "kind": "Variable",
              "name": "before",
              "variableName": "before",
              "type": "String"
            },
            {
              "kind": "Variable",
              "name": "first",
              "variableName": "first",
              "type": "Int"
            },
            {
              "kind": "Variable",
              "name": "kind",
              "variableName": "kind",
              "type": "RelatedArtistsKind"
            },
            {
              "kind": "Variable",
              "name": "last",
              "variableName": "last",
              "type": "Int"
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
                  "name": "hasPreviousPage",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "startCursor",
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
              "name": "pageCursors",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursors",
              "plural": false,
              "selections": [
                {
                  "kind": "FragmentSpread",
                  "name": "RelayPagination_pageCursors",
                  "args": null
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
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "name",
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
                          "storageKey": "cropped(height:300,width:400)",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "height",
                              "value": 300,
                              "type": "Int!"
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 400,
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
                      "name": "formatted_nationality_and_birthday",
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
    },
    v0
  ]
};
})();
(node as any).hash = 'dd4a0d95d9a117e5f493080fb7f41d0f';
export default node;
