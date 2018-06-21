/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ShowContents_artist = {
    readonly id: string;
    readonly showsConnection: ({
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
                readonly partner: ({
                    readonly name?: string | null;
                }) | null;
                readonly name: string | null;
                readonly exhibition_period: string | null;
                readonly cover_image: ({
                    readonly cropped: ({
                        readonly url: string | null;
                    }) | null;
                }) | null;
                readonly city: string | null;
            }) | null;
        }) | null> | null;
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
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  v2
];
return {
  "kind": "Fragment",
  "name": "ShowContents_artist",
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
      "name": "sort",
      "type": "PartnerShowSorts",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "status",
      "type": "String",
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
      "name": "showsConnection",
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
          "name": "last",
          "variableName": "last",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort",
          "type": "PartnerShowSorts"
        },
        {
          "kind": "Variable",
          "name": "status",
          "variableName": "status",
          "type": "String"
        }
      ],
      "concreteType": "ShowConnection",
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
          "concreteType": "ShowEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Show",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "partner",
                  "storageKey": null,
                  "args": null,
                  "concreteType": null,
                  "plural": false,
                  "selections": [
                    v1,
                    {
                      "kind": "InlineFragment",
                      "type": "Partner",
                      "selections": v3
                    },
                    {
                      "kind": "InlineFragment",
                      "type": "ExternalPartner",
                      "selections": v3
                    }
                  ]
                },
                v2,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "exhibition_period",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "cover_image",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "cropped",
                      "storageKey": "cropped(height:600,width:800)",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 600,
                          "type": "Int!"
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 800,
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
                  "name": "city",
                  "args": null,
                  "storageKey": null
                },
                v1
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
(node as any).hash = '8dc9a92909f545d0b1cb8b6153bf9f61';
export default node;
