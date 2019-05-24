/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { RelatedCollectionEntity_collection$ref } from "./RelatedCollectionEntity_collection.graphql";
declare const _RelatedCollectionsRail_collections$ref: unique symbol;
export type RelatedCollectionsRail_collections$ref = typeof _RelatedCollectionsRail_collections$ref;
export type RelatedCollectionsRail_collections = ReadonlyArray<{
    readonly " $fragmentRefs": RelatedCollectionEntity_collection$ref;
    readonly " $refType": RelatedCollectionsRail_collections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "RelatedCollectionsRail_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "RelatedCollectionEntity_collection",
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
(node as any).hash = 'f64166e45d9b668bf3f49d0a9f334650';
export default node;
