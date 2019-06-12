/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _CVItem_artist$ref: unique symbol;
export type CVItem_artist$ref = typeof _CVItem_artist$ref;
export type CVItem_artist = {
    readonly id: string;
    readonly showsConnection: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly __id: string;
                readonly partner: ({
                    readonly name?: string | null;
                    readonly href?: string | null;
                } & ({
                    readonly name: string | null;
                } | {
                    readonly href: string | null;
                } | {
                    /*This will never be '% other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                })) | null;
                readonly name: string | null;
                readonly start_at: string | null;
                readonly city: string | null;
                readonly href: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": CVItem_artist$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "CVItem_artist",
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
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "PartnerShowSorts",
      "defaultValue": "start_at_desc"
    },
    {
      "kind": "LocalArgument",
      "name": "at_a_fair",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "solo_show",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "is_reference",
      "type": "Boolean",
      "defaultValue": true
    },
    {
      "kind": "LocalArgument",
      "name": "visible_to_public",
      "type": "Boolean",
      "defaultValue": false
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
          "variableName": "at_a_fair"
        },
        {
          "kind": "Variable",
          "name": "is_reference",
          "variableName": "is_reference"
        },
        {
          "kind": "Variable",
          "name": "solo_show",
          "variableName": "solo_show"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        },
        {
          "kind": "Variable",
          "name": "visible_to_public",
          "variableName": "visible_to_public"
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
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "partner",
                  "storageKey": null,
                  "args": null,
                  "concreteType": null,
                  "plural": false,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "type": "ExternalPartner",
                      "selections": [
                        (v0/*: any*/)
                      ]
                    },
                    {
                      "kind": "InlineFragment",
                      "type": "Partner",
                      "selections": [
                        (v0/*: any*/),
                        (v1/*: any*/)
                      ]
                    }
                  ]
                },
                (v0/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "start_at",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY"
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
                (v1/*: any*/),
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
};
})();
(node as any).hash = 'efd1928bb5d5bdcdca9ef11bd2849976';
export default node;
