import { Checkbox } from "@artsy/palette"

import { ValidFormValues } from "Apps/Auction/Routes/__tests__/Utils/RegisterTestPage"
import { Address, AddressForm } from "Apps/Order/Components/AddressForm"
import { expectOne, RootTestPage } from "DevTools/RootTestPage"

export class ConfirmBidTestPage extends RootTestPage {
  get confirmBidButton() {
    return this.find("button").filterWhere(btn =>
      btn.text().includes("Confirm bid")
    )
  }

  get selectBidAmountInput() {
    return expectOne(this.find("select"))
  }

  get form() {
    return expectOne(this.find("form"))
  }

  get addressInput() {
    return expectOne(this.form.find(AddressForm))
  }

  get agreeToTermsInput() {
    return expectOne(this.form.find(Checkbox))
  }

  async fillAddressForm(address: Address) {
    this.addressInput.props().onChange(address, "city")
  }

  async fillFormWithValidValues() {
    this.fillAddressForm(ValidFormValues)
    await this.update()
  }

  async agreeToTerms() {
    this.agreeToTermsInput.props().onSelect(true)
    await this.update()
  }

  async submitForm() {
    this.form.simulate("submit")
    await this.update()
  }
}
