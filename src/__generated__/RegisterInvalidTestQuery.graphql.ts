/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Register_me$ref } from "./Register_me.graphql";
import { Register_sale$ref } from "./Register_sale.graphql";
export type RegisterInvalidTestQueryVariables = {};
export type RegisterInvalidTestQueryResponse = {
    readonly sale: ({
        readonly " $fragmentRefs": Register_sale$ref;
    }) | null;
    readonly me: ({
        readonly " $fragmentRefs": Register_me$ref;
    }) | null;
};
export type RegisterInvalidTestQuery = {
    readonly response: RegisterInvalidTestQueryResponse;
    readonly variables: RegisterInvalidTestQueryVariables;
};



/*
query RegisterInvalidTestQuery {
  sale(id: "example-auction-id") {
    ...Register_sale
    __id
  }
  me {
    ...Register_me
    __id
  }
}

fragment Register_sale on Sale {
  id
  _id
  status
  __id
}

fragment Register_me on Me {
  id
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example-auction-id",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "RegisterInvalidTestQuery",
  "id": null,
  "text": "query RegisterInvalidTestQuery {\n  sale(id: \"example-auction-id\") {\n    ...Register_sale\n    __id\n  }\n  me {\n    ...Register_me\n    __id\n  }\n}\n\nfragment Register_sale on Sale {\n  id\n  _id\n  status\n  __id\n}\n\nfragment Register_me on Me {\n  id\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RegisterInvalidTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": "sale(id:\"example-auction-id\")",
        "args": v0,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Register_sale",
            "args": null
          },
          v1
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Register_me",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RegisterInvalidTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": "sale(id:\"example-auction-id\")",
        "args": v0,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "status",
            "args": null,
            "storageKey": null
          },
          v1
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          v2,
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'f6ea01e57a6e710aeb41cab408a7f25d';
export default node;
