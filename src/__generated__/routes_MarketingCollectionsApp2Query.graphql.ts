/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type routes_MarketingCollectionsApp2QueryVariables = {};
export type routes_MarketingCollectionsApp2QueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly name: string;
        readonly collections: ReadonlyArray<{
            readonly slug: string;
            readonly headerImage: string | null;
            readonly title: string;
        }>;
    }>;
};
export type routes_MarketingCollectionsApp2Query = {
    readonly response: routes_MarketingCollectionsApp2QueryResponse;
    readonly variables: routes_MarketingCollectionsApp2QueryVariables;
};



/*
query routes_MarketingCollectionsApp2Query {
  categories: marketingCategories {
    name
    collections {
      slug
      headerImage
      title
      __id: id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_MarketingCollectionsApp2Query",
  "id": null,
  "text": "query routes_MarketingCollectionsApp2Query {\n  categories: marketingCategories {\n    name\n    collections {\n      slug\n      headerImage\n      title\n      __id: id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_MarketingCollectionsApp2Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_MarketingCollectionsApp2Query",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = '7d769e3261f68104501a68c69baa3381';
export default node;
