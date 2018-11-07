/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsApp_collections$ref } from "./CollectionsApp_collections.graphql";
export type CollectionsAppQueryVariables = {};
export type CollectionsAppQueryResponse = {
    readonly collections: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsApp_collections$ref;
    }>;
};
export type CollectionsAppQuery = {
    readonly response: CollectionsAppQueryResponse;
    readonly variables: CollectionsAppQueryVariables;
};



/*
query CollectionsAppQuery {
  collections: marketingCollections {
    ...CollectionsApp_collections
    __id: id
  }
}

fragment CollectionsApp_collections on MarketingCollection {
  slug
  title
  headerImage
  __id: id
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CollectionsAppQuery",
  "id": null,
  "text": "query CollectionsAppQuery {\n  collections: marketingCollections {\n    ...CollectionsApp_collections\n    __id: id\n  }\n}\n\nfragment CollectionsApp_collections on MarketingCollection {\n  slug\n  title\n  headerImage\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsAppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collections",
        "name": "marketingCollections",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionsApp_collections",
            "args": null
          },
          v0
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsAppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collections",
        "name": "marketingCollections",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
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
            "name": "title",
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
          v0
        ]
      }
    ]
  }
};
})();
(node as any).hash = '30b915889aadbede553756a00668bd22';
export default node;
