/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SeoProductsForArtworks_artworks$ref: unique symbol;
export type SeoProductsForArtworks_artworks$ref = typeof _SeoProductsForArtworks_artworks$ref;
export type SeoProductsForArtworks_artworks = {
    readonly artworks_connection: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly __id: string;
                readonly availability: string | null;
                readonly category: string | null;
                readonly date: string | null;
                readonly href: string | null;
                readonly is_acquireable: boolean | null;
                readonly is_price_range: boolean | null;
                readonly price: string | null;
                readonly price_currency: string | null;
                readonly title: string | null;
                readonly artists: ReadonlyArray<({
                    readonly name: string | null;
                }) | null> | null;
                readonly image: ({
                    readonly url: string | null;
                }) | null;
                readonly meta: ({
                    readonly description: string | null;
                }) | null;
                readonly partner: ({
                    readonly name: string | null;
                    readonly type: string | null;
                    readonly profile: ({
                        readonly icon: ({
                            readonly url: string | null;
                        }) | null;
                    }) | null;
                    readonly locations: ReadonlyArray<({
                        readonly address: string | null;
                        readonly address_2: string | null;
                        readonly city: string | null;
                        readonly state: string | null;
                        readonly country: string | null;
                        readonly postal_code: string | null;
                        readonly phone: string | null;
                    }) | null> | null;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": SeoProductsForArtworks_artworks$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "larger",
        "type": "[String]"
      }
    ],
    "storageKey": "url(version:\"larger\")"
  }
];
return {
  "kind": "Fragment",
  "name": "SeoProductsForArtworks_artworks",
  "type": "FilterArtworks",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 30
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": ""
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworks_connection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first",
          "type": "Int"
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                v0,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "availability",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "category",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "date",
                  "args": null,
                  "storageKey": null
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
                  "name": "is_acquireable",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "is_price_range",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "price",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "price_currency",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artists",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artist",
                  "plural": true,
                  "selections": [
                    v1,
                    v0
                  ]
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "image",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": false,
                  "selections": v2
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "meta",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ArtworkMeta",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "description",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "partner",
                  "storageKey": "partner(shallow:true)",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "shallow",
                      "value": true,
                      "type": "Boolean"
                    }
                  ],
                  "concreteType": "Partner",
                  "plural": false,
                  "selections": [
                    v1,
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "type",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "profile",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Profile",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "icon",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "Image",
                          "plural": false,
                          "selections": v2
                        },
                        v0
                      ]
                    },
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "locations",
                      "storageKey": "locations(size:1)",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "size",
                          "value": 1,
                          "type": "Int"
                        }
                      ],
                      "concreteType": "Location",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "address",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "address_2",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "city",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "state",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "country",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "postal_code",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "phone",
                          "args": null,
                          "storageKey": null
                        },
                        v0
                      ]
                    },
                    v0
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
(node as any).hash = 'a50f86d40cc0e1c4a683fd0f73fa5b20';
export default node;
