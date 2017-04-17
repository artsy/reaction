import { Home, ThankYou, ThankYouHtml } from "../server/route_handlers"

describe ("Home page", () => {
  it("redirects to /inquiries", () => {
    let req = { baseUrl: "loyalty" } as any
    let res = { redirect: jest.fn() } as any
    let next = jest.fn() as any
    Home(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty/inquiries")
  })
})

describe ("ThankYou page", () => {
  it("redirects to /login if there is no user", () => {
    let req = { baseUrl: "loyalty" } as any
    let res = { redirect: jest.fn() } as any
    let next = jest.fn() as any
    ThankYou(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith("loyalty/login")
  })
})
