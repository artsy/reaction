/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtworkSidebarExtraLinks_artwork = {
    readonly internalID: string;
    readonly is_in_auction: boolean | null;
    readonly is_for_sale: boolean | null;
    readonly is_acquireable: boolean | null;
    readonly is_inquireable: boolean | null;
    readonly artists: ReadonlyArray<{
        readonly is_consignable: boolean | null;
    } | null> | null;
    readonly sale: {
        readonly is_closed: boolean | null;
    } | null;
    readonly " $refType": "ArtworkSidebarExtraLinks_artwork";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarExtraLinks_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_in_auction",
      "name": "isInAuction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_for_sale",
      "name": "isForSale",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_acquireable",
      "name": "isAcquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_inquireable",
      "name": "isInquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_consignable",
          "name": "isConsignable",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_closed",
          "name": "isClosed",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '16a127f76e4dc42d24d17fe3db12e481';
export default node;
