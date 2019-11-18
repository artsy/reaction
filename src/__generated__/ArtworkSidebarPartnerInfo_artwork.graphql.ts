/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPartnerInfo_artwork = {
    readonly partner: {
        readonly name: string | null;
        readonly href: string | null;
        readonly locations: ReadonlyArray<{
            readonly city: string | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtworkSidebarPartnerInfo_artwork";
};
export type ArtworkSidebarPartnerInfo_artwork$data = ArtworkSidebarPartnerInfo_artwork;
export type ArtworkSidebarPartnerInfo_artwork$key = {
    readonly " $data"?: ArtworkSidebarPartnerInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarPartnerInfo_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarPartnerInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '2d4008d718bc19a2034d96f2665bacf9';
export default node;
