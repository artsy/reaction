/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FollowProfileButton_profile$ref } from "./FollowProfileButton_profile.graphql";
declare const _ArtworkDetailsAboutTheWorkFromPartner_artwork$ref: unique symbol;
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$ref = typeof _ArtworkDetailsAboutTheWorkFromPartner_artwork$ref;
export type ArtworkDetailsAboutTheWorkFromPartner_artwork = {
    readonly additional_information: string | null;
    readonly partner: ({
        readonly name: string | null;
        readonly initials: string | null;
        readonly locations: ReadonlyArray<({
            readonly city: string | null;
        }) | null> | null;
        readonly profile: ({
            readonly id: string;
            readonly icon: ({
                readonly url: string | null;
            }) | null;
            readonly " $fragmentRefs": FollowProfileButton_profile$ref;
        }) | null;
    }) | null;
    readonly " $refType": ArtworkDetailsAboutTheWorkFromPartner_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "additional_information",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
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
          "alias": null,
          "name": "initials",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "locations",
          "storageKey": null,
          "args": null,
          "concreteType": "Location",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "city",
              "args": null,
              "storageKey": null
            },
            v0
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "profile",
          "storageKey": null,
          "args": null,
          "concreteType": "Profile",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "FollowProfileButton_profile",
              "args": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "icon",
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
                      "value": "square140",
                      "type": "[String]"
                    }
                  ],
                  "storageKey": "url(version:\"square140\")"
                }
              ]
            },
            v0
          ]
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'cf09631bef749077431e4acd764dc8d1';
export default node;
