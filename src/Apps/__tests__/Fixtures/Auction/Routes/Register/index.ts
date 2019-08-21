import { redirects_me } from "__generated__/redirects_me.graphql"
import { redirects_sale } from "__generated__/redirects_sale.graphql"

export interface RegisterQueryResponse {
  sale: redirects_sale
  me: redirects_me
}

export const RegisterQueryResponseFixture: RegisterQueryResponse = {
  sale: {
    " $refType": undefined,
    is_auction: true,
    id: "an-example-auction-sale",
    is_registration_closed: false,
    is_open: true,
    is_preview: false,
    registrationStatus: null,
  },
  me: {
    " $refType": undefined,
    has_qualified_credit_cards: false,
  },
}
