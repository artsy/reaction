/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _FairArtworkGrid_artwork$ref: unique symbol;
export type FairArtworkGrid_artwork$ref = typeof _FairArtworkGrid_artwork$ref;
export type FairArtworkGrid_artwork = {
    readonly fair: ({
        readonly artworksConnection: ({
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
        readonly href: string | null;
    }) | null;
    readonly " $refType": FairArtworkGrid_artwork$ref;
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
  "name": "FairArtworkGrid_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "fair",
      "name": "show",
      "storageKey": "show(at_a_fair:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "at_a_fair",
          "value": true,
          "type": "Boolean"
        }
      ],
      "concreteType": "PartnerShow",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworksConnection",
          "storageKey": "artworksConnection(first:20)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 20,
              "type": "Int"
            }
          ],
          "concreteType": "ArtworkConnection",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks",
              "args": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '7a4c0606331edab101623fbe3855de21';
export default node;
