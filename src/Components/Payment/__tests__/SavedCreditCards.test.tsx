import { ErrorModal } from "Components/Modal/ErrorModal"
import {
  deletingCreditCardFailed,
  deletingCreditCardSuccess,
} from "Components/Payment/__fixtures__/deleteCreditCard"
import {
  CreditCard,
  RemoveLink,
  SavedCreditCards,
} from "Components/Payment/SavedCreditCards"
import { mount } from "enzyme"
import React from "react"
import { commitMutation, RelayProp } from "react-relay"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

const mutationMock = commitMutation as jest.Mock<any>

describe("SavedCreditCards", () => {
  let testProps

  beforeEach(() => {
    mutationMock.mockReset()
    console.error = jest.fn()

    testProps = {
      me: { id: "1234" },
      creditCards: [
        {
          brand: "Visa",
          last_digits: "1224",
          expiration_year: "2020",
          expiration_month: "05",
        },
        {
          brand: "Visa",
          last_digits: "2345",
          expiration_year: "2024",
          expiration_month: "07",
        },
      ],
      relay: { environment: {} } as RelayProp,
      stripe: jest.fn(),
    }
  })

  it("displays credit card details", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)
    expect(creditCardsWrapper.find(CreditCard).length).toBe(2)
    expect(
      creditCardsWrapper
        .find(CreditCard)
        .first()
        .text()
    ).toContain("1224  Exp 05/2020")
    expect(
      creditCardsWrapper
        .find(CreditCard)
        .last()
        .text()
    ).toContain("2345  Exp 07/2024")
  })

  it("lets you remove a credit card", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(deletingCreditCardSuccess)
    )

    creditCardsWrapper
      .find(CreditCard)
      .first()
      .find(RemoveLink)
      .simulate("click")

    expect(
      creditCardsWrapper
        .find(ErrorModal)
        .first()
        .props().show
    ).toBe(false)
  })

  it("shows an error modal if there is an error deleting the credit card", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(deletingCreditCardFailed)
    )

    creditCardsWrapper
      .find(CreditCard)
      .first()
      .find(RemoveLink)
      .simulate("click")

    expect(
      creditCardsWrapper
        .find(ErrorModal)
        .first()
        .props().show
    ).toBe(true)
  })

  it("shows an error modal if there is a network error", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)

    mutationMock.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )

    creditCardsWrapper
      .find(CreditCard)
      .first()
      .find(RemoveLink)
      .simulate("click")

    expect(
      creditCardsWrapper
        .find(ErrorModal)
        .first()
        .props().show
    ).toBe(true)
  })
})
