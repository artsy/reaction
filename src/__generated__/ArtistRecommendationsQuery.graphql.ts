/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistRecommendations_artist$ref } from "./ArtistRecommendations_artist.graphql";
export type ArtistRecommendationsQueryVariables = {
    readonly artistID: string;
};
export type ArtistRecommendationsQueryResponse = {
    readonly artist: ({
        readonly " $fragmentRefs": ArtistRecommendations_artist$ref;
    }) | null;
};
export type ArtistRecommendationsQuery = {
    readonly response: ArtistRecommendationsQueryResponse;
    readonly variables: ArtistRecommendationsQueryVariables;
};



/*
query ArtistRecommendationsQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ArtistRecommendations_artist
    __id
  }
}

fragment ArtistRecommendations_artist on Artist {
  name
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
  "name": "ArtistRecommendationsQuery",
  "id": null,
  "text": "query ArtistRecommendationsQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistRecommendations_artist\n    __id\n  }\n}\n\nfragment ArtistRecommendations_artist on Artist {\n  name\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistRecommendationsQuery",
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
            "name": "ArtistRecommendations_artist",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistRecommendationsQuery",
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
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '3cded3bd6674dbb310f817562a3ba41f';
export default node;
