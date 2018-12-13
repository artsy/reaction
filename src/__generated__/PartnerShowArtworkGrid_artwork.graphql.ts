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
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "excludeArtworkIDs",
      "type": "[String!]",
      "defaultValue": null
    }
  ],
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
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "exclude",
              "variableName": "excludeArtworkIDs",
              "type": "[String]"
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 8,
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
(node as any).hash = '9b6cb04a7450f6c11ba2747f6524f0c5';
export default node;
