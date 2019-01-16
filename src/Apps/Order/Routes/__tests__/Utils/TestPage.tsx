import { Button } from "@artsy/palette"
import { ArtworkSummaryItemFragmentContainer } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { CreditCardSummaryItemFragmentContainer } from "Apps/Order/Components/CreditCardSummaryItem"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { ModalButton, ModalDialog } from "Components/Modal/ModalDialog"
import { Stepper } from "Components/v2"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { GraphQLTaggedNode } from "react-relay"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { Breakpoint } from "Utils/Responsive"

function expectOne<T>(component: ReactWrapper<T>): ReactWrapper<T> {
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
    readonly mockPushRoute = jest.fn<string>()

    // shame, this can't be private for some reason
    _root: ReactWrapper | null = null

    reset() {
      this._root = null
      this.mockPushRoute.mockReset()
      return this
    }

    async init({
      mockData,
      mockMutationResults,
      breakpoint,
      mockNetworkFailureForMutations,
    }: {
      mockData?: object
      mockMutationResults?: object
      breakpoint?: Breakpoint
      mockNetworkFailureForMutations?: boolean
    } = {}) {
      this._root = await renderRelayTree({
        Component: (props: any) => (
          <MockBoot breakpoint={breakpoint || defaultBreakpoint}>
            <Component {...props} router={{ push: this.mockPushRoute }} />
            <ConnectedModalDialog />
          </MockBoot>
        ),
        query,
        mockData: { ...defaultData, ...mockData },
        mockMutationResults: {
          ...defaultMutationResults,
          ...mockMutationResults,
        },
        mockNetworkFailureForMutations: mockNetworkFailureForMutations
          ? () => Promise.reject(new Error("Network failure!"))
          : null,
      })
    }

    async initOrder(orderProps: object) {
      const order = (defaultData as any).order || {}
      await this.init({ mockData: { order: { ...order, ...orderProps } } })
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

    async expectDefaultErrorDialog() {
      await this.expectErrorDialogMatching(
        "An error occurred",
        "Something went wrong. Please try again or contact orders@artsy.net."
      )
    }

    async expectErrorDialogMatching(title: string, message: string) {
      expect(this.modalDialog.props().show).toBe(true)
      expect(this.modalDialog.text()).toContain(title)
      expect(this.modalDialog.text()).toContain(message)

      await this.dismissModal()

      expect(this.modalDialog.props().show).toBe(false)
    }

    // @ts-ignore
    find: ReactWrapper<Props>["find"] = (...args) => this.root.find(...args)
  }
}
