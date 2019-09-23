import { RegisterPreCreateBidderMutationResponse } from "__generated__/RegisterPreCreateBidderMutation.graphql"

export const persistBidderRequirementsSuccessful: RegisterPreCreateBidderMutationResponse = {
  updateMyUserProfile: {
    user: {
      id: "example-user-id",
    },
  },
  createCreditCard: {
    creditCardOrError: {
      creditCardEdge: {
        node: {
          last_digits: "4242",
        },
      },
    },
  },
}

export const persistBidderRequirementsFailed: RegisterPreCreateBidderMutationResponse = {
  updateMyUserProfile: {
    user: {
      id: "example-user-id",
    },
  },
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        message: "The `createCreditCard` mutation failed.",
        type: "",
        detail: "",
      },
    },
  },
}
