import { Checkbox } from "@artsy/palette"
import { CountrySelect } from "Components/v2"
import { expectOne, RootTestPage } from "DevTools/RootTestPage"

export class RegisterTestPage extends RootTestPage {
  get registerButton() {
    return this.find("button").filterWhere(btn =>
      btn.text().includes("Register")
    )
  }
  get form() {
    return expectOne(this.find("form"))
  }
  get nameInput() {
    return expectOne(this.form.find(`input[name="name"]`))
  }
  get addressInput() {
    return expectOne(this.form.find(`input[name="street"]`))
  }
  get cityInput() {
    return expectOne(this.form.find(`input[name="city"]`))
  }
  get stateInput() {
    return expectOne(this.form.find(`input[name="state"]`))
  }
  get postalCodeInput() {
    return expectOne(this.form.find(`input[name="postalCode"]`))
  }
  get telephoneInput() {
    return expectOne(this.form.find(`input[name="telephone"]`))
  }
  get countryInput() {
    return expectOne(this.form.find(CountrySelect))
  }
  get agreeToTermsInput() {
    return expectOne(this.form.find(Checkbox))
  }
  async fillTelephone(value) {
    await this.telephoneInput.prop("onChange")({
      target: { name: "telephone", value },
    } as React.ChangeEvent<any>)
  }
  async fillFormWithValidValues() {
    await this.nameInput.prop("onChange")({
      target: { name: "name", value: "Example Name" },
    } as React.ChangeEvent<any>)
    await this.addressInput.prop("onChange")({
      target: { name: "street", value: "123 Example Street" },
    } as React.ChangeEvent<any>)
    await this.cityInput.prop("onChange")({
      target: { name: "city", value: "Example City" },
    } as React.ChangeEvent<any>)
    await this.stateInput.prop("onChange")({
      target: { name: "state", value: "Example State" },
    } as React.ChangeEvent<any>)
    await this.postalCodeInput.prop("onChange")({
      target: { name: "postalCode", value: "12345" },
    } as React.ChangeEvent<any>)
    this.fillTelephone("1234567878")

    this.countryInput.props().onSelect("United States")
    this.agreeToTermsInput.props().onSelect(true)

    await this.update()
  }
  async submitForm() {
    this.form.simulate("submit")
    await this.update()
  }
}
