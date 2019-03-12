/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistCollectionsRail_collections$ref } from "./ArtistCollectionsRail_collections.graphql";
export type ArtistCollectionsRailQueryVariables = {
    readonly isFeaturedArtistContent?: boolean | null;
    readonly size?: number | null;
    readonly artistID?: string | null;
};
export type ArtistCollectionsRailQueryResponse = {
    readonly collections: ReadonlyArray<{
        readonly " $fragmentRefs": ArtistCollectionsRail_collections$ref;
    }>;
};
export type ArtistCollectionsRailQuery = {
    readonly response: ArtistCollectionsRailQueryResponse;
    readonly variables: ArtistCollectionsRailQueryVariables;
};



/*
query ArtistCollectionsRailQuery(
  $isFeaturedArtistContent: Boolean
  $size: Int
  $artistID: String
) {
  collections: marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $artistID) {
    ...ArtistCollectionsRail_collections
    __id: id
  }
}

fragment ArtistCollectionsRail_collections on MarketingCollection {
  ...ArtistCollectionEntity_collection
  __id: id
}

fragment ArtistCollectionEntity_collection on MarketingCollection {
  slug
  title
  price_guidance
  __id: id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "isFeaturedArtistContent",
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
    "name": "artistID",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "artistID",
    "variableName": "artistID",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "isFeaturedArtistContent",
    "variableName": "isFeaturedArtistContent",
    "type": "Boolean"
  },
  {
    "kind": "Variable",
    "name": "size",
    "variableName": "size",
    "type": "Int"
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
  "name": "ArtistCollectionsRailQuery",
  "id": null,
  "text": "query ArtistCollectionsRailQuery(\n  $isFeaturedArtistContent: Boolean\n  $size: Int\n  $artistID: String\n) {\n  collections: marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $artistID) {\n    ...ArtistCollectionsRail_collections\n    __id: id\n  }\n}\n\nfragment ArtistCollectionsRail_collections on MarketingCollection {\n  ...ArtistCollectionEntity_collection\n  __id: id\n}\n\nfragment ArtistCollectionEntity_collection on MarketingCollection {\n  slug\n  title\n  price_guidance\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistCollectionsRailQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collections",
        "name": "marketingCollections",
        "storageKey": null,
        "args": v1,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistCollectionsRail_collections",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistCollectionsRailQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collections",
        "name": "marketingCollections",
        "storageKey": null,
        "args": v1,
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
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '4c7b73a48f28a78a4282cf8026947c54';
export default node;
