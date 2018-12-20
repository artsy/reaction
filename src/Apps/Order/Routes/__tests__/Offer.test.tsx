import { Button } from "@artsy/palette"
import { Input } from "Components/Input"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { RelayProp } from "react-relay"
import { commitMutation as _commitMutation } from "react-relay"
import { UntouchedOfferOrder } from "../../../__tests__/Fixtures/Order"
import { TransactionDetailsSummaryItem } from "../../Components/TransactionDetailsSummaryItem"
import {
  initialOfferFailedCannotOffer,
  initialOfferSuccess,
} from "../__fixtures__/MutationResults"
import { OfferFragmentContainer as OfferRoute } from "../Offer"

const commitMutation = _commitMutation as any

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("Offer InitialMutation", () => {
  const getWrapper = someProps => {
    return mount(
      <MockBoot>
        <OfferRoute {...someProps} />
      </MockBoot>
    )
  }

  let testProps: any
  beforeEach(() => {
    testProps = {
      order: { ...UntouchedOfferOrder, id: "1234" },
      relay: { environment: {} } as RelayProp,
      router: { push: jest.fn() },
      mediator: { trigger: jest.fn() },
      showErrorModal: jest.fn(),
    } as any
  })

  it("renders", () => {
    const component = getWrapper(testProps)
    const input = component.find(Input)
    expect(input.text()).toContain("Your offer")
  })

  it("shows the list price just below the input", () => {
    const component = getWrapper(testProps)
    const container = component.find("div#offer-page-left-column")
    expect(container.text()).toContain("List price: $16,000")
  })

  it("can receive input, which updates the transaction summary", () => {
    const component = getWrapper(testProps)
    const input = component.find(Input)
    const transactionSummary = component.find(TransactionDetailsSummaryItem)

    expect(transactionSummary.text()).toContain("Your offer")

    input.props().onChange({ currentTarget: { value: "1" } } as any)
    expect(transactionSummary.text()).toContain("Your offer$1")

    input.props().onChange({ currentTarget: { value: "1.23" } } as any)
    expect(transactionSummary.text()).toContain("Your offer$1.23")

    input.props().onChange({ currentTarget: { value: "1023.23" } } as any)
    expect(transactionSummary.text()).toContain("Your offer$1,023.23")
  })

  describe("mutation", () => {
    const errorLogger = console.error

    beforeEach(() => {
      console.error = jest.fn() // Silences component logging.
      commitMutation.mockReset()
    })

    afterEach(() => {
      console.error = errorLogger
    })

    it("routes to shipping screen after mutation completes", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(initialOfferSuccess)
        }
      )

      component.find(Button).simulate("click")

      expect(testProps.router.push).toHaveBeenCalledWith(
        "/orders/1234/shipping"
      )
    })

    it("shows the button spinner while loading the mutation", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(() => {
        const buttonProps = component
          .update() // We need to wait for the component to re-render
          .find("Button")
          .props() as any
        expect(buttonProps.loading).toBeTruthy()
      })

      component.find(Button).simulate("click")
    })

    it("shows an error modal when there is an error from the server", () => {
      const component = getWrapper(testProps)
      const mockCommitMutation = commitMutation as jest.Mock<any>
      mockCommitMutation.mockImplementationOnce(
        (_environment, { onCompleted }) => {
          onCompleted(initialOfferFailedCannotOffer)
        }
      )

      expect(testProps.showErrorModal).not.toHaveBeenCalled()

      component.find(Button).simulate("click")

      expect(testProps.showErrorModal).toHaveBeenCalled()
    })
  })
})
