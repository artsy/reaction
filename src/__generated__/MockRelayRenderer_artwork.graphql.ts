/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { MockRelayRenderer_artworkMetadata$ref } from "./MockRelayRenderer_artworkMetadata.graphql";
declare const _MockRelayRenderer_artwork$ref: unique symbol;
export type MockRelayRenderer_artwork$ref = typeof _MockRelayRenderer_artwork$ref;
export type MockRelayRenderer_artwork = {
    readonly image: ({
        readonly url: string | null;
    }) | null;
    readonly artist: ({
        readonly id: string;
    }) | null;
    readonly " $fragmentRefs": MockRelayRenderer_artworkMetadata$ref;
    readonly " $refType": MockRelayRenderer_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "MockRelayRenderer_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "MockRelayRenderer_artworkMetadata",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '2e03324f01a3fe592c6919f9814611a1';
export default node;
