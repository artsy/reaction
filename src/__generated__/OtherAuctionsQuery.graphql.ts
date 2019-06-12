/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { OtherAuctions_sales$ref } from "./OtherAuctions_sales.graphql";
export type OtherAuctionsQueryVariables = {
    readonly size: number;
};
export type OtherAuctionsQueryResponse = {
    readonly sales: ReadonlyArray<{
        readonly " $fragmentRefs": OtherAuctions_sales$ref;
    } | null> | null;
};
export type OtherAuctionsQuery = {
    readonly response: OtherAuctionsQueryResponse;
    readonly variables: OtherAuctionsQueryVariables;
};



/*
query OtherAuctionsQuery(
  $size: Int!
) {
  sales(size: $size, sort: TIMELY_AT_NAME_ASC) {
    ...OtherAuctions_sales
    id
  }
}

fragment OtherAuctions_sales on Sale {
  ...AuctionCard_sale
}

fragment AuctionCard_sale on Sale {
  cover_image {
    cropped(width: 200, height: 180) {
      url
    }
    id
  }
  isBenefit
  isGalleryAuction
  end_at
  href
  id
  is_live_open
  is_preview
  live_start_at
  registrationStatus {
    id
  }
  is_registration_closed
  name
  start_at
  is_closed
  partner {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "size",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "size",
    "variableName": "size"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "TIMELY_AT_NAME_ASC"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "OtherAuctionsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sales",
        "storageKey": null,
        "args": (v1/*: any*/),
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
  },
  "operation": {
    "kind": "Operation",
    "name": "OtherAuctionsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sales",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "cover_image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "cropped",
                "storageKey": "cropped(height:180,width:200)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 180
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 200
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
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isBenefit",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isGalleryAuction",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "end_at",
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
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_live_open",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_preview",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "live_start_at",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "registrationStatus",
            "storageKey": null,
            "args": null,
            "concreteType": "Bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_registration_closed",
            "args": null,
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "start_at",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_closed",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "OtherAuctionsQuery",
    "id": null,
    "text": "query OtherAuctionsQuery(\n  $size: Int!\n) {\n  sales(size: $size, sort: TIMELY_AT_NAME_ASC) {\n    ...OtherAuctions_sales\n    id\n  }\n}\n\nfragment OtherAuctions_sales on Sale {\n  ...AuctionCard_sale\n}\n\nfragment AuctionCard_sale on Sale {\n  cover_image {\n    cropped(width: 200, height: 180) {\n      url\n    }\n    id\n  }\n  isBenefit\n  isGalleryAuction\n  end_at\n  href\n  id\n  is_live_open\n  is_preview\n  live_start_at\n  registrationStatus {\n    id\n  }\n  is_registration_closed\n  name\n  start_at\n  is_closed\n  partner {\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '173fef393fa4d681ab8dc155bd465a81';
export default node;
