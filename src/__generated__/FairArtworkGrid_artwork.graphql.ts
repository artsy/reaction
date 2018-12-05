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
(node as any).hash = 'd4dc860766d7d68e7a494f3cf1129744';
export default node;
