/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSharePanel_artwork$ref } from "./ArtworkSharePanel_artwork.graphql";
export type ArtworkSharePanel_Test_QueryVariables = {};
export type ArtworkSharePanel_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSharePanel_artwork$ref;
    }) | null;
};
export type ArtworkSharePanel_Test_Query = {
    readonly response: ArtworkSharePanel_Test_QueryResponse;
    readonly variables: ArtworkSharePanel_Test_QueryVariables;
};



/*
query ArtworkSharePanel_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSharePanel_artwork
    __id
  }
}

fragment ArtworkSharePanel_artwork on Artwork {
  href
  images {
    url
  }
  artworkMeta: meta {
    description
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85",
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
  "name": "ArtworkSharePanel_Test_Query",
  "id": null,
  "text": "query ArtworkSharePanel_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSharePanel_artwork\n    __id\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    description\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSharePanel_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSharePanel_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSharePanel_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "href",
            "args": null,
            "storageKey": null
          },
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
            "alias": "artworkMeta",
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "description",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'dd674960d9388757b4eb264d249ab3f8';
export default node;
