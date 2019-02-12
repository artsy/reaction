/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistSearchPreview_artist$ref } from "./ArtistSearchPreview_artist.graphql";
export type ArtistSearchPreviewQueryVariables = {
    readonly entityID: string;
};
export type ArtistSearchPreviewQueryResponse = {
    readonly artist: ({
        readonly " $fragmentRefs": ArtistSearchPreview_artist$ref;
    }) | null;
};
export type ArtistSearchPreviewQuery = {
    readonly response: ArtistSearchPreviewQueryResponse;
    readonly variables: ArtistSearchPreviewQueryVariables;
};



/*
query ArtistSearchPreviewQuery(
  $entityID: String!
) {
  artist(id: $entityID) {
    ...ArtistSearchPreview_artist
    __id
  }
}

fragment ArtistSearchPreview_artist on Artist {
  id
  marketingCollections {
    title
    __id: id
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "entityID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "entityID",
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
  "name": "ArtistSearchPreviewQuery",
  "id": null,
  "text": "query ArtistSearchPreviewQuery(\n  $entityID: String!\n) {\n  artist(id: $entityID) {\n    ...ArtistSearchPreview_artist\n    __id\n  }\n}\n\nfragment ArtistSearchPreview_artist on Artist {\n  id\n  marketingCollections {\n    title\n    __id: id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistSearchPreviewQuery",
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
            "name": "ArtistSearchPreview_artist",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistSearchPreviewQuery",
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
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "marketingCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollection",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "title",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "__id",
                "name": "id",
                "args": null,
                "storageKey": null
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
(node as any).hash = '57281ba518b5ca3e111812779fde836f';
export default node;
