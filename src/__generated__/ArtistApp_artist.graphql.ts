/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistHeader_artist$ref } from "./ArtistHeader_artist.graphql";
import { NavigationTabs_artist$ref } from "./NavigationTabs_artist.graphql";
declare const _ArtistApp_artist$ref: unique symbol;
export type ArtistApp_artist$ref = typeof _ArtistApp_artist$ref;
export type ArtistApp_artist = {
    readonly _id: string;
    readonly id: string;
    readonly " $fragmentRefs": ArtistHeader_artist$ref & NavigationTabs_artist$ref;
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
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6ec519bff85cfd1957c0c3e0d61027ed';
export default node;
