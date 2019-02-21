/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { CollectionEntity_collection$ref } from "./CollectionEntity_collection.graphql";
declare const _CollectionsRail_collections$ref: unique symbol;
export type CollectionsRail_collections$ref = typeof _CollectionsRail_collections$ref;
export type CollectionsRail_collections = ReadonlyArray<{
    readonly " $fragmentRefs": CollectionEntity_collection$ref;
    readonly " $refType": CollectionsRail_collections$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsRail_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CollectionEntity_collection",
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
(node as any).hash = '35961dd8c6f3b9ed5fff404b9a586026';
export default node;
