/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtistRecommendations_artist$ref: unique symbol;
export type ArtistRecommendations_artist$ref = typeof _ArtistRecommendations_artist$ref;
export type ArtistRecommendations_artist = {
    readonly name: string | null;
    readonly " $refType": ArtistRecommendations_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistRecommendations_artist",
  "type": "Artist",
  "metadata": null,
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
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '9e89bdd847cc369ea61a53b3e0e24ce6';
export default node;
