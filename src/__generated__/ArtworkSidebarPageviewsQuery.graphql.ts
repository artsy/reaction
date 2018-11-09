/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarPageviews_artwork$ref } from "./ArtworkSidebarPageviews_artwork.graphql";
export type ArtworkSidebarPageviewsQueryVariables = {
    readonly artworkID: string;
};
export type ArtworkSidebarPageviewsQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebarPageviews_artwork$ref;
    }) | null;
};
export type ArtworkSidebarPageviewsQuery = {
    readonly response: ArtworkSidebarPageviewsQueryResponse;
    readonly variables: ArtworkSidebarPageviewsQueryVariables;
};



/*
query ArtworkSidebarPageviewsQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
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
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID",
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
  "name": "ArtworkSidebarPageviewsQuery",
  "id": null,
  "text": "query ArtworkSidebarPageviewsQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkSidebarPageviews_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebarPageviews_artwork on Artwork {\n  id\n  pageviews\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarPageviewsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarPageviews_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarPageviewsQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
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
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'cf5caeb6c2071514660467921ff97a4f';
export default node;
