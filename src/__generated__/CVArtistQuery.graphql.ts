/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type PartnerShowSorts = "CREATED_AT_ASC" | "CREATED_AT_DESC" | "END_AT_ASC" | "END_AT_DESC" | "NAME_ASC" | "NAME_DESC" | "PUBLISH_AT_ASC" | "PUBLISH_AT_DESC" | "START_AT_ASC" | "START_AT_DESC" | "created_at_asc" | "created_at_desc" | "end_at_asc" | "end_at_desc" | "name_asc" | "name_desc" | "publish_at_asc" | "publish_at_desc" | "start_at_asc" | "start_at_desc" | "%future added value";
export type CVArtistQueryVariables = {
    readonly artistID: string;
    readonly first: number;
    readonly sort?: PartnerShowSorts | null;
    readonly at_a_fair?: boolean | null;
    readonly solo_show?: boolean | null;
    readonly is_reference?: boolean | null;
    readonly visible_to_public?: boolean | null;
};
export type CVArtistQueryResponse = {
    readonly artist: ({}) | null;
};



/*
query CVArtistQuery(
  $artistID: String!
  $sort: PartnerShowSorts
  $at_a_fair: Boolean
  $solo_show: Boolean
  $is_reference: Boolean
  $visible_to_public: Boolean
) {
  artist(id: $artistID) {
    ...CVContents_artist_39hiyk
    __id
  }
}

fragment CVContents_artist_39hiyk on Artist {
  id
  showsConnection(first: 10, after: "", sort: $sort, at_a_fair: $at_a_fair, solo_show: $solo_show, is_reference: $is_reference, visible_to_public: $visible_to_public) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        __id
        partner {
          __typename
          ... on ExternalPartner {
            name
            __id
          }
          ... on Partner {
            name
          }
          ... on Node {
            __id
          }
        }
        name
        start_at(format: "YYYY")
        city
        __typename
      }
      cursor
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int!",
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = [
  v4
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CVArtistQuery",
  "id": null,
  "text": "query CVArtistQuery(\n  $artistID: String!\n  $sort: PartnerShowSorts\n  $at_a_fair: Boolean\n  $solo_show: Boolean\n  $is_reference: Boolean\n  $visible_to_public: Boolean\n) {\n  artist(id: $artistID) {\n    ...CVContents_artist_39hiyk\n    __id\n  }\n}\n\nfragment CVContents_artist_39hiyk on Artist {\n  id\n  showsConnection(first: 10, after: \"\", sort: $sort, at_a_fair: $at_a_fair, solo_show: $solo_show, is_reference: $is_reference, visible_to_public: $visible_to_public) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            __id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __id\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        __typename\n      }\n      cursor\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CVArtistQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CVContents_artist",
            "args": [
              {
                "kind": "Variable",
                "name": "at_a_fair",
                "variableName": "at_a_fair",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "is_reference",
                "variableName": "is_reference",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "solo_show",
                "variableName": "solo_show",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "sort",
                "variableName": "sort",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "visible_to_public",
                "variableName": "visible_to_public",
                "type": null
              }
            ]
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CVArtistQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
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
                "kind": "Literal",
                "name": "after",
                "value": "",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "at_a_fair",
                "variableName": "at_a_fair",
                "type": "Boolean"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10,
                "type": "Int"
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
                      v2,
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          v3,
                          v2,
                          {
                            "kind": "InlineFragment",
                            "type": "Partner",
                            "selections": v5
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "ExternalPartner",
                            "selections": v5
                          }
                        ]
                      },
                      v4,
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
                      v3
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
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "showsConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "after",
                "value": "",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "at_a_fair",
                "variableName": "at_a_fair",
                "type": "Boolean"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10,
                "type": "Int"
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
            "handle": "connection",
            "key": "Artist_showsConnection",
            "filters": [
              "sort",
              "at_a_fair",
              "solo_show",
              "is_reference",
              "visible_to_public"
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'f3abb1a914b73a28a0d938638ffc1dd4';
export default node;
