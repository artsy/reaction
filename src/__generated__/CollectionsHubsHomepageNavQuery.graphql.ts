/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsHubsHomepageNav_marketingHubCollections$ref } from "./CollectionsHubsHomepageNav_marketingHubCollections.graphql";
export type CollectionsHubsHomepageNavQueryVariables = {};
export type CollectionsHubsHomepageNavQueryResponse = {
    readonly marketingHubCollections: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsHubsHomepageNav_marketingHubCollections$ref;
    }>;
};
export type CollectionsHubsHomepageNavQuery = {
    readonly response: CollectionsHubsHomepageNavQueryResponse;
    readonly variables: CollectionsHubsHomepageNavQueryVariables;
};



/*
query CollectionsHubsHomepageNavQuery {
  marketingHubCollections {
    ...CollectionsHubsHomepageNav_marketingHubCollections
    __id: id
  }
}

fragment CollectionsHubsHomepageNav_marketingHubCollections on MarketingCollection {
  id
  slug
  title
  thumbnail
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
  "name": "CollectionsHubsHomepageNavQuery",
  "id": null,
  "text": "query CollectionsHubsHomepageNavQuery {\n  marketingHubCollections {\n    ...CollectionsHubsHomepageNav_marketingHubCollections\n    __id: id\n  }\n}\n\nfragment CollectionsHubsHomepageNav_marketingHubCollections on MarketingCollection {\n  id\n  slug\n  title\n  thumbnail\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsHubsHomepageNavQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingHubCollections",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionsHubsHomepageNav_marketingHubCollections",
            "args": null
          },
          v0
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsHubsHomepageNavQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingHubCollections",
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
            "name": "thumbnail",
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
(node as any).hash = '7e2b35da19e4803e18aca235288f1303';
export default node;
