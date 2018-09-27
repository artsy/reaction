export const settingOrderShipmentFailure = {
  setOrderShipping: {
    orderOrError: {
      error: {
        code: "Not permitted",
      },
    },
  },
}

export const settingOrderShipmentMissingRegionFailure = {
  setOrderShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_region",
      },
    },
  },
}

export const settingOrderShipmentMissingCountryFailure = {
  setOrderShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_country",
      },
    },
  },
}

export const settingOrderShipmentSuccess = {
  setOrderShipping: {
    orderOrError: {
      order: {
        id: "1234",
      },
    },
  },
}
