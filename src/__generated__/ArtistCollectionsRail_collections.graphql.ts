/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistCollectionEntity_collection$ref } from "./ArtistCollectionEntity_collection.graphql";
declare const _ArtistCollectionsRail_collections$ref: unique symbol;
export type ArtistCollectionsRail_collections$ref = typeof _ArtistCollectionsRail_collections$ref;
export type ArtistCollectionsRail_collections = ReadonlyArray<{
    readonly " $fragmentRefs": ArtistCollectionEntity_collection$ref;
    readonly " $refType": ArtistCollectionsRail_collections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistCollectionsRail_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistCollectionEntity_collection",
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
};
(node as any).hash = '321de31247fea0486faf7cdbe0016219';
export default node;
