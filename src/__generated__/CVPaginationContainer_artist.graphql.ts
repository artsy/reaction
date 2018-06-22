/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type CVPaginationContainer_artist = {
    readonly id: string;
    readonly showsConnection: ({
        readonly pageInfo: {
            readonly hasNextPage: boolean;
        };
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly __id: string;
                readonly partner: ({
                    readonly name?: string | null;
                }) | null;
                readonly name: string | null;
                readonly start_at: string | null;
                readonly city: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  v1
];
return {
  "kind": "Fragment",
  "name": "CVPaginationContainer_artist",
  "type": "Artist",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "showsConnection"
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
      "defaultValue": ""
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "PartnerShowSorts",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "at_a_fair",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "solo_show",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "is_reference",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "visible_to_public",
      "type": "Boolean",
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
      "alias": "showsConnection",
      "name": "__Artist_showsConnection_connection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "at_a_fair",
          "variableName": "at_a_fair",
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "is_reference",
          "variableName": "is_reference",
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "solo_show",
          "variableName": "solo_show",
          "type": "Boolean"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort",
          "type": "PartnerShowSorts"
        },
        {
          "kind": "Variable",
          "name": "visible_to_public",
          "variableName": "visible_to_public",
          "type": "Boolean"
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
                v0,
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "partner",
                  "storageKey": null,
                  "args": null,
                  "concreteType": null,
                  "plural": false,
                  "selections": [
                    v0,
                    {
                      "kind": "InlineFragment",
                      "type": "Partner",
                      "selections": v2
                    },
                    {
                      "kind": "InlineFragment",
                      "type": "ExternalPartner",
                      "selections": v2
                    }
                  ]
                },
                v1,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "start_at",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY",
                      "type": "String"
                    }
                  ],
                  "storageKey": "start_at(format:\"YYYY\")"
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "city",
                  "args": null,
                  "storageKey": null
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
    },
    v0
  ]
};
})();
(node as any).hash = 'ac99d11a148fbc5f05f5385e560b583f';
export default node;
