/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type collectRoutes_MarketingCollectionsAppQueryVariables = {};
export type collectRoutes_MarketingCollectionsAppQueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Collections_categories">;
    }>;
};
export type collectRoutes_MarketingCollectionsAppQuery = {
    readonly response: collectRoutes_MarketingCollectionsAppQueryResponse;
    readonly variables: collectRoutes_MarketingCollectionsAppQueryVariables;
};



/*
query collectRoutes_MarketingCollectionsAppQuery {
  categories: marketingCategories @principalField {
    ...Collections_categories
  }
}

fragment Collections_categories on MarketingCollectionCategory {
  name
  collections {
    slug
    headerImage
    title
    id
  }
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "collectRoutes_MarketingCollectionsAppQuery",
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
    "name": "collectRoutes_MarketingCollectionsAppQuery",
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
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "id": null,
    "text": "query collectRoutes_MarketingCollectionsAppQuery {\n  categories: marketingCategories @principalField {\n    ...Collections_categories\n  }\n}\n\nfragment Collections_categories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    id\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '81db5fa0b5f99948b02522c13d2f9278';
export default node;
