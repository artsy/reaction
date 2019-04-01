/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { RecommendedArtist_artist$ref } from "./RecommendedArtist_artist.graphql";
declare const _ArtistRecommendations_artist$ref: unique symbol;
export type ArtistRecommendations_artist$ref = typeof _ArtistRecommendations_artist$ref;
export type ArtistRecommendations_artist = {
    readonly name: string | null;
    readonly related: ({
        readonly artists: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly __id: string;
                    readonly " $fragmentRefs": RecommendedArtist_artist$ref;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
    readonly " $refType": ArtistRecommendations_artist$ref;
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
      "kind": "LinkedField",
      "alias": null,
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artists",
          "storageKey": "artists(first:1)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1,
              "type": "Int"
            }
          ],
          "concreteType": "ArtistConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artist",
                  "plural": false,
                  "selections": [
                    v0,
                    {
                      "kind": "FragmentSpread",
                      "name": "RecommendedArtist_artist",
                      "args": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'acdbffb47f176f508b9e091fc8239dd8';
export default node;
