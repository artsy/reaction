/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { MarketingCollectionsPreview_artist$ref } from "./MarketingCollectionsPreview_artist.graphql";
export type MarketingCollectionsPreviewQueryVariables = {
    readonly entityID: string;
};
export type MarketingCollectionsPreviewQueryResponse = {
    readonly artist: ({
        readonly " $fragmentRefs": MarketingCollectionsPreview_artist$ref;
    }) | null;
};
export type MarketingCollectionsPreviewQuery = {
    readonly response: MarketingCollectionsPreviewQueryResponse;
    readonly variables: MarketingCollectionsPreviewQueryVariables;
};



/*
query MarketingCollectionsPreviewQuery(
  $entityID: String!
) {
  artist(id: $entityID) {
    ...MarketingCollectionsPreview_artist
    __id
  }
}

fragment MarketingCollectionsPreview_artist on Artist {
  marketingCollections {
    title
    slug
    headerImage
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
  "name": "MarketingCollectionsPreviewQuery",
  "id": null,
  "text": "query MarketingCollectionsPreviewQuery(\n  $entityID: String!\n) {\n  artist(id: $entityID) {\n    ...MarketingCollectionsPreview_artist\n    __id\n  }\n}\n\nfragment MarketingCollectionsPreview_artist on Artist {\n  marketingCollections {\n    title\n    slug\n    headerImage\n    __id: id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "MarketingCollectionsPreviewQuery",
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
            "name": "MarketingCollectionsPreview_artist",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MarketingCollectionsPreviewQuery",
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
                "alias": null,
                "name": "slug",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "headerImage",
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
(node as any).hash = '4362a633ab3213caca71e24821a6c423';
export default node;
