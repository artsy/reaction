/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistHeader_artist$ref } from "./ArtistHeader_artist.graphql";
import { ArtistRecommendations_artist$ref } from "./ArtistRecommendations_artist.graphql";
import { NavigationTabs_artist$ref } from "./NavigationTabs_artist.graphql";
declare const _ArtistApp_artist$ref: unique symbol;
export type ArtistApp_artist$ref = typeof _ArtistApp_artist$ref;
export type ArtistApp_artist = {
    readonly _id: string;
    readonly id: string;
    readonly " $fragmentRefs": ArtistHeader_artist$ref & NavigationTabs_artist$ref & ArtistRecommendations_artist$ref;
    readonly " $refType": ArtistApp_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistApp_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistHeader_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "NavigationTabs_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistRecommendations_artist",
      "args": null
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
(node as any).hash = 'b800d135f4b25498c988f3341933a2c8';
export default node;
