/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixturesArtistQueryVariables = {
    id: string;
};
export type MockRelayRendererFixturesArtistQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"MockRelayRendererFixtures_artist">;
    } | null;
};
export type MockRelayRendererFixturesArtistQuery = {
    readonly response: MockRelayRendererFixturesArtistQueryResponse;
    readonly variables: MockRelayRendererFixturesArtistQueryVariables;
};



/*
query MockRelayRendererFixturesArtistQuery(
  $id: String!
) {
  artist(id: $id) {
    ...MockRelayRendererFixtures_artist
    id
  }
}

fragment MockRelayRendererFixtures_artist on Artist {
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MockRelayRendererFixturesArtistQuery",
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
            "name": "MockRelayRendererFixtures_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MockRelayRendererFixturesArtistQuery",
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
            "name": "name",
            "args": null,
            "storageKey": null
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
    "name": "MockRelayRendererFixturesArtistQuery",
    "id": null,
    "text": "query MockRelayRendererFixturesArtistQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    ...MockRelayRendererFixtures_artist\n    id\n  }\n}\n\nfragment MockRelayRendererFixtures_artist on Artist {\n  name\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'aabded82722f7ed4c4f873a3d0b315be';
export default node;
