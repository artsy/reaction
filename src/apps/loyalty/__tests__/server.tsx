import { Home, ThankYou } from "../server/route_handlers"

describe("Home page", () => {
  it("redirects to /inquiries", () => {
    let req = { baseUrl: "loyalty" } as any
    let res = { redirect: jest.fn() } as any
    let next = jest.fn() as any
    Home(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty/inquiries")
  })
})

describe("ThankYou page", () => {
  it("redirects to /login if there is no user", () => {
    const req = { baseUrl: "loyalty" } as any
    const res = { redirect: jest.fn(), locals: { sd: { CURRENT_USER: undefined } } } as any
    const next = jest.fn() as any
    ThankYou(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty/login")
  })

  it("redirects to /loyalty if the user is not a loyalty applicant", () => {
    const CURRENT_USER = {
      profile: {
        loyalty_applicant_at: null,
      },
    }
    const req = { baseUrl: "loyalty" } as any
    const res = { redirect: jest.fn(), locals: { sd: { CURRENT_USER } } } as any
    const next = jest.fn() as any
    ThankYou(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty")
  })
})
