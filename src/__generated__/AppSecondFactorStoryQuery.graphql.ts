/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppSecondFactorStoryQueryVariables = {};
export type AppSecondFactorStoryQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AppSecondFactor_me">;
    } | null;
};
export type AppSecondFactorStoryQuery = {
    readonly response: AppSecondFactorStoryQueryResponse;
    readonly variables: AppSecondFactorStoryQueryVariables;
};



/*
query AppSecondFactorStoryQuery {
  me {
    ...AppSecondFactor_me
    id
  }
}

fragment AppSecondFactor_me on Me {
  appSecondFactors: secondFactors(kinds: [app]) {
    __typename
    ... on AppSecondFactor {
      __typename
      internalID
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppSecondFactorStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AppSecondFactor_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppSecondFactorStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "appSecondFactors",
            "name": "secondFactors",
            "storageKey": "secondFactors(kinds:[\"app\"])",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "app"
                ]
              }
            ],
            "concreteType": null,
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "AppSecondFactor",
                "selections": [
                  (v0/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "internalID",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  }
                ]
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
    "name": "AppSecondFactorStoryQuery",
    "id": null,
    "text": "query AppSecondFactorStoryQuery {\n  me {\n    ...AppSecondFactor_me\n    id\n  }\n}\n\nfragment AppSecondFactor_me on Me {\n  appSecondFactors: secondFactors(kinds: [app]) {\n    __typename\n    ... on AppSecondFactor {\n      __typename\n      internalID\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'cb0ec168fd8d195c200384110c9982e9';
export default node;
