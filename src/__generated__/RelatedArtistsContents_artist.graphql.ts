/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type RelatedArtistsContents_artist = {
    readonly id: string;
    readonly related: ({
        readonly artists: ({
            readonly pageInfo: {
                readonly hasNextPage: boolean;
                readonly hasPreviousPage: boolean;
                readonly startCursor: string | null;
                readonly endCursor: string | null;
            };
            readonly pageCursors: ({
                readonly around: ReadonlyArray<{
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }>;
                readonly first: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
                readonly last: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
            }) | null;
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
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cursor",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "page",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "RelatedArtistsContents_artist",
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
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "around",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "PageCursor",
                  "plural": true,
                  "selections": v0
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "first",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "PageCursor",
                  "plural": false,
                  "selections": v0
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "last",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "PageCursor",
                  "plural": false,
                  "selections": v0
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
                    v1
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    v1
  ]
};
})();
(node as any).hash = '24277ce777f3b70a4f06a1dcc05cfcb5';
export default node;
