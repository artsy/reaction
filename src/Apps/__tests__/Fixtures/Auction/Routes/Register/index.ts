import { Register_me } from "__generated__/Register_me.graphql"
import { Register_sale } from "__generated__/Register_sale.graphql"
import { routes_RegisterQueryResponse } from "__generated__/routes_RegisterQuery.graphql"

export interface DeFragedRegisterQueryResponse {
  sale: routes_RegisterQueryResponse["sale"] & Register_sale
  me: routes_RegisterQueryResponse["me"] & Register_me
}

export const RegisterQueryResponseFixture: DeFragedRegisterQueryResponse = {
  me: {
    has_qualified_credit_cards: false,
    id: "userid",
    " $fragmentRefs": undefined,
    " $refType": undefined,
  },
  sale: {
    is_auction: true,
    id: "an-example-auction-sale",
    " $refType": undefined,
    " $fragmentRefs": undefined,
    is_registration_closed: false,
    is_open: true,
    is_preview: false,
    registrationStatus: null,
    _id: "id123",
    status: "open",
  },
}

export const RegisterAppResponseFixture: {
  sale: Register_sale
  me: Register_me
} = {
  sale: {
    status: "open",
    id: "whatever-slug",
    _id: "abcde",
    " $refType": undefined,
  },
  me: {
    id: "1",
    " $refType": undefined,
  },
}
