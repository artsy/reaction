import { Input } from "Components/Input"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql, RelayProp } from "react-relay"
import { commitMutation as _commitMutation } from "react-relay"
import { UntouchedOrder } from "../../../__test__/Fixtures/Order"
import { TransactionSummary } from "../../Components/TransactionSummary"
import { initialOfferSuccess } from "../__fixtures__/MutationResults"
import { OfferFragmentContainer as OfferRoute } from "../Offer"

const commitMutation = _commitMutation as any

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

let testProps: any

describe("Payment", () => {
  let wrapper
  beforeEach(async () => {
    console.error = jest.fn() // Silences component logging.

    testProps = {
      order: { ...UntouchedOrder, id: "1234" },
      relay: { environment: {} } as RelayProp,
      router: { push: jest.fn() },
      mediator: { trigger: jest.fn() },
    } as any

    wrapper = await renderRelayTree({
      Component: ({ order }: any) => (
        <OfferRoute order={order} {...defaultProps} />
      ),
      query: graphql`
        query OfferTestQuery {
          order: ecommerceOrder(id: "unused") {
            ...Offer_order
          }
        }
      `,
      mockResolvers: {
        Order: () => UntouchedOrder,
      },
    })
  })

  const defaultProps = {
    router: {
      push: jest.fn(),
    } as any,
    route: {
      onTransition: jest.fn(),
    } as any,
    relay: {
      environment: {},
    } as any,
    mediator: {
      trigger: jest.fn(),
    } as any,
  }

  it("renders", () => {
    const input = wrapper.find(Input)
    expect(input.text()).toContain("Your offer")
  })

  it("can receive input, which updates the transaction summary", () => {
    const input = wrapper.find(Input)
    const transactionSummary = wrapper.find(TransactionSummary)

    expect(transactionSummary.text()).toContain("Your offer—")

    input.props().onChange({ currentTarget: { value: "1" } } as any)
    expect(transactionSummary.text()).toContain("Your offer$1")

    input.props().onChange({ currentTarget: { value: "1.23" } } as any)
    expect(transactionSummary.text()).toContain("Your offer$1")

    input.props().onChange({ currentTarget: { value: "1023.23" } } as any)
    expect(transactionSummary.text()).toContain("Your offer$1,023")
  })

  // describe("mutation", () => {
  //   beforeEach(() => {
  //     console.error = jest.fn() // Silences component logging.
  //     commitMutation.mockReset()
  //   })

  //   it("routes to payment screen after mutation completes", () => {
  //     const mockCommitMutation = commitMutation as jest.Mock<any>
  //     mockCommitMutation.mockImplementationOnce(
  //       (_environment, { onCompleted }) => {
  //         onCompleted(initialOfferSuccess)
  //       }
  //     )

  //     wrapper.find("Button").simulate("click")

  //     expect(testProps.router.push).toHaveBeenCalledWith(
  //       "/orders/1234/shipping"
  //     )
  //   })

  //   it("shows the button spinner while loading the mutation", () => {
  //     const mockCommitMutation = commitMutation as jest.Mock<any>
  //     mockCommitMutation.mockImplementationOnce(() => {
  //       const buttonProps = wrapper
  //         .update() // We need to wait for the component to re-render
  //         .find("Button")
  //         .props() as any
  //       expect(buttonProps.loading).toBeTruthy()
  //     })

  //     wrapper.find("Button").simulate("click")
  //   })

  //   // tslint:disable-next-line:no-empty
  //   it("shows an error modal when there is an error from the server", () => {})

  //   // tslint:disable-next-line:no-empty
  //   it("shows an error modal when there is a network error", () => {})

  //   // tslint:disable-next-line:no-empty
  //   it("shows a validation error modal when there is a cannot_offer error from the server", () => {})

  //   // tslint:disable-next-line:no-empty
  //   it("shows a validation error modal when there is a invalid_amount_cents error from the server", () => {})
  // })
})
