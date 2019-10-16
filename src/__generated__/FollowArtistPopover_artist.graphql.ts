/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FollowArtistPopoverRow_artist$ref } from "./FollowArtistPopoverRow_artist.graphql";
declare const _FollowArtistPopover_artist$ref: unique symbol;
export type FollowArtistPopover_artist$ref = typeof _FollowArtistPopover_artist$ref;
export type FollowArtistPopover_artist = {
    readonly related: ({
        readonly suggested: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly __id: string;
                    readonly _id: string;
                    readonly " $fragmentRefs": FollowArtistPopoverRow_artist$ref;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
    readonly " $refType": FollowArtistPopover_artist$ref;
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
  "name": "FollowArtistPopover_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
          "name": "suggested",
          "storageKey": "suggested(exclude_followed_artists:true,first:3)",
          "args": [
            {
              "kind": "Literal",
              "name": "exclude_followed_artists",
              "value": true,
              "type": "Boolean"
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 3,
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
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "_id",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "FollowArtistPopoverRow_artist",
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
(node as any).hash = '29a8394fc5cdd97be2738d4e745d322e';
export default node;
