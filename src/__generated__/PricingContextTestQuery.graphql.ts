/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { PricingContext_artwork$ref } from "./PricingContext_artwork.graphql";
export type PricingContextTestQueryVariables = {};
export type PricingContextTestQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": PricingContext_artwork$ref;
    }) | null;
};
export type PricingContextTestQuery = {
    readonly response: PricingContextTestQueryResponse;
    readonly variables: PricingContextTestQueryVariables;
};



/*
query PricingContextTestQuery {
  artwork(id: "unused") {
    ...PricingContext_artwork
    __id
  }
}

fragment PricingContext_artwork on Artwork {
  priceCents {
    min
  }
  pricingContext @include(if: $enablePricingContext) {
    filterDescription
    bins {
      maxPrice
      maxPriceCents
      minPrice
      minPriceCents
      numArtworks
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "PricingContextTestQuery",
  "id": null,
  "text": "query PricingContextTestQuery {\n  artwork(id: \"unused\") {\n    ...PricingContext_artwork\n    __id\n  }\n}\n\nfragment PricingContext_artwork on Artwork {\n  priceCents {\n    min\n  }\n  pricingContext @include(if: $enablePricingContext) {\n    filterDescription\n    bins {\n      maxPrice\n      maxPriceCents\n      minPrice\n      minPriceCents\n      numArtworks\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PricingContextTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PricingContext_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PricingContextTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "priceCents",
            "storageKey": null,
            "args": null,
            "concreteType": "PriceCents",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "min",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v1,
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "enablePricingContext",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pricingContext",
                "storageKey": null,
                "args": null,
                "concreteType": "AnalyticsPricingContext",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "filterDescription",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "bins",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AnalyticsHistogramBin",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "maxPrice",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "maxPriceCents",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "minPrice",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "minPriceCents",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "numArtworks",
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
};
})();
(node as any).hash = 'b37f94b8bfa44e9e35ba461c5713c143';
export default node;
