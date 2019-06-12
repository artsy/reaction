/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _Pagination_pageCursors$ref: unique symbol;
export type Pagination_pageCursors$ref = typeof _Pagination_pageCursors$ref;
export type Pagination_pageCursors = {
    readonly around: ReadonlyArray<{
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    }>;
    readonly first: {
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    } | null;
    readonly last: {
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    } | null;
    readonly previous: {
        readonly cursor: string;
        readonly page: number;
    } | null;
    readonly " $refType": Pagination_pageCursors$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "Pagination_pageCursors",
  "type": "PageCursors",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "around",
      "storageKey": null,
      "args": null,
      "concreteType": "PageCursor",
      "plural": true,
      "selections": (v2/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "first",
      "storageKey": null,
      "args": null,
      "concreteType": "PageCursor",
      "plural": false,
      "selections": (v2/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "last",
      "storageKey": null,
      "args": null,
      "concreteType": "PageCursor",
      "plural": false,
      "selections": (v2/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "previous",
      "storageKey": null,
      "args": null,
      "concreteType": "PageCursor",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ]
    }
  ]
};
})();
(node as any).hash = '72b4f72005e64de70ab045755aaaec79';
export default node;
