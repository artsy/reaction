/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _RelatedWorksArtworkGrid_artwork$ref: unique symbol;
export type RelatedWorksArtworkGrid_artwork$ref = typeof _RelatedWorksArtworkGrid_artwork$ref;
export type RelatedWorksArtworkGrid_artwork = {
    readonly layers: ReadonlyArray<({
        readonly name: string | null;
        readonly artworksConnection: ({
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
    }) | null> | null;
    readonly " $refType": RelatedWorksArtworkGrid_artwork$ref;
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
  "name": "RelatedWorksArtworkGrid_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "layers",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkLayer",
      "plural": true,
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
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '26b070acef4ceb368eb4cf796e0d8826';
export default node;
