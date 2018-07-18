/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type NavigationTabs_artist = {
    readonly id: string;
    readonly statuses: ({
        readonly shows: boolean | null;
        readonly artists: boolean | null;
        readonly contemporary: boolean | null;
        readonly articles: boolean | null;
        readonly cv: boolean | null;
        readonly auction_lots: boolean | null;
    }) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "NavigationTabs_artist",
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
          "name": "artists",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "contemporary",
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
              "value": 0,
              "type": "Int"
            }
          ],
          "storageKey": "cv(minShowCount:0)"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "auction_lots",
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
(node as any).hash = 'a4c56169f4ee753901b394e67f4de300';
export default node;
