/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Collections_categories = ReadonlyArray<{
    readonly name: string;
    readonly collections: ReadonlyArray<{
        readonly slug: string;
        readonly headerImage: string | null;
        readonly title: string;
    }>;
    readonly " $refType": "Collections_categories";
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Collections_categories",
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
        }
      ]
    }
  ]
};
(node as any).hash = '66eb3896886d261bafe79247912bf6b9';
export default node;
