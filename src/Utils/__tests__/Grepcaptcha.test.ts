import { Grepcaptcha, GrepcaptchaAction } from "../Grepcaptcha"
jest.mock("sharify", () => ({ data: { RECAPTCHA_KEY: "recaptcha-api-key" } }))

describe("Grepcaptcha", () => {
  beforeEach(() => {
    window.grecaptcha.execute.mockClear()
  })

  it("fires an action", () => {
    Grepcaptcha(GrepcaptchaAction.LoginSubmit)
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "login_submit",
    })
  })

  it("fires an action with callback", done => {
    const action = jest.fn()
    const callback = jest.fn(token => {
      action(token)
      expect(action).toBeCalledWith("recaptcha-token")
      done()
    })

    Grepcaptcha(GrepcaptchaAction.SignupSubmit, callback)
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "signup_submit",
    })
  })

  it("Still calls the callback if firing action fails", done => {
    window.grecaptcha.execute.mockRejectedValue(new Error("google failed"))
    const action = jest.fn()
    const callback = jest.fn(() => {
      action()
      expect(action).toBeCalled()
      done()
    })

    Grepcaptcha(GrepcaptchaAction.SignupSubmit, callback)
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "signup_submit",
    })
  })
})
