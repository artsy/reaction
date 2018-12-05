import {
  Buyer,
  OfferOrderWithShippingDetails,
  Offers,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import { Input } from "Components/Input"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { RespondFragmentContainer as RespondRoute } from "../Respond"

jest.mock("Utils/getCurrentTimeAsIsoString")

const NOW = "2018-12-05T13:47:16.446Z"

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: moment(NOW)
    .add(1, "day")
    .toISOString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
  },
  offers: { edges: Offers },
  buyer: Buyer,
}

let mockPushRoute: jest.Mock<string>
let mockMediatorTrigger: jest.Mock<string>

describe("Offer InitialMutation", () => {
  const getWrapper = (extraOrderProps?) => {
    return mount(
      <MockBoot>
        <RespondRoute
          relay={{ environment: {} }}
          router={{ push: mockPushRoute }}
          mediator={{ trigger: mockMediatorTrigger }}
          order={{
            ...testOrder,
            ...extraOrderProps,
          }}
        />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mockPushRoute = jest.fn()
    mockMediatorTrigger = jest.fn()
  })

  it("renders", () => {
    const component = getWrapper()
    const input = component.find(Input)
    expect(input.text()).toContain("Your offer")
  })

  it("shows the countdown timer", () => {
    const component = getWrapper({
      stateExpiresAt: moment(NOW)
        .add(1, "day")
        .add(4, "hours")
        .add(22, "minutes")
        .add(59, "seconds"),
    })
    const timer = component.find(CountdownTimer)
    expect(timer.text()).toContain("01d 04h 22m 59s left")
  })

  // radio buttons
  // - accept
  // - decline
  // - counter
  //   - input number

  // timer
  // - is visible
})
