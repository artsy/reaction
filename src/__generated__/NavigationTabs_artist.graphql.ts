/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_artist = {
    readonly slug: string;
    readonly statuses: {
        readonly shows: boolean | null;
        readonly articles: boolean | null;
        readonly cv: boolean | null;
        readonly auction_lots: boolean | null;
    } | null;
    readonly " $refType": "NavigationTabs_artist";
};
export type NavigationTabs_artist$data = NavigationTabs_artist;
export type NavigationTabs_artist$key = {
    readonly " $data"?: NavigationTabs_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "NavigationTabs_artist",
  "type": "Artist",
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
      "kind": "LinkedField",
      "alias": null,
      "name": "statuses",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistStatuses",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "shows",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "articles",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cv",
          "args": [
            {
              "kind": "Literal",
              "name": "minShowCount",
              "value": 0
            }
          ],
          "storageKey": "cv(minShowCount:0)"
        },
        {
          "kind": "ScalarField",
          "alias": "auction_lots",
          "name": "auctionLots",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '963b8d999eb92e36906122e099b53d06';
export default node;
