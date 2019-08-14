/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Collections_categories$ref } from "./Collections_categories.graphql";
export type collectRoutes_MarketingCollectionsAppQueryVariables = {};
export type collectRoutes_MarketingCollectionsAppQueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly " $fragmentRefs": Collections_categories$ref;
    }>;
};
export type collectRoutes_MarketingCollectionsAppQuery = {
    readonly response: collectRoutes_MarketingCollectionsAppQueryResponse;
    readonly variables: collectRoutes_MarketingCollectionsAppQueryVariables;
};



/*
query collectRoutes_MarketingCollectionsAppQuery {
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
  "name": "collectRoutes_MarketingCollectionsAppQuery",
  "id": null,
  "text": "query collectRoutes_MarketingCollectionsAppQuery {\n  categories: marketingCategories {\n    ...Collections_categories\n  }\n}\n\nfragment Collections_categories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    __id: id\n  }\n}\n",
  "metadata": {},
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
(node as any).hash = '033d007f9a2365748adae65555d37147';
export default node;
