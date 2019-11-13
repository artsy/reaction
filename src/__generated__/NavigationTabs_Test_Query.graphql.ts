/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_Test_QueryVariables = {};
export type NavigationTabs_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_artist">;
    } | null;
};
export type NavigationTabs_Test_QueryRawResponse = {
    readonly artist: ({
        readonly slug: string;
        readonly statuses: ({
            readonly shows: boolean | null;
            readonly articles: boolean | null;
            readonly cv: boolean | null;
            readonly auction_lots: boolean | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type NavigationTabs_Test_Query = {
    readonly response: NavigationTabs_Test_QueryResponse;
    readonly variables: NavigationTabs_Test_QueryVariables;
    readonly rawResponse: NavigationTabs_Test_QueryRawResponse;
};



/*
query NavigationTabs_Test_Query {
  artist(id: "pablo-picasso") {
    ...NavigationTabs_artist
    id
  }
}

fragment NavigationTabs_artist on Artist {
  slug
  statuses {
    shows
    articles
    cv(minShowCount: 0)
    auction_lots: auctionLots
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "pablo-picasso"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NavigationTabs_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"pablo-picasso\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "NavigationTabs_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NavigationTabs_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"pablo-picasso\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "statuses",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "shows",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "articles",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cv",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "minShowCount",
                    "value": 0
                  }
                ],
                "storageKey": "cv(minShowCount:0)"
              },
              {
                "kind": "ScalarField",
                "alias": "auction_lots",
                "name": "auctionLots",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "NavigationTabs_Test_Query",
    "id": null,
    "text": "query NavigationTabs_Test_Query {\n  artist(id: \"pablo-picasso\") {\n    ...NavigationTabs_artist\n    id\n  }\n}\n\nfragment NavigationTabs_artist on Artist {\n  slug\n  statuses {\n    shows\n    articles\n    cv(minShowCount: 0)\n    auction_lots: auctionLots\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '69fd01c45ad1df3f4f5afc14102aefe5';
export default node;
