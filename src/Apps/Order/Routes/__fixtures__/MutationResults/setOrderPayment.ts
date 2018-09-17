export const settingOrderPaymentSuccess = {
  setOrderPayment: {
    orderOrError: {
      order: {
        id: "1234",
      },
    },
  },
}

export const settingOrderPaymentFailed = {
  setOrderPayment: {
    orderOrError: {
      error: {
        type: "validation",
        code: "invalid_state",
        data: '{"state":"canceled"}',
      },
    },
  },
}
