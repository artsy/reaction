/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CV_viewer$ref } from "./CV_viewer.graphql";
export type CV_Test_QueryVariables = {
    readonly artistID: string;
};
export type CV_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": CV_viewer$ref;
    } | null;
};
export type CV_Test_Query = {
    readonly response: CV_Test_QueryResponse;
    readonly variables: CV_Test_QueryVariables;
};



/*
query CV_Test_Query(
  $artistID: String!
) {
  viewer {
    ...CV_viewer
  }
}

fragment CV_viewer on Viewer {
  artist_soloShows: artist(id: $artistID) {
    ...CVItem_artist_3NSfvL
    id
  }
  artist_groupShows: artist(id: $artistID) {
    ...CVItem_artist_3yzB0w
    id
  }
  artist_fairBooths: artist(id: $artistID) {
    ...CVItem_artist_37CQKT
    id
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
    "name": "artistID",
    "type": "String!",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "at_a_fair",
  "value": false
},
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v5 = {
  "kind": "Literal",
  "name": "is_reference",
  "value": true
},
v6 = {
  "kind": "Literal",
  "name": "sort",
  "value": "start_at_desc"
},
v7 = {
  "kind": "Literal",
  "name": "visible_to_public",
  "value": false
},
v8 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "solo_show",
    "value": true
  },
  (v6/*: any*/),
  (v7/*: any*/)
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
                  (v2/*: any*/)
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
                  (v2/*: any*/)
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
          (v2/*: any*/),
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
],
v13 = [
  "sort",
  "at_a_fair",
  "solo_show",
  "is_reference",
  "visible_to_public"
],
v14 = {
  "kind": "Literal",
  "name": "solo_show",
  "value": false
},
v15 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v14/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v16 = [
  {
    "kind": "Literal",
    "name": "at_a_fair",
    "value": true
  },
  (v4/*: any*/),
  (v5/*: any*/),
  (v14/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CV_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
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
    "name": "CV_Test_Query",
    "argumentDefinitions": (v0/*: any*/),
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
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(at_a_fair:false,first:10,is_reference:true,solo_show:true,sort:\"start_at_desc\",visible_to_public:false)",
                "args": (v8/*: any*/),
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v12/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": (v8/*: any*/),
                "handle": "connection",
                "key": "Artist_showsConnection",
                "filters": (v13/*: any*/)
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_groupShows",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(at_a_fair:false,first:10,is_reference:true,solo_show:false,sort:\"start_at_desc\",visible_to_public:false)",
                "args": (v15/*: any*/),
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v12/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": (v15/*: any*/),
                "handle": "connection",
                "key": "Artist_showsConnection",
                "filters": (v13/*: any*/)
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_fairBooths",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(at_a_fair:true,first:10,is_reference:true,solo_show:false,sort:\"start_at_desc\",visible_to_public:false)",
                "args": (v16/*: any*/),
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v12/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": (v16/*: any*/),
                "handle": "connection",
                "key": "Artist_showsConnection",
                "filters": (v13/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CV_Test_Query",
    "id": null,
    "text": "query CV_Test_Query(\n  $artistID: String!\n) {\n  viewer {\n    ...CV_viewer\n  }\n}\n\nfragment CV_viewer on Viewer {\n  artist_soloShows: artist(id: $artistID) {\n    ...CVItem_artist_3NSfvL\n    id\n  }\n  artist_groupShows: artist(id: $artistID) {\n    ...CVItem_artist_3yzB0w\n    id\n  }\n  artist_fairBooths: artist(id: $artistID) {\n    ...CVItem_artist_37CQKT\n    id\n  }\n}\n\nfragment CVItem_artist_3NSfvL on Artist {\n  id\n  showsConnection(first: 10, sort: start_at_desc, at_a_fair: false, solo_show: true, is_reference: true, visible_to_public: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        href\n        id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment CVItem_artist_3yzB0w on Artist {\n  id\n  showsConnection(first: 10, sort: start_at_desc, at_a_fair: false, solo_show: false, is_reference: true, visible_to_public: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        href\n        id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment CVItem_artist_37CQKT on Artist {\n  id\n  showsConnection(first: 10, sort: start_at_desc, at_a_fair: true, solo_show: false, is_reference: true, visible_to_public: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n        }\n        name\n        start_at(format: \"YYYY\")\n        city\n        href\n        id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '24a16a211d8569785b3d9c26862fbc99';
export default node;
