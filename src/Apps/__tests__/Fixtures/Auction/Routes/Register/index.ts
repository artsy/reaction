import { Register_me } from "__generated__/Register_me.graphql"
import { Register_sale } from "__generated__/Register_sale.graphql"
import { routes_RegisterQueryResponse } from "__generated__/routes_RegisterQuery.graphql"

type DeFraged<T> = Omit<T, " $refType" | " $fragmentRefs">

export interface DeFragedRegisterQueryResponse {
  sale: DeFraged<routes_RegisterQueryResponse["sale"] & Register_sale>
  me: DeFraged<routes_RegisterQueryResponse["me"] & Register_me>
}

export const RegisterQueryResponseFixture: DeFragedRegisterQueryResponse = {
  me: {
    hasQualifiedCreditCards: false,
    internalID: "userid",
  },
  sale: {
    isAuction: true,
    slug: "an-example-auction-sale",
    isRegistrationClosed: false,
    isOpen: true,
    isPreview: false,
    registrationStatus: null,
    internalID: "id123",
    status: "open",
  },
}
