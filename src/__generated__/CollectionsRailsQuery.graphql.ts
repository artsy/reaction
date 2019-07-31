/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { CollectionsHubRails_marketingCollection$ref } from "./CollectionsHubRails_marketingCollection.graphql";
export type CollectionsRailsQueryVariables = {
    readonly collectionID: string;
};
export type CollectionsRailsQueryResponse = {
    readonly marketingCollection: ({
        readonly " $fragmentRefs": CollectionsHubRails_marketingCollection$ref;
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
    ...CollectionsHubRails_marketingCollection
    __id: id
  }
}

fragment CollectionsHubRails_marketingCollection on MarketingCollection {
  linkedCollections {
    groupType
    ...FeaturedCollectionsRails_collectionGroup
    ...OtherCollectionsRail_collectionGroup
    ...ArtistSeriesRail_collectionGroup
  }
  __id: id
}

fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    id
    slug
    title
    description
    price_guidance
    thumbnail
    __id: id
  }
}

fragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    ...OtherCollectionEntity_member
    __id: id
  }
}

fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
  groupType
  members {
    ...ArtistSeriesEntity_member
    __id: id
  }
}

fragment ArtistSeriesEntity_member on MarketingCollection {
  slug
  headerImage
  thumbnail
  title
  price_guidance
  artworks(size: 3, sort: "-decayed_merch") {
    hits {
      artist {
        name
        __id
      }
      title
      image {
        url(version: "small")
        __id: id
      }
      __id
    }
    __id
  }
  __id: id
}

fragment OtherCollectionEntity_member on MarketingCollection {
  slug
  thumbnail
  title
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
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CollectionsRailsQuery",
  "id": null,
  "text": "query CollectionsRailsQuery(\n  $collectionID: String!\n) {\n  marketingCollection(slug: $collectionID) {\n    ...CollectionsHubRails_marketingCollection\n    __id: id\n  }\n}\n\nfragment CollectionsHubRails_marketingCollection on MarketingCollection {\n  linkedCollections {\n    groupType\n    ...FeaturedCollectionsRails_collectionGroup\n    ...OtherCollectionsRail_collectionGroup\n    ...ArtistSeriesRail_collectionGroup\n  }\n  __id: id\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    id\n    slug\n    title\n    description\n    price_guidance\n    thumbnail\n    __id: id\n  }\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n    __id: id\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  members {\n    ...ArtistSeriesEntity_member\n    __id: id\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  slug\n  headerImage\n  thumbnail\n  title\n  price_guidance\n  artworks(size: 3, sort: \"-decayed_merch\") {\n    hits {\n      artist {\n        name\n        __id\n      }\n      title\n      image {\n        url(version: \"small\")\n        __id: id\n      }\n      __id\n    }\n    __id\n  }\n  __id: id\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  slug\n  thumbnail\n  title\n  __id: id\n}\n",
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
            "name": "CollectionsHubRails_marketingCollection",
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
              v3,
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
                  v4,
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "thumbnail",
                    "args": null,
                    "storageKey": null
                  },
                  v2,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "headerImage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworks",
                    "storageKey": "artworks(size:3,sort:\"-decayed_merch\")",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "size",
                        "value": 3,
                        "type": "Int"
                      },
                      {
                        "kind": "Literal",
                        "name": "sort",
                        "value": "-decayed_merch",
                        "type": "String"
                      }
                    ],
                    "concreteType": "FilterArtworks",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "hits",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artist",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": false,
                            "selections": [
                              v3,
                              v5
                            ]
                          },
                          v4,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "url",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": "small",
                                    "type": "[String]"
                                  }
                                ],
                                "storageKey": "url(version:\"small\")"
                              },
                              v2
                            ]
                          },
                          v5
                        ]
                      },
                      v5
                    ]
                  }
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
(node as any).hash = '7d69b0d92a576a78d18a036def1cc118';
export default node;
