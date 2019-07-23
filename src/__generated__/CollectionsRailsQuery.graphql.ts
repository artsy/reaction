/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FeaturedCollectionsRails_marketingCollection$ref } from "./FeaturedCollectionsRails_marketingCollection.graphql";
export type CollectionsRailsQueryVariables = {
    readonly collectionID: string;
};
export type CollectionsRailsQueryResponse = {
    readonly marketingCollection: ({
        readonly " $fragmentRefs": FeaturedCollectionsRails_marketingCollection$ref;
    }) | null;
};
export type CollectionsRailsQuery = {
    readonly response: CollectionsRailsQueryResponse;
    readonly variables: CollectionsRailsQueryVariables;
};



/*
query CollectionsRailsQuery(
  $collectionID: String!
) {
  marketingCollection(slug: $collectionID) {
    ...FeaturedCollectionsRails_marketingCollection
    __id: id
  }
}

fragment FeaturedCollectionsRails_marketingCollection on MarketingCollection {
  linkedCollections {
    groupType
    name
    members {
      id
      slug
      title
      description
      price_guidance
      __id: id
    }
  }
  __id: id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "collectionID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "collectionID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CollectionsRailsQuery",
  "id": null,
  "text": "query CollectionsRailsQuery(\n  $collectionID: String!\n) {\n  marketingCollection(slug: $collectionID) {\n    ...FeaturedCollectionsRails_marketingCollection\n    __id: id\n  }\n}\n\nfragment FeaturedCollectionsRails_marketingCollection on MarketingCollection {\n  linkedCollections {\n    groupType\n    name\n    members {\n      id\n      slug\n      title\n      description\n      price_guidance\n      __id: id\n    }\n  }\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsRailsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCollection",
        "storageKey": null,
        "args": v1,
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "FeaturedCollectionsRails_marketingCollection",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsRailsQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCollection",
        "storageKey": null,
        "args": v1,
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "linkedCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollectionGroup",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "groupType",
                "args": null,
                "storageKey": null
              },
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
                "name": "members",
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
                    "name": "description",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "price_guidance",
                    "args": null,
                    "storageKey": null
                  },
                  v2
                ]
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '709a1e409ea485e6f250c2a7b44f2a72';
export default node;
