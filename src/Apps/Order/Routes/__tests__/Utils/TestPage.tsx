import { Button } from "@artsy/palette"
import { ArtworkSummaryItemFragmentContainer } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { CreditCardSummaryItemFragmentContainer } from "Apps/Order/Components/CreditCardSummaryItem"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { ModalButton, ModalDialog } from "Components/Modal/ModalDialog"
import { Stepper } from "Components/v2"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { createMockFetchQuery, MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { GraphQLTaggedNode } from "react-relay"
import { Network } from "relay-runtime"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { Breakpoint } from "Utils/Responsive"

export function expectOne<T>(component: ReactWrapper<T>): ReactWrapper<T> {
  if (component.length !== 1) {
    // put this behind an if statement to prevent messing up assertion numbers
    expect(component.length).toBe(1)
  }
  return component
}

export function TestPage({
  Component,
  query,
  defaultData,
  defaultMutationResults = {},
  defaultBreakpoint = "xl",
}: {
  Component: React.ComponentType<any>
  query: GraphQLTaggedNode
  defaultData: object
  defaultMutationResults?: object
  defaultBreakpoint?: Breakpoint
}) {
  return class {
    constructor() {
      afterEach(() => {
        // surface resolver errors that otherwise get swallowed by
        // onError in the pages' calls to commitMutation
        if (this.errors.length !== 0) {
          throw new Error(this.errors as any)
        }
      })
    }

    readonly mockPushRoute = jest.fn<string>()
    readonly mockFetchQuery = jest.fn<string>()
    readonly mockFetchMutation = jest.fn<string>()

    // shame, this can't be private for some reason
    _root: ReactWrapper | null = null
    errors: any[]

    async init({
      mockData,
      mockMutationResults,
      breakpoint,
    }: {
      mockData?: object
      mockMutationResults?: object
      breakpoint?: Breakpoint
    } = {}) {
      this.errors = []
      this.mockPushRoute.mockReset()
      this.mockFetchQuery.mockReset()
      this.mockFetchMutation.mockReset()

      const fetchQuery = createMockFetchQuery({
        mockData: { ...defaultData, ...mockData },
        mockMutationResults: {
          ...defaultMutationResults,
          ...mockMutationResults,
        },
      })

      // surface resolver errors that otherwise get swallowed by
      // onError in the pages' calls to commitMutation
      const wrappedFetchQuery = (operation, variables) =>
        fetchQuery(operation, variables).catch(e => {
          this.errors.push(e)
          throw e
        })

      this.mockFetchQuery.mockImplementation(wrappedFetchQuery)
      this.mockFetchMutation.mockImplementation(wrappedFetchQuery)

      this._root = await renderRelayTree({
        Component: (props: any) => (
          <MockBoot breakpoint={breakpoint || defaultBreakpoint}>
            <Component
              {...props}
              router={{ push: this.mockPushRoute }}
              route={{ onTransition: jest.fn() }}
            />
            <ConnectedModalDialog />
          </MockBoot>
        ),
        query,
        mockNetwork: Network.create((operation, variableValues) => {
          return operation.operationKind === "mutation"
            ? this.mockFetchMutation(operation, variableValues)
            : this.mockFetchQuery(operation, variableValues)
        }),
      })
    }

    get root() {
      if (!this._root) {
        throw new Error(
          "You need to wait for the page to be initialized e.g. `await page.init()`"
        )
      }

      return this._root
    }

    async update() {
      await flushPromiseQueue()
      this.root.update()
    }

    mockMutationNetworkFailureOnce() {
      this.mockFetchMutation.mockImplementationOnce(() =>
        Promise.reject(new Error("failed to fetch"))
      )
    }

    // @ts-ignore
    find: ReactWrapper["find"] = (...args) => this.root.find(...args)

    get lastMutationVariables() {
      return this.mockFetchMutation.mock.calls[
        this.mockFetchMutation.mock.calls.length - 1
      ][1].input
    }

    /** Component selectors **/

    get orderStepper() {
      return expectOne(this.root.find(OrderStepper))
    }

    get orderStepperCurrentStep() {
      const index = this.root.find(Stepper).props().currentStepIndex
      return (this.root.find(OrderStepper).props() as any).steps[index]
    }

    get transactionSummary() {
      return expectOne(this.root.find(TransactionDetailsSummaryItem))
    }

    get artworkSummary() {
      return expectOne(this.root.find(ArtworkSummaryItemFragmentContainer))
    }

    get shippingSummary() {
      return expectOne(this.root.find(ShippingSummaryItemFragmentContainer))
    }

    get paymentSummary() {
      return expectOne(this.root.find(CreditCardSummaryItemFragmentContainer))
    }

    get countdownTimer() {
      return expectOne(this.root.find(CountdownTimer))
    }

    get conditionsOfSaleDisclaimer() {
      return expectOne(this.root.find(ConditionsOfSaleDisclaimer))
    }

    get modalDialog() {
      return expectOne(this.root.find(ModalDialog))
    }

    get submitButton() {
      return expectOne(this.find(Button).last())
    }

    get offerInput() {
      return expectOne(this.find(OfferInput))
    }

    /** PAGE ACTIONS **/

    async clickSubmit() {
      this.submitButton.simulate("click")
      await this.update()
    }

    async dismissModal() {
      this.modalDialog
        .find(ModalButton)
        .last()
        .simulate("click")
      await this.update()
    }

    /*** COMMON ASSERTIONS ***/

    async expectDefaultErrorDialog() {
      await this.expectErrorDialogMatching(
        "An error occurred",
        "Something went wrong. Please try again or contact orders@artsy.net."
      )
    }

    async expectErrorDialogMatching(
      title: string,
      message: string,
      buttonText?: string
    ) {
      expect(this.modalDialog.props().show).toBe(true)
      expect(this.modalDialog.text()).toContain(title)
      expect(this.modalDialog.text()).toContain(message)
      if (buttonText) {
        const button = this.modalDialog.find(ModalButton)
        expect(button.length).toBe(1)
        expect(button.text()).toMatch(buttonText)
      }

      await this.dismissModal()

      expect(this.modalDialog.props().show).toBe(false)
    }

    async setOfferAmount(amount: number) {
      this.offerInput.props().onChange(amount)
      await this.update()
    }

    async expectButtonSpinnerWhenSubmitting() {
      expect(this.submitButton.props().loading).toBeFalsy()
      this.clickSubmit()
      this.root.update()
      expect(this.submitButton.props().loading).toBeTruthy()
      await this.update()
      expect(this.submitButton.props().loading).toBeFalsy()
    }
  }
}
