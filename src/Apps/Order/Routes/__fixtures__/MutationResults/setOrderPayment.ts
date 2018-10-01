export const settingOrderPaymentSuccess = {
  ecommerceSetOrderPayment: {
    orderOrError: {
      order: {
        id: "1234",
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
