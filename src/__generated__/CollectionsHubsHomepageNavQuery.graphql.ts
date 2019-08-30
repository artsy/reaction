/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsHubsHomepageNav_marketingCollections$ref } from "./CollectionsHubsHomepageNav_marketingCollections.graphql";
export type CollectionsHubsHomepageNavQueryVariables = {};
export type CollectionsHubsHomepageNavQueryResponse = {
    readonly marketingCollections: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsHubsHomepageNav_marketingCollections$ref;
    }>;
};
export type CollectionsHubsHomepageNavQuery = {
    readonly response: CollectionsHubsHomepageNavQueryResponse;
    readonly variables: CollectionsHubsHomepageNavQueryVariables;
};



/*
query CollectionsHubsHomepageNavQuery {
  marketingCollections(size: 6) {
    ...CollectionsHubsHomepageNav_marketingCollections
    __id: id
  }
}

fragment CollectionsHubsHomepageNav_marketingCollections on MarketingCollection {
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
  "name": "CollectionsHubsHomepageNavQuery",
  "id": null,
  "text": "query CollectionsHubsHomepageNavQuery {\n  marketingCollections(size: 6) {\n    ...CollectionsHubsHomepageNav_marketingCollections\n    __id: id\n  }\n}\n\nfragment CollectionsHubsHomepageNav_marketingCollections on MarketingCollection {\n  id\n  slug\n  title\n  thumbnail\n  __id: id\n}\n",
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
        "name": "marketingCollections",
        "storageKey": "marketingCollections(size:6)",
        "args": v0,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionsHubsHomepageNav_marketingCollections",
            "args": null
          },
          v1
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
(node as any).hash = '0560202a24b7e2143c54554f18fb1041';
export default node;
