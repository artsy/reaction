/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _CollectionsApp_categories$ref: unique symbol;
export type CollectionsApp_categories$ref = typeof _CollectionsApp_categories$ref;
export type CollectionsApp_categories = ReadonlyArray<{
    readonly name: string;
    readonly collections: ReadonlyArray<{
        readonly slug: string;
        readonly headerImage: string | null;
        readonly title: string;
    }>;
    readonly " $refType": CollectionsApp_categories$ref;
}>;



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectionsApp_categories",
  "type": "MarketingCollectionCategory",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "collections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
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
          "name": "headerImage",
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
          "alias": "__id",
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '9e6e605a7a7bf036decd80efe35f527a';
export default node;
