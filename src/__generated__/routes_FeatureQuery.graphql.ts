/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_FeatureQueryVariables = {
    slug: string;
};
export type routes_FeatureQueryResponse = {
    readonly feature: {
        readonly " $fragmentRefs": FragmentRefs<"FeatureApp_feature">;
    } | null;
};
export type routes_FeatureQuery = {
    readonly response: routes_FeatureQueryResponse;
    readonly variables: routes_FeatureQueryVariables;
};



/*
query routes_FeatureQuery(
  $slug: ID!
) {
  feature(id: $slug) {
    ...FeatureApp_feature
    id
  }
}

fragment FeatureApp_feature on Feature {
  ...FeatureHeader_feature
  description(format: HTML)
  callOut: description(format: HTML)
  sets: setsConnection(first: 50) {
    edges {
      node {
        id
        ...FeatureSet_set
      }
    }
  }
}

fragment FeatureFeaturedLink_featuredLink on FeaturedLink {
  href
  title
  subtitle
  description: subtitle
  image {
    cropped(width: 800, height: 600, version: ["wide"]) {
      src: url
      width
      height
    }
  }
}

fragment FeatureHeader_feature on Feature {
  name
  subheadline: description(format: HTML)
  image {
    url
  }
}

fragment FeatureSet_set on OrderedSet {
  name
  description
  itemType
  orderedItems: orderedItemsConnection(first: 50) {
    edges {
      node {
        __typename
        ... on FeaturedLink {
          id
        }
        ...FeatureFeaturedLink_featuredLink
        ... on Node {
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_FeatureQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "feature",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Feature",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "FeatureApp_feature",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_FeatureQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "feature",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Feature",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": "subheadline",
            "name": "description",
            "args": (v3/*: any*/),
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "FeatureImage",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": (v3/*: any*/),
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": "callOut",
            "name": "description",
            "args": (v3/*: any*/),
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "kind": "LinkedField",
            "alias": "sets",
            "name": "setsConnection",
            "storageKey": "setsConnection(first:50)",
            "args": (v4/*: any*/),
            "concreteType": "OrderedSetConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "OrderedSetEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderedSet",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v2/*: any*/),
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
                        "name": "itemType",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": "orderedItems",
                        "name": "orderedItemsConnection",
                        "storageKey": "orderedItemsConnection(first:50)",
                        "args": (v4/*: any*/),
                        "concreteType": "OrderedSetItemConnection",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "OrderedSetItemEdge",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "node",
                                "storageKey": null,
                                "args": null,
                                "concreteType": null,
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "__typename",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  (v5/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "type": "FeaturedLink",
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "href",
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
                                        "name": "subtitle",
                                        "args": null,
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": "description",
                                        "name": "subtitle",
                                        "args": null,
                                        "storageKey": null
                                      },
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
                                            "kind": "LinkedField",
                                            "alias": null,
                                            "name": "cropped",
                                            "storageKey": "cropped(height:600,version:[\"wide\"],width:800)",
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 600
                                              },
                                              {
                                                "kind": "Literal",
                                                "name": "version",
                                                "value": [
                                                  "wide"
                                                ]
                                              },
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 800
                                              }
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "kind": "ScalarField",
                                                "alias": "src",
                                                "name": "url",
                                                "args": null,
                                                "storageKey": null
                                              },
                                              {
                                                "kind": "ScalarField",
                                                "alias": null,
                                                "name": "width",
                                                "args": null,
                                                "storageKey": null
                                              },
                                              {
                                                "kind": "ScalarField",
                                                "alias": null,
                                                "name": "height",
                                                "args": null,
                                                "storageKey": null
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v5/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_FeatureQuery",
    "id": null,
    "text": "query routes_FeatureQuery(\n  $slug: ID!\n) {\n  feature(id: $slug) {\n    ...FeatureApp_feature\n    id\n  }\n}\n\nfragment FeatureApp_feature on Feature {\n  ...FeatureHeader_feature\n  description(format: HTML)\n  callOut: description(format: HTML)\n  sets: setsConnection(first: 50) {\n    edges {\n      node {\n        id\n        ...FeatureSet_set\n      }\n    }\n  }\n}\n\nfragment FeatureFeaturedLink_featuredLink on FeaturedLink {\n  href\n  title\n  subtitle\n  description: subtitle\n  image {\n    cropped(width: 800, height: 600, version: [\"wide\"]) {\n      src: url\n      width\n      height\n    }\n  }\n}\n\nfragment FeatureHeader_feature on Feature {\n  name\n  subheadline: description(format: HTML)\n  image {\n    url\n  }\n}\n\nfragment FeatureSet_set on OrderedSet {\n  name\n  description\n  itemType\n  orderedItems: orderedItemsConnection(first: 50) {\n    edges {\n      node {\n        __typename\n        ... on FeaturedLink {\n          id\n        }\n        ...FeatureFeaturedLink_featuredLink\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ad956707342c4a314fe89209464d7ceb';
export default node;
