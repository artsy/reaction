import { Checkbox } from "@artsy/palette"
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
