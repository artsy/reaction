import { repcaptcha } from "../repcaptcha"
jest.mock("sharify", () => ({ data: { RECAPTCHA_KEY: "recaptcha-api-key" } }))

describe("repcaptcha", () => {
  beforeEach(() => {
    window.grecaptcha.execute.mockClear()
  })

  it("fires an action", () => {
    repcaptcha("login_submit")
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

    repcaptcha("signup_submit", callback)
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

    repcaptcha("signup_submit", callback)
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "signup_submit",
    })
  })
})
