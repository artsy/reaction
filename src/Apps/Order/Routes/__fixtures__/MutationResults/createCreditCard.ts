export const creatingCreditCardSuccess = {
  createCreditCard: {
    creditCardOrError: {
      creditCard: {
        id: "gravityCreditCardId",
        name: "Artsy UK Ltd",
        street1: "14 Gower's Walk",
        street2: "Suite 2.5, The Loom",
        city: "London",
        state: "Whitechapel",
        country: "UK",
        postal_code: "E1 8PY",
        expiration_month: 12,
        expiration_year: 2022,
        last_digits: "1234",
        brand: "Visa",
      },
    },
  },
}

export const creatingCreditCardFailed = {
  createCreditCard: {
    creditCardOrError: {
      mutationError: {
        type: "payment_error",
        message: "Payment error",
        detail: "No such token: fake-token",
        error: null,
      },
    },
  },
}
