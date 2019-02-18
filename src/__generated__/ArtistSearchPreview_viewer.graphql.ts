/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { MarketingCollectionsPreview_marketingCollections$ref } from "./MarketingCollectionsPreview_marketingCollections.graphql";
import { RelatedArtworksPreview_viewer$ref } from "./RelatedArtworksPreview_viewer.graphql";
declare const _ArtistSearchPreview_viewer$ref: unique symbol;
export type ArtistSearchPreview_viewer$ref = typeof _ArtistSearchPreview_viewer$ref;
export type ArtistSearchPreview_viewer = {
    readonly artist: ({
        readonly id: string;
        readonly marketingCollections: ReadonlyArray<({
            readonly title: string;
            readonly " $fragmentRefs": MarketingCollectionsPreview_marketingCollections$ref;
        }) | null> | null;
    }) | null;
    readonly " $fragmentRefs": RelatedArtworksPreview_viewer$ref;
    readonly " $refType": ArtistSearchPreview_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistSearchPreview_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "entityID",
      "type": "String!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "entityID",
          "type": "String!"
        }
      ],
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
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "marketingCollections",
          "storageKey": null,
          "args": null,
          "concreteType": "MarketingCollection",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "title",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "FragmentSpread",
              "name": "MarketingCollectionsPreview_marketingCollections",
              "args": null
            },
            {
              "kind": "ScalarField",
              "alias": "__id",
              "name": "id",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__id",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedArtworksPreview_viewer",
      "args": [
        {
          "kind": "Variable",
          "name": "entityID",
          "variableName": "entityID",
          "type": null
        }
      ]
    }
  ]
};
(node as any).hash = '2fd6cd7a9f843faec6dd4fe0c43ac857';
export default node;
