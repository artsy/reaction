/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkSidebarPartnerInfo_artwork$ref: unique symbol;
export type ArtworkSidebarPartnerInfo_artwork$ref = typeof _ArtworkSidebarPartnerInfo_artwork$ref;
export type ArtworkSidebarPartnerInfo_artwork = {
    readonly collecting_institution: string | null;
    readonly partner: ({
        readonly __id: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly locations: ReadonlyArray<({
            readonly city: string | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": ArtworkSidebarPartnerInfo_artwork$ref;
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
  "name": "ArtworkSidebarPartnerInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "collecting_institution",
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
        v0,
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
          "name": "href",
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
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '044e0e74528fa406c2c37e3c15fec992';
export default node;
