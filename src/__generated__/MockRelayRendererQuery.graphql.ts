/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { MockRelayRenderer_artwork$ref } from "./MockRelayRenderer_artwork.graphql";
export type MockRelayRendererQueryVariables = {};
export type MockRelayRendererQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": MockRelayRenderer_artwork$ref;
    }) | null;
};
export type MockRelayRendererQuery = {
    readonly response: MockRelayRendererQueryResponse;
    readonly variables: MockRelayRendererQueryVariables;
};



/*
query MockRelayRendererQuery {
  artwork(id: "mona-lisa") {
    ...MockRelayRenderer_artwork
    __id
  }
}

fragment MockRelayRenderer_artwork on Artwork {
  image {
    url
  }
  artist {
    id
    __id
  }
  ...MockRelayRenderer_artworkMetadata
  __id
}

fragment MockRelayRenderer_artworkMetadata on Artwork {
  title
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "mona-lisa",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "MockRelayRendererQuery",
  "id": null,
  "text": "query MockRelayRendererQuery {\n  artwork(id: \"mona-lisa\") {\n    ...MockRelayRenderer_artwork\n    __id\n  }\n}\n\nfragment MockRelayRenderer_artwork on Artwork {\n  image {\n    url\n  }\n  artist {\n    id\n    __id\n  }\n  ...MockRelayRenderer_artworkMetadata\n  __id\n}\n\nfragment MockRelayRenderer_artworkMetadata on Artwork {\n  title\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "MockRelayRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"mona-lisa\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MockRelayRenderer_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MockRelayRendererQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"mona-lisa\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
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
              v1
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '967365b431eab64ccdae135e84b58263';
export default node;
