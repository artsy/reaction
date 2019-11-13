import { routes_RegisterQueryRawResponse } from "__generated__/routes_RegisterQuery.graphql"

export const RegisterQueryResponseFixture: routes_RegisterQueryRawResponse = {
  me: {
    id: "opaque-me-id",
    hasQualifiedCreditCards: false,
    internalID: "userid",
  },
  sale: {
    id: "opaque-sale-id",
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
