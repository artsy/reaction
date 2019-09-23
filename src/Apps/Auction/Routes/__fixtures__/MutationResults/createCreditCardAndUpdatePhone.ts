import { RegisterCreateCreditCardAndUpdatePhoneMutationResponse } from "__generated__/RegisterCreateCreditCardAndUpdatePhoneMutation.graphql"

export const createCreditCardAndUpdatePhoneSuccessful: RegisterCreateCreditCardAndUpdatePhoneMutationResponse = {
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

export const createCreditCardAndUpdatePhoneFailed: RegisterCreateCreditCardAndUpdatePhoneMutationResponse = {
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
