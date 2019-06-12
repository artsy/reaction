/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsRail_collections$ref } from "./CollectionsRail_collections.graphql";
export type CollectionsRailQueryVariables = {
    readonly showOnEditorial?: boolean | null;
    readonly size?: number | null;
    readonly randomizationSeed?: string | null;
};
export type CollectionsRailQueryResponse = {
    readonly collections: ReadonlyArray<{
        readonly " $fragmentRefs": CollectionsRail_collections$ref;
    }>;
};
export type CollectionsRailQuery = {
    readonly response: CollectionsRailQueryResponse;
    readonly variables: CollectionsRailQueryVariables;
};



/*
query CollectionsRailQuery(
  $showOnEditorial: Boolean
  $size: Int
  $randomizationSeed: String
) {
  collections: marketingCollections(showOnEditorial: $showOnEditorial, size: $size, randomizationSeed: $randomizationSeed) {
    ...CollectionsRail_collections
    id
  }
}

fragment CollectionsRail_collections on MarketingCollection {
  ...CollectionEntity_collection
}

fragment CollectionEntity_collection on MarketingCollection {
  slug
  headerImage
  title
  price_guidance
  show_on_editorial
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "showOnEditorial",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "size",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "randomizationSeed",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "randomizationSeed",
    "variableName": "randomizationSeed"
  },
  {
    "kind": "Variable",
    "name": "showOnEditorial",
    "variableName": "showOnEditorial"
  },
  {
    "kind": "Variable",
    "name": "size",
    "variableName": "size"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsRailQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collections",
        "name": "marketingCollections",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionsRail_collections",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsRailQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collections",
        "name": "marketingCollections",
        "storageKey": null,
        "args": (v1/*: any*/),
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
            "name": "price_guidance",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "show_on_editorial",
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
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionsRailQuery",
    "id": null,
    "text": "query CollectionsRailQuery(\n  $showOnEditorial: Boolean\n  $size: Int\n  $randomizationSeed: String\n) {\n  collections: marketingCollections(showOnEditorial: $showOnEditorial, size: $size, randomizationSeed: $randomizationSeed) {\n    ...CollectionsRail_collections\n    id\n  }\n}\n\nfragment CollectionsRail_collections on MarketingCollection {\n  ...CollectionEntity_collection\n}\n\nfragment CollectionEntity_collection on MarketingCollection {\n  slug\n  headerImage\n  title\n  price_guidance\n  show_on_editorial\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e6e181f0317cc4947ddb0d4cf5613dca';
export default node;
