import { Register_me } from "__generated__/Register_me.graphql"
import { Register_sale } from "__generated__/Register_sale.graphql"
import { routes_RegisterQueryResponse } from "__generated__/routes_RegisterQuery.graphql"
import { DeFraged } from "Utils/typeSupport"

export interface DeFragedRegisterQueryResponse {
  sale: DeFraged<routes_RegisterQueryResponse["sale"] & Register_sale>
  me: DeFraged<routes_RegisterQueryResponse["me"] & Register_me>
}

export const RegisterQueryResponseFixture: DeFragedRegisterQueryResponse = {
  me: {
    has_qualified_credit_cards: false,
    id: "userid",
  },
  sale: {
    is_auction: true,
    id: "an-example-auction-sale",
    is_registration_closed: false,
    is_open: true,
    is_preview: false,
    registrationStatus: null,
    _id: "id123",
    status: "open",
  },
}
