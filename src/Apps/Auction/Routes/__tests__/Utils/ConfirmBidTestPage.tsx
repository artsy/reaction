import { Checkbox } from "@artsy/palette"
import { expectOne, RootTestPage } from "DevTools/RootTestPage"

export const ValidFormValues = {
  name: "Example Name",
  addressLine1: "123 Example Street",
  addressLine2: "Apt 1",
  country: "United States",
  city: "New York",
  region: "NY",
  postalCode: "10012",
  phoneNumber: "+1 555 212 7878",
}

export class ConfirmBidTestPage extends RootTestPage {
  get confirmBidButton() {
    return this.find("button").filterWhere(btn =>
      btn.text().includes("Confirm bid")
    )
  }
  get form() {
    return expectOne(this.find("form"))
  }
  get agreeToTermsInput() {
    return expectOne(this.form.find(Checkbox))
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
