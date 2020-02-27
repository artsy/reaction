import { routes_IdentityVerificationPageQueryRawResponse } from "__generated__/routes_IdentityVerificationPageQuery.graphql"

export const IdentityVerificationPageQueryResponseFixture: routes_IdentityVerificationPageQueryRawResponse = {
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
