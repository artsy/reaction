/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { CollectionFilterContainer_collection$ref } from "./CollectionFilterContainer_collection.graphql";
declare const _CollectionApp_collection$ref: unique symbol;
export type CollectionApp_collection$ref = typeof _CollectionApp_collection$ref;
export type CollectionApp_collection = {
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly description: string | null;
    readonly headerImage: string | null;
    readonly category: string;
    readonly credit: string | null;
    readonly query: {
        readonly artist_ids: ReadonlyArray<string> | null;
        readonly artist_id: string | null;
        readonly gene_id: string | null;
    };
    readonly " $fragmentRefs": CollectionFilterContainer_collection$ref;
    readonly " $refType": CollectionApp_collection$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "CollectionApp_collection",
  "type": "MarketingCollection",
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
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "headerImage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "category",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "credit",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "query",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollectionQuery",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "artist_ids",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "artist_id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "gene_id",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "CollectionFilterContainer_collection",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = 'c740025118f291d5d777f1e2bdd26189';
export default node;
