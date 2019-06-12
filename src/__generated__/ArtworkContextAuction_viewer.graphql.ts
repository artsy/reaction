/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { AuctionArtworkGrid_artwork$ref } from "./AuctionArtworkGrid_artwork.graphql";
import { OtherAuctions_sales$ref } from "./OtherAuctions_sales.graphql";
import { RelatedWorksArtworkGrid_artwork$ref } from "./RelatedWorksArtworkGrid_artwork.graphql";
declare const _ArtworkContextAuction_viewer$ref: unique symbol;
export type ArtworkContextAuction_viewer$ref = typeof _ArtworkContextAuction_viewer$ref;
export type ArtworkContextAuction_viewer = {
    readonly artwork: {
        readonly sale: {
            readonly href: string | null;
            readonly is_closed: boolean | null;
        } | null;
        readonly " $fragmentRefs": AuctionArtworkGrid_artwork$ref & ArtistArtworkGrid_artwork$ref & RelatedWorksArtworkGrid_artwork$ref;
    } | null;
    readonly sales: ReadonlyArray<{
        readonly " $fragmentRefs": OtherAuctions_sales$ref;
    } | null> | null;
    readonly " $refType": ArtworkContextAuction_viewer$ref;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "excludeArtworkIDs",
    "variableName": "excludeArtworkIDs"
  }
];
return {
  "kind": "Fragment",
  "name": "ArtworkContextAuction_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "isClosed",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "excludeArtworkIDs",
      "type": "[String!]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "artworkSlug",
      "type": "String!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artwork",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "artworkSlug"
        }
      ],
      "concreteType": "Artwork",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "sale",
          "storageKey": null,
          "args": null,
          "concreteType": "Sale",
          "plural": false,
          "selections": [
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
              "name": "is_closed",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "Condition",
          "passingValue": false,
          "condition": "isClosed",
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "AuctionArtworkGrid_artwork",
              "args": (v0/*: any*/)
            }
          ]
        },
        {
          "kind": "Condition",
          "passingValue": true,
          "condition": "isClosed",
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "ArtistArtworkGrid_artwork",
              "args": (v0/*: any*/)
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "RelatedWorksArtworkGrid_artwork",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sales",
      "storageKey": "sales(size:4,sort:\"TIMELY_AT_NAME_ASC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 4
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "TIMELY_AT_NAME_ASC"
        }
      ],
      "concreteType": "Sale",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "OtherAuctions_sales",
          "args": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = '519285fbe2e2957bc0a1ae4d0f84d6d2';
export default node;
