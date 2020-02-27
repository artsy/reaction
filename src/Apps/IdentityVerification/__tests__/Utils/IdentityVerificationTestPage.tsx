import { RootTestPage } from "DevTools/RootTestPage"

export class IdentityVerificationTestPage extends RootTestPage {
  get startVerificationButton() {
    return this.find("button").filterWhere(btn =>
      btn.text().includes("Continue to verification")
    )
  }
  async clickStartVerification() {
    this.startVerificationButton.simulate("click")
    await this.update()
  }
}
