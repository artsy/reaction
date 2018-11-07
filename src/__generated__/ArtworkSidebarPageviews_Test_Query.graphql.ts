/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarPageviews_artwork$ref } from "./ArtworkSidebarPageviews_artwork.graphql";
export type ArtworkSidebarPageviews_Test_QueryVariables = {};
export type ArtworkSidebarPageviews_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebarPageviews_artwork$ref;
    }) | null;
};
export type ArtworkSidebarPageviews_Test_Query = {
    readonly response: ArtworkSidebarPageviews_Test_QueryResponse;
    readonly variables: ArtworkSidebarPageviews_Test_QueryVariables;
};



/*
query ArtworkSidebarPageviews_Test_Query {
  artwork(id: "blah") {
    ...ArtworkSidebarPageviews_artwork
    __id
  }
}

fragment ArtworkSidebarPageviews_artwork on Artwork {
  id
  pageviews
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "blah",
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
  "name": "ArtworkSidebarPageviews_Test_Query",
  "id": null,
  "text": "query ArtworkSidebarPageviews_Test_Query {\n  artwork(id: \"blah\") {\n    ...ArtworkSidebarPageviews_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebarPageviews_artwork on Artwork {\n  id\n  pageviews\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarPageviews_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"blah\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarPageviews_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarPageviews_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"blah\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "pageviews",
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
(node as any).hash = '414090390164eefa7cce869c8dd4c20a';
export default node;
