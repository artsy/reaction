export const settingOrderShipmentFailure = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      error: {
        code: "Not permitted",
      },
    },
  },
}

export const settingOrderShipmentMissingRegionFailure = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_region",
      },
    },
  },
}

export const settingOrderShipmentMissingCountryFailure = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_country",
      },
    },
  },
}

export const settingOrderShipmentSuccess = {
  ecommerceSetOrderShipping: {
    orderOrError: {
      order: {
        id: "1234",
      },
    },
  },
}
