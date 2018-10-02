/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { MockRelayRenderer_artist$ref } from "./MockRelayRenderer_artist.graphql";
export type MockRelayRendererArtistQueryVariables = {
    readonly id: string;
};
export type MockRelayRendererArtistQueryResponse = {
    readonly artist: ({
        readonly " $fragmentRefs": MockRelayRenderer_artist$ref;
    }) | null;
};
export type MockRelayRendererArtistQuery = {
    readonly response: MockRelayRendererArtistQueryResponse;
    readonly variables: MockRelayRendererArtistQueryVariables;
};



/*
query MockRelayRendererArtistQuery(
  $id: String!
) {
  artist(id: $id) {
    ...MockRelayRenderer_artist
    __id
  }
}

fragment MockRelayRenderer_artist on Artist {
  name
  __id
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
    "variableName": "id",
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
  "name": "MockRelayRendererArtistQuery",
  "id": null,
  "text": "query MockRelayRendererArtistQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    ...MockRelayRenderer_artist\n    __id\n  }\n}\n\nfragment MockRelayRenderer_artist on Artist {\n  name\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "MockRelayRendererArtistQuery",
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
            "name": "MockRelayRenderer_artist",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MockRelayRendererArtistQuery",
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
(node as any).hash = 'c57c3cdf26e19ee362b094ed0c2c0f1b';
export default node;
