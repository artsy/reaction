/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsTwoFactorAuthentication_me = {
    readonly hasSecondFactorEnabled: boolean;
    readonly appSecondFactors: ReadonlyArray<{
        readonly name?: string | null;
    } | null> | null;
    readonly smsSecondFactors: ReadonlyArray<{
        readonly maskedPhone?: string | null;
    } | null> | null;
    readonly backupSecondFactors: ReadonlyArray<{
        readonly internalID?: string;
    } | null> | null;
    readonly " $refType": "UserSettingsTwoFactorAuthentication_me";
};
export type UserSettingsTwoFactorAuthentication_me$data = UserSettingsTwoFactorAuthentication_me;
export type UserSettingsTwoFactorAuthentication_me$key = {
    readonly " $data"?: UserSettingsTwoFactorAuthentication_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsTwoFactorAuthentication_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "UserSettingsTwoFactorAuthentication_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
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
    }
  ]
};
(node as any).hash = '77c536be3614df58057d4b5f554206d6';
export default node;
