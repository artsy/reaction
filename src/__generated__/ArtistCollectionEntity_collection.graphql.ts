/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtistCollectionEntity_collection$ref: unique symbol;
export type ArtistCollectionEntity_collection$ref = typeof _ArtistCollectionEntity_collection$ref;
export type ArtistCollectionEntity_collection = {
    readonly slug: string;
    readonly title: string;
    readonly price_guidance: number | null;
    readonly " $refType": ArtistCollectionEntity_collection$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistCollectionEntity_collection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
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
      "name": "price_guidance",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '15950008311f60b90cfb6cd743196ffb';
export default node;
