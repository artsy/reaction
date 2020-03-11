/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ArtistConsignQueryVariables = {
    artistID: string;
};
export type routes_ArtistConsignQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"Consign_artist">;
    } | null;
};
export type routes_ArtistConsignQuery = {
    readonly response: routes_ArtistConsignQueryResponse;
    readonly variables: routes_ArtistConsignQueryVariables;
};



/*
query routes_ArtistConsignQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...Consign_artist
    id
  }
}

fragment Consign_artist on Artist {
  id
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ArtistConsignQuery",
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
            "name": "Consign_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ArtistConsignQuery",
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
    "name": "routes_ArtistConsignQuery",
    "id": null,
    "text": "query routes_ArtistConsignQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...Consign_artist\n    id\n  }\n}\n\nfragment Consign_artist on Artist {\n  id\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '2d225407b999731dbb63f27b3fe666c4';
export default node;
