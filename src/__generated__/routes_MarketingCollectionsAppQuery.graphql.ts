/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsApp_categories$ref } from "./CollectionsApp_categories.graphql";
export type routes_MarketingCollectionsAppQueryVariables = {};
export type routes_MarketingCollectionsAppQueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsApp_categories$ref;
    }>;
};
export type routes_MarketingCollectionsAppQuery = {
    readonly response: routes_MarketingCollectionsAppQueryResponse;
    readonly variables: routes_MarketingCollectionsAppQueryVariables;
};



/*
query routes_MarketingCollectionsAppQuery {
  categories: marketingCategories {
    ...CollectionsApp_categories
  }
}

fragment CollectionsApp_categories on MarketingCollectionCategory {
  name
  collections {
    slug
    headerImage
    title
    __id: id
  }
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_MarketingCollectionsAppQuery",
  "id": null,
  "text": "query routes_MarketingCollectionsAppQuery {\n  categories: marketingCategories {\n    ...CollectionsApp_categories\n  }\n}\n\nfragment CollectionsApp_categories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    __id: id\n  }\n}\n",
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
        "alias": "categories",
        "name": "marketingCategories",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionsApp_categories",
            "args": null
          }
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
        "alias": "categories",
        "name": "marketingCategories",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "collections",
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
                "name": "headerImage",
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
                "alias": "__id",
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
(node as any).hash = 'a33bff1af157797503b0c731d9ca3e8c';
export default node;
