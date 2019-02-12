/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { MarketingCollectionsPreview_marketingCollections$ref } from "./MarketingCollectionsPreview_marketingCollections.graphql";
declare const _ArtistSearchPreview_artist$ref: unique symbol;
export type ArtistSearchPreview_artist$ref = typeof _ArtistSearchPreview_artist$ref;
export type ArtistSearchPreview_artist = {
    readonly id: string;
    readonly marketingCollections: ReadonlyArray<({
        readonly title: string;
        readonly " $fragmentRefs": MarketingCollectionsPreview_marketingCollections$ref;
    }) | null> | null;
    readonly " $refType": ArtistSearchPreview_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistSearchPreview_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "marketingCollections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "MarketingCollectionsPreview_marketingCollections",
          "args": null
        },
        {
          "kind": "ScalarField",
          "alias": "__id",
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '96c140def64506968669c7473e653826';
export default node;
