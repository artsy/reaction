/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsTwoFactorAuthenticationStoryQueryVariables = {};
export type UserSettingsTwoFactorAuthenticationStoryQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserSettingsTwoFactorAuthentication_me">;
    } | null;
};
export type UserSettingsTwoFactorAuthenticationStoryQueryRawResponse = {
    readonly me: ({
        readonly hasSecondFactorEnabled: boolean;
        readonly appSecondFactors: ReadonlyArray<({
            readonly __typename: "AppSecondFactor";
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
        }) | null> | null;
        readonly smsSecondFactors: ReadonlyArray<({
            readonly __typename: "SmsSecondFactor";
            readonly maskedPhone: string | null;
        } | {
            readonly __typename: string | null;
        }) | null> | null;
        readonly backupSecondFactors: ReadonlyArray<({
            readonly __typename: "BackupSecondFactor";
            readonly internalID: string;
        } | {
            readonly __typename: string | null;
        }) | null> | null;
        readonly id: string | null;
    }) | null;
};
export type UserSettingsTwoFactorAuthenticationStoryQuery = {
    readonly response: UserSettingsTwoFactorAuthenticationStoryQueryResponse;
    readonly variables: UserSettingsTwoFactorAuthenticationStoryQueryVariables;
    readonly rawResponse: UserSettingsTwoFactorAuthenticationStoryQueryRawResponse;
};



/*
query UserSettingsTwoFactorAuthenticationStoryQuery {
  me {
    ...UserSettingsTwoFactorAuthentication_me
    id
  }
}

fragment UserSettingsTwoFactorAuthentication_me on Me {
  hasSecondFactorEnabled
  appSecondFactors: secondFactors(kinds: [app]) {
    __typename
    ... on AppSecondFactor {
      name
    }
  }
  smsSecondFactors: secondFactors(kinds: [sms]) {
    __typename
    ... on SmsSecondFactor {
      maskedPhone
    }
  }
  backupSecondFactors: secondFactors(kinds: [backup]) {
    __typename
    ... on BackupSecondFactor {
      internalID
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
    "name": "UserSettingsTwoFactorAuthenticationStoryQuery",
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
            "name": "UserSettingsTwoFactorAuthentication_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserSettingsTwoFactorAuthenticationStoryQuery",
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
              {
                "kind": "InlineFragment",
                "type": "SmsSecondFactor",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "maskedPhone",
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "internalID",
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
    "name": "UserSettingsTwoFactorAuthenticationStoryQuery",
    "id": null,
    "text": "query UserSettingsTwoFactorAuthenticationStoryQuery {\n  me {\n    ...UserSettingsTwoFactorAuthentication_me\n    id\n  }\n}\n\nfragment UserSettingsTwoFactorAuthentication_me on Me {\n  hasSecondFactorEnabled\n  appSecondFactors: secondFactors(kinds: [app]) {\n    __typename\n    ... on AppSecondFactor {\n      name\n    }\n  }\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    ... on SmsSecondFactor {\n      maskedPhone\n    }\n  }\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      internalID\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '05af29400447a5852d29ef6637fe0171';
export default node;
