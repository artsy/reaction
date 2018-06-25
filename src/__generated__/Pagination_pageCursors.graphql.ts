/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Pagination_pageCursors = {
    readonly around: ReadonlyArray<{
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    }>;
    readonly first: ({
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    }) | null;
    readonly last: ({
        readonly cursor: string;
        readonly page: number;
        readonly isCurrent: boolean;
    }) | null;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cursor",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "page",
    "args": null,
    "storageKey": null
  },
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
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "first",
      "storageKey": null,
      "args": null,
      "concreteType": "PageCursor",
      "plural": false,
      "selections": v0
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "last",
      "storageKey": null,
      "args": null,
      "concreteType": "PageCursor",
      "plural": false,
      "selections": v0
    }
  ]
};
})();
(node as any).hash = '268f47c07cd530d3e2ca7106acf756ad';
export default node;
