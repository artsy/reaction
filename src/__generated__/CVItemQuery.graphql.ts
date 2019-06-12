/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CVItem_artist$ref } from "./CVItem_artist.graphql";
export type PartnerShowSorts = "CREATED_AT_ASC" | "CREATED_AT_DESC" | "END_AT_ASC" | "END_AT_DESC" | "NAME_ASC" | "NAME_DESC" | "PARTNER_ASC" | "PUBLISH_AT_ASC" | "PUBLISH_AT_DESC" | "START_AT_ASC" | "START_AT_DESC" | "created_at_asc" | "created_at_desc" | "end_at_asc" | "end_at_desc" | "name_asc" | "name_desc" | "publish_at_asc" | "publish_at_desc" | "start_at_asc" | "start_at_desc" | "%future added value";
export type CVItemQueryVariables = {
    readonly count?: number | null;
    readonly cursor?: string | null;
    readonly artistID: string;
    readonly sort?: PartnerShowSorts | null;
    readonly at_a_fair?: boolean | null;
    readonly solo_show?: boolean | null;
    readonly is_reference?: boolean | null;
    readonly visible_to_public?: boolean | null;
};
export type CVItemQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": CVItem_artist$ref;
    } | null;
};
export type CVItemQuery = {
    readonly response: CVItemQueryResponse;
    readonly variables: CVItemQueryVariables;
};



/*
query CVItemQuery(
  $count: Int
  $cursor: String
  $artistID: String!
  $sort: PartnerShowSorts
  $at_a_fair: Boolean
  $solo_show: Boolean
  $is_reference: Boolean
  $visible_to_public: Boolean
) {
  artist(id: $artistID) {
    ...CVItem_artist_2utmRv
    id
  }
}

fragment CVItem_artist_2utmRv on Artist {
  id
  showsConnection(first: $count, after: $cursor, sort: $sort, at_a_fair: $at_a_fair, solo_show: $solo_show, is_reference: $is_reference, visible_to_public: $visible_to_public) {
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
            id
          }
          ... on Partner {
            name
            href
          }
        }
        name
        start_at(format: "YYYY")
        city
        href
        id
        __typename
      }
      cursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
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
    "variableName": "artistID"
  }
],
v2 = {
  "kind": "Variable",
  "name": "at_a_fair",
  "variableName": "at_a_fair"
},
v3 = {
  "kind": "Variable",
  "name": "is_reference",
  "variableName": "is_reference"
},
v4 = {
  "kind": "Variable",
  "name": "solo_show",
  "variableName": "solo_show"
},
v5 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v6 = {
  "kind": "Variable",
  "name": "visible_to_public",
  "variableName": "visible_to_public"
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CVItemQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CVItem_artist",
            "args": [
              (v2/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CVItemQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "showsConnection",
            "storageKey": null,
            "args": (v8/*: any*/),
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
                          (v9/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "ExternalPartner",
                            "selections": [
                              (v10/*: any*/),
                              (v7/*: any*/)
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Partner",
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/)
                            ]
                          },
                          {
                            "kind": "ClientExtension",
                            "selections": [
                              (v7/*: any*/)
                            ]
                          }
                        ]
                      },
                      (v10/*: any*/),
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
                      (v11/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/)
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
            "args": (v8/*: any*/),
            "handle": "connection",
            "key": "Artist_showsConnection",
            "filters": [
              "sort",
              "at_a_fair",
              "solo_show",
              "is_reference",
              "visible_to_public"
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CVItemQuery",
    "id": null,
    "text": "query CVItemQuery(\n  $count: Int\n  $cursor: String\n  $artistID: String!\n  $sort: PartnerShowSorts\n  $at_a_fair: Boolean\n  $solo_show: Boolean\n  $is_reference: Boolean\n  $visible_to_public: Boolean\n) {\n  artist(id: $artistID) {\n    ...CVItem_artist_2utmRv\n    id\n  }\n}\n\nfragment CVItem_artist_2utmRv on Artist {\n  id\n  showsConnection(first: $count, after: $cursor, sort: $sort, at_a_fair: $at_a_fair, solo_show: $solo_show, is_reference: $is_reference, visible_to_public: $visible_to_public) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        href\n        id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '0b1a3246fdd41a497dffb3b7697f5422';
export default node;
