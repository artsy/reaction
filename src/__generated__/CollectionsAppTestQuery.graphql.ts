/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Collections_categories$ref } from "./Collections_categories.graphql";
export type CollectionsAppTestQueryVariables = {};
export type CollectionsAppTestQueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly " $fragmentRefs": Collections_categories$ref;
    }>;
};
export type CollectionsAppTestQuery = {
    readonly response: CollectionsAppTestQueryResponse;
    readonly variables: CollectionsAppTestQueryVariables;
};



/*
query CollectionsAppTestQuery {
  categories: marketingCategories {
    ...Collections_categories
  }
}

fragment Collections_categories on MarketingCollectionCategory {
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
  "name": "CollectionsAppTestQuery",
  "id": null,
  "text": "query CollectionsAppTestQuery {\n  categories: marketingCategories {\n    ...Collections_categories\n  }\n}\n\nfragment Collections_categories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    __id: id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsAppTestQuery",
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
            "name": "Collections_categories",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsAppTestQuery",
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
(node as any).hash = 'b9fcfe6e95aed4b8149c3d1cbb9f8cd9';
export default node;
