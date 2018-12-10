/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _RelatedWorksArtworkGrid_artwork$ref: unique symbol;
export type RelatedWorksArtworkGrid_artwork$ref = typeof _RelatedWorksArtworkGrid_artwork$ref;
export type RelatedWorksArtworkGrid_artwork = {
    readonly layers: ReadonlyArray<({
        readonly name: string | null;
        readonly id: string;
    }) | null> | null;
    readonly layer: ({
        readonly name: string | null;
        readonly artworksConnection: ({
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        }) | null;
    }) | null;
    readonly " $refType": RelatedWorksArtworkGrid_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
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
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "layerId",
      "type": "String",
      "defaultValue": null
    }
  ],
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
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        v1
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "layer",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "layerId",
          "type": "String"
        }
      ],
      "concreteType": "ArtworkLayer",
      "plural": false,
      "selections": [
        v0,
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
        v1
      ]
    },
    v1
  ]
};
})();
(node as any).hash = 'ebe617e23a0fd860256b7d6dcbd17a75';
export default node;
