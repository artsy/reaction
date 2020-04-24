/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuthenticationRefetchQueryVariables = {};
export type TwoFactorAuthenticationRefetchQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"TwoFactorAuthentication_me">;
    } | null;
};
export type TwoFactorAuthenticationRefetchQueryRawResponse = {
    readonly me: ({
        readonly hasSecondFactorEnabled: boolean;
        readonly appSecondFactors: ReadonlyArray<({
            readonly __typename: "AppSecondFactor";
            readonly internalID: string;
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
            readonly internalID: string;
        }) | null> | null;
        readonly smsSecondFactors: ReadonlyArray<({
            readonly __typename: "SmsSecondFactor";
            readonly internalID: string;
            readonly formattedPhoneNumber: string | null;
        } | {
            readonly __typename: string | null;
            readonly internalID: string;
        }) | null> | null;
        readonly backupSecondFactors: ReadonlyArray<({
            readonly __typename: "BackupSecondFactor";
        } | {
            readonly __typename: string | null;
        }) | null> | null;
        readonly id: string | null;
    }) | null;
};
export type TwoFactorAuthenticationRefetchQuery = {
    readonly response: TwoFactorAuthenticationRefetchQueryResponse;
    readonly variables: TwoFactorAuthenticationRefetchQueryVariables;
    readonly rawResponse: TwoFactorAuthenticationRefetchQueryRawResponse;
};



/*
query TwoFactorAuthenticationRefetchQuery {
  me {
    ...TwoFactorAuthentication_me
    id
  }
}

fragment TwoFactorAuthentication_me on Me {
  hasSecondFactorEnabled
  appSecondFactors: secondFactors(kinds: [app]) {
    __typename
    internalID
    ... on AppSecondFactor {
      name
    }
  }
  smsSecondFactors: secondFactors(kinds: [sms]) {
    __typename
    internalID
    ... on SmsSecondFactor {
      formattedPhoneNumber
    }
  }
  backupSecondFactors: secondFactors(kinds: [backup]) {
    __typename
    ... on BackupSecondFactor {
      __typename
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
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TwoFactorAuthenticationRefetchQuery",
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
            "name": "TwoFactorAuthentication_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TwoFactorAuthenticationRefetchQuery",
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
            "kind": "ScalarField",
            "alias": null,
            "name": "hasSecondFactorEnabled",
            "args": null,
            "storageKey": null
          },
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
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "AppSecondFactor",
                "selections": [
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
            "kind": "LinkedField",
            "alias": "smsSecondFactors",
            "name": "secondFactors",
            "storageKey": "secondFactors(kinds:[\"sms\"])",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "sms"
                ]
              }
            ],
            "concreteType": null,
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "SmsSecondFactor",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "formattedPhoneNumber",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "backupSecondFactors",
            "name": "secondFactors",
            "storageKey": "secondFactors(kinds:[\"backup\"])",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "backup"
                ]
              }
            ],
            "concreteType": null,
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "BackupSecondFactor",
                "selections": [
                  (v0/*: any*/)
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
    "name": "TwoFactorAuthenticationRefetchQuery",
    "id": null,
    "text": "query TwoFactorAuthenticationRefetchQuery {\n  me {\n    ...TwoFactorAuthentication_me\n    id\n  }\n}\n\nfragment TwoFactorAuthentication_me on Me {\n  hasSecondFactorEnabled\n  appSecondFactors: secondFactors(kinds: [app]) {\n    __typename\n    internalID\n    ... on AppSecondFactor {\n      name\n    }\n  }\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    internalID\n    ... on SmsSecondFactor {\n      formattedPhoneNumber\n    }\n  }\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      __typename\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '35b728552a19fda16ac2d1a421e12cee';
export default node;
