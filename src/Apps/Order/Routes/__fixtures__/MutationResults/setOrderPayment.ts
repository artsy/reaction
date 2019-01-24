export const settingOrderPaymentSuccess = {
  ecommerceSetOrderPayment: {
    orderOrError: {
      order: {
        __typename: "BuyOrder",
        id: "1234",
        creditCard: {
          id: "credit-card-id",
          name: "Artsy UK Ltd",
          street1: "14 Gower's Walk",
          street2: "Suite 2.5, The Loom",
          city: "London",
          state: "Whitechapel",
          country: "UK",
          postal_code: "E1 8PY",
        },
      },
    },
  },
}

export const settingOrderPaymentFailed = {
  ecommerceSetOrderPayment: {
    orderOrError: {
      error: {
        type: "validation",
        code: "invalid_state",
        data: '{"state":"canceled"}',
      },
    },
  },
}
