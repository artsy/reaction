import { routes_IdentityVerificationAppQueryRawResponse } from "__generated__/routes_IdentityVerificationAppQuery.graphql"

export const IdentityVerificationAppQueryResponseFixture: routes_IdentityVerificationAppQueryRawResponse = {
  me: {
    internalID: "my-user-id",
    name: "user",
    id: "unused-user",
    identityVerification: {
      internalID: "identity-verification-id",
      id: "unused-idv",
      state: "pending",
      userID: "my-user-id",
    },
  },
}
