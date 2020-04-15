import { RootTestPage } from "DevTools/RootTestPage"

export class UserSettingsTestPage extends RootTestPage {
  get appSecondFactorSetupButton() {
    return this.find("button")
      .filterWhere(btn => btn.text().includes("Set up"))
      .at(0)
  }

  async clickSetupButton() {
    this.appSecondFactorSetupButton.simulate("click")
    await this.update()
  }
}
