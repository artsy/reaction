import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { Stepper, StepSummaryItem } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { RejectFragmentContainer as RejectRoute } from "../Reject"

jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: moment(NOW)
    .add(1, "day")
    .toISOString(),
  lastOffer: {
    createdAt: moment(NOW)
      .subtract(1, "day")
      .toISOString(),
  },
}

let mockPushRoute: jest.Mock<string>

describe("Buyer rejects seller offer", () => {
  const getWrapper = (extraOrderProps?) => {
    return mount(
      <MockBoot>
        <RejectRoute
          router={{ push: mockPushRoute } as any}
          order={
            {
              ...testOrder,
              ...extraOrderProps,
            } as any
          }
        />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mockPushRoute = jest.fn()
  })

  it("Shows the stepper", () => {
    const component = getWrapper()
    const stepper = component.find(OrderStepper)
    expect(stepper.text()).toMatchInlineSnapshot(`"Respond Review"`)
    const index = component.find(Stepper).props().currentStepIndex
    expect(index).toBe(1)
  })

  it("Shows the countdown timer", () => {
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

  it("Shows a message explaining the consequences of a rejection", () => {
    const component = getWrapper()
    const summary = component.find(StepSummaryItem)
    expect(summary.text()).toContain(
      "Declining an offer permanently ends the negotiation process."
    )
  })

  it("Shows a change link that takes the user back to the respond page", () => {
    const component = getWrapper()
    component.find("StepSummaryItem a").simulate("click")
    expect(mockPushRoute).toHaveBeenCalledWith(
      `/orders/${testOrder.id}/respond`
    )
  })
})
