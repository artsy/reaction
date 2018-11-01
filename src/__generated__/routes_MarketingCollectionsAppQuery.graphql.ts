/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsApp_collections$ref } from "./CollectionsApp_collections.graphql";
export type routes_MarketingCollectionsAppQueryVariables = {};
export type routes_MarketingCollectionsAppQueryResponse = {
    readonly collections: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsApp_collections$ref;
    }>;
};
export type routes_MarketingCollectionsAppQuery = {
    readonly response: routes_MarketingCollectionsAppQueryResponse;
    readonly variables: routes_MarketingCollectionsAppQueryVariables;
};



/*
query routes_MarketingCollectionsAppQuery {
  collections: marketingCollections {
    ...CollectionsApp_collections
    __id: id
  }
}

fragment CollectionsApp_collections on MarketingCollection {
  id
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
  "name": "routes_MarketingCollectionsAppQuery",
  "id": null,
  "text": "query routes_MarketingCollectionsAppQuery {\n  collections: marketingCollections {\n    ...CollectionsApp_collections\n    __id: id\n  }\n}\n\nfragment CollectionsApp_collections on MarketingCollection {\n  id\n  slug\n  title\n  headerImage\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_MarketingCollectionsAppQuery",
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
    "name": "routes_MarketingCollectionsAppQuery",
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
            "name": "id",
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
(node as any).hash = 'bf3bac484e225f36bc64df5cf44b19c5';
export default node;
