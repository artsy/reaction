/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsApp_categories$ref } from "./CollectionsApp_categories.graphql";
export type CollectionsAppQueryVariables = {};
export type CollectionsAppQueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsApp_categories$ref;
    }>;
};
export type CollectionsAppQuery = {
    readonly response: CollectionsAppQueryResponse;
    readonly variables: CollectionsAppQueryVariables;
};



/*
query CollectionsAppQuery {
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
  "name": "CollectionsAppQuery",
  "id": null,
  "text": "query CollectionsAppQuery {\n  categories: marketingCategories {\n    ...CollectionsApp_categories\n  }\n}\n\nfragment CollectionsApp_categories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    __id: id\n  }\n}\n",
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
    "name": "CollectionsAppQuery",
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
(node as any).hash = 'af1a72e6c145a0aa60e9cb43cf019b59';
export default node;
