/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_OverviewQueryRendererQueryVariables = {
    readonly artistID: string;
};
export type routes_OverviewQueryRendererQueryResponse = {
    readonly artist: ({}) | null;
};



/*
query routes_OverviewQueryRendererQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ArtistHeader_artist
    __id
  }
}

fragment ArtistHeader_artist on Artist {
  name
  bio
  carousel {
    images {
      resized(height: 300) {
        url
        width
        height
      }
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
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_OverviewQueryRendererQuery",
  "id": null,
  "text": "query routes_OverviewQueryRendererQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistHeader_artist\n    __id\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  name\n  bio\n  carousel {\n    images {\n      resized(height: 300) {\n        url\n        width\n        height\n      }\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OverviewQueryRendererQuery",
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
            "name": "ArtistHeader_artist",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OverviewQueryRendererQuery",
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
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "bio",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "carousel",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCarousel",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "images",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "resized",
                    "storageKey": "resized(height:300)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 300,
                        "type": "Int"
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "width",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "height",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '66f993cba7ef71fcc29a41bff000d2ee';
export default node;
