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
}

fragment FeatureHeader_feature on Feature {
  name
  subheadline: description
  image {
    url
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
];
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "subheadline",
            "name": "description",
            "args": null,
            "storageKey": null
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
    "name": "routes_FeatureQuery",
    "id": null,
    "text": "query routes_FeatureQuery(\n  $slug: ID!\n) {\n  feature(id: $slug) {\n    ...FeatureApp_feature\n    id\n  }\n}\n\nfragment FeatureApp_feature on Feature {\n  ...FeatureHeader_feature\n}\n\nfragment FeatureHeader_feature on Feature {\n  name\n  subheadline: description\n  image {\n    url\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ad956707342c4a314fe89209464d7ceb';
export default node;
