/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _PartnerShowArtworkGrid_artwork$ref: unique symbol;
export type PartnerShowArtworkGrid_artwork$ref = typeof _PartnerShowArtworkGrid_artwork$ref;
export type PartnerShowArtworkGrid_artwork = {
    readonly show: ({
        readonly artworksConnection: ({
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
        readonly href: string | null;
        readonly name: string | null;
    }) | null;
    readonly " $refType": PartnerShowArtworkGrid_artwork$ref;
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
  "name": "PartnerShowArtworkGrid_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "show",
      "storageKey": null,
      "args": null,
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
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
(node as any).hash = '6c38e9e6fe662e749c545a7a0b1f2494';
export default node;
