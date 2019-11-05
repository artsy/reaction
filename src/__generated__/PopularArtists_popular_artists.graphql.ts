/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type PopularArtists_popular_artists = ReadonlyArray<{
    readonly related: {
        readonly artistsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly slug: string;
                    readonly internalID: string;
                    readonly id: string;
                    readonly name: string | null;
                    readonly image: {
                        readonly cropped: {
                            readonly url: string | null;
                        } | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "PopularArtists_popular_artists";
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "PopularArtists_popular_artists",
  "type": "Artist",
  "metadata": {
    "plural": true
  },
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
          "name": "artistsConnection",
          "storageKey": null,
          "args": null,
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
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "slug",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "internalID",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
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
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "image",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "cropped",
                          "storageKey": "cropped(height:100,width:100)",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "height",
                              "value": 100
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 100
                            }
                          ],
                          "concreteType": "CroppedImageUrl",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "url",
                              "args": null,
                              "storageKey": null
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'eab1f3e9cf77923a1e981e945bf8e6fd';
export default node;
