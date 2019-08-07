/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsHubsNav_marketingCollections$ref } from "./CollectionsHubsNav_marketingCollections.graphql";
export type CollectionsHubsNavQueryVariables = {};
export type CollectionsHubsNavQueryResponse = {
    readonly marketingCollections: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsHubsNav_marketingCollections$ref;
    }>;
};
export type CollectionsHubsNavQuery = {
    readonly response: CollectionsHubsNavQueryResponse;
    readonly variables: CollectionsHubsNavQueryVariables;
};



/*
query CollectionsHubsNavQuery {
  marketingCollections(size: 6) {
    ...CollectionsHubsNav_marketingCollections
    __id: id
  }
}

fragment CollectionsHubsNav_marketingCollections on MarketingCollection {
  id
  slug
  title
  thumbnail
  __id: id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "size",
    "value": 6,
    "type": "Int"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CollectionsHubsNavQuery",
  "id": null,
  "text": "query CollectionsHubsNavQuery {\n  marketingCollections(size: 6) {\n    ...CollectionsHubsNav_marketingCollections\n    __id: id\n  }\n}\n\nfragment CollectionsHubsNav_marketingCollections on MarketingCollection {\n  id\n  slug\n  title\n  thumbnail\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsHubsNavQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCollections",
        "storageKey": "marketingCollections(size:6)",
        "args": v0,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionsHubsNav_marketingCollections",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsHubsNavQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCollections",
        "storageKey": "marketingCollections(size:6)",
        "args": v0,
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
            "name": "thumbnail",
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
(node as any).hash = 'ca5e20922d40db7c07fa18726837321a';
export default node;
