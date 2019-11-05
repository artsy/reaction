/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CollectionsHubsHomepageNav_marketingHubCollections = ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly thumbnail: string | null;
    readonly " $refType": "CollectionsHubsHomepageNav_marketingHubCollections";
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectionsHubsHomepageNav_marketingHubCollections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
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
      "name": "thumbnail",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '9ed51272d09e50638e432a563cf366a2';
export default node;
