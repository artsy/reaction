/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CV_viewer$ref } from "./CV_viewer.graphql";
export type routes_CVQueryVariables = {
    readonly artistID: string;
};
export type routes_CVQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": CV_viewer$ref;
    }) | null;
};
export type routes_CVQuery = {
    readonly response: routes_CVQueryResponse;
    readonly variables: routes_CVQueryVariables;
};



/*
query routes_CVQuery(
  $artistID: String!
) {
  viewer {
    ...CV_viewer
  }
}

fragment CV_viewer on Viewer {
  artist_soloShows: artist(id: $artistID) {
    ...CVItem_artist_3NSfvL
    __id
  }
  artist_groupShows: artist(id: $artistID) {
    ...CVItem_artist_3yzB0w
    __id
  }
  artist_fairBooths: artist(id: $artistID) {
    ...CVItem_artist_37CQKT
    __id
  }
}

fragment CVItem_artist_3NSfvL on Artist {
  id
  showsConnection(first: 10, sort: start_at_desc, at_a_fair: false, solo_show: true, is_reference: true, visible_to_public: false) {
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
            href
          }
          ... on Node {
            __id
          }
        }
        name
        start_at(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
  __id
}

fragment CVItem_artist_3yzB0w on Artist {
  id
  showsConnection(first: 10, sort: start_at_desc, at_a_fair: false, solo_show: false, is_reference: true, visible_to_public: false) {
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
            href
          }
          ... on Node {
            __id
          }
        }
        name
        start_at(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
  __id
}

fragment CVItem_artist_37CQKT on Artist {
  id
  showsConnection(first: 10, sort: start_at_desc, at_a_fair: true, solo_show: false, is_reference: true, visible_to_public: false) {
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
            href
          }
          ... on Node {
            __id
          }
        }
        name
        start_at(format: "YYYY")
        city
        href
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "at_a_fair",
  "value": false,
  "type": "Boolean"
},
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 10,
  "type": "Int"
},
v5 = {
  "kind": "Literal",
  "name": "is_reference",
  "value": true,
  "type": "Boolean"
},
v6 = {
  "kind": "Literal",
  "name": "sort",
  "value": "start_at_desc",
  "type": "PartnerShowSorts"
},
v7 = {
  "kind": "Literal",
  "name": "visible_to_public",
  "value": false,
  "type": "Boolean"
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
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
},
v12 = [
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
          v8,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v9,
              v8,
              {
                "kind": "InlineFragment",
                "type": "ExternalPartner",
                "selections": [
                  v10
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  v10,
                  v11
                ]
              }
            ]
          },
          v10,
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
          v11,
          v9
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
],
v13 = {
  "kind": "Literal",
  "name": "solo_show",
  "value": false,
  "type": "Boolean"
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_CVQuery",
  "id": null,
  "text": "query routes_CVQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...CV_viewer\n  }\n}\n\nfragment CV_viewer on Viewer {\n  artist_soloShows: artist(id: $artistID) {\n    ...CVItem_artist_3NSfvL\n    __id\n  }\n  artist_groupShows: artist(id: $artistID) {\n    ...CVItem_artist_3yzB0w\n    __id\n  }\n  artist_fairBooths: artist(id: $artistID) {\n    ...CVItem_artist_37CQKT\n    __id\n  }\n}\n\nfragment CVItem_artist_3NSfvL on Artist {\n  id\n  showsConnection(first: 10, sort: start_at_desc, at_a_fair: false, solo_show: true, is_reference: true, visible_to_public: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            __id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __id\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n  __id\n}\n\nfragment CVItem_artist_3yzB0w on Artist {\n  id\n  showsConnection(first: 10, sort: start_at_desc, at_a_fair: false, solo_show: false, is_reference: true, visible_to_public: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            __id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __id\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n  __id\n}\n\nfragment CVItem_artist_37CQKT on Artist {\n  id\n  showsConnection(first: 10, sort: start_at_desc, at_a_fair: true, solo_show: false, is_reference: true, visible_to_public: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            __id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __id\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_CVQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CV_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_CVQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "artist_soloShows",
            "name": "artist",
            "storageKey": null,
            "args": v1,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(at_a_fair:false,first:10,is_reference:true,solo_show:true,sort:\"start_at_desc\",visible_to_public:false)",
                "args": [
                  v3,
                  v4,
                  v5,
                  {
                    "kind": "Literal",
                    "name": "solo_show",
                    "value": true,
                    "type": "Boolean"
                  },
                  v6,
                  v7
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": v12
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": [
                  v3,
                  v4,
                  v5,
                  {
                    "kind": "Literal",
                    "name": "solo_show",
                    "value": true,
                    "type": "Boolean"
                  },
                  v6,
                  v7
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
              v8
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_groupShows",
            "name": "artist",
            "storageKey": null,
            "args": v1,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(at_a_fair:false,first:10,is_reference:true,solo_show:false,sort:\"start_at_desc\",visible_to_public:false)",
                "args": [
                  v3,
                  v4,
                  v5,
                  v13,
                  v6,
                  v7
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": v12
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": [
                  v3,
                  v4,
                  v5,
                  v13,
                  v6,
                  v7
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
              v8
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_fairBooths",
            "name": "artist",
            "storageKey": null,
            "args": v1,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(at_a_fair:true,first:10,is_reference:true,solo_show:false,sort:\"start_at_desc\",visible_to_public:false)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "at_a_fair",
                    "value": true,
                    "type": "Boolean"
                  },
                  v4,
                  v5,
                  v13,
                  v6,
                  v7
                ],
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": v12
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "at_a_fair",
                    "value": true,
                    "type": "Boolean"
                  },
                  v4,
                  v5,
                  v13,
                  v6,
                  v7
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
              v8
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      }
    ]
  }
};
})();
(node as any).hash = '0d19d6e79f51852c6aff6bc82562eeb8';
export default node;
